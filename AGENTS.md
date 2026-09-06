# AGENTS.md

## CodeGraph

This repo is indexed by CodeGraph (`.codegraph/` exists at the repo root). Use it before grep/Read when you need to understand or locate code:

- **MCP tool** (when available): `codegraph_explore` answers most code questions in one call — the relevant symbols' verbatim source plus the call paths between them.
- **Shell** (always works): `codegraph explore "<symbol names or question>"` prints the same output.

The index is small (only `src/`); if a symbol is absent or stale, re-index with `codegraph init` — never edit `.codegraph/` by hand.

Vite 8 + React 19 + TypeScript 6. `src/` has a basic chat skeleton UI (`components/chat/`) on antd, fed by local mock data — Redux is installed but not yet wired up. Git repo on branch `main`. No router, backend, or tests are installed.

## UI & state

- **antd v6** is the UI library (`antd`). Before building components, load the repo-local skill `.agents/skills/ant-design/SKILL.md` (component selection, theming/tokens, a11y, chat UI patterns).
- **antd API lookup**: the skill's CLI workflow (`antd info`) is NOT used — `@ant-design/cli` is intentionally not installed. Read the official docs instead, via `https://ant.design/llms.txt`: per-component markdown at `https://ant.design/components/{component}.md` (e.g. `input`, `menu`, `avatar`, `layout`).
- **Redux Toolkit** (`@reduxjs/toolkit`) + **react-redux** for global state.
- Chat state lives in `App.tsx` (`useState`) with mock data from `src/data/mock.ts` — the wiring point for Redux/backend later. No router or Redux store is set up yet.

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

## Keeping this file accurate

When architecture, the tech stack, or any convention you rely on changes (e.g. wiring antd/Redux, adding a router/backend, or switching an API lookup source such as the antd CLI vs `llms.txt`), update this file so future sessions don't act on stale assumptions.
