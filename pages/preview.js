import React, { Component } from "react";
import Avvvatars from "avvvatars-react";
import { Link } from "../routes";
import Image from "next/image";
import NFTThree from "../images/MuslimMan.png";
import Auction from "../components/Actions/Auction";
import AuctionWon from "../components/Actions/AuctionWon";

class Preview extends Component {
  render() {
    return (
      <section id="details">
        <div className="nft-container px-5 lg:px-40">
          <div className="details-container py-32">
            <div className="grid md:grid-cols-2">
              <div className="pr-5">
                <div className="bg-white">
                  <div class="overflow-hidden shadow-lg">
                    <Image
                      class="w-full"
                      src={NFTThree}
                      alt="Sunset in the mountains"
                    />
                    <div class="px-6 py-4">
                      <div class="flex items-center">
                        <div className="mr-4">
                          <Avvvatars value="Avatar" size={40} />
                        </div>
                        <div class="text-sm">
                          <Link href="/">
                            <a>
                              <p class="text-gray-900 leading-none">
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
                    <h1 className="font-bold">Monkey Icon</h1>
                  </div>
                  <div className="basis-1/2">
                    <div class="flex items-center flex-row">
                      <div className="mr-4">
                        <Avvvatars value="Avatar" size={40} />
                      </div>
                      <div class="text-sm">
                        <Link href="/">
                          <a>
                            <p class="text-gray-900 leading-none">@username</p>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-10">
                  <h2>Description</h2>
                  <p className="font-normal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco l
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
                    <a className="capitalize fonn-bold">Azure collection</a>
                  </Link>
                </div>

                <div className="md:flex items-center">
                  <div className="basis-1/2 font-bold text-2xl mb-10">
                    0.98ETH
                  </div>
                  <div className="basis-1/2 flex items-center">
                   <div></div>
                        <button className="bg-gray-800 font-bold text-white py-3 px-4 text-sm whitespace-nowrap">
                            List My NFT
                        </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:grid md:grid-cols-2 mt-10">
              <div className="p-5 py-20 bg-white">
                <h2 className="mb-5 font-bold text-2xl">Monkey Icon Details</h2>
                <hr />
                <p className="mt-5 font-normal text-black">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
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
    );
  }
}

export default Preview;
