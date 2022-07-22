import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "../styles/globals.css";
import "../css/styles.css";
import "swiper/css";

const client = new ApolloClient({
  uri: "https://nft-app-git-master-samdsg.vercel.app/api/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider {...{ client }}>
      <Component {...pageProps} />;
    </ApolloProvider>
  );
}
export default MyApp;
