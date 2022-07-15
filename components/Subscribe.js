import React, { Component } from "react";
import { Link } from "../routes";

class Subscribe extends Component {
  render() {
    return (
      <section id="subscribe" className="mb-20">
        <div className="nft-container">
          <div className="subscribe-container bg-gray-800 grid grid-cols-1 gap-5 py-10 px-5 md:grid-cols-2 mt-5 md:px-10">
            <div className="flex items-center">
              <h2 className="text-5xl md:text-3xl text-center text-white md:text-left">
                Subscribe to my Channel
              </h2>
            </div>
            <div className="pt-4 flex justify-center items-center md:justify-end">
              <Link href="https://youtube.com/thellecodes">
                <a>
                  <button className="capitalize bg-white hover:bg-white-400 text-grey font-bold py-2 px-4 border-b-4 border-white-700 hover:border-white-500">
                    thellecodes
                  </button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Subscribe;
