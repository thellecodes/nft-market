import { ethers } from "ethers";
import NFTCollection from "../contracts/NFTCollection.json";

async function isUnlocked() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  let unlocked;
  let accounts;

  try {
    accounts = await provider.listAccounts();
    unlocked = accounts.length > 0;
  } catch (e) {
    unlocked = false;
  }

  const signer = provider.getSigner();
  const contractAbi = NFTCollection.abi;

  const NFTInstance = new ethers.Contract(
    "0xe5377993d97Ef7CEEe01f42012Fa162dC5BBf3ac",
    contractAbi,
    signer
  );

  return { unlocked, accounts, provider, NFTInstance };
}

export { isUnlocked };
