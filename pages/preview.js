import React, { useEffect, useState } from "react";
import Avvvatars from "avvvatars-react";
import { Link } from "../routes";
import Image from "next/image";
import Loading from "../components/Loading";
import { ethers } from "ethers";
import { isUnlocked } from "../utils/helpers";
import { Router } from "../routes";
import Head from "next/head";
import { AUCTION_TOKEN, GET_TOKEN, LIST_TOKEN } from "../lib/queries";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const Preview = () => {
  const router = useRouter();
  const { tokenId } = router.query;
  const [listingPrice, setListingPrice] = useState("");
  const [listAlert, setListAlert] = useState(false);
  const [auctionAlert, setAuctionAlert] = useState(false);
  const [listing, setListing] = useState(false);
  const [auctionPrice, setAuctionPrice] = useState(false);
  const [getToken, { data, loading }] = useLazyQuery(GET_TOKEN);
  const [listToken] = useMutation(LIST_TOKEN);
  const [auctionToken] = useMutation(AUCTION_TOKEN);

  useEffect(() => {
    getToken({ variables: { tokenId } }).then((res) => {
      if (!res.data) {
        Router.push({ pathname: "/error", msg: "NftF not found" });
      }
    }); // get token from db
  }, [router]);

  const onChange = (e) => {
    const price = e.target.value;
    if (!Number(price)) return;
    setListingPrice(price);

    setListAlert(false);
  };

  const onSetAuctionPrice = (e) => {
    const price = e.target.value;
    if (!Number(price)) return;
    setAuctionPrice(price);

    setAuctionAlert(false);
  };

  const onList = async () => {
    if (!listingPrice) return setListAlert(true);
    setListing(true);
    const { NFTInstance } = await isUnlocked();
    const price = ethers.utils.parseUnits(listingPrice, 18); // convert the price to a bignumber
    const _tokenId = parseInt(tokenId);

    try {
      const trx = await NFTInstance.listNFT(_tokenId, price, { value: price }); // list our nft
      await trx.wait(); // wait for block confirmation

      await listToken({ variables: { tokenId, price: listingPrice } }); // set listed to true

      Router.push({ pathname: "/details", query: { tokenId } });
    } catch (e) {
      console.log(e);
    }
  };

  const onAuction = async () => {
    if (!auctionPrice) return setAuctionAlert(true);
    setListing(true);

    const { NFTInstance } = await isUnlocked();
    const price = ethers.utils.parseUnits(auctionPrice, 18); // convert the price to a bignumber
    const _tokenId = parseInt(tokenId);

    try {
      const trx = await NFTInstance.auctionNFT(_tokenId, price, {
        value: price,
      }); // list our nft
      await trx.wait(); // wait for block confirmation
      await auctionToken({ variables: { tokenId } }); // add to auction

      Router.push({ pathname: "/details", query: { tokenId } });
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <Head>
        <title>{data ? data.getToken.title : null} - Preview</title>
      </Head>
      {data ? (
        <section id="details">
          <div className="nft-container px-5 lg:px-40">
            <div className="details-container py-32">
              <div className="grid md:grid-cols-2">
                <div className="pr-5">
                  <div className="bg-white">
                    <div className="overflow-hidden shadow-lg">
                      <img
                        className="w-full"
                        src={`https://gateway.pinata.cloud/ipfs/${data.getToken.cid}`}
                        alt="Sunset in the mountains"
                      />
                      <div className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="mr-4">
                            <Avvvatars value="Avatar" size={40} />
                          </div>
                          <div className="text-sm">
                            <Link href="/">
                              <a>
                                <p className="text-gray-900 leading-none">
                                  @username
                                </p>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-white rounded">
                  <div className="flex items-center mb-10">
                    <div className="basis-1/2">
                      <h1 className="font-bold">{data.getToken.title}</h1>
                    </div>
                    <div className="basis-1/2">
                      <div className="flex items-center flex-row">
                        <div className="mr-4">
                          <Avvvatars value="Avatar" size={40} />
                        </div>
                        <div className="text-sm">
                          <Link href="/">
                            <a>
                              <p className="text-gray-900 leading-none">
                                @username
                              </p>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-10">
                    <h2>Description</h2>
                    <p className="font-normal">
                      {data.getToken.description}
                      <span className="float float-right inline-block"></span>
                    </p>
                  </div>

                  <div className="flex mb-10">
                    <div className="basis-1/2">
                      <h3 className="font-bold">Date Added</h3>
                      <span className="block capitalize">oct 11, 2022</span>
                    </div>
                    <div className="basis-1/2">
                      <h3 className="font-bold">Keywords</h3>
                      <span className="block capitalize">
                        {data.getToken.keywords}
                      </span>
                    </div>
                  </div>

                  <div className="basis-1/2 font-bold text-2xl mb-10">
                    <div className="flex">
                      <div className="w-2/4">
                        <input
                          disabled={listing}
                          className={`px-3 py-3 w-full border text-sm ${
                            listAlert ? "border-red-700 border-2" : ""
                          }`}
                          placeholder="Listing price (0.98)"
                          {...{ onChange }}
                        />
                      </div>

                      <div className="w-2/4 flex justify-end">
                        <button
                          disabled={listing}
                          className="bg-gray-800 font-bold text-white py-3 px-4 text-xs whitespace-nowrap"
                          onClick={onList}
                        >
                          List My NFT
                        </button>
                      </div>
                    </div>

                    <div className="flex mt-6">
                      <div className="w-2/4">
                        <input
                          disabled={listing}
                          className={`px-3 py-3 w-full border text-sm ${
                            auctionAlert ? "border-red-700 border-2" : ""
                          }`}
                          placeholder="Auction Price"
                          onChange={onSetAuctionPrice}
                        />
                      </div>

                      <div className="w-2/4 flex justify-end">
                        <button
                          disabled={listing}
                          className="bg-gray-800 font-bold text-white py-3 px-4 text-xs whitespace-nowrap"
                          onClick={onAuction}
                        >
                          Auction this NFT
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:grid md:grid-cols-2 mt-10">
                <div className="p-5 py-20 bg-white">
                  <h2 className="mb-5 font-bold text-2xl">
                    {data.getToken.details} Details
                  </h2>
                  <hr />
                  <p className="mt-5 font-normal text-black">
                    {data.getToken.description}
                  </p>
                </div>

                <div className="pl-5"> </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default Preview;
