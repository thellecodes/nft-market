import React, { Component } from "react";
import { StopIcon } from "@heroicons/react/solid";
import NFTThree from "../images/UkraineFemale.png";
import Avvvatars from "avvvatars-react";
import Image from "next/image";
import { Link } from "../routes";

class Bid extends Component {
  render() {
    return (
      <section id="bid" className="lg:h-screen">
        <div className="nft-container p-5">
          <div className="bid-container">
            <div className="w-full">
              <div className="float-right flex items-center justify-end">
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-center">
                  <StopIcon className="h-5 w-5 text-black-500 fill-current" />
                </button>
              </div>
            </div>

            <div className="pt-20 md:flex">
              <div className="w-full md:w-2/3 md:px-5">
                <div className="bg-white px-5 md:px-20 py-20">
                  <h1 className="font-bold text-2xl mb-16">Place a Bid</h1>

                  <p className="mb-16 font-bold text-xl">
                    Once your bid is placed, you will be the hightest bidder in
                    the auction
                  </p>

                  <div className="bg-gray-800 mb-16">
                    <input className="appearance-none bg-gray-200 text-gray-700 leading-tight focus:bg-white focus:outline-gray-400 py-3 px-4 w-4/5" />
                    <div className="inline-block text-center w-1/5">
                      <span className="font-bold text-white text-2xl">ETH</span>
                    </div>
                  </div>

                  <div className="w-full flex flex-row mb-16">
                    <div className="font-bold text-xl md:text-3xl basis-1/2">
                      Available Balance
                    </div>
                    <div className="font-bold text-xl md:text-3xl basis-1/2 text-end">
                      0.5ETH
                    </div>
                  </div>

                  <button
                    className="bg-gray-800 block w-full mt-5 hover:bg-gray-500 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded
                            text-xl md:text-2xl capitalize"
                  >
                    You don't have enough ETH
                  </button>
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <div className="bg-white px-5 py-20">
                  <div className="overflow-hidden shadow-lg">
                    <Image
                      className="w-full"
                      src={NFTThree}
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
              <div></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Bid;
