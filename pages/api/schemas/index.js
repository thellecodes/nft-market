import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    id: String
    _id: String
    username: String
    walletAddress: String!
    avatar_url: String
    registeredAt: String
  }

  type Token {
    _id: String
    cid: String
    tokenId: String
    title: String
    tokenURI: String
    description: String
    videoUrl: String
    keywords: String
    website: String
  }

  type Query {
    getUsers: [User]
    getUser(walletAddress: String!): User
    getToken(cid: String!): Token
    tokens: [Token]
  }

  type Mutation {
    createToken(
      cid: String
      tokenId: String
      title: String
      tokenURI: String
      videoUrl: String
      keywords: String
      website: String
      description: String
    ): Token
  }
`;
