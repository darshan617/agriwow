import Head from "next/head";
import HomeComponents from "@/components/home/HomeComponents";

export default function Home() {

return (
    <>
      <Head>
        <title>AgriWow</title>
        <meta name="description" content="AgriWow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeComponents />
    </>
  );
}
