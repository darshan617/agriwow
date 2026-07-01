import React from "react";
import OrderInformation from "../product-category/components/order-information/OrderInformation";
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
