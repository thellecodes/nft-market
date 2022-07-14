import React, { Component } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import TAuction from "../components/TAuction";
import Authors from "../components/Authors";
import HowTo from "../components/HowTo";
import Subscribe from "../components/Subscribe";
import Footer from "../components/Footer";

class NftIndex extends Component {
  render() {
    return (
      <>
        <Head>
          <title>T. - Martkeplace</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <Layout>
          <Hero />
          <TAuction />
          <Authors />
          <HowTo />
          <Subscribe />
          <Footer />
        </Layout>
      </>
    );
  }
}

export default NftIndex;
