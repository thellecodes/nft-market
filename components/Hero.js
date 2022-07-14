import React, { useEffect } from "react";
import { Link } from "../routes";
import Image from "next/image";
import { ethers } from "ethers";
import NFTCollection from "../contracts/NFTCollection.json";

/*Images*/
import Logo from "../images/logo.png";
import Ekolance from "../images/eko.jpeg";
import Binance from "../images/binance.svg";
import Kucoin from "../images/kucoin.svg";
import NFTImg from "../images/MaleJapanese.png";

const Hero = () => {
  const { abi: nftAbi } = NFTCollection;
  // const contractAddress = "0x8AE0a53007aA0b4c90cf2AB113c4965BDe9f69dd";
  // const Auction = new ethers.Contract(contractAddress, nftAbi, signer);

  const getAuctions = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAuctions();
  }, []);

  return (
    <section id="hero" className="mb-40">
      <div className="nft-container px-5 md:px-16 pt-20">
        <div className="grid grid-cols-1 gap-16  md:grid-cols-2 lg:flex">
          <div className="hero-data md:flex md:flex-col md:justify-center  lg:w-2/4">
            <h1 className="font-bold text-6xl capitalize md:text-left md:text-7xl md:mb-10">
              Discover Rare <span className="md:block">collections of</span>
              Arts & NFTS
            </h1>

            <span className="block mt-7 lg:text-4xl md:mb-5">
              Digital marketplace for crypto collections and non-fungible tokens{" "}
              <span className="font-bold">NFTS</span>
            </span>

            <div className="mt-7">
              <Link href="/marketplace">
                <a className="discover-link lg:text-3xl">Discover Artwork</a>
              </Link>
            </div>

            <div className="hero-support mt-16 grid grid-cols-2">
              <div className="lg:text-2xl">Supported by</div>
              <div className="grid grid-cols-3">
                <div className="h-8 w-8">
                  <Image src={Ekolance} alt="Picture of the author" />
                </div>
                <div className="h-8 w-8">
                  <Image src={Kucoin} alt="Picture of the author" />
                </div>
                <div className="h-8 w-8">
                  <Image src={Binance} alt="Picture of the author" />
                </div>
              </div>
            </div>
          </div>

          {/* spaced */}
          <div className="hero-auction-data lg:flex lg:w-2/4 md:pl-2">
            {/* hero auction */}
            <div className="grid border-black border-2 p-5 lg:w-3/4">
              <div className="grid grid-cols-2 mb-10">
                <div className="flex items-center">
                  <div className="w-5 h-7">
                    <Image src={Logo} className="w-full" />
                  </div>

                  <div className="inline">
                    <Link href="">
                      <a className="ml-2">
                        <span className="title">Monkey Icon</span>
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <Link href="/profile">
                    <a className="">@MarkRise</a>
                  </Link>
                </div>
              </div>

              <Link href="/">
                <a>
                  <div className="h-300 overflow-hidden">
                    <Image src={NFTImg} alt="dasf" className="w-full" />
                  </div>
                </a>
              </Link>

              <div className="grid grid-cols-2 mt-5">
                <div className="time-price">
                  <span className="text-2xl"> 20h:35m:08s</span>
                  <span className="block">Remaining Time</span>
                </div>

                <div className="text-right">
                  <span className="font-bold text-2xl">15.97ETH</span>
                  <span className="block">Hightest bid</span>
                </div>
              </div>
            </div>

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
  );
};

export default Hero;
