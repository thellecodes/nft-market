import { ethers } from "ethers";
import NFTCollection from "../contracts/NFTCollection.json";

async function isUnlocked() {
  if (!window.ethereum) return (window.location.href = "/connect");

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  let unlocked;
  let accounts;

  try {
    accounts = await provider.listAccounts();
    unlocked = accounts.length > 0;
  } catch (e) {
    unlocked = false;
    console.log("noth");
  }

  const signer = provider.getSigner();
  const contractAbi = NFTCollection.abi;

  const NFTInstance = new ethers.Contract(
    "0xD4264b3490913391Cac07D9e5c91C8602494eA96",
    contractAbi,
    signer
  );

  return { unlocked, accounts, provider, NFTInstance };
}

export { isUnlocked };
