# 💬 React Chat

[![Live Demo](https://img.shields.io/badge/Live_Demo-react--chat--gray.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://react-chat-gray.vercel.app/)

A full-featured chat prototype that runs **entirely in your browser** — no server required. Built with React 19, TypeScript, Vite, and Ant Design, fully wired to Redux Toolkit and RTK Query.

> [!NOTE]
> There is no real backend. Data is served from an in-memory mock database (`DBMock`) through RTK Query with simulated network latency, so the whole app runs client-side. Incoming messages are simulated every 10 seconds with random comments fetched from [dummyjson.com](https://dummyjson.com) — this requires network access (see [Known limitations](#-known-limitations)).

## 📑 Table of contents

- [Features](#-features)
- [Tech stack](#-tech-stack)
- [Getting started](#-getting-started)
- [Scripts](#-scripts)
- [Project structure](#-project-structure)
- [Architecture](#-architecture)
- [Roadmap](#-roadmap)
- [Known limitations](#-known-limitations)

## ✨ Features

- Conversation sidebar with avatars, unread indicators, and last-message previews
- Chat window with message bubbles (own vs. peer), timestamps, and auto-mark-as-read
- Message composer with auto-growing textarea (Enter to send, Shift+Enter for a new line)
- Unread badges clear when a conversation is opened
- Simulated incoming messages via `startMessageSimulation()`
- 500ms artificial latency on every mock "request"

## 🛠️ Tech stack

[![React 19](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript 6](https://img.shields.io/badge/TypeScript_6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite 8](https://img.shields.io/badge/Vite_8-9135FF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)

[![Ant Design v6](https://img.shields.io/badge/Ant_Design_v6-1677FF?style=for-the-badge&logo=antdesign&logoColor=white)](https://ant.design)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org)
[![RTK Query](https://img.shields.io/badge/RTK_Query-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/rtk-query/overview)

Under the hood, [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org) are bundled by [Vite](https://vite.dev), the UI is built with [Ant Design](https://ant.design) (`antd`, `@ant-design/icons`), and [Redux Toolkit](https://redux-toolkit.js.org) + [React Redux](https://react-redux.js.org) with **RTK Query** handle all data fetching.

## 🚀 Getting started

Requirements: [Node.js](https://nodejs.org) 20.19+ (or 22.12+) and npm.

1. Clone the repository:

   ```bash
   git clone https://github.com/julianand/react-chat.git
   cd react-chat
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

Open the printed URL in your browser. The dev server runs on port 5173 by default.

## 📜 Scripts

| Command            | Description                                     |
| ------------------ | ----------------------------------------------- |
| `npm run dev`      | Start the Vite dev server                       |
| `npm run build`    | Typecheck (`tsc -b`) + production build         |
| `npm run lint`     | Run ESLint over the whole repo                  |
| `npm run preview`  | Serve the production build locally              |

## 📁 Project structure

```
src/
├── App.tsx                      # Layout, store provider, simulation startup
├── types.ts                     # Message, Conversation, User, UserConversation
├── components/chat/
│   ├── ConversationList.tsx     # Sidebar: antd Menu with avatars/unread dots
│   ├── ChatWindow.tsx           # Header + message list + auto mark-as-read
│   ├── MessageRow.tsx           # Own/peer message bubbles
│   └── MessageComposer.tsx      # TextArea + send button
├── mocks/
│   ├── data.mock.ts             # Seed data (conversations, users, messages)
│   └── db.mock.ts               # DBMock singleton: in-memory "database"
└── store/
    ├── store.ts                 # configureStore (APIs + ui slice)
    ├── conversations.api.ts     # getConversations query + markAsRead mutation
    ├── messages.api.ts          # getMessages query + sendMessage mutation
    ├── ui.slice.ts              # activeConversationId
    ├── simulation.ts            # 10s incoming-message simulator
    └── store.utils.ts           # getMockBaseFn (500ms latency base query)
```

## 🏗️ Architecture

Data flows through a single path:

```
React components → RTK Query endpoints → getMockBaseFn → DBMock (in-memory DB)
```

- **`DBMock`** (`src/mocks/db.mock.ts`) is a singleton holding conversations, users, and messages in memory. It computes conversation metadata (`lastMessage`, `name`, `color`, `otherUserId`) on the fly and logs every call with `console.log`.
- **`getMockBaseFn`** (`src/store/store.utils.ts`) is the RTK Query base query: it awaits a 500ms timeout, invokes the mock-db function, and translates thrown errors into error responses.
- **RTK Query tags** invalidate the conversation list whenever messages change, keeping the sidebar and unread badges in sync.
- **`sendMessage`** optimistically appends the new message to the `getMessages` cache and marks the peer's conversation as unread.
- **`ui.slice`** stores the active conversation id and auto-selects the first conversation once the list loads.
- **`simulation.ts`** (`startMessageSimulation`) runs a 10s interval in `App.tsx`: it picks a random conversation, fetches a random comment from dummyjson.com, and sends it as the peer.

The current user is hardcoded as `"u0"` throughout the app; there is no authentication or user switching yet.

## 🗺️ Roadmap

- Real backend to replace the in-memory `DBMock`
- Authentication and user switching (today the current user is hardcoded as `"u0"`)
- Router for deep-linking into a specific conversation
- Test suite and CI

## ⚠️ Known limitations

- **Network dependency**: the incoming-message simulator fetches from `https://dummyjson.com`; without network access the fetch rejects and produces unhandled errors every 10s tick.
- No real backend — all data is in-memory and resets on page reload.
