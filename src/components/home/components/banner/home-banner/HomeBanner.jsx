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
    const { data: bannerDataResponse } = useGetBannerDataQuery();
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

  if (slides.length === 0) {
    return null;
  }

  return (
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
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id ?? index}>
            <Link
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
        {/* <div className={`${styles.bannerContent}`}>
          <div className={`${styles.leftContent}`}>
            <h2 className={`${styles.title}`} data-aos="fade-up">
              {hero.title}
            </h2>
            <p className={`${styles.subtitle}`} data-aos="fade-in">
              {hero.subtitle}
            </p>

            <div className={`${styles.offerStrip}`} data-aos="fade-up">
              <div className={`${styles.offerMain}`}>
                <span className={`${styles.upto}`}>UPTO</span>
                <span className={`${styles.offerPercent}`}>
                  25% OFF <br />
                  <span className={`${styles.offerPercentSub}`}>
                    on Selected Products
                  </span>
                </span>
              </div>
            </div>

            <button type="button" className={`${styles.bannerBtn}`}>
              {hero.btnLabel}
            </button>
          </div>
          <div
            className={`${styles.rightContent}`}
            data-aos="zoom-in"
            data-aos-duration="1500"
          >
            <div className={`${styles.productImageWrapper}`}>
              <Image
                src={hero.sideImage}
                alt="Agriculture machines"
                className={`${styles.productImage}`}
              />
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default HomeBanner;
