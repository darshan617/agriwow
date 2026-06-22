import BlogListingComponent from '@/components/blog-listing/BlogListingComponent'
import Layout from '@/components/layout/Layout'
import React from 'react'
import LatestBlogShimmer from '@/components/blog-listing/latest-blog/LatestBlogShimmer'

const index = () => {
  return (
    <Layout>
        <BlogListingComponent />
    </Layout>
  )
}

export default index