import { gql } from "@apollo/client";

// get all the transaction
const GET_USER = gql`
  query user($walletAddress: String!) {
    getUser(walletAddress: $walletAddress) {
      username
      walletAddress
      avatar_url
      registeredAt
    }
  }
`;

export { GET_USER };
