# Quest Builder Backend

Backend API for **Quest Builder** — handles authentication, quests, story nodes, edges, and token refresh flow.

## Tech Stack

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Zod
- JWT authentication

## Getting Started

```bash
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

## Available Scripts

```bash
pnpm run dev
```

Starts the development server.

```bash
pnpm build
```

Builds the backend.

```bash
pnpm start
```

Runs the compiled production build.

```bash
pnpm lint
```

Runs ESLint.

## Project Structure

```txt
src/
  modules/      Feature modules: auth, quest, node, edge, token
  shared/       Shared config, helpers, middleware, errors, libs
  types/        Global TypeScript types
  app.ts        Express app setup
  server.ts     Server entry point
prisma/
  schema.prisma Prisma schema
```

## API Areas

- Auth: register, login, logout, refresh, current user
- Quests: create, read, update, delete
- Nodes: create, update, delete, set start node
- Edges: create and delete connections between nodes

## Production Notes

- Auth tokens are stored in HTTP-only cookies.
- Request validation is handled with Zod.
- API errors use a unified error response format.
- Prisma is used for database access.