import vm from "node:vm";
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


JSON.parse(await readFile("manifest.json", "utf8"));

const masterSource = await readFile("js/master.js", "utf8");
try {
  new vm.Script("var BABYLON = {};\n" + masterSource);
} catch (error) {
  failures.push(`js/master.js is not safe to load after the global Babylon runtime: ${error.message}`);
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(failure);
  }
  process.exit(1);
}

console.log("Ballistic workspace validation passed.");
