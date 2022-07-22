import React, { Component } from "react";
import { StopIcon } from "@heroicons/react/solid";
import Layout from "../components/Layout";

class Profile extends Component {
  render() {
    return (
      <Layout>
        <section id="details">
          <div className="nft-container px-5 lg:px-40">
            <div className="details-container py-32">
              <div className="w-full">
                <div className="float-right flex items-center justify-end">
                  <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-center">
                    <StopIcon className="h-5 w-5 text-black-500 fill-current" />
                  </button>
                </div>
              </div>
              <form className="">
                <div className="p-10 bg-white">
                  <h1 className="font-bold text-2xl mb-5">Edit Your Profile</h1>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="grid pr-5">
                      <div className="bg-white ">
                        <img
                          src={
                            "https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80"
                          }
                          className="object-scale-down h-40 w-96"
                          alt=""
                        />
                      </div>
                      <div></div>
                    </div>

                    <div className="pl-5">
                      <div>
                        <htmlFor
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          for="user_avatar"
                        >
                          Upload file
                        </htmlFor>
                        <input
                          className="block w-full text-sm text-gray-900 border py-3 px-4 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                          aria-describedby="user_avatar_help"
                          id="user_avatar"
                          type="file"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 py-10">
                    <div>
                      <h2 className="font-bold text-2xl">Enter Your details</h2>
                    </div>
                    <div>
                      <div className="mb-6">
                        <htmlFor
                          for="email"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Name
                        </htmlFor>
                        <input
                          type="email"
                          id="email"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="mb-6">
                        <htmlFor
                          for="password"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Username
                        </htmlFor>
                        <input
                          type="password"
                          id="password"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                      >
                        Submit
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
  }
}

export default Profile;
