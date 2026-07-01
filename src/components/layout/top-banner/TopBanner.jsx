import React from "react";
import styles from "@/components/layout/top-banner/TopBanner.module.css";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useGetHomeDataQuery } from "@/redux/apis/homeApi";
import TopBannerShimmer from "./TopBannerShimmer";

const TopBanner = () => {
  const { data: homeData, isLoading: isHomeDataLoading } =
    useGetHomeDataQuery();
  const categoriesData = homeData?.data?.categories;

  return isHomeDataLoading ? (
    <TopBannerShimmer />
  ) : (
    <div className="container">
      <div className={`${styles.topBannerWrapper}`}>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={5}
          slidesPerView={4}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          speed={1000}
          breakpoints={{
            0: { slidesPerView: 3 },
            375: { slidesPerView: 4 },
            425: { slidesPerView: 4 },
            576: { slidesPerView: 5 },
            768: { slidesPerView: 6 },
            992: { slidesPerView: 6 },
          }}
        >
          {categoriesData?.map((category, idx) => (
            <SwiperSlide key={idx}>
              <Link href={`/product-category/${category?.slug}`} prefetch={true}>
                <div className={`${styles.categoryItem}`}>
                  <div className={`${styles.categoryImgWrapper}`}>
                    <Image
                      src={category?.image}
                      alt={category?.name}
                      className={`${styles.categoryImg}`}
                      width={100}
                      height={100}
                    />
                  </div>
                  <p className={`${styles.categoryLabel}`}>{category?.name}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopBanner;
