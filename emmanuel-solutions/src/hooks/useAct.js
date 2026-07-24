import { useEffect, useState } from "react";

/* The act driver.
   One visual system, five scroll positions. Each section owns an act;
   whichever section holds the most viewport decides what the system is doing.

   1 hero        blueprint + sensing
   2 credibility systems map resolves
   3 services    capability clusters emerge
   4 AI          intelligence ignites
   5 proof       the system at rest
*/

const SECTIONS = [
  ["home", 1],
  ["about", 2],
  ["services", 3],
  ["ai-solutions", 4],
  ["case-studies", 5]
];

export function useAct(defaultAct = 1) {
  const [act, setAct] = useState(defaultAct);

  useEffect(() => {
    const nodes = SECTIONS
      .map(([id, a]) => [document.getElementById(id), a])
      .filter(([el]) => el);
    if (!nodes.length) return;

    // Fallback for browsers without IntersectionObserver: stay on act 1.
    if (typeof IntersectionObserver === "undefined") return;

    const ratios = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const found = nodes.find(([el]) => el === entry.target);
          if (found) ratios.set(found[1], entry.intersectionRatio);
        });
        let best = defaultAct;
        let top = 0;
        ratios.forEach((ratio, a) => {
          if (ratio > top) { top = ratio; best = a; }
        });
        if (top > 0.08) setAct(best);
      },
      { threshold: [0, 0.08, 0.25, 0.5, 0.75, 1] }
    );

    nodes.forEach(([el]) => observer.observe(el));
    return () => observer.disconnect();
  }, [defaultAct]);

  return act;
}
