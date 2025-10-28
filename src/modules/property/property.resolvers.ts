import GraphQLJSON from "graphql-type-json";
import {
  createProperty,
  deleteProperty,
  getProperty,
  listProperties,
} from "./property.service.js";
import { GraphQLError } from "graphql";

export const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    properties: async (_root: unknown, args: any) => {
      try {
        return await listProperties({
          filter: args.filter,
          sort: args.sortByCreatedAt,
        });
      } catch (_err) {
        throw new GraphQLError("Invalid filter", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
    },
    property: (_root: unknown, args: { id: string }) => getProperty(args.id),
  },
  Mutation: {
    addProperty: async (
      _root: unknown,
      args: { city: string; street: string; state: string; zipCode: string }
    ) => {
      try {
        return await createProperty(args);
      } catch (_err) {
        throw new GraphQLError("Failed to add property");
      }
    },
    deleteProperty: async (_root: unknown, args: { id: string }) => {
      try {
        return await deleteProperty(args.id);
      } catch (_err) {
        throw new GraphQLError("Failed to delete property");
      }
    },
  },
};
