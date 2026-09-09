/*
 * Hard credit ceiling for any automated Higgsfield run. Nothing gets
 * created until every planned job's cost has been previewed with
 * `higgsfield generate cost` and the total is confirmed under the ceiling.
 *
 * This has NOT been run against a real authenticated Higgsfield account
 * (this sandbox has no login for one). The command shape is confirmed
 * correct from `higgsfield generate cost --help`. The exact field name
 * the JSON response uses for the credit number is NOT confirmed, so this
 * checks several plausible names and fails loudly, printing the raw
 * response, rather than silently reading a wrong field as 0 credits and
 * letting a run through it should have blocked. Alex: the first time this
 * runs for real, check the printed raw JSON once and tell me which field
 * it actually used, so this can drop the guesswork.
 */

const { execFileSync } = require("child_process");

const DEFAULT_CEILING = 20;
const PLAUSIBLE_CREDIT_FIELDS = ["credits", "cost", "estimatedCredits", "creditCost", "price"];

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

module.exports = { enforceCreditCeiling, previewJobCost, DEFAULT_CEILING };
