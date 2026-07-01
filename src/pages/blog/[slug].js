import React from "react";
import { useRouter } from "next/router";
import SeoHead from "@/components/seo/SeoHead";
import BlogDetailsComponent from "@/components/blog-details/BlogDetailsComponent";
import Layout from "@/components/layout/Layout";
import TrendingBlog from "@/components/blog-listing/trending-blog/TrendingBlog";
import DeliveryDetails from "@/components/product-details/components/delivery-detail/deliveryDetails";
import Detail from "@/components/home/components/detail/Detail";
import OrderInformation from "@/components/product-category/components/order-information/OrderInformation";
import { useGetBlogDetailsQuery } from "@/redux/apis/blogApi";
import { buildBlogSeo } from "@/utils/seo";

const BlogDetails = () => {
  const router = useRouter();
  const slug = router?.query?.slug;
  const { data: blogDetailsData } = useGetBlogDetailsQuery(
    { slug: router?.query?.slug },
    { skip: !router?.query?.slug },
  );
  const trendingBlogs = blogDetailsData?.data?.trending;
  const blogSeo = buildBlogSeo(blogDetailsData?.data?.blog);

  return (
    <Layout>
      {blogSeo ? <SeoHead {...blogSeo} /> : null}
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <BlogDetailsComponent blogDetailsData={blogDetailsData} />
          </div>
          <div className="col-lg-4 mt-4">
            <TrendingBlog type="blog-detail" trendingBlogs={trendingBlogs} />
          </div>
        </div>
      </div>
      <OrderInformation />
    </Layout>
  );
};

export default BlogDetails;
