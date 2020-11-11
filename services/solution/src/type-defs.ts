import { gql } from 'apollo-server-lambda';

export const typeDefs = gql`
  scalar Date

  type Item {
    id: ID!
    userId: String
    createdAt: Date
    modelNumber: String
    serialNumber: String
    dateWarrantyBegins: Date
    dateWarrantyExpires: Date
    attachment: String
  }

  type Query {
    # hello: String

    # listItems: [Item]

    allItems(
      id: String
      serialNumber: String
    ): [Item]
    
    getItem(
      id: String
      serialNumber: String
    ): Item
  }
  
  type Mutation {
    createItem(
      # userId: String
      # createdAt: Date
      # modelNumber: String
      serialNumber: String
      dateWarrantyBegins: Date
      dateWarrantyExpires: Date
      # attachment: String
    ): Item

    updateItem(
      id: String!
      # userId: String
      # createdAt: Date
      # modelNumber: String
      serialNumber: String
      dateWarrantyBegins: Date
      dateWarrantyExpires: Date
      attachment: String
    ): Item
    
    deleteItem(
      id: String!
    ): Item
  }
`;