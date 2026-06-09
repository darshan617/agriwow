import React from "react";
import { useRouter } from "next/router";
import BlogDetailsComponent from "@/components/blog-details/BlogDetailsComponent";
import Layout from "@/components/layout/Layout";
import TrandingBlog from "@/components/blog-listing/trending-blog/TrandingBlog";
const BlogDetails = () => {
  const router = useRouter();

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <BlogDetailsComponent />
          </div>
          <div className="col-lg-4">
            <TrandingBlog />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogDetails;
