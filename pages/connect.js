import React, { useState, useEffect } from "react";
import { ArrowRightIcon } from "@heroicons/react/solid";
import Metamask from "../images/mt.png";
import Image from "next/image";
import Loading from "../components/Loading";

const Connect = () => {
  const [connecting, setConnecting] = useState(false);
  const [walletAddress, setSigner] = useState("");

  const _connect = async () => {
    setConnecting(true);

    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length > 0) {
          // user structure
          let user = {
            walletAddress: accounts[0],
            registeredAt: new Date().toISOString(),
          };
          // save the post
          await fetch("/api/nft", {
            method: "POST",
            body: JSON.stringify(user),
          });

          setSigner(accounts[0]);
        }
      } catch (e) {
        // setMetaMask(false); no metamask detected
      }
      setConnecting(false);
    } else {
      try {
        const provider = new Web3.providers.HttpProvider(
          `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`
        );

        // store user
        await User({ walletAddress: signer }).save();
      } catch (e) {
        // setMetaMask(false); no metamask detected
      }
      setConnecting(false);
    }
  };

  useEffect(() => {
    if (walletAddress) {
      window.location.href = "/";
    }
  }, [walletAddress]);

  return (
    <>
      {connecting ? (
        <Loading />
      ) : (
        <section id="details">
          <div className="nft-container px-5 lg:px-40">
            <div className="join-container py-32">
              <div className="p-10 bg-white">
                <div>
                  <div className=" py-10">
                    <button
                      className={`w-full border p-2 rounded mb-6`}
                      onClick={_connect}
                      disabled={!!walletAddress}
                    >
                      <div className="flex w-full">
                        <div className="w w-3/4 flex items-center">
                          <div className="w-10">
                            <Image
                              src={Metamask}
                              alt="metamask icon"
                              className="h-full w-full"
                            />
                          </div>
                          <h2 className="ml-5 font-bold text-xl">
                            {walletAddress
                              ? "Connected"
                              : "Connect with MetaMask"}
                          </h2>
                        </div>
                        <div className="w-1/4 flex items-center justify-end">
                          <ArrowRightIcon className="h-5 w-5 text-black-500 fill-current" />
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Connect;
