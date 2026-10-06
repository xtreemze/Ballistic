import { access, readFile } from "node:fs/promises";

const required = [
  "index.html",
  "manifest.json",
  "sw.js",
  "js/master.js",
  "js/desktop-controls.js",
  "js/register-service-worker.js",
  "js/babylon.js",
  "js/cannon.min.js",
  "js/pep.min.js",
  "js/ballistic.babylon",
  "audio/ambient_mixdown.mp3",
  "audio/whoosh_mixdown.mp3",
  "audio/thud_mixdown.mp3"
];

const failures = [];

for (const file of required) {
  try {
    await access(file);
  } catch {
    failures.push(`Missing required runtime file: ${file}`);
  }
}

const html = await readFile("index.html", "utf8");

for (const reference of [
  "./js/master.js",
  "./js/desktop-controls.js",
  "./js/register-service-worker.js"
]) {
  if (!html.includes(reference)) {
    failures.push(`index.html does not reference ${reference}`);
  }
}

if (html.includes("bundle.js")) {
  failures.push("index.html still references the retired legacy bundle.js");
}

JSON.parse(await readFile("manifest.json", "utf8"));

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(failure);
  }
  process.exit(1);
}

console.log("Ballistic workspace validation passed.");
