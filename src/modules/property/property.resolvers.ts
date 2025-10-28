import GraphQLJSON from "graphql-type-json";
import {
  createProperty,
  deleteProperty,
  getProperty,
  listProperties,
} from "./property.service.js";

export const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    properties: (_root: unknown, args: any) =>
      listProperties({ filter: args.filter, sort: args.sortByCreatedAt }),
    property: (_root: unknown, args: { id: string }) => getProperty(args.id),
  },
  Mutation: {
    addProperty: (
      _root: unknown,
      args: { city: string; street: string; state: string; zipCode: string }
    ) => createProperty(args),
    deleteProperty: (_root: unknown, args: { id: string }) =>
      deleteProperty(args.id),
  },
};
