import React, { useEffect, useState } from "react";
import Avvvatars from "avvvatars-react";
import { Link } from "../routes";
import Image from "next/image";
import NFTThree from "../images/MuslimMan.png";
import Auction from "../components/Actions/Auction";
import AuctionWon from "../components/Actions/AuctionWon";
import Head from "next/head";
import { useRouter } from "next/router";
import { GET_TOKEN } from "../lib/queries";
import { useLazyQuery } from "@apollo/client";
import Loading from "../components/Loading";
import { Router } from "../routes";

const Details = () => {
  const router = useRouter();
  const { tokenId } = router.query;
  const [getToken, { data, loading, error }] = useLazyQuery(GET_TOKEN);

  // handle error
  useEffect(() => {
    getToken({ variables: { tokenId } }); // get token from db
  }, [tokenId]);

  if (!tokenId || loading) return <Loading />;

  return (
    <>
      <Head>
        <title>{data ? data.getToken.title : null} - T. Marketplace</title>
      </Head>
      <section id="details">
        <div className="nft-container px-5 lg:px-40">
          <div className="details-container py-32">
            <div className="grid md:grid-cols-2">
              <div className="pr-5">
                <div className="bg-white">
                  <div className="overflow-hidden shadow-lg">
                    <img
                      className="w-full"
                      src={`https://gateway.pinata.cloud/ipfs/${
                        data ? data.getToken.cid : ""
                      }`}
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
                    <h1 className="font-bold">
                      {data ? data.getToken.title : null}
                    </h1>
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
                    {data ? data.getToken.description : null}
                    <span className="float float-right inline-block">
                      <Link href="/">
                        <a>Read more</a>
                      </Link>
                    </span>
                  </p>
                </div>

                <div className="flex mb-10">
                  <div className="basis-1/2">
                    <h3 className="font-bold">Date Added</h3>
                    <span className="block capitalize">oct 11, 2022</span>
                  </div>
                  <div className="basis-1/2">
                    <h3 className="font-bold">Keywords</h3>
                    <span className="block capitalize">#nft, #app, #b</span>
                  </div>
                </div>

                <div className="mb-10">
                  <Link href="/">
                    <a className="capitalize fonn-bold">
                      {data ? data.getToken.collection : null}
                    </a>
                  </Link>
                </div>

                <div className="md:flex items-center">
                  <div className="basis-1/2 font-bold text-2xl mb-10">
                    0.98ETH
                  </div>
                  <div className="basis-1/2 flex items-center">
                    <Link href="/bid">
                      <a>
                        <button className="bg-gray-800 font-bold text-white py-3 px-4 whitespace-nowrap text-sm">
                          Place Bid
                        </button>
                      </a>
                    </Link>
                    <Link href="/offer">
                      <a className="ml-4">
                        <button className="bg-gray-800 font-bold text-white py-3 px-4 text-sm whitespace-nowrap">
                          Make Offer
                        </button>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:grid md:grid-cols-2 mt-10">
              <div className="p-5 py-20 bg-white">
                <h2 className="mb-5 font-bold text-2xl">Monkey Icon Details</h2>
                <hr />
                <p className="mt-5 font-normal text-black">
                  {data ? data.getToken.description : null}
                </p>
              </div>

              <div className="pl-5">
                <h2 className="mb-5 font-bold text-2xl">Provenance</h2>
                <hr />
                <Auction />
                <AuctionWon />
                <Auction />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Details;
