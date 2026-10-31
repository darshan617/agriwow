import React from "react";
import dynamic from "next/dynamic";
import Layout from "../layout/Layout";
import Marquee from "@/components/home/components/marquee/Marquee";
import Detail from "@/components/home/components/detail/Detail";
import Benefit from "@/components/home/components/benifit/Benefit";
import ExclusiveDeal from "@/components/home/components/deal/ExclusiveDeal";
import Solution from "@/components/home/components/solution/Solution";
import TopBannerShimmer from "@/components/layout/top-banner/TopBannerShimmer";
import homeBannerStyles from "@/components/home/components/banner/home-banner/HomeBanner.module.css";
import { useGetHomeDataQuery } from "@/redux/apis/homeApi";
import { useEffect, useRef } from "react";
import { trackViewItemList } from "@/utils/gtm";

const DynamicTopBanner = dynamic(
  () => import("@/components/layout/top-banner/TopBanner"),
  { ssr: true, loading: () => <TopBannerShimmer /> },
);
const DynamicHomeBanner = dynamic(
  () => import("@/components/home/components/banner/home-banner/HomeBanner"),
  {
    ssr: true,
    loading: () => (
      <div className={`${homeBannerStyles.bannerShimmer} shimmerEffect`} />
    ),
  },
);
const DynamicFarmEquipments = dynamic(
  () => import("@/components/home/components/farm-equipmemts/FarmEquipments"),
);
const DynamicIndustrialProduct = dynamic(
  () =>
    import("@/components/home/components/industrial-product/IndustrialProduct"),
);
const DynamicGardenTool = dynamic(
  () => import("@/components/home/components/garden-tool/GardenTool"),
);
const DynamicPostHarvest = dynamic(
  () => import("@/components/home/components/post-harvast/PostHarvest"),
);
const DynamicFoogingMachine = dynamic(
  () => import("@/components/home/components/fooging-machine/FoogingMachine"),
);
const DynamicBestSelling = dynamic(
  () => import("@/components/home/components/best-selling/BestSelling"),
);
const DynamicTopRating = dynamic(
  () => import("@/components/home/components/top-rating/TopRating"),
);
const DynamicVideoSection = dynamic(
  () => import("@/components/home/components/video/VideoSection"),
);
const DynamicInsightsBlog = dynamic(
  () => import("@/components/home/components/insights/InsightsBlog"),
);
const DynamicProductsItem = dynamic(
  () => import("@/common-components/products/ProductsItem"),
);

const HomeComponents = () => {
  const { data: homeData, isLoading: isHomeDataLoading } =
    useGetHomeDataQuery(undefined);

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
  const banners = homeData?.data?.banners;
  const firedLists = useRef(new Set());
  const sendViewItemList = (listName, products) => {
    if (!products?.length) return;
    if (firedLists.current.has(listName)) return;

    firedLists.current.add(listName);
    trackViewItemList(listName, products);
  };
  useEffect(() => {
    sendViewItemList("Best Selling", bestSellingData);
    sendViewItemList("Agriculture Sprayers", agricultureProductsData);
    sendViewItemList("Farm Equipments", farmEquipmentsData);
    sendViewItemList("Industrial Products", industrialProductsData);
    sendViewItemList("Garden Tools", gardeningToolsData);
    sendViewItemList("Post Harvest", postHarvestData);
    sendViewItemList("Fogging Machines", foogingMachineData);
    sendViewItemList("Top Rated", topRatedData);
  }, [
    bestSellingData,
    agricultureProductsData,
    farmEquipmentsData,
    industrialProductsData,
    gardeningToolsData,
    postHarvestData,
    foogingMachineData,
    topRatedData,
  ]);
  return (
    <Layout>
      <DynamicTopBanner categoriesData={categoriesData} />
      <DynamicHomeBanner />
      <Marquee />
      <DynamicBestSelling
        bestSellingData={bestSellingData}
        bannerImageUrl={
          banners?.best_selling?.image_url || banners?.best_selling?.image
        }
        viewAllLink={`/best-seller`}
        bannersLink={`/best-seller`}
        isHomeDataLoading={isHomeDataLoading || !homeData}
        type="bestSelling"
      />
      <Detail />

      <DynamicProductsItem
        agricultureProductsData={agricultureProductsData}
        title="Agriculture Sprayers"
        bannerTitle="Power Sprayer"
        bannerDescription={
          <>
            Performance <br /> That Grows With You
          </>
        }
        bannersLink={banners?.agriculture_sprayers}
        isHomeDataLoading={isHomeDataLoading || !homeData}
      />
      <DynamicFarmEquipments
        farmEquipmentsData={farmEquipmentsData}
        categoriesData={categoriesData}
        viewAllLink="/product-category/farm-mechanization-equipments"
        bannersLink={banners?.farm_mechanization_equipments}
        isHomeDataLoading={isHomeDataLoading || !homeData}
      />
      <Benefit />
      <DynamicIndustrialProduct
        industrialProductsData={industrialProductsData}
        viewAllLink="/product-category/industrial-products"
        bannersLink={banners?.industrial_products}
        isHomeDataLoading={isHomeDataLoading || !homeData}
      />
      <Solution bannersLink={banners?.pay_online_save_more} />
      <DynamicGardenTool
        gardeningToolsData={gardeningToolsData}
        viewAllLink="/product-category/garden-tools"
        bannersLink={banners?.garden_tools}
        isHomeDataLoading={isHomeDataLoading || !homeData}
      />
      <DynamicPostHarvest
        postHarvestData={postHarvestData}
        viewAllLink="/product-category/post-harvest"
        bannersLink={banners?.post_harvest}
        isHomeDataLoading={isHomeDataLoading || !homeData}
      />
      <DynamicFoogingMachine
        foogingMachineData={foogingMachineData}
        viewAllLink="/product-category/fogging-machines"
        bannersLink={banners?.fogging_machines}
        isHomeDataLoading={isHomeDataLoading || !homeData}
      />

      <ExclusiveDeal bannersLink={banners?.exclusive_deals} />
      <DynamicTopRating
        topRatedData={topRatedData}
        viewAllLink="/product-category/top-rating"
        bannersLink={banners?.top_rating}
        isHomeDataLoading={isHomeDataLoading || !homeData}
      />
      <DynamicVideoSection />
      <DynamicInsightsBlog
        insightsBlogData={insightsBlogData}
        isHomeDataLoading={isHomeDataLoading || !homeData}
      />
    </Layout>
  );
};

export default HomeComponents;
