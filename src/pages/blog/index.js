import BlogListingComponent from '@/components/blog-listing/BlogListingComponent'
import Layout from '@/components/layout/Layout'
import React from 'react'

const index = () => {
  return (
    <Layout>
        <BlogListingComponent />
    </Layout>
  )
}

export default index