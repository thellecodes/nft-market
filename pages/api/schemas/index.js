import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    id: ID
    username: String
    walletAddress: String!
    avatar_url: String
    registeredAt: String
  }

  type NFT {
    title: String!
    description: String!
    keyworkds: String!
    videoUrl: String!
    collection: String
    userWallet: String!
    userId: String!
  }

  type Query {
    getUsers: [User]
    getUser(walletAddress: String!): User
  }
`;
