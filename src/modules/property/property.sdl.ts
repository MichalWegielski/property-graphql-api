export const typeDefs = `#graphql
  scalar JSON

  type Property {
    id: ID!
    city: String!
    street: String!
    state: String!
    zipCode: String!
    lat: Float!
    long: Float!
    weatherData: JSON!
    createdAt: String!
  }

  input PropertyFilter {
    city: String
    state: String
    zipCode: String
  }

  enum SortOrder { asc desc }

  extend type Query {
    properties(filter: PropertyFilter, sortByCreatedAt: SortOrder): [Property!]!
    property(id: ID!): Property
  }

  type Mutation {
    addProperty(city: String!, street: String!, state: String!, zipCode: String!): Property!
    deleteProperty(id: ID!): Boolean!
  }
`;
