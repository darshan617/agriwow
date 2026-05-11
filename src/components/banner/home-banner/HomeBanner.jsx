import React from "react";
import Image from "next/image";
import styles from "@/components/banner/home-banner/HomeBanner.module.css";
import bannerImage from "@/assets/images/banner.jpg";
import bannerProducts from "@/assets/images/banner-product.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const HomeBanner = () => {
  const bannerSlides = [bannerImage, bannerImage, bannerImage];

  return (
    <section className={`${styles.sectionSpace}`}>
        <div className={`${styles.bannerCard}`}>
          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            slidesPerView={1}
            loop
            speed={1000}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            className={styles.bannerSwiper}
          >
            {bannerSlides.map((slideImage, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={slideImage}
                  alt="Farm background banner"
                  className={`${styles.bannerBackground}`}
                  priority={index === 0}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={`${styles.bannerContent}`}>
            <div className={`${styles.leftContent}`}>
              <h2 className={`${styles.title}`} data-aos="fade-up">Complete Solutions for <br /> Modern Farming</h2>
              <p className={`${styles.subtitle}`} data-aos="fade-in">
                Explore a wide range of agricultural equipment across <br /> all categories - designed for performance and productivity.
              </p>

              <div className={`${styles.offerStrip}`} data-aos="fade-up">
                <div className={`${styles.offerMain}`}>
                  <span className={`${styles.upto}`}>UP TO</span>
                  <span className={`${styles.offerPercent}`}>25% OFF <br /> 
                  <span className={`${styles.offerPercentSub}`}>on Selected Products</span></span>
                </div>
              </div>

              <button type="button" className={`${styles.bannerBtn}`}>
                Explore Products
              </button>
            </div>

            <div className={`${styles.rightContent}`} data-aos="zoom-in" data-aos-duration="1500">
              <div className={`${styles.productImageWrapper}`}>
                <Image src={bannerProducts} alt="Agriculture machines" className={`${styles.productImage}`} />
              </div>
            </div>
          </div>
        </div>
    </section>

  
  );
};

export default HomeBanner;