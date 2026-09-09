const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");

function readJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relPath), "utf8"));
}

function loadLocation() {
  return readJson("config/location.json");
}

function loadSlate() {
  return readJson("config/slate.json");
}

function loadFormat(id) {
  return readJson(path.join("config", "formats", `${id}.json`));
}

module.exports = { ROOT, readJson, loadLocation, loadSlate, loadFormat };
