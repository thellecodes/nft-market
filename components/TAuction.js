import React, { Component } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Avvvatars from "avvvatars-react";
import Image from "next/image";
import { Link } from "../routes";

/* Images */
import Logo from "../images/logo.png";
import NFTImg from "../images/MaleSpanish.png";
import NFTOne from "../images/ZimbabweFemale.png";
import NFTThree from "../images/UkraineFemale.png";

import Heart from "../images/heart.svg";
import Share from "../images/share.svg";
import Loading from "./Loading";

const TAuction = ({ data }) => {
  const AuctionCard = ({ token }, key) => (
    //  cid, description, inAuction, keywords, listed, owner, title, tokenId, tokenURI,
    <>
      <div className="">
        <div className="grid grid-cols-2 mb-10">
          <div className="flex items-center">
            <div className="w-5 h-7">
              <Image src={Logo} className="w-full" />
            </div>

            <div className="inline">
              <Link href="/details">
                <a className="ml-2">
                  <span className="title">{token.title}</span>
                </a>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Link href="/">
              <a className="">@MarkRise</a>
            </Link>
          </div>
        </div>
      </div>

      <Link href={`/details?tokenId=${token.tokenId}`}>
        <a className="">
          <div className="">
            <div className="h-80 overflow-hidden relative mb-5">
              <Image
                src={`https://gateway.pinata.cloud/ipfs/${token.cid}`}
                alt="dasf"
                layout="fill"
              />
            </div>

            <div className="overflow-hidden grid grid-cols-3 text-center mb-5">
              <div className="flex items-center flex-col">
                <Avvvatars value="Avatar" size={40} />
              </div>
              <div className="flex items-center flex-col">
                <Image src={Heart} alt="dasf" />
                <span>34k</span>
              </div>
              <div className="flex items-center flex-col">
                <Image src={Share} alt="dasf" />
                <span>34k</span>
              </div>
            </div>
          </div>
        </a>
      </Link>

      <div className="grid grid-cols-2 mt-5">
        <div>
          <span className="text-2xl"> 20h:35m:08s</span>
          <span className="block text-sm">Remaining Time</span>
        </div>

        <div className="text-right">
          <span className="font-bold text-2xl">15.97ETH</span>
          <span className="block text-sm">Hightest bid</span>
        </div>
      </div>

      <Link
        href={{
          pathname: `${token.listed ? "/offer" : "/bid"}`,
          query: { tokenId: token.tokenId },
        }}
      >
        <a>
          <button className="bg-blue-500 block w-full mt-5 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            {token.listed ? "Make Offer" : "Place a Bid"}
          </button>
        </a>
      </Link>
    </>
  );

  return (
    <section id="tauction" className="mb-40">
      <div className="nft-container px-5 md:px-16 pt-20">
        <div className="py-10">
          <div className="flex">
            <div className="w-3/4">
              <h4 className="text-2xl">Trending</h4>
              <h3 className="text-2xl font-bold">Auctions</h3>
              <span className="text-sm">Enjoy the latest hot auctions</span>
            </div>

            <div className="w-1/3">
              <div className="grid grid-cols-2 gap-2">
                <div className="h-20 border-2 border-black text-3xl font-bold flex justify-center items-center cursor-pointer">{`<`}</div>
                <div className="h-20  bg-black text-white font-bold text-3xl flex justify-center items-center cursor-pointer">{`>`}</div>
              </div>
            </div>
          </div>

          <Swiper
            breakpoints={{
              541: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              769: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
            }}
            className="mt-14"
          >
            {data ? (
              data.tokens.map((token, key) => (
                <SwiperSlide className="border-2 border-black p-5" {...{ key }}>
                  <AuctionCard {...{ token }} />
                </SwiperSlide>
              ))
            ) : (
              <div className="text-center">
                <Loading />
              </div>
            )}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TAuction;
