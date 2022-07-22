import React, { Component } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import TAuction from "../components/TAuction";
import Authors from "../components/Authors";
import HowTo from "../components/HowTo";
import Subscribe from "../components/Subscribe";
import Footer from "../components/Footer";
import { Link } from "../routes";

import { useQuery } from "@apollo/client";
import { TOKENS } from "../lib/queries";

const NftIndex = () => {
  const { data, loading } = useQuery(TOKENS);

  if (data && data.tokens.length === 0) {
    return (
      <div className="w-full inline-flex font-bold mt-10 items-center justify-center">
        Welcome to T. Markeplace
        <Link href="/upload">
          <a className="text-blue-700 ml-5 text-2xl">Start Trading Your NFT</a>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>T. - Martkeplace</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Layout>
        <Hero {...{ data, loading }} />
        <TAuction {...{ data }} />
        <Authors />
        <HowTo />
        <Subscribe />
        <Footer />
      </Layout>
    </>
  );
};

export default NftIndex;
