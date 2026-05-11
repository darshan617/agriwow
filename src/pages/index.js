import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useGetPostsQuery } from "@/redux/apis/testApi";
import { selectUserData, setUserData } from "@/redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import TopHeader from "@/components/common-components/top-header/TopHeader";
import Header from "@/components/common-components/header/Header";
import TopBanner from "@/components/banner/top-banner/TopBanner";
import HomeBanner from "@/components/banner/home-banner/HomeBanner";
import Marquee from "@/components/marquee/Marquee";
import ProductsItem from "@/components/common-components/products/ProductsItem";
import Benefit from "@/components/benifit/Benefit";
import FarmEquipments from "@/components/farm-equipmemts/FarmEquipments";
import IndustrialProduct from "@/components/industrial-product/IndustrialProduct";
import Detail from "@/components/detail/Detail";
import Solution from "@/components/solution/Solution";
import GardenTool from "@/components/garden-tool/GardenTool";
import PostHarvest from "@/components/post-harvast/PostHarvest";
import FoogingMachine from "@/components/fooging-machine/FoogingMachine";

export default function Home() {

return (
    <>
      <Head>
        <title>AgriWow</title>
        <meta name="description" content="AgriWow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopHeader />
      <Header />
      <TopBanner />
      <HomeBanner />
      <Marquee />
      <ProductsItem />
      <Benefit />
      <FarmEquipments />
      <Detail />
      <IndustrialProduct />
      <Solution />
      <GardenTool />
      <PostHarvest />
      <FoogingMachine />
    </>
  );
}
