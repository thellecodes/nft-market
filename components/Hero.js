import React from "react";
import { Link } from "../routes";
import Image from "next/image";

/*Images*/
import Ekolance from "../images/eko.jpeg";

import AuctionCard from "./Home/AuctionCard";

const Hero = ({ data }) => {
  return (
    <>
      <section id="hero" className="mb-40">
        <div className="nft-container px-5 md:px-16 pt-20">
          <div className="grid grid-cols-1 gap-16  md:grid-cols-2 lg:flex">
            <div className="hero-data md:flex md:flex-col md:justify-center  lg:w-2/4">
              <h1 className="font-bold text-6xl capitalize md:text-left md:text-7xl md:mb-10">
                Discover Rare <span className="md:block">collections of</span>
                Arts & NFTS
              </h1>

              <span className="block mt-7 lg:text-4xl md:mb-5">
                Digital marketplace for crypto collections and non-fungible
                tokens <span className="font-bold">NFTS</span>
              </span>

              <div className="mt-7">
                <Link href="/marketplace">
                  <a className="discover-link lg:text-3xl">Discover Artwork</a>
                </Link>
              </div>

              <div className="hero-support mt-16 grid grid-cols-2">
                <div className="lg:text-2xl">Supported by</div>
                <div className="flex">
                  <div className="h-8 w-8 flex items-center mr-7">
                    <Link href="https://ekolance.io">
                      <a>
                        <Image src={Ekolance} alt="Ekolance" />
                      </a>
                    </Link>
                  </div>

                  <div className="h-4 w-4 flex items-center pt-3">
                    <Link href="https://sam.thelle.io">
                      <a>
                        <img
                          src="https://sam.thelle.io/images/thelle.png"
                          alt="Thelle"
                        />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* spaced */}
            <div className="hero-auction-data lg:flex lg:w-2/4 md:pl-2">
              {/* hero auction */}
              <AuctionCard {...{ data }} />

              {/* hero stats*/}
              <div className="my-10 grid lg:w-1/4">
                <div></div>
                <div className="grid grid-cols-3 text-center lg:text-end lg:grid-rows-3 lg:grid-cols-none">
                  <div className="">
                    <h4 className="font-bold text-2xl">12.1k+</h4>
                    <span className="block text-sm">Art Work</span>
                  </div>
                  <div className="hero-stats-box">
                    <h4 className="font-bold text-2xl">1.7M+</h4>
                    <span className="block text-sm">Artist</span>
                  </div>
                  <div className="hero-stats-box">
                    <h4 className="font-bold text-2xl">45k+</h4>
                    <span className="block text-sm">Auction</span>
                  </div>
                </div>
              </div>
            </div>
            {/* done */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
