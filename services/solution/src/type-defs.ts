import { gql } from 'apollo-server-lambda';

export const typeDefs = gql`

  type Query {
    hello: String
    # getItems: [Item]
  }

  # type Mutation {
  #   addItem(
  #     name: String
  #   ): Item
  # }

  # type Item {
  #   id: ID!
  #   name: String
  # }
`;