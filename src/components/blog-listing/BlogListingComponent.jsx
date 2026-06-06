import React from "react";
import LatestBlog from "@/components/blog-listing/latest-blog/LatestBlog";
import OrderInformation from "../product-category/components/order-information/OrderInformation";

const BlogListingComponent = () => {
  return (
    <>
      <LatestBlog />
      <OrderInformation />
    </>
  );
};

export default BlogListingComponent;
