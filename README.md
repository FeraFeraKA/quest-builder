# Quest Builder

Quest Builder is a fullstack web application for creating interactive branching
quests.  
Users can visually build story flows as node graphs, connect paths, choose a
starting node, and playtest quests directly in the browser.

## Status

MVP Released - **v0.1.0**

Core functionality is implemented and fully usable.  
The project is currently in active development and planned for further
improvements.

---

## Features

### Authentication

- User registration
- User login / logout
- Protected routes
- Token refresh flow

### Quest Management

- Create quests
- Edit quests
- Delete quests
- View personal quest list

### Visual Quest Editor

- Create story nodes
- Edit nodes
- Delete nodes
- Connect nodes with edges
- Select start node
- Graph-based quest structure

### Playtest Mode

- Start quest from selected node
- Navigate through quest flow
- Test branching logic directly in browser

---

## Tech Stack

### Frontend

- React
- TypeScript
- React Router
- React Flow
- TanStack Query
- Tailwind CSS

### Backend

- Node.js
- Express
- Zod

### Database

- Prisma ORM
- PostgreSQL

---

## Screenshots

_Will be here later_

---

## Getting Started

### Run frontend and backend in separate terminals.

### Clone repository

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

Create `.env` file inside `backend/`:

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

## Planned for v1.0

- Improved UI / UX
- Cleaner navigation flow
- Performance improvements
- Better responsive layout
- Codebase cleanup and optimization

---

## Known Issues

- Duplicate auth requests may occur on first load for unauthorized users
- Refresh flow requires optimization
- Some editor interactions still need polish
- Delete nodes (desktop only for now)

---

## Roadmap

### v0.1.0 - MVP release

- Core functionality completed

### v1.0.0 - polished release

- Improved UI / UX
- Internationalization
- Full mobile responsiveness
- Remove unnecessary pages

### v1.1.0 - guest access

- Users can play any quest via link without registration

### v1.2.0 - items system

- Add items
- Add item-based choice conditions
