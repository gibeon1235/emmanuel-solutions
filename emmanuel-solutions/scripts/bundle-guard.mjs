/* The 3D renderer must never reach the main bundle.

   This test exists because importing a scene registry into the rail
   component once pulled all of Three.js into the entry chunk, taking it
   from 350 kB to 1,046 kB — every visitor downloading a renderer that
   only desktop hover users ever need. The build succeeded and said
   nothing; only the byte count gave it away. */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const DIR = "dist/assets";
const MAX_ENTRY_BYTES = 420 * 1024;
const THREE_MARKERS = ["CapsuleGeometry", "WebGLRenderer", "PMREMGenerator"];

let files;
try {
  files = readdirSync(DIR);
} catch (e) {
  console.error(`FAIL  no build found at ${DIR} — run npm run build first`);
  process.exit(1);
}

const entry = files.find((f) => /^index-.*\.js$/.test(f));
const mascot = files.find((f) => /^MascotScene-.*\.js$/.test(f));

let fails = 0;
const ok = (name, cond, extra = "") => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${extra ? "  " + extra : ""}`);
  if (!cond) fails++;
};

ok("entry chunk exists", !!entry);
ok("mascot chunk is split out", !!mascot);

if (entry) {
  const size = statSync(join(DIR, entry)).size;
  const src = readFileSync(join(DIR, entry), "utf8");
  ok("entry chunk under budget", size <= MAX_ENTRY_BYTES,
     `${(size / 1024).toFixed(0)} kB of ${(MAX_ENTRY_BYTES / 1024).toFixed(0)} kB`);
  for (const marker of THREE_MARKERS) {
    ok(`entry chunk free of ${marker}`, !src.includes(marker));
  }
}

if (mascot) {
  const src = readFileSync(join(DIR, mascot), "utf8");
  ok("renderer really is in the lazy chunk", THREE_MARKERS.some((m) => src.includes(m)));
}

console.log(fails ? `\n${fails} FAILED` : "\nthe renderer stays out of the main bundle");
process.exit(fails ? 1 : 0);
