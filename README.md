# Quest Builder

Quest Builder is a fullstack web application for creating interactive branching quests.

Users can visually build story flows as node graphs, connect paths, choose a starting node, playtest quests directly in the browser, and share playable stories with others.

## Status

✅ **v1.0.0 Released**

Core functionality is implemented, polished, and ready for production use.

The project remains in active development and will continue to receive improvements and new features.

---

## Features

### Authentication

- User registration
- User login / logout
- Protected routes
- Access token refresh flow
- Auth-aware navigation

### Quest Management

- Create quests
- Edit quests
- Delete quests
- View personal quest list
- Quest creation and editing via modal windows

### Visual Quest Editor

- Create story nodes
- Edit nodes
- Delete nodes
- Connect nodes with edges
- Delete edges
- Select starting node
- Graph-based quest structure
- Optimistic updates for graph interactions

### Playtest Mode

- Start quest from the selected start node
- Navigate through branching story paths
- Test quest logic directly in the browser

### UI / UX

- Responsive layout
- Internationalization support
- Global loading states
- Optimized asset loading
- Route error and not found pages
- Improved accessibility for navigation, forms, and modals

---

## Tech Stack

### Frontend

- React
- TypeScript
- React Router
- React Flow
- TanStack Query
- Tailwind CSS
- i18next
- Day.js
- Vitest

### Backend

- Node.js
- Express
- TypeScript
- Zod
- JWT authentication

### Database

- Prisma ORM
- PostgreSQL

---

## Screenshots

Will be added later.

---

## Getting Started

Run frontend and backend in separate terminals.

### Clone Repository

```bash
git clone https://github.com/FeraFeraKA/quest-builder
cd quest-builder
```

### Frontend Setup

```bash
cd frontend
pnpm install
pnpm run dev
```

### Backend Setup

```bash
cd backend
pnpm install
pnpm run dev
```

Create a `.env` file inside `backend/`:

```env
PORT=3000
CORS_ORIGIN=http://localhost:5173

DATABASE_URL=postgresql://username:password@host:5432/dbname?sslmode=require
DATABASE_DIRECT_URL=postgresql://username:password@host:5432/dbname?sslmode=require

JWT_ACCESS_SECRET=change_me
JWT_REFRESH_SECRET=change_me
JWT_ACCESS_EXPIRES_IN=30m
JWT_REFRESH_EXPIRES_IN=14d
```

---

## Quality Checks

Run checks before creating a production build.

### Frontend

```bash
cd frontend
pnpm lint
pnpm test
pnpm build
pnpm audit --prod
```

### Backend

```bash
cd backend
pnpm lint
pnpm build
```

---

## Known Limitations

- Parallel expired-auth requests may still trigger multiple refresh attempts.
- Some advanced graph editor interactions can be improved further.
- Full end-to-end test coverage is planned for future versions.
- Screenshots and demo materials are not added yet.

---

## Roadmap

### v1.0.0 — Production Release

- Polished MVP functionality
- Improved UI / UX
- Internationalization
- Responsive layout improvements
- Optimized frontend assets
- Route error handling
- Basic frontend tests and CI

### v1.1.0 — Public Quest Sharing

- Users can play shared quests via link
- Guest access for published quests

### v1.2.0 — Items System

- Add items
- Add item-based choice conditions
- Add inventory mechanics for quests

---

## License

No license specified yet.