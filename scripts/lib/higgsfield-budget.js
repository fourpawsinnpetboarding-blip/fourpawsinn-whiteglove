/*
 * Hard credit ceiling for any automated Higgsfield run. Nothing gets
 * created until every planned job's cost is known and the total is
 * confirmed under the ceiling.
 *
 * Two models have real, confirmed costs from an actual run (see
 * KNOWN_MODEL_COSTS below) and use those directly, no network call, no
 * field-guessing. Any other model falls back to a live
 * `higgsfield generate cost` call. That fallback's response shape is
 * still not confirmed for models outside the known table, so it checks
 * several plausible field names and fails loudly rather than silently
 * reading a wrong field as 0 credits. First real run against a new
 * model: check the printed raw JSON once, tell me the real cost, and it
 * gets added to KNOWN_MODEL_COSTS.
 */

const { execFileSync } = require("child_process");

const DEFAULT_CEILING = 20;
const PLAUSIBLE_CREDIT_FIELDS = ["credits", "cost", "estimatedCredits", "creditCost", "price"];

// Confirmed from a real run against Alex's account, not estimated.
const KNOWN_MODEL_COSTS = {
  kling2_6: { credits: 10 }, // flat per generation
  seedance_2_0_mini: { credits: 12.5, perSeconds: 5 }, // per 5 second generation, scales with --duration
};

function knownCost(job) {
  const known = KNOWN_MODEL_COSTS[job.jobType];
  if (!known) return null;
  if (known.perSeconds && job.params && job.params.duration) {
    const duration = Number(job.params.duration);
    if (!Number.isFinite(duration)) return null; // fall back to a live check rather than guess
    return (known.credits * duration) / known.perSeconds;
  }
  return known.credits;
}

function extractCredits(json) {
  for (const field of PLAUSIBLE_CREDIT_FIELDS) {
    if (typeof json[field] === "number") return json[field];
  }
  // Some cost responses may nest under a "estimate" or "data" object.
  for (const key of ["estimate", "data", "result"]) {
    if (json[key] && typeof json[key] === "object") {
      for (const field of PLAUSIBLE_CREDIT_FIELDS) {
        if (typeof json[key][field] === "number") return json[key][field];
      }
    }
  }
  return null;
}

/**
 * job: { jobType, isWorkflow: bool, params: { [flag]: value } }
 * Returns { jobType, credits, raw }, or throws with the raw output if no
 * known credit field is found.
 */
function previewJobCost(job) {
  const known = knownCost(job);
  if (known !== null) {
    return { jobType: job.jobType, credits: known, raw: { source: "known-confirmed", ...KNOWN_MODEL_COSTS[job.jobType] } };
  }

  const args = ["generate", "cost"];
  if (job.isWorkflow) args.push("workflow", job.jobType);
  else args.push(job.jobType);
  for (const [flag, value] of Object.entries(job.params || {})) {
    args.push(`--${flag}`, String(value));
  }
  args.push("--json");

  const raw = execFileSync("higgsfield", args, { encoding: "utf8" });
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error(`higgsfield generate cost did not return JSON for ${job.jobType}:\n${raw}`);
  }

  const credits = extractCredits(parsed);
  if (credits === null) {
    throw new Error(
      `Could not find a credit number in the cost response for ${job.jobType}. Refusing to guess. Raw response:\n${JSON.stringify(parsed, null, 2)}\nCheck which field holds the credit count and update PLAUSIBLE_CREDIT_FIELDS in scripts/lib/higgsfield-budget.js.`
    );
  }
  return { jobType: job.jobType, credits, raw: parsed };
}

/**
 * Previews every job's cost, sums them, and throws loudly (no jobs
 * created) if the total exceeds the ceiling. Returns the itemized list
 * and total when under budget, so the caller can log it.
 */
function enforceCreditCeiling(jobs, ceiling = DEFAULT_CEILING) {
  if (jobs.length === 0) return { items: [], total: 0, ceiling };

  const items = jobs.map(previewJobCost);
  const total = items.reduce((sum, i) => sum + i.credits, 0);

  if (total > ceiling) {
    const breakdown = items.map((i) => `  ${i.jobType}: ${i.credits} credit(s)`).join("\n");
    throw new Error(
      `Credit ceiling exceeded: this run would cost ${total} credits, ceiling is ${ceiling}. Nothing was created.\nBreakdown:\n${breakdown}\nCut jobs from this run or raise the ceiling explicitly, do not retry unchanged.`
    );
  }

  return { items, total, ceiling };
}

module.exports = { enforceCreditCeiling, previewJobCost, DEFAULT_CEILING, KNOWN_MODEL_COSTS };
