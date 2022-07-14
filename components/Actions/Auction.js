import React from "react";
import { Link } from "../../routes";
import Avvvatars from "avvvatars-react";
import { ExternalLinkIcon } from "@heroicons/react/solid";

const Auction = () => {
  return (
    <div className="flex bg-white mb-5 p-2 rounded my-2">
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
      <div className="basis-1/2 flex items-center justify-end">
        <Link href="/">
          <a className="inline-flex items-center">
            <span className="mr-5 font-bold">0.20 ETH</span>
            <ExternalLinkIcon className="h-5 w-5 text-black-500 fill-current" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Auction;
