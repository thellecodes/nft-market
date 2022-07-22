import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../images/logo.png";
import Link from "next/link";
import { isUnlocked } from "../utils/helpers";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [connected, setConnected] = useState(false);

  const onClick = () => {
    setToggle((toggle) => !toggle);
  };

  const detconnect = async () => {
    const { accounts } = await isUnlocked();
    if (accounts.length > 0) return setConnected(true);
  };

  useEffect(() => {
    detconnect();
  }, []);

  return (
    <header className="py-3 px-3 bg-white">
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto">
          <Link href="/" className="flex items-center">
            <a>
              <Image
                src={Logo}
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
            </a>
          </Link>
          <div className="flex md:order-2">
            {!connected ? (
              <Link href="/connect">
                <a>
                  <button
                    type="button"
                    className="text-white bg-black focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-3 md:mr-0 text-center"
                  >
                    Connect
                  </button>
                </a>
              </Link>
            ) : null}
            <button
              {...{ onClick }}
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={`${
              !toggle ? "hidden" : ""
            } justify-between items-center w-full md:flex md:w-auto md:order-1`}
            id="navbar-cta"
          >
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <Link href="/upload">
                  <a className="block py-2 pr-4 pl-3 text-white bg-black rounded md:bg-transparent md:text-black md:p-0 dark:text-white">
                    Trade
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/marketplace">
                  <a className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                    Markeplace
                  </a>
                </Link>
              </li>
              <li>
                <Link href="#howto">
                  <a className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                    How It Works
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
