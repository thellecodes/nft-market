import React, { Component } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Avvvatars from "avvvatars-react";
import Image from "next/image";
import { Link } from "../routes";
import { ArrowRightIcon } from "@heroicons/react/solid";

/* Images */
import Logo from "../images/logo.png";
import NFTImg from "../images/MaleSpanish.png";
import NFTOne from "../images/ZimbabweFemale.png";
import NFTThree from "../images/UkraineFemale.png";

import Heart from "../images/heart.svg";

class Authors extends Component {
  state = {
    auctions: [
      {
        id: 1,
        imageURI: NFTOne,
      },
      {
        id: 2,
        imageURI: NFTImg,
      },
      {
        id: 3,
        imageURI: NFTThree,
      },
    ],
  };

  AuthorCard = ({ id, imageURI }) => (
    <SwiperSlide key={id} className="border-2 border-black p-5">
      <div className="mb-10 flex">
        <div className="w-3/4 flex items-center">
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

        <div className="grid gap-5 grid-cols-2 w-1/4">
          <div className="flex items-center h-10">
            <Avvvatars value="Avatar" size={35} />
          </div>

          <div className="flex flex-col items-center h-10">
            <Image src={Heart} className="w-full" />
            <span className="block text-sm">4k</span>
          </div>
        </div>
      </div>

      <div className="">
        <div class="grid">
          <div class="overflow-hidden h-300">
            <Image src={imageURI} alt="dasf" className="w-full h-full" />
          </div>

          <div class="grid grid-cols-3 gap-2">
            <div className="h-30 overflow-hidden">
              <Image src={imageURI} alt="dasf" className="w-full h-full" />
            </div>
            <div>
              <Image src={imageURI} alt="dasf" className="w-full h-full" />
            </div>
            <div>
              <Image src={imageURI} alt="dasf" className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-5">
        <div>
          <Link href="/">
            <a className="text-xl font-bold lg:text-base whitespace-nowrap">
              Vector Abstract character
            </a>
          </Link>
        </div>
        <div className="flex items-center justify-end">
          <Link href="">
            <a>
              <ArrowRightIcon className="h-5 w-5 text-black-500 fill-current" />
            </a>
          </Link>
        </div>
      </div>
    </SwiperSlide>
  );

  componentDidMount() {}

  render() {
    return (
      <section id="authors" className="mb-40">
        <div className="nft-container px-5 md:px-16 pt-20">
          <div className="grid lg:grid-cols-2 mb-10">
            <div>
              <h1 className="font-bold text-3xl lg:text-8xl">Authors</h1>
            </div>

            <div className="flex items-center justify-end">
              <div className="author-desc text-lg my-5">
                Discover the best nft collections in the world on our site
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
          >
            {this.state.auctions.map(({ id, imageURI }) =>
              this.AuthorCard({ id, imageURI })
            )}
          </Swiper>

          <div className="flex mt-10">
            <div className="w-3/4"></div>

            <div className="w-1/4">
              <div className="grid grid-cols-2 gap-2">
                <div className="h-20 border-2 border-black text-3xl font-bold flex justify-center items-center cursor-pointer">{`<`}</div>
                <div className="h-20  bg-black text-white font-bold text-3xl flex justify-center items-center cursor-pointer">{`>`}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Authors;
