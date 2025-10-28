import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { prisma } from "./lib/prisma.js";
import { typeDefs as propertyTypeDefs } from "./modules/property/property.sdl.js";
import { resolvers as propertyResolvers } from "./modules/property/property.resolvers.js";

const typeDefs = `#graphql
  type Query { health: String! }
`;

const resolvers = {
  Query: { health: () => "ok" },
};

async function main() {
  const server = new ApolloServer({
    typeDefs: [typeDefs, propertyTypeDefs],
    resolvers: [resolvers, propertyResolvers],
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async () => ({ prisma }),
  });
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at ${url}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
