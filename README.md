# property-graphql-api

A minimal GraphQL API using Node.js, TypeScript, Apollo Server and Prisma (SQLite for local dev).

## Quick start

1. Install dependencies

```
npm install
```

2. Configure environment

Create a `.env` file in the project root:

```
DATABASE_URL="file:./dev.db"
WEATHERSTACK_KEY=YOUR_KEY
```

3. Initialize the database (SQLite)

If you already have models in `prisma/schema.prisma`:

```
npx prisma migrate dev --name init
```

If there are no models yet (just create the database file):

```
npx prisma db push --skip-generate
```

4. Run in development

```
npm run dev
```

Open GraphQL endpoint at `http://localhost:4000/` and run a test query:

```
query { health }
```

5. Build and run in production

```
npm run build
npm start
```

## Useful commands

- Prisma Studio (DB browser):

```
npx prisma studio
```

- Lint and format:

```
npx eslint .
npx prettier --write .
```

## Tech stack

- Node.js + TypeScript (ESM)
- Apollo Server (GraphQL)
- Prisma ORM (SQLite locally)
- ESLint + Prettier

## Project structure

- `src/server.ts` — Apollo Server entrypoint (schema + resolvers)
- `src/lib/` — shared utilities (e.g., future `prisma` client wrapper)
- `src/modules/property/` — domain module placeholder
- `prisma/schema.prisma` — Prisma schema (data models)
- `prisma.config.ts` — Prisma CLI configuration
- `.env` — environment variables
- `tsconfig.json` — TypeScript configuration
- `package.json` — scripts and dependencies
- `.eslintrc.cjs` — ESLint configuration
- `.gitignore` — ignored files
