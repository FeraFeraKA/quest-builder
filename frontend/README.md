# Quest Builder Frontend

Frontend for **Quest Builder** — a fullstack app for creating interactive branching quests with a visual graph editor.

## Tech Stack

- React
- TypeScript
- React Router
- React Flow
- TanStack Query
- Tailwind CSS
- i18next
- Day.js
- Vitest

## Getting Started

```bash
pnpm install
pnpm run dev
```

The app expects the backend API to be available through the configured Vite proxy / deployment setup.

## Available Scripts

```bash
pnpm run dev
```

Starts the development server.

```bash
pnpm lint
```

Runs ESLint.

```bash
pnpm test
```

Runs Vitest tests.

```bash
pnpm build
```

Builds the frontend for production.

```bash
pnpm preview
```

Previews the production build locally.

```bash
pnpm audit --prod
```

Checks production dependencies for vulnerabilities.

## Project Structure

```txt
src/
  api/          API functions and fetcher
  components/   Reusable UI and layout components
  helpers/      Shared frontend helpers
  hooks/        Custom React hooks
  i18n/         Translation files and i18n setup
  pages/        Route pages
  test/         Test setup and test files
```

## Production Checklist

Before release:

```bash
pnpm lint
pnpm test
pnpm build
pnpm audit --prod
```

## Notes

- Server state is handled with TanStack Query.
- Route-level pages are lazy-loaded to reduce the main bundle size.
- Critical UI assets are preloaded before rendering the main layout.
- Tests are written with Vitest and React Testing Library.