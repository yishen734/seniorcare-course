# Eason's SeniorCare course

- One Next.js application, TypeScript strict and CSS Modules. Preserve the established course UI.
- One Chinese edition only. Do not add language or audience switching. Keep lesson content separate from routes and share components and pure logic.
- Only lesson 1 is authored. Leave later lessons blank until requested. Foundation study precedes the SeniorCare project.
- Teach with plain language and small examples. Each class lasts 60 minutes; use 10 opening minutes and 50 core minutes. No homework.
- Keep route components thin, the curriculum in src/curriculum, registration in src/lessons/registry.ts, and pure logic in src/lib.
- The course site itself has no backend, accounts or database. SeniorCare is the teaching project, not a live care service.
- Type checks use the real local TypeScript compiler in a Worker. Runtime output and returned-value checks are separate. Do not simulate compiler diagnostics.
- Before framework changes, read relevant bundled Next.js docs in node_modules/next/dist/docs.
- Run typecheck, lint, tests, format checks and static production build; inspect affected interactions and narrow layouts.
