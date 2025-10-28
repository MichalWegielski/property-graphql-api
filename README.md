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

## GraphQL examples

Add a property (calls Weatherstack during creation):

```graphql
mutation {
  addProperty(
    city: "Fountain Hills"
    street: "15528 E Golden Eagle Blvd"
    state: "AZ"
    zipCode: "85268"
  ) {
    id
    city
    state
    zipCode
    lat
    long
  }
}
```

List with filter + sort:

```graphql
query {
  properties(filter: { city: "Fountain" }, sortByCreatedAt: desc) {
    id
    city
    createdAt
  }
}
```

Get by id:

```graphql
query ($id: ID!) {
  property(id: $id) {
    id
    city
    street
    state
    zipCode
    lat
    long
  }
}
```

Delete by id:

```graphql
mutation ($id: ID!) {
  deleteProperty(id: $id)
}
```
