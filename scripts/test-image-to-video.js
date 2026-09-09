#!/usr/bin/env node
/*
 * One-off test harness for the image-to-video question: given one real
 * photo and a list of candidate Higgsfield video models, preview cost for
 * ALL of them first, enforce the 20-credit ceiling across the whole batch,
 * and only then generate + download each result so they can be compared
 * side by side.
 *
 * This has not been run against a real account (this sandbox has no
 * Higgsfield login). Run it on the Mac, where `higgsfield auth login` is
 * already done:
 *
 *   node scripts/test-image-to-video.js <path-to-dog-photo.jpg> <model1> [<model2> ...]
 *
 * Get candidate model names from `higgsfield model list --video --json`
 * first: any model whose params (`higgsfield model get <name> --json`)
 * accept an --image / --start-image flag is a candidate. Pick 2-4, not
 * all 30, to keep this cheap.
 */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { enforceCreditCeiling } = require("./lib/higgsfield-budget");

const PROMPT = "subtle natural motion, slow gentle camera movement, no added text, no overlays";
const CEILING = 20;
const OUT_DIR = path.join(__dirname, "..", "content", "generated", "image-to-video-test");

function usageAndExit() {
  console.error("Usage: node scripts/test-image-to-video.js <photo-path> <model1> [<model2> ...]");
  process.exit(1);
}

function main() {
  const [, , photoPath, ...models] = process.argv;
  if (!photoPath || models.length === 0) usageAndExit();
  if (!fs.existsSync(photoPath)) {
    console.error(`No file at ${photoPath}`);
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log(`Previewing cost for ${models.length} model(s) against ${photoPath}...`);
  const jobs = models.map((model) => ({
    jobType: model,
    params: { image: photoPath, prompt: PROMPT },
  }));

  let budget;
  try {
    budget = enforceCreditCeiling(jobs, CEILING);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  console.log(`Total estimated cost: ${budget.total} credit(s) (ceiling ${budget.ceiling}). Proceeding.`);
  budget.items.forEach((i) => console.log(`  ${i.jobType}: ${i.credits} credit(s)`));

  const results = [];
  for (const model of models) {
    console.log(`\nGenerating with ${model}...`);
    const outFile = path.join(OUT_DIR, `${model}.mp4`);
    let raw;
    try {
      raw = execFileSync(
        "higgsfield",
        ["generate", "create", model, "--image", photoPath, "--prompt", PROMPT, "--wait", "--json"],
        { encoding: "utf8" }
      );
    } catch (err) {
      console.error(`${model} failed: ${err.message}`);
      results.push({ model, status: "failed", error: err.message });
      continue;
    }

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      console.error(`${model} did not return JSON, raw output:\n${raw}`);
      results.push({ model, status: "failed", error: "non-JSON response" });
      continue;
    }

    const resultUrl = parsed.url || parsed.resultUrl || (parsed.outputs && parsed.outputs[0] && parsed.outputs[0].url);
    if (!resultUrl) {
      console.error(`${model}: no result URL found in response:\n${JSON.stringify(parsed, null, 2)}`);
      results.push({ model, status: "failed", error: "no result URL in response", raw: parsed });
      continue;
    }

    execFileSync("curl", ["-sL", "-o", outFile, resultUrl]);
    console.log(`${model}: saved to ${outFile}`);
    results.push({ model, status: "ok", outFile, resultUrl });
  }

  const manifestPath = path.join(OUT_DIR, "results.json");
  fs.writeFileSync(manifestPath, JSON.stringify({ photoPath, prompt: PROMPT, budget, results }, null, 2) + "\n");

  console.log(`\nDone. ${results.filter((r) => r.status === "ok").length}/${models.length} succeeded.`);
  console.log(`Files in ${OUT_DIR}, manifest at ${manifestPath}.`);
  console.log(`Look at each one and judge quality yourself, or send me the folder/results.json and I'll pull frames and give you a read.`);
}

main();
