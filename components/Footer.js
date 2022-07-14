import React, { Component } from "react";
import Image from "next/image";
import { Link } from "../routes";

/*Images*/
import Logo from "../images/logo2.png";

class Footer extends Component {
  render() {
    return (
      <footer id="footer" className="footer">
        <div className="nft-container px-5 md:px-16 pt-20">
          <div className="grid gap-10 py-16  lg:flex">
            <div className="lg:w-1/4">
              <div className="w-32">
                <Image src={Logo} className="w-full" />
              </div>

              <div className="text-xl py-5">
                The world's first and largest digital marketplace for crypto
                collectibles and non-fungible tokens (NFTs). Buy, sell and
                discover exclusive digital items
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:ga-5 lg:w-3/4 lg:flex lg:items-start lg:justify-end">
              <ul class="text-sm font-medium text-gray-900">
                <li class="w-full py-2 mb-5 text-4xl capitalize md:text-3xl">
                  marketplace
                </li>
                <li className="w-full text-sm mb-3">
                  <Link href="/">
                    <a className="text-black visited:text-grey-600 capitalize">
                      All NFT
                    </a>
                  </Link>
                </li>
                <li className="w-full text-sm mb-3">
                  <Link href="/">
                    <a className="text-black visited:text-grey-600 capitalize">
                      collectibles
                    </a>
                  </Link>
                </li>
                <li className="w-full text-sm mb-3">
                  <Link href="/">
                    <a className="text-black visited:text-grey-600 capitalize">
                      Photography
                    </a>
                  </Link>
                </li>
                <li className="w-full text-sm mb-3">
                  <Link href="/">
                    <a className="text-black visited:text-grey-600 capitalize">
                      Trading Cards
                    </a>
                  </Link>
                </li>
              </ul>

              <ul class="text-sm font-medium text-gray-900">
                <li class="w-full py-2 mb-5 text-4xl capitalize md:text-3xl">Statistic</li>
                <li className="w-full text-sm mb-3">
                  <Link href="/">
                    <a className="text-black visited:text-grey-600 capitalize">
                      Rankings
                    </a>
                  </Link>
                </li>
                <li className="w-full text-sm mb-3">
                  <Link href="/">
                    <a className="text-black visited:text-grey-600 capitalize">
                      Activity
                    </a>
                  </Link>
                </li>
              </ul>

              <ul class="text-sm font-medium text-gray-900">
                <li class="w-full py-2 mb-5 text-4xl capitalize md:text-3xl">Resources</li>
                <li className="w-full text-sm mb-3">
                  <Link href="/">
                    <a className="text-black visited:text-grey-600 capitalize">
                      Help Center
                    </a>
                  </Link>
                </li>
                <li className="w-full text-sm mb-3">
                  <Link href="/">
                    <a className="text-black visited:text-grey-600 capitalize">
                      Partners
                    </a>
                  </Link>
                </li>
                <li className="w-full text-sm mb-3">
                  <Link href="/">
                    <a className="text-black visited:text-grey-600 capitalize">
                      Docs
                    </a>
                  </Link>
                </li>
                <li className="w-full text-sm mb-3">
                  <Link href="/">
                    <a className="text-black visited:text-grey-600 capitalize">
                      Newsletter
                    </a>
                  </Link>
                </li>
              </ul>

              <ul class="text-sm font-medium text-gray-900">
                <li class="w-full py-2 mb-5 text-4xl capitalize md:text-3xl">Company</li>
                <li className="w-full text-sm mb-3">
                  <Link href="/">
                    <a className="text-black visited:text-grey-600 capitalize">
                      About Us
                    </a>
                  </Link>
                </li>
                <li className="w-full text-sm mb-3">
                  <Link href="/">
                    <a className="text-black visited:text-grey-600 capitalize">
                      Careers
                    </a>
                  </Link>
                </li>
                <li className="w-full text-sm mb-3">
                  <Link href="/">
                    <a className="text-black visited:text-grey-600 capitalize">
                      Contact Us
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
