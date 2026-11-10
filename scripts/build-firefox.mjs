// Copies the Chrome build in dist/ to dist-firefox/ with a Firefox manifest.
// Run `npm run build` first, or use `npm run build:firefox` which does both.
import { cpSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { toFirefoxManifest } from "./firefox-manifest.mjs";

const SOURCE = "dist";
const TARGET = "dist-firefox";

const chromeManifest = JSON.parse(readFileSync(`${SOURCE}/manifest.json`));

rmSync(TARGET, { recursive: true, force: true });
cpSync(SOURCE, TARGET, { recursive: true });
writeFileSync(
  `${TARGET}/manifest.json`,
  JSON.stringify(toFirefoxManifest(chromeManifest), null, 2),
);

console.log(`Firefox build written to ${TARGET}/`);
