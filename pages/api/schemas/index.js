import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    _id: String!
    username: String
    walletAddress: String!
    avatar_url: String
    registeredAt: String
  }

  type Token {
    tokenURI: String!
    title: String!
    description: String!
    keywords: String!
    videoUrl: String
    collection: String
    userWallet: String!
    userId: String!
  }

  type Query {
    getUsers: [User]
    getUser(walletAddress: String!): User
  }

  type Mutation {
    createToken(
      tokenURI: String!
      title: String!
      description: String!
      keywords: String
      videoUrl: String
      collection: String
      userWallet: String!
      userId: String!
    ): [NFT]
  }
`;
