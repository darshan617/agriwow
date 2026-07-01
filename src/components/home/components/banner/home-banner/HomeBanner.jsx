import React, { useMemo } from "react";
import Image from "next/image";
import styles from "@/components/home/components/banner/home-banner/HomeBanner.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import Link from "next/link";
import { useGetBannerDataQuery } from "@/redux/apis/homeApi";

const HomeBanner = () => {
  const {
    data: bannerDataResponse,
    isLoading: isBannerDataLoading,
    isFetching: isBannerDataFetching,
  } = useGetBannerDataQuery();
  const bannerData = bannerDataResponse?.data;

  const slides = useMemo(() => {
    if (!Array.isArray(bannerData)) {
      return [];
    }

    return bannerData
      .filter((slide) => slide?.status === 1 && slide?.image)
      .map((slide) => ({
        id: slide.id,
        backgroundImage: slide.image,
        link: slide.link,
      }));
  }, [bannerData]);

  return isBannerDataLoading || isBannerDataFetching ? (
    <div className={`${styles.bannerShimmer} shimmerEffect`}></div>
  ) : (
    <section className={`${styles.bannerSection}`}>
      <div className={`${styles.bannerCard}`}>
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          slidesPerView={1}
          loop
          speed={600}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          className={`${styles.bannerSwiper}`}
        >
          {slides?.map((slide, index) => (
            <SwiperSlide key={slide.id ?? index}>
              <Link prefetch={true}
                href={slide.link}
                {...(slide.link?.startsWith("http") && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
              >
                <Image
                  src={slide.backgroundImage}
                  alt="Farm background banner"
                  className={`${styles.bannerBackground}`}
                  priority={index === 0}
                  width={1920}
                  height={600}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HomeBanner;
