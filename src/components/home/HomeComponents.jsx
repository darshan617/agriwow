import React from 'react'
import TopHeader from '@/common-components/top-header/TopHeader'
import Header from '@/common-components/header/Header'
import TopBanner from '@/components/home/components/banner/top-banner/TopBanner'
import HomeBanner from '@/components/home/components/banner/home-banner/HomeBanner'
import Marquee from '@/components/home/components/marquee/Marquee'
import ProductsItem from '@/common-components/products/ProductsItem'
import Benefit from '@/components/home/components/benifit/Benefit'
import FarmEquipments from '@/components/home/components/farm-equipmemts/FarmEquipments'
import Detail from '@/components/home/components/detail/Detail'
import IndustrialProduct from '@/components/home/components/industrial-product/IndustrialProduct'
import Solution from '@/components/home/components/solution/Solution'
import GardenTool from '@/components/home/components/garden-tool/GardenTool'
import PostHarvest from '@/components/home/components/post-harvast/PostHarvest'
import FoogingMachine from '@/components/home/components/fooging-machine/FoogingMachine'
import BestSelling from '@/components/home/components/best-selling/BestSelling'
import ExclusiveDeal from '@/components/home/components/deal/ExclusiveDeal'
import TopRating from '@/components/home/components/top-rating/TopRating'
import VideoSection from '@/components/home/components/video/VideoSection'
import InsightsBlog from '@/components/home/components/insights/InsightsBlog'
import Footer from '@/common-components/footer/Footer'
const HomeComponents = () => {
  return (
    <>
      <TopHeader />
      <Header />
      <TopBanner />
      <HomeBanner />
      <Marquee />
      <ProductsItem />
      <Benefit />
      <FarmEquipments />
      <Detail />
      <IndustrialProduct />
      <Solution />
      <GardenTool />
      <PostHarvest />
      <FoogingMachine />
      <BestSelling />
      <ExclusiveDeal />
      <TopRating />
      <VideoSection />
      <InsightsBlog />
      <Footer />
    </>
  )
}

export default HomeComponents