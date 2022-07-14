// We import Chai to use its asserting functions here.
const { expect } = require("chai");

describe("NFTCollection", function () {
  let NFTCollection;
  let NFTInstance;
  let deployer;
  let addr1;

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    NFTCollection = await ethers.getContractFactory("NFTCollection");
    [deployer, addr1] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    ElectionInstance = await Election.deploy();
  });

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {});
});
