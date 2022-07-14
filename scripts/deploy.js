const main = async () => {
  const NFTCollectionContract = await ethers.getContractFactory(
    "NFTCollection"
  );

  const [deployer] = await ethers.getSigners();
  const NFTInstance = await NFTCollectionContract.deploy();
  console.log(`Contract Deployed by Account %s`, deployer.address);
  console.log(`Contract Address`, NFTInstance.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => console.log(error));
