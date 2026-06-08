import React from "react";
import TopHeader from "@/components/layout/top-header/TopHeader";
import TopBanner from "@/components/layout/top-banner/TopBanner";
import HomeBanner from "@/components/home/components/banner/home-banner/HomeBanner";
import Marquee from "@/components/home/components/marquee/Marquee";
import Benefit from "@/components/home/components/benifit/Benefit";
import FarmEquipments from "@/components/home/components/farm-equipmemts/FarmEquipments";
import Detail from "@/components/home/components/detail/Detail";
import IndustrialProduct from "@/components/home/components/industrial-product/IndustrialProduct";
import Solution from "@/components/home/components/solution/Solution";
import GardenTool from "@/components/home/components/garden-tool/GardenTool";
import PostHarvest from "@/components/home/components/post-harvast/PostHarvest";
import FoogingMachine from "@/components/home/components/fooging-machine/FoogingMachine";
import BestSelling from "@/components/home/components/best-selling/BestSelling";
import ExclusiveDeal from "@/components/home/components/deal/ExclusiveDeal";
import TopRating from "@/components/home/components/top-rating/TopRating";
import VideoSection from "@/components/home/components/video/VideoSection";
import InsightsBlog from "@/components/home/components/insights/InsightsBlog";
import Footer from "@/components/layout/footer/Footer";
import { useGetHomeDataQuery } from "@/redux/apis/homeApi";
import ProductsItem from "@/common-components/products/ProductsItem";

const HomeComponents = ({ homeData }) => {
  const categoriesData = homeData?.data?.categories;
  const agricultureProductsData =
    homeData?.data?.products?.agriculture_sprayers;
  const farmEquipmentsData = homeData?.data?.products?.farm_equipments;
  const industrialProductsData = homeData?.data?.products?.industrial_products;
  const postHarvestData = homeData?.data?.products?.post_harvest;
  const foogingMachineData = homeData?.data?.products?.fogging_machines;
  const gardeningToolsData = homeData?.data?.products?.garden_tools;
  const insightsBlogData = homeData?.data?.blogs;
  const bestSellingData = homeData?.data?.products?.best_selling;
  const topRatedData = homeData?.data?.products?.top_rated;

  return (
    <>
      <TopHeader />
      <TopBanner categoriesData={categoriesData} />
      <HomeBanner />
      <Marquee />
      <ProductsItem
        agricultureProductsData={agricultureProductsData}
        title="Agriculture Sprayers"
        bannerTitle="Power Sprayer"
        bannerDescription={
          <>
            Performance <br /> That Grows With You
          </>
        }
      />
      <Detail />
      <FarmEquipments farmEquipmentsData={farmEquipmentsData} categoriesData={categoriesData} viewAllLink="/product-category/farm-mechanization-equipments"/>
      <Benefit />
      <IndustrialProduct industrialProductsData={industrialProductsData} viewAllLink="/product-category/industrial-products"/>
      <Solution />
      <GardenTool gardeningToolsData={gardeningToolsData} viewAllLink="/product-category/garden-tools"/>
      <PostHarvest postHarvestData={postHarvestData} viewAllLink="/product-category/post-harvest"/>
      <FoogingMachine foogingMachineData={foogingMachineData} viewAllLink="/product-category/fogging-machines"/>
      <BestSelling bestSellingData={bestSellingData} viewAllLink="/product-category/best-selling"/>
      <ExclusiveDeal />
      <TopRating topRatedData={topRatedData} viewAllLink="/product-category/top-rating"/>
      <VideoSection />
      <InsightsBlog insightsBlogData={insightsBlogData} />
      <Footer />
    </>
  );
};

export default HomeComponents;
