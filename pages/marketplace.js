import React, { useState } from "react";
import { Link } from "../routes";
import { useQuery } from "@apollo/client";
import { TOKENS } from "../lib/queries";
import Loading from "../components/Loading";
import Head from "next/head";

const Marketplace = () => {
  const [searchString, setSearchString] = useState("");
  const { data } = useQuery(TOKENS, { variables: { searchString } });

  if (!data) return <Loading />;

  return (
    <>
      <Head>
        <title>Ekolance NFT Markeplace</title>
      </Head>
      <section id="">
        <div className="nft-container px-5 lg:px-40">
          <div className="marketplace-container bg-white py-24 px-5">
            <div className="w-full md:flex items-center">
              <div className="w-full font-bold md:w-1/4 mb-2">Marketplace</div>
              <div className="w-full md:w-3/4">
                <span className="sr-only">Search</span>

                <input
                  disabled={data && data.tokens.length === 0 ? true : false}
                  className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Search for anything..."
                  type="text"
                  name="search"
                  onChange={(e) => setSearchString(e.target.value)}
                />
              </div>
            </div>

            {data && data.tokens.length === 0 ? (
              <div className="w-full inline-flex font-bold mt-10 items-center justify-center">
                Empty Markeplace,
                <Link href="/upload">
                  <a className="text-blue-700 ml-5 text-2xl">
                    Start Trading Your NFT
                  </a>
                </Link>
              </div>
            ) : null}

            {data.tokens ? (
              <div className="grid md:grid-cols-3 mt-20 gap-5 md:gap-3">
                {data.tokens.map(
                  ({ cid, tokenId, title, inAuction, listed }, key) => (
                    <div className=" border-black border-2 p-5" {...{ key }}>
                      <Link href={`/details?tokenId=${tokenId}`}>
                        <a>
                          <div className="h-48 overflow-hidden">
                            <img
                              className="w-full"
                              src={`https://gateway.pinata.cloud/ipfs/${cid}`}
                              alt={title}
                            />
                          </div>
                        </a>
                      </Link>

                      <div className="mt-5">
                        <span className="font-bold text-2xl capitalize">
                          {title}
                        </span>
                        <span className="block font-bold">0.29 ETH</span>
                      </div>

                      <Link
                        href={{
                          pathname: `${listed ? "/offer" : "/bid"}`,
                          query: { tokenId },
                        }}
                      >
                        <a>
                          <button className="bg-gray-500 block w-full mt-5 hover:bg-gray-400 text-white font-bold py-1 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded">
                            {listed ? "Make Offer" : "Place a Bid"}
                          </button>
                        </a>
                      </Link>
                    </div>
                  )
                )}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default Marketplace;
