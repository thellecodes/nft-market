import { gql } from "@apollo/client";

// get all the transaction
const GET_USER = gql`
  query GetUser($walletAddress: String!) {
    getUser(walletAddress: $walletAddress) {
      _id
      username
      walletAddress
      avatar_url
      registeredAt
    }
  }
`;

const GET_TOKEN = gql`
  query GetToken($cid: String!) {
    getToken(cid: $cid) {
      cid
      tokenURI
      title
      description
      keywords
      tokenId
    }
  }
`;

const CREATE_TOKEN = gql`
  mutation CreateToken(
    $cid: String!
    $title: String
    $tokenURI: String
    $videoUrl: String
    $keywords: String
    $website: String
    $tokenId: String
    $description: String
  ) {
    createToken(
      cid: $cid
      title: $title
      tokenURI: $tokenURI
      videoUrl: $videoUrl
      keywords: $keywords
      website: $website
      tokenId: $tokenId
      description: $description
    ) {
      _id
      cid
      tokenId
    }
  }
`;

const TOKENS = gql`
  query Tokens {
    tokens {
      cid
      tokenURI
      title
      description
      keywords
      tokenId
    }
  }
`;

export { GET_USER, GET_TOKEN, CREATE_TOKEN, TOKENS };
