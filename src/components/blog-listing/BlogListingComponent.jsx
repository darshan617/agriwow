import React from "react";
import LatestBlog from "@/components/blog-listing/latest-blog/LatestBlog";
import OrderInformation from "../product-category/components/order-information/OrderInformation";
import LatestBlogShimmer from "./latest-blog/LatestBlogShimmer";
import TrendingBlogShimmer from "./trending-blog/TrendingBlogShimmer";
import dynamic from "next/dynamic";

const DynamicLatestBlog = dynamic(
  () => import("@/components/blog-listing/latest-blog/LatestBlog"),
  {
    ssr: false,
  },
);

const BlogListingComponent = () => {
  return (
    <>
      <DynamicLatestBlog />
      <OrderInformation />
    </>
  );
};

export default BlogListingComponent;
