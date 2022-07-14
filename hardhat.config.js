require("@nomiclabs/hardhat-waffle");

const ALCHEMY_API_KEY = "B29xW1rYmhE-B4I0a6OkNF0Re67f9IIG";

const GOERLI_PRIVATE_KEY = "da069b5899a255dd09978f6b66c7afb18247f79b769c2380fe8c5ea497269431";

module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
};
