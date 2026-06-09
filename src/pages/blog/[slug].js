import React from "react";
import { useRouter } from "next/router";
import BlogDetailsComponent from "@/components/blog-details/BlogDetailsComponent";
import Layout from "@/components/layout/Layout";
import TrandingBlog from "@/components/blog-listing/trending-blog/TrandingBlog";
import DeliveryDetails from "@/components/product-details/components/delivery-detail/deliveryDetails";
import Detail from "@/components/home/components/detail/Detail";
import OrderInformation from "@/components/product-category/components/order-information/OrderInformation";
const BlogDetails = () => {
  const router = useRouter();
  const slug = router?.query?.slug;
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <BlogDetailsComponent blogDetails={router?.query?.slug} />
          </div>
          <div className="col-lg-4 mt-4">
            <TrandingBlog type="blog-detail" />
          </div>
        </div>
      </div>
      <OrderInformation />
    </Layout>
  );
};

export default BlogDetails;
