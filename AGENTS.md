# AGENTS.md

## CodeGraph

This repo is indexed by CodeGraph (`.codegraph/` exists at the repo root). Use it before grep/Read when you need to understand or locate code:

- **MCP tool** (when available): `codegraph_explore` answers most code questions in one call — the relevant symbols' verbatim source plus the call paths between them.
- **Shell** (always works): `codegraph explore "<symbol names or question>"` prints the same output.

The index is small (only `src/`); if a symbol is absent or stale, re-index with `codegraph init` — never edit `.codegraph/` by hand.

Finished chat prototype: Vite 8 + React 19 + TypeScript 6 + antd v6, fully wired to Redux Toolkit + RTK Query. UI text is in English. There is no real backend — data comes from an in-memory mock DB (`src/mocks/db.mock.ts`) served through RTK Query with simulated latency. No router or tests. Git repo on branch `main`.

## Architecture

Data flow: React components → RTK Query endpoints → `getMockBaseFn` base query → `DBMock` singleton (in-memory "database").

- `src/store/store.ts` — `configureStore` combining `conversationApi`, `messageApi`, and the `ui` slice.
- `src/store/conversations.api.ts` — RTK Query: `getConversations(userId)` query + `markAsRead` mutation; `tagTypes: ["conversation"]` used to invalidate/refetch the list when messages change.
- `src/store/messages.api.ts` — RTK Query: `getMessages(conversationId)` query + `sendMessage` mutation. `sendMessage` optimistically appends the new message to the `getMessages` cache and invalidates the conversation tags.
- `src/store/ui.slice.ts` — holds `activeConversationId`; auto-selects the first conversation when `getConversations` fulfills (guarded against an empty result).
- `src/store/simulation.ts` — `startMessageSimulation()` runs a 10s interval in `App.tsx` that picks a random conversation, fetches a random comment from `https://dummyjson.com/comments/{id}`, and dispatches `sendMessage` as the peer. **Known limitation:** requires network access; an offline fetch rejects unhandled every tick.
- `src/store/store.utils.ts` — `getMockBaseFn` wraps a mock-db call, simulating a 500ms latency and translating thrown errors into RTK Query error responses.
- `src/mocks/db.mock.ts` — `DBMock` singleton. Computes conversation metadata (`lastMessage`, `name`, `color`, `otherUserId`) from `userConversations`/`users`. `sendMessage` also marks the other user's conversation as unread. Logs every call via `console.log`.
- `src/mocks/data.mock.ts` — seed data (conversations `c1`–`c3`, users `u0`–`u3`, messages, userConversations).

The current user is hardcoded as `"u0"` in several places (`App.tsx` simulation select, `ChatWindow`, `ConversationList`, `MessageComposer`, `MessageRow` `isMine`, `db.mock.ts`). There is no auth/user selection yet.

## UI & state

- **antd v6** is the UI library (`antd`). Before building components, load the repo-local skill `.agents/skills/ant-design/SKILL.md` (component selection, theming/tokens, a11y, chat UI patterns).
- **antd API lookup**: the skill's CLI workflow (`antd info`) is NOT used — `@ant-design/cli` is intentionally not installed. Read the official docs instead, via `https://ant.design/llms.txt`: per-component markdown at `https://ant.design/components/{component}.md` (e.g. `input`, `menu`, `avatar`, `layout`).
- **Redux Toolkit** (`@reduxjs/toolkit`) + **react-redux** for global state, with RTK Query for all data fetching.
- Components live in `src/components/chat/`: `ConversationList` (antd `Menu` sidebar with avatars/unread dot), `ChatWindow` (header + message list + auto `markAsRead`), `MessageRow` (mine/other bubbles), `MessageComposer` (autosize `TextArea` + send button; Enter sends, Shift+Enter newline).

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

When architecture, the tech stack, or any convention you rely on changes (e.g. swapping the mock DB for a real backend, adding a router/auth, or switching an API lookup source such as the antd CLI vs `llms.txt`), update this file so future sessions don't act on stale assumptions.