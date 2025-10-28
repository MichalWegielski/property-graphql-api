# property-graphql-api

Minimal GraphQL API (Node.js + TypeScript + Apollo Server + Prisma/SQLite)

## Dev-only quick start

1. Install deps

```
npm install
```

2. Create .env

```
DATABASE_URL="file:./dev.db"
WEATHERSTACK_KEY=YOUR_KEY
```

3. Init local DB (SQLite)

```
npx prisma db push --skip-generate
```

4. Run the server

```
npm run dev
```

Open http://localhost:4000 and run:

```
query { health }
```
