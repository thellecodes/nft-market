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
  query GetToken($tokenId: String!) {
    getToken(tokenId: $tokenId) {
      cid
      tokenURI
      title
      description
      keywords
      tokenId
      inAuction
      listed
      owner
    }
  }
`;

const CREATE_TOKEN = gql`
  mutation CreateToken(
    $cid: String
    $title: String
    $tokenURI: String
    $videoUrl: String
    $keywords: String
    $website: String
    $tokenId: String
    $description: String
    $owner: String
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
      owner: $owner
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
      inAuction
      owner
      listed
    }
  }
`;

const LIST_TOKEN = gql`
  mutation listToken($tokenId: String, $price: String) {
    listToken(tokenId: $tokenId, price: $price) {
      title
    }
  }
`;

const AUCTION_TOKEN = gql`
  mutation AuctionToken($tokenId: String) {
    auctionToken(tokenId: $tokenId) {
      title
    }
  }
`;

export { GET_USER, GET_TOKEN, CREATE_TOKEN, TOKENS, LIST_TOKEN, AUCTION_TOKEN };
