import React, { Component } from "react";
import Image from "next/image";
import NFTImg from "../images/MaleJapanese.png";
import { Link } from "../routes";

class Marketplace extends Component {
  render() {
    return (
      <section id="">
        <div className="nft-container px-5 lg:px-40">
          <div className="marketplace-container bg-white py-24 px-5">
            <div className="w-full md:flex items-center">
              <div className="w-full font-bold md:w-1/4 mb-2">Marketplace</div>
              <div className="w-full md:w-3/4">
                <htmlFor  className="relative block">
                  <span className="sr-only">Search</span>
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </span>
                  <input
                    className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    placeholder="Search for anything..."
                    type="text"
                    name="search"
                  />
                </htmlFor>
              </div>
            </div>

            <div className="grid md:grid-cols-3 mt-20 gap-5 md:gap-3">
              {[1, 2, 3, 4, 5, 6].map((_, key) => (
                <div className=" border-black border-2 p-5" {...{ key }}>
                  <Link href="/details">
                    <a>
                      <div className="h-48 overflow-hidden">
                        <Image src={NFTImg} alt="dasf" className="w-full" />
                      </div>
                    </a>
                  </Link>

                  <div className="mt-5">
                    <span className="font-bold text-2xl">Marketplace NFT</span>
                    <span className="block font-bold">0.29 ETH</span>
                  </div>

                  <Link href="/bid">
                    <a>
                      <button className="bg-gray-500 block w-full mt-5 hover:bg-gray-400 text-white font-bold py-1 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded">
                        Place a Bid
                      </button>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Marketplace;
