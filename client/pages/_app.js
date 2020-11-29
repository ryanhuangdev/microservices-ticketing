import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import buildClient from "../api/build-client";
import Header from "../components/header";

const App = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

App.getInitialProps = async (context) => {
  const client = buildClient(context.ctx);
  const { data } = await client.get("/api/users/currentuser");

  let pageProps = {};
  if (context.Component.getInitialProps) {
    pageProps = await context.Component.getInitialProps(context.ctx);
  }

  return {
    pageProps,
    ...data,
  };
};

export default App;
