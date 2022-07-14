import React from "react";
import { Link } from "../../routes";
import Avvvatars from "avvvatars-react";
import { ExternalLinkIcon } from "@heroicons/react/solid";

const AuctionWon = () => {
  return (
    <div className="flex bg-white mb-5 p-2 rounded items-center justify-center">
      <div className="flex items-center justify-center flex-col">
        <Avvvatars value="Avatar" size={40} />
        <h5 className="font-bold mt-2">Auction won by @username</h5>
        <h6 className="inline-flex font-medium">
          Sold for 0.24ETH
          <span>
            <Link href="/">
              <a>
                <ExternalLinkIcon className="h-5 w-5 text-black-500 fill-current" />
              </a>
            </Link>
          </span>
        </h6>
        <span className="block">APr 1st 2021</span>
      </div>
    </div>
  );
};

export default AuctionWon;
