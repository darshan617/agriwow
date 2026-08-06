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
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { trackViewItemList } from "@/utils/gtm";

// Swiper + window-dependent sections stay client-only to avoid hydration
// mismatches. loading: reuses existing shimmers to reserve space (CLS).
const DynamicTopBanner = dynamic(
  () => import("@/components/layout/top-banner/TopBanner"),
  { ssr: false, loading: () => <TopBannerShimmer /> },
);
const DynamicHomeBanner = dynamic(
  () => import("@/components/home/components/banner/home-banner/HomeBanner"),
  {
    ssr: false,
    loading: () => (
      <div className={`${homeBannerStyles.bannerShimmer} shimmerEffect`} />
    ),
  },
);
const DynamicFarmEquipments = dynamic(
  () => import("@/components/home/components/farm-equipmemts/FarmEquipments"),
  { ssr: false },
);
const DynamicIndustrialProduct = dynamic(
  () =>
    import("@/components/home/components/industrial-product/IndustrialProduct"),
  { ssr: false },
);
const DynamicGardenTool = dynamic(
  () => import("@/components/home/components/garden-tool/GardenTool"),
  { ssr: false },
);
const DynamicPostHarvest = dynamic(
  () => import("@/components/home/components/post-harvast/PostHarvest"),
  { ssr: false },
);
const DynamicFoogingMachine = dynamic(
  () => import("@/components/home/components/fooging-machine/FoogingMachine"),
  { ssr: false },
);
const DynamicBestSelling = dynamic(
  () => import("@/components/home/components/best-selling/BestSelling"),
  { ssr: false },
);
const DynamicTopRating = dynamic(
  () => import("@/components/home/components/top-rating/TopRating"),
  { ssr: false },
);
const DynamicVideoSection = dynamic(
  () => import("@/components/home/components/video/VideoSection"),
  { ssr: false },
);
const DynamicInsightsBlog = dynamic(
  () => import("@/components/home/components/insights/InsightsBlog"),
  { ssr: false },
);
const DynamicProductsItem = dynamic(
  () => import("@/common-components/products/ProductsItem"),
  { ssr: false },
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
  const categories = useSelector((state) => state.category.categories);

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
        viewAllLink={`/product-category/${categories?.[0]?.slug}`}
        bannersLink={banners?.best_selling}
        isHomeDataLoading={isHomeDataLoading && !homeData}
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
        isHomeDataLoading={isHomeDataLoading && !homeData}
      />
      <DynamicFarmEquipments
        farmEquipmentsData={farmEquipmentsData}
        categoriesData={categoriesData}
        viewAllLink="/product-category/farm-mechanization-equipments"
        bannersLink={banners?.farm_mechanization_equipments}
      />
      <Benefit />
      <DynamicIndustrialProduct
        industrialProductsData={industrialProductsData}
        viewAllLink="/product-category/industrial-products"
        bannersLink={banners?.industrial_products}
      />
      <Solution bannersLink={banners?.pay_online_save_more} />
      <DynamicGardenTool
        gardeningToolsData={gardeningToolsData}
        viewAllLink="/product-category/garden-tools"
        bannersLink={banners?.garden_tools}
      />
      <DynamicPostHarvest
        postHarvestData={postHarvestData}
        viewAllLink="/product-category/post-harvest"
        bannersLink={banners?.post_harvest}
      />
      <DynamicFoogingMachine
        foogingMachineData={foogingMachineData}
        viewAllLink="/product-category/fogging-machines"
        bannersLink={banners?.fogging_machines}
      />

      <ExclusiveDeal bannersLink={banners?.exclusive_deals} />
      <DynamicTopRating
        topRatedData={topRatedData}
        viewAllLink="/product-category/top-rating"
        bannersLink={banners?.top_rating}
      />
      <DynamicVideoSection />
      <DynamicInsightsBlog insightsBlogData={insightsBlogData} />
    </Layout>
  );
};

export default HomeComponents;
