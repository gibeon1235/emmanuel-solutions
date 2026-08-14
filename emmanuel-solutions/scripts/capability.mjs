/* Who gets the renderer, and who must never pay for it. */
import { eligible, hasWebGL } from "../src/three/capability.js";

let fails = 0;
const ok = (name, cond) => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}`);
  if (!cond) fails++;
};

function fakeWindow({ reduced = false, fine = true, gl = true, throws = false } = {}) {
  return {
    WebGLRenderingContext: gl ? function () {} : undefined,
    matchMedia: (q) => ({
      matches: /prefers-reduced-motion/.test(q) ? reduced : fine
    }),
    document: {
      createElement: () => ({
        getContext: (type) => {
          if (throws) throw new Error("context blocked");
          return gl && /webgl/.test(type) ? {} : null;
        }
      })
    }
  };
}

ok("desktop with WebGL gets the scene",        eligible(fakeWindow()) === true);
ok("reduced-motion is excluded",               eligible(fakeWindow({ reduced: true })) === false);
ok("touch or coarse pointer is excluded",      eligible(fakeWindow({ fine: false })) === false);
ok("no WebGL support is excluded",             eligible(fakeWindow({ gl: false })) === false);
ok("a browser that throws on getContext is excluded",
   eligible(fakeWindow({ throws: true })) === false);
ok("server-side render is excluded",           eligible(null) === false);
ok("window without matchMedia is excluded",    eligible({}) === false);
ok("hasWebGL is false when the API is missing", hasWebGL(fakeWindow({ gl: false })) === false);
ok("hasWebGL survives a throwing getContext",   hasWebGL(fakeWindow({ throws: true })) === false);

console.log(fails ? `\n${fails} FAILED` : "\ncapability gating is correct");
process.exit(fails ? 1 : 0);
