import { useEffect, useState } from "react";
import NFTThree from "../images/UkraineFemale.png";
import Avvvatars from "avvvatars-react";
import Image from "next/image";
import { Link } from "../routes";
import { useRouter } from "next/router";
import { GET_TOKEN } from "../lib/queries";
import { useLazyQuery } from "@apollo/client";
import Loading from "../components/Loading";
import { isUnlocked } from "../utils/helpers";
import { ethers } from "ethers";
import Head from "next/head";
import { Router } from "../routes";
import ErrorMsg from "../components/Errormsg";
import Layout from "../components/Layout";

const Bid = () => {
  const [price, setPrice] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [alert, setAlert] = useState(false);
  const [onbid, setOnBid] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [lastBidPrice, setLastBidPrice] = useState(false);
  const router = useRouter();
  const { tokenId } = router.query;

  const [getToken, { data, loading }] = useLazyQuery(GET_TOKEN);

  useEffect(() => {
    getToken({ variables: { tokenId } }); // get token from db
    getWalletBalance();
    getTokenBalance();
  }, [router]);

  const getTokenBalance = async () => {
    const { NFTInstance } = await isUnlocked();
    if (tokenId) {
      const tokenBalance = await NFTInstance.tokenBalance(tokenId);
      const balance = ethers.utils.formatEther(tokenBalance); // convert the price to a bignumber
      setLastBidPrice(balance);
    }
  };

  const getWalletBalance = async () => {
    const { provider, accounts } = await isUnlocked();
    const myBalance = await provider.getBalance(accounts[0]);
    const balance = ethers.utils.formatEther(myBalance).substring(0, 4); // convert the price to a bignumber
    setWalletBalance(balance);
  };

  const onSetBidPrice = (e) => {
    const price = e.target.value;
    if (!Number(price)) return;
    setPrice(price);
  };

  const onSubmit = async () => {
    if (!price) return setAlert(true);
    const { NFTInstance, accounts } = await isUnlocked();
    setOnBid(true);
    setAlert(false);
    const _tokenId = parseInt(tokenId);
    const { owner } = await NFTInstance.Exchange(tokenId);

    if (owner == accounts) {
      setOnBid(false);
      return setErrorMsg("You own this nft");
    }

    try {
      const _price = ethers.utils.parseUnits(price, 18); // convert the price to a bignumber
      const trx = await NFTInstance.bidNFT(_tokenId, _price, { value: _price }); // list our nft
      await trx.wait(); // wait for block confirmation
      Router.push({ pathname: "/details", query: { tokenId } });
    } catch (e) {
      setOnBid(false);
    }
  };

  if (loading && !walletBalance) return <Loading />;

  return (
    <Layout>
      <Head>
        <title>{data ? data.getToken.title.toUpperCase() + " Nft" : ""} </title>
      </Head>
      {data ? (
        <section id="bid" className="lg:h-screen">
          <div className="nft-container p-5">
            <div className="bid-container">
              <div className="pt-5 lg:pt-20 md:flex">
                <div className="w-full md:w-2/3 md:px-5">
                  <div className="bg-white px-5 md:px-20 py-20">
                    <div className="flex">
                      <div className="w-1/2">
                        <h1 className="font-bold text-2xl mb-16 capitalize">
                          Place a Bid for {data.getToken.title}
                        </h1>
                      </div>
                      <div className="w-1/2 flex items-center justify-end">
                        <h6 className="font-bold text-sm mb-16 capitalize">
                          Current Price: {lastBidPrice}ETH
                        </h6>
                      </div>
                    </div>

                    <p className="mb-16 font-bold text-sm">
                      Once your bid is placed, you will be the hightest bidder
                      in the auction, and the owner have to accept the offer for
                      you to gain the nft``
                    </p>

                    {errorMsg ? <ErrorMsg msg={errorMsg} /> : null}

                    <div className="bg-gray-800 mb-16">
                      <input
                        className={`appearance-none bg-gray-200 text-gray-700 leading-tight focus:bg-white focus:outline-gray-400 py-3 px-4 w-4/5 ${onbid}
                       ${alert ? "border-red-700 border-2" : ""}
                      `}
                        onChange={onSetBidPrice}
                        disabled={onbid}
                      />
                      <div className="inline-block text-center w-1/5">
                        <span className="font-bold text-white text-2xl">
                          ETH
                        </span>
                      </div>
                    </div>

                    <div className="w-full flex flex-row mb-16">
                      <div className="font-bold text-xl md:text-3xl basis-1/2">
                        Available Balance
                      </div>
                      <div className="font-bold text-xl md:text-3xl basis-1/2 text-end">
                        {walletBalance}ETH
                      </div>
                    </div>

                    <button
                      disabled={onbid}
                      className={`bg-gray-800 block w-full mt-5 hover:bg-gray-500 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded
                            text-xl md:text-2xl capitalize`}
                      onClick={onSubmit}
                    >
                      {onbid ? (
                        <svg
                          role="status"
                          className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="#1C64F2"
                          />
                        </svg>
                      ) : null}
                      {onbid ? "Bidding" : "Bid Now"}
                    </button>
                  </div>
                </div>
                <div className="w-full md:w-1/3">
                  <div className="bg-white px-5 py-20">
                    <div className="overflow-hidden shadow-lg">
                      <img
                        className="w-full"
                        src={`https://gateway.pinata.cloud/ipfs/${data.getToken.cid}`}
                        alt={data.getToken.title}
                      />
                      <div className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="mr-4">
                            <Avvvatars value="Avatar" size={40} />
                          </div>
                          <div className="text-sm">
                            <Link href={`/profile/${data.getToken.owner}`}>
                              <a>
                                <p className="text-gray-900 leading-none">
                                  {data.getToken.owner.substring(0, 6) + "..."}
                                </p>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </Layout>
  );
};

export default Bid;
