import Layout from "../components/Layout";
import { useLazyQuery } from "@apollo/client";
import { StopIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Loading from "../components/Loading";
import { GET_USER } from "../lib/queries";

async function isUnlocked() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  let unlocked;
  let accounts;

  try {
    accounts = await provider.listAccounts();

    unlocked = accounts.length > 0;
  } catch (e) {
    unlocked = false;
  }

  return { unlocked, accounts };
}

const Upload = () => {
  const [loading, setLoading] = useState(true);
  const [getUser, { data, error: loadingUserError, loading: loadingUser }] =
    useLazyQuery(GET_USER);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeyworkds] = useState("");

  useEffect(() => {
    new Promise(async (req, res) => {
      const { unlocked, accounts } = await isUnlocked();
      if (!unlocked) {
        window.location.href = "/connect";
      } else {
        // get user by wallet address
        getUser({
          variables: {
            walletAddress: "0x6d0fa4b8efdd9cd94b5e963ae906099b36050062",
          },
        });
      }
    });
  }, []);

  useEffect(() => {
    if (data) {
      const { getUser } = data;
      setLoading(false);
    }
  }, [data]);

  if (loading) return <Loading />;

  return (
    <Layout>
      <section id="upload" className="h-auto">
        <div className="nft-container p-5">
          <div className="upload-container">
            <div className="flex">
              <div className="w-3/4">
                <h1 className="font-bold text-2xl">
                  Input NFT Data
                  <span className="block font-normal text-sm">
                    please fill in the fields
                  </span>
                </h1>
              </div>

              <div className="w-1/4 flex items-center justify-end">
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-center">
                  <StopIcon className="h-5 w-5 text-black-500 fill-current" />
                </button>
              </div>
            </div>

            <form className="w-full  mt-10">
              <div className="flex flex-wrap mb-6 flex-col-reverse lg:flex-row">
                <div className="w-full md:w-2/3 px-3">
                  <div className="w-full">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-first-name"
                    >
                      Title*
                    </label>

                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Jane"
                    />
                    <p class="text-red-500 text-xs italic">error text</p>
                  </div>

                  <div className="w-full mt-10">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-first-name"
                    >
                      Description
                    </label>
                    <p className="text-xs italic">
                      The description will be included in the item's detail page
                    </p>

                    <div class="mb-6 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                      <div class="py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800">
                        <label for="comment" class="sr-only">
                          Awesome story about your nft art
                        </label>
                        <textarea
                          id="comment"
                          rows="4"
                          className="px-0 w-full text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                          placeholder="Write a comment..."
                          required
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-first-name"
                      >
                        Keywords
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        type="text"
                        placeholder="ape, nft, coding"
                      />
                      <p class="text-red-500 text-xs italic">
                        Please fill out this field.
                      </p>
                    </div>
                    <div className="w-full md:w-1/2 px-3" disabled>
                      <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-last-name"
                      >
                        Collection
                      </label>
                      <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500  py-3 px-4 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option>Select Collection</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                      </select>
                    </div>
                  </div>

                  <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-first-name"
                      >
                        Your Website
                      </label>
                      <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        type="text"
                        placeholder="www.yourwebsite.com"
                      />
                      <p className="text-red-500 text-xs italic">
                        Please fill out this field.
                      </p>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-first-name"
                      >
                        Creation Video
                      </label>

                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-last-name"
                        type="text"
                        placeholder="www.youtube.com/video-url"
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <button class="bg-blue-500 block w-full mt-5 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                      Go to preview
                    </button>
                  </div>
                </div>
                <div className="w-full md:w-1/3 mb-10 px-5 py-6">
                  <div class="flex justify-center items-center w-full">
                    <label
                      for="dropzone-file"
                      class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div class="flex flex-col justify-center items-center pt-5 pb-6">
                        <svg
                          class="mb-3 w-10 h-10 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span class="font-semibold">Click to upload</span>
                          or drag and drop
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input id="dropzone-file" type="file" class="hidden" />
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

Upload.getInitialProps = async ({ req }) => {
  return {};
};

export default Upload;
