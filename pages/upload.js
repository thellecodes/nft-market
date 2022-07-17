import Layout from "../components/Layout";
import { useLazyQuery, useMutation } from "@apollo/client";
import { StopIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Loading from "../components/Loading";
import { GET_USER, GET_TOKEN, CREATE_TOKEN } from "../lib/queries";
import NFTCollection from "../contracts/NFTCollection.json";
import Head from "next/head";
import axios from "axios";
import { Router } from "../routes";
import { isUnlocked } from "../utils/helpers";

const Upload = () => {
  const [title, setTitle] = useState("new title");
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState("description");
  const [keywords, setKeywords] = useState("nft1, nft2");
  const [website, setWebsite] = useState("www.ekolance.io");
  const [collection] = useState("collectionname");
  const [videoUrl, setVideoUrl] = useState("www.youtube.com/thellecodes");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const [loading, setLoading] = useState(true);
  // get user by wallet addresss
  const [getUser, { data: userData, loading: userLoading }] =
    useLazyQuery(GET_USER);
  const [getToken] = useLazyQuery(GET_TOKEN);
  const [createToken] = useMutation(CREATE_TOKEN);

  useEffect(() => {
    new Promise(async () => {
      const { unlocked, accounts } = await isUnlocked();
      if (!unlocked) {
        window.location.href = "/connect";
      } else {
        // get user by wallet address
        getUser({
          variables: {
            walletAddress: accounts[0].toLowerCase(),
          },
        });
      }
    });
  }, []);

  useEffect(() => {
    if (userData) {
      setLoading(false);
    }
  }, [userData, userLoading]);

  const selectImage = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Router.pushRoute(
    //   `/upload/${`bafkreibwqk6qvgpdba4vmgboigdyhb7bsjtnkkjyh2qctntkutu6dpw2vu`}/create`
    // );

    setUploading(true);
    const { accounts } = await isUnlocked();

    // convert file into binary
    const data = new FormData();
    data.append("title", file.name);
    data.append("file", file);
    data.append("pinataOptions", '{"cidVersion": 1}');
    data.append(
      "pinataMetadata",
      '{"name": "' +
        title +
        '", "keyvalues": {"description": "' +
        description +
        '", "keywords": "' +
        keywords +
        '", "keywords": "' +
        keywords +
        '", "videoUrl": "' +
        videoUrl +
        '", "collection":"' +
        collection +
        '", "userWallet":"' +
        userData.getUser.walletAddress +
        '", "userId":"' +
        userData.getUser._id +
        '"}}'
    );

    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
    // pass binary data into post request
    const result = await axios.post(url, data, {
      maxContentLength: -1,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: process.env.pinata_api_key,
        pinata_secret_api_key: process.env.pinata_secret_api_key,
      },
    });

    const { IpfsHash } = result.data;

    if (IpfsHash) {
      // upload create token on block chain
      const { NFTInstance } = await isUnlocked();

      // contruct ipfs token uri
      const tokenURI = `ipfs://${IpfsHash}`;

      // create token
      const trx = await NFTInstance.createToken(tokenURI);
      await trx.wait();

      const myTokens = await NFTInstance.myTokens(accounts[0]);
      const getTokenURI = myTokens["tokenURI"].indexOf(tokenURI);

      const _tokenId = myTokens["userTokens"][getTokenURI];
      const tokenId = ethers.utils.formatEther(_tokenId) * 10 ** 18;

      // create a new token with cid
      await createToken({
        variables: {
          cid: IpfsHash,
          title,
          tokenURI,
          videoUrl,
          keywords,
          website,
          description,
          tokenId: tokenId.toString(),
        },
      });

      Router.pushRoute(`/upload/${IpfsHash}/create`);
    }
  };

  if (loading) return <Loading />;

  return (
    <Layout>
      <Head>
        <title>Upload NFT</title>
      </Head>
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

            <form className="w-full  mt-10" {...{ onSubmit }}>
              <div className="flex flex-wrap mb-6 flex-col-reverse lg:flex-row">
                <div className="w-full px-3">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    for="file_input"
                    htmlFor={`File Name ${fileName ? `: ${fileName}` : null}`}
                  />

                  <input
                    className="block w-full py-3 px-4 mb-6 border"
                    id="file_input"
                    type="file"
                    onChange={selectImage}
                  />

                  <div className="w-full">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-first-name"
                      htmlFor="Title *"
                    />

                    <input
                      className=" block w-full border rounded py-3 px-4 mb-3"
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Name of Your NFT"
                    />
                  </div>

                  <div className="w-full mt-10">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-first-name"
                      htmlFor="Description *"
                    />
                    <p className="text-xs italic">
                      The description will be included in the item's detail page
                    </p>

                    <div className="mb-6 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                      <div className="py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800">
                        <label
                          for="comment"
                          className="sr-only"
                          htmlFor="Awesome story about your nft art"
                        />
                        <textarea
                          id="comment"
                          rows="2"
                          className="px-0 w-full"
                          placeholder="Write a Description..."
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-first-name"
                        htmlFor="Keywords"
                      />
                      <input
                        className=" block w-full border rounded py-3 px-4 mb-3"
                        type="text"
                        onChange={(e) => setKeywords(e.target.value)}
                        placeholder="nft, ape nft"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3" disabled>
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-last-name"
                        htmlFor="Collections"
                      />
                      <select
                        disabled
                        className="py-3 px-4 pr-8 rounded shadow leading-tight"
                      >
                        <option>Select Collection</option>
                        <option>Option 3</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-first-name"
                        htmlFor="Website Url"
                      />
                      <input
                        className=" block w-full border rounded py-3 px-4 mb-3"
                        type="text"
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://www.ekolance.io"
                      />
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-first-name"
                        htmlFor="Creation Video"
                      />

                      <input
                        className=" block w-full border rounded py-3 px-4 mb-3"
                        type="text"
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="www.youtube.com/thellecodes"
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <button
                      disabled={uploading}
                      className="bg-blue-500 block w-full mt-5 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                    >
                      {uploading ? (
                        <svg
                          role="status"
                          className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="#1C64F2"
                          />
                        </svg>
                      ) : null}
                      {uploading ? "Uploading" : "Go to preiview"}
                    </button>
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

export default Upload;
