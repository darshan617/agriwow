import React from "react";
import { useGetHomeDataQuery } from "@/redux/apis/homeApi";
import dynamic from "next/dynamic";
import Layout from "../layout/Layout";
import Marquee from "@/components/home/components/marquee/Marquee";
import Detail from "@/components/home/components/detail/Detail";
import Benefit from "@/components/home/components/benifit/Benefit";
import ExclusiveDeal from "@/components/home/components/deal/ExclusiveDeal";
import Solution from "@/components/home/components/solution/Solution";

// Swiper + window-dependent sections stay client-only to avoid hydration
// mismatches (original reason for ssr: false).
const DynamicTopBanner = dynamic(
  () => import("@/components/layout/top-banner/TopBanner"),
  { ssr: false },
);
const DynamicHomeBanner = dynamic(
  () => import("@/components/home/components/banner/home-banner/HomeBanner"),
  { ssr: false },
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

  return (
    <Layout>
      <DynamicTopBanner categoriesData={categoriesData} />
      <DynamicHomeBanner />
      <Marquee />
      <DynamicBestSelling
        bestSellingData={bestSellingData}
        viewAllLink="/product-category/agriculture-sprayers"
        bannersLink={banners?.best_selling}
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
        bannersLink={banners?.farm_equipments}
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
