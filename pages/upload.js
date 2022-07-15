import Layout from "../components/Layout";
import { useLazyQuery } from "@apollo/client";
import { StopIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Loading from "../components/Loading";
import { GET_USER } from "../lib/queries";
import NFTCollection from "../contracts/NFTCollection.json";
import Head from "next/head";
import axios from "axios";

/* imports */
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

  return { unlocked, accounts, provider };
}

const Upload = () => {
  const [loading, setLoading] = useState(true);
  const [
    getUser,
    { data: userData, error: loadingUserError, loading: loadingUser },
  ] = useLazyQuery(GET_USER);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("description");
  const [keywords, setKeywords] = useState("nft1, nft2");
  const [website, setWebsite] = useState("www.ekolance.io");
  const [collection, setCollection] = useState("collectionname");
  const [videoUrl, setVideoUrl] = useState("www.youtube.com/thellecodes");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

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
    if (userData) {
      const { getUser } = userData;
      setLoading(false);
    }

    console.log(userData);
  }, [userData]);

  const selectImage = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

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
        pinata_api_key: "ea9bd76c8a4019172406",
        pinata_secret_api_key:
          "3737ce0422a7b4b5092a7aacc1c826b1b2dd520c7c8484e0c16a27b7e1344ac6",
      },
    });

    const { isDuplicate, IpfsHash, Timestamp } = result.data;

    if (IpfsHash) {
      // upload create token on block chain
      const { provider } = await isUnlocked();
      const signer = provider.getSigner();
      const contractAbi = NFTCollection.abi;

      const NFTInstance = new ethers.Contract(
        process.env.contractAddress,
        contractAbi,
        signer
      );

      const tokenURI = `ipfs://${IpfsHash}`;

      // create token
      const newToken = NFTInstance.createToken(tokenURI);

      // store data to database
      console.log(newToken);
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
                      required
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
                    <button className="bg-blue-500 block w-full mt-5 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                      Go to preview
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

Upload.getInitialProps = async ({ req }) => {
  return {};
};

export default Upload;
