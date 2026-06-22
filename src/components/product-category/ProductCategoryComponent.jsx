import React from "react";
import Layout from "@/components/layout/Layout";
import { useGetHomeDataQuery } from "@/redux/apis/homeApi";
import ProductCategoryList from "./components/ProductCategoryList/ProductCategoryList";
import OrderInformation from "./components/order-information/OrderInformation";
import dynamic from "next/dynamic";
import ProductCardShimmer from "@/common-components/product-card/ProductCardShimmer";

const DynamicProductCategoryList = dynamic(
  () => import("./components/ProductCategoryList/ProductCategoryList"),
  {
    ssr: false,
  },
);
const ProductCategoryComponent = () => {
  const { data: homeData } = useGetHomeDataQuery();
  const categoriesData = homeData?.data?.categories;

  return (
    <Layout>
      {/* <ProductCardShimmer /> */}
      <DynamicProductCategoryList />
      <OrderInformation />
    </Layout>
  );
};

export default ProductCategoryComponent;
