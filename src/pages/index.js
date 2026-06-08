import { useState } from "react";
import Head from "next/head";
import HomeComponents from "@/components/home/HomeComponents";
import { storeWrapper } from "@/redux/store";
import { homeApi } from "@/redux/apis/homeApi";

export const getServerSideProps = storeWrapper.getServerSideProps(
  (store) => async () => {
    const result = await store.dispatch(
      homeApi.endpoints.getHomeData.initiate(),
    );

    return {
      props: {
        homeData: result.data || null,
      },
    };
  },
);
export default function Home({ homeData }) {
  return (
    <>
      <Head>
        <title>AgriWow</title>
        <meta name="description" content="AgriWow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeComponents homeData={homeData} />
    </>
  );
}
