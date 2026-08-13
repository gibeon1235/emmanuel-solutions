/* Route smoke test — renders each page component for real (bypassing
   React.lazy, which would otherwise only render the Suspense fallback).
   Catches render-time crashes such as a map parameter shadowing an import. */
import { renderToString } from "react-dom/server";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import React from "react";

import { ServiceDetailPage }   from "../src/components/../pages/ServiceDetailPage.jsx";
import { InsightDetailPage }   from "../src/pages/InsightDetailPage.jsx";
import { CaseStudyDetailPage } from "../src/pages/CaseStudyDetailPage.jsx";
import { AlliancePage }        from "../src/pages/AlliancePage.jsx";
import App                     from "../src/App.jsx";

/* The homepage is rendered through App so the real route table runs —
   this is the page the service mascot lives on. */
function HomeViaApp() { return React.createElement(App); }

const CASES = [
  ["/",                              "/*",                         HomeViaApp],
  ["/services/sustainable-tech",     "/services/:serviceId",       ServiceDetailPage],
  ["/services/circular-economy",     "/services/:serviceId",       ServiceDetailPage],
  ["/services/innovation-training",  "/services/:serviceId",       ServiceDetailPage],
  ["/services/industrial-marketing", "/services/:serviceId",       ServiceDetailPage],
  ["/case-studies/ecozen",           "/case-studies/:caseStudyId", CaseStudyDetailPage],
  ["/case-studies/devrays",          "/case-studies/:caseStudyId", CaseStudyDetailPage],
  ["/case-studies/thaal",            "/case-studies/:caseStudyId", CaseStudyDetailPage],
  ["/case-studies/nonexistent",      "/case-studies/:caseStudyId", CaseStudyDetailPage],
  ["/insights/post-harvest-loss",    "/insights/:insightId",       InsightDetailPage],
  ["/insights/circular-polyurethane","/insights/:insightId",       InsightDetailPage],
  ["/insights/innovation-behavior",  "/insights/:insightId",       InsightDetailPage],
  ["/alliances/sfai",                "/alliances/:allianceId",     AlliancePage],
  ["/alliances/iif",                 "/alliances/:allianceId",     AlliancePage],
  ["/alliances/nonexistent",         "/alliances/:allianceId",     AlliancePage]
];

let failed = 0;
for (const [url, pattern, Page] of CASES) {
  try {
    const html = renderToString(
      React.createElement(LazyMotion, { features: domAnimation, strict: true },
        React.createElement(MemoryRouter, { initialEntries: [url] },
          React.createElement(Routes, null,
            React.createElement(Route, { path: pattern, element: React.createElement(Page) })
          )
        )
      )
    );
    const expectedThin = url.includes("nonexistent");
    const thin = html.length < 3000;
    if (thin && !expectedThin) { console.log(`THIN  ${url}  ${html.length}b — rendered almost nothing`); failed++; }
    else console.log(`PASS  ${url}  ${html.length}b${expectedThin ? " (not-found state, expected)" : ""}`);
  } catch (e) {
    console.log(`FAIL  ${url} — ${e.message.split("\n")[0]}`);
    failed++;
  }
}
console.log(failed ? `\n${failed} route(s) FAILED` : `\nall ${CASES.length} routes rendered`);
process.exit(failed ? 1 : 0);
