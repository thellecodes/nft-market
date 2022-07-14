import React, { Component } from "react";

class HowTo extends Component {
  state = {
    howto: [
      {
        id: 1,
        title: "Create your artwork",
        desc: `Click my collections and setup 
        your collection. Add social links,
        a description, profile & banner
        images`,
      },
      {
        id: 2,
        title: "Upload your NFT",
        desc: `Upload your work (images, video,
        audio, or 3D art), add a title and 
        description, and customize your
        NFTs.`,
      },
      {
        id: 3,
        title: "List them for sale",
        desc: `Choose between auctions,
            fixed-price listings, and 
            declining-pricing listings.`,
      },
    ],
  };

  render() {
    return (
      <section id="howto" className="mb-40">
        <div className="nft-container px-5 md:px-16 pt-20">
          <h2 class="text-5xl dark:text-white mb-4 font-semibold">
            How To Be Creator
          </h2>

          <div class="grid gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-20">
            {this.state.howto.map(({ id, title, desc }, key) => (
              <div class="p-8 bg-dark border border-black" {...{ key }}>
                <div class="rounded-full h-16 w-16 flex items-center justify-center text-3xl font-bold text-white mb-8 bg-black">
                  {id}
                </div>

                <div class="w-full text-2xl font-bold text-black mb-8 bg-none">
                  {title}
                </div>

                <div class="w-full text-2xl font-normal text-justify text-black mb-8 bg-none">
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default HowTo;
