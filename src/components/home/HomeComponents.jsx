import React, { Suspense } from "react";
import { useGetHomeDataQuery } from "@/redux/apis/homeApi";
import dynamic from "next/dynamic";

const DynamicTopHeader = dynamic(
  () => import("@/components/layout/top-header/TopHeader"),
  {
    ssr: false,
  },
);
const DynamicTopBanner = dynamic(
  () => import("@/components/layout/top-banner/TopBanner"),
  {
    ssr: false,
  },
);
const DynamicHomeBanner = dynamic(
  () => import("@/components/home/components/banner/home-banner/HomeBanner"),
  {
    ssr: false,
  },
);
const DynamicMarquee = dynamic(
  () => import("@/components/home/components/marquee/Marquee"),
  {
    ssr: false,
  },
);
const DynamicBenefit = dynamic(
  () => import("@/components/home/components/benifit/Benefit"),
  {
    ssr: false,
  },
);
const DynamicFarmEquipments = dynamic(
  () => import("@/components/home/components/farm-equipmemts/FarmEquipments"),
  {
    ssr: false,
  },
);
const DynamicIndustrialProduct = dynamic(
  () =>
    import("@/components/home/components/industrial-product/IndustrialProduct"),
  {
    ssr: false,
  },
);
const DynamicSolution = dynamic(
  () => import("@/components/home/components/solution/Solution"),
  {
    ssr: false,
  },
);

const DynamicGardenTool = dynamic(
  () => import("@/components/home/components/garden-tool/GardenTool"),
  {
    ssr: false,
  },
);
const DynamicPostHarvest = dynamic(
  () => import("@/components/home/components/post-harvast/PostHarvest"),
  {
    ssr: false,
  },
);
const DynamicFoogingMachine = dynamic(
  () => import("@/components/home/components/fooging-machine/FoogingMachine"),
  {
    ssr: false,
  },
);
const DynamicBestSelling = dynamic(
  () => import("@/components/home/components/best-selling/BestSelling"),
  {
    ssr: false,
  },
);
const DynamicExclusiveDeal = dynamic(
  () => import("@/components/home/components/deal/ExclusiveDeal"),
  {
    ssr: false,
  },
);
const DynamicTopRating = dynamic(
  () => import("@/components/home/components/top-rating/TopRating"),
  {
    ssr: false,
  },
);
const DynamicVideoSection = dynamic(
  () => import("@/components/home/components/video/VideoSection"),
  {
    ssr: false,
  },
);
const DynamicInsightsBlog = dynamic(
  () => import("@/components/home/components/insights/InsightsBlog"),
  {
    ssr: false,
  },
);
const DynamicFooter = dynamic(
  () => import("@/components/layout/footer/Footer"),
  {
    ssr: false,
  },
);
const DynamicProductsItem = dynamic(
  () => import("@/common-components/products/ProductsItem"),
  {
    ssr: false,
  },
);
const DynamicDetail = dynamic(
  () => import("@/components/home/components/detail/Detail"),
  {
    ssr: false,
  },
);
const HomeComponents = ({ homeData: ssrHomeData }) => {
  const { data: cachedHomeData } = useGetHomeDataQuery();
  const homeData = cachedHomeData ?? ssrHomeData;

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
    <>
      <DynamicTopHeader />
      <DynamicTopBanner categoriesData={categoriesData} />
      <DynamicHomeBanner />
      <DynamicMarquee />
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
      />
      <DynamicDetail />
      <DynamicFarmEquipments
        farmEquipmentsData={farmEquipmentsData}
        categoriesData={categoriesData}
        viewAllLink="/product-category/farm-mechanization-equipments"
        bannersLink={banners?.farm_equipments}
      />
      <DynamicBenefit />
      <DynamicIndustrialProduct
        industrialProductsData={industrialProductsData}
        viewAllLink="/product-category/industrial-products"
        bannersLink={banners?.industrial_products}
      />
      <DynamicSolution bannersLink={banners?.pay_online_save_more} />
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
      <DynamicBestSelling
        bestSellingData={bestSellingData}
        viewAllLink="/product-category/best-selling"
        bannersLink={banners?.best_selling}
      />
      <DynamicExclusiveDeal bannersLink={banners?.exclusive_deals} />
      <DynamicTopRating
        topRatedData={topRatedData}
        viewAllLink="/product-category/top-rating"
        bannersLink={banners?.top_rating}
      />
      <DynamicVideoSection />
      <DynamicInsightsBlog insightsBlogData={insightsBlogData} />
      <DynamicFooter />
    </>
  );
};

export default HomeComponents;
