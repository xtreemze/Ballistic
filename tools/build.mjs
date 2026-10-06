import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const files = [
  "index.html",
  "bundle.js",
  "manifest.json",
  "browserconfig.xml",
  "favicon.ico",
  "favicon-16x16.png",
  "favicon-32x32.png",
  "apple-touch-icon.png",
  "android-chrome-192x192.png",
  "android-chrome-512x512.png",
  "mstile-150x150.png",
  "mstile-310x310.png",
  "safari-pinned-tab.svg",
  "sw.js",
  "js/pep.min.js",
  "js/cannon.min.js",
  "js/babylon.js",
  "js/master.js",
  "js/desktop-controls.js",
  "js/register-service-worker.js",
  "js/ballistic.babylon",
  "audio/ambient_mixdown.mp3",
  "audio/whoosh_mixdown.mp3",
  "audio/thud_mixdown.mp3"
];

const outDir = "dist";

await rm(outDir, { recursive: true, force: true });

for (const file of files) {
  const destination = join(outDir, file);
  await mkdir(dirname(destination), { recursive: true });
  await cp(file, destination);
}

await writeFile(join(outDir, ".nojekyll"), "");
console.log(`Built ${files.length} runtime files into ${outDir}/`);
