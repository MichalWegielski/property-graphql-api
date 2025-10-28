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

## Manual test checklist (User Stories 1–6)

1. Query all properties

   ```graphql
   query {
     properties {
       id
       city
       state
       zipCode
       createdAt
     }
   }
   ```

2. Sort by creation date

   ```graphql
   query {
     properties(sortByCreatedAt: desc) {
       id
       createdAt
     }
   }
   ```

3. Filter by city / state / zipCode
   - City:
     ```graphql
     query {
       properties(filter: { city: "Fountain Hills" }) {
         id
         city
       }
     }
     ```
   - State:
     ```graphql
     query {
       properties(filter: { state: "AZ" }) {
         id
         state
       }
     }
     ```
   - Zip:
     ```graphql
     query {
       properties(filter: { zipCode: "85268" }) {
         id
         zipCode
       }
     }
     ```

4. Property details by id

   ```graphql
   query {
     property(id: "paste_id") {
       id
       city
       street
       state
       zipCode
       lat
       long
       weatherData
       createdAt
     }
   }
   ```

5. Add a new property (triggers Weatherstack)

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

6. Delete any property
   ```graphql
   mutation {
     deleteProperty(id: "paste_id")
   }
   ```
