# AGENTS.md

## CodeGraph

This repo is indexed by CodeGraph (`.codegraph/` exists at the repo root). Use it before grep/Read when you need to understand or locate code:

- **MCP tool** (when available): `codegraph_explore` answers most code questions in one call — the relevant symbols' verbatim source plus the call paths between them.
- **Shell** (always works): `codegraph explore "<symbol names or question>"` prints the same output.

The index is small (only `src/`); if a symbol is absent or stale, re-index with `codegraph init` — never edit `.codegraph/` by hand.

Fresh Vite scaffold (React 19 + TypeScript). There is no domain code yet — `src/` is default template boilerplate (`App.tsx`, `main.tsx`, CSS). No router, state library, backend, or tests are installed. Not a git repo yet.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — typecheck + production build (`tsc -b && vite build`)
- `npm run lint` — ESLint over the whole repo
- `npm run preview` — serve the production build

There is no separate typecheck script; `npm run build` is the typecheck gate. Verify changes with `npm run lint` and `npm run build`. No test framework is configured — do not add tests or a test runner without asking.

## TypeScript constraints

These are set in `tsconfig.app.json`/`tsconfig.node.json` and are easy to trip over:

- `verbatimModuleSyntax`: type-only imports must use `import type`.
- `erasableSyntaxOnly`: no enums, namespaces, or constructor parameter properties (only plain type syntax that can be erased at compile time).
- `noUnusedLocals` / `noUnusedParameters`: unused code fails the build.
- Project references: `tsconfig.app.json` covers `src`, `tsconfig.node.json` covers `vite.config.ts`. Build uses `tsc -b` so all three configs must stay consistent.
- JSX is `react-jsx`, so no `import React` needed.

## Config notes

- ESLint (`eslint.config.js`) is flat config, not type-aware, and already includes the `react-hooks` and `react-refresh` plugins. The `react-refresh` rule only allows exporting components from files — don't add non-component exports to component files.
- `vite.config.ts` is minimal (React plugin only). No proxy, aliases, or env handling is set up.
