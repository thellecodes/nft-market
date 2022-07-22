import Image from "next/image";
import { Link } from "../../routes";
import Logo from "../../images/logo.png";
import { useQuery } from "@apollo/client";
import { TOKENS } from "../../lib/queries";
import { useEffect, useState } from "react";

const AuctionCard = ({ data }) => {
  const [auction, setAuction] = useState(null);

  useEffect(() => {
    if (data) {
      const { tokens } = data;
      // const rndNumber = Math.floor(Math.random() * tokens.length - 1);
      const auctions = tokens.filter((token) => token.inAuction);
      setAuction(auctions[1]);
    }
  }, [data]);

  return (
    <>
      <div className="grid border-black border-2 p-5 lg:w-3/4">
        <div className="grid grid-cols-2 mb-10">
          <div className="flex items-center">
            <div className="w-5 h-7">
              <Image src={Logo} className="w-full" />
            </div>

            <div className="inline">
              <Link href="">
                <a className="ml-2">
                  <span className="title">{auction ? auction.title : ""}</span>
                </a>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Link href={`/profile/${auction ? auction.owner : ""}`}>
              <a>@{auction ? auction.owner.substring(0, 5) : ""}</a>
            </Link>
          </div>
        </div>

        <Link href={`/details?tokenId=${auction ? auction.tokenId : ""}`}>
          <a>
            <div className="h-80 overflow-hidden">
              <Image
                className="w-full"
                src={`https://gateway.pinata.cloud/ipfs/${
                  auction ? auction.cid : ""
                }`}
                alt={auction ? auction.title : ""}
                width="350px"
                height="350px"
                layout="responsive" // layout="fill", layout="intrinsic"
              />
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
    </>
  );
};

export default AuctionCard;
