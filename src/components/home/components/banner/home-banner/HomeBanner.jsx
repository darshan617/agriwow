import React, { useState } from "react";
import Image from "next/image";
import styles from "@/components/home/components/banner/home-banner/HomeBanner.module.css";
import bannerImage from "@/assets/images/banner.jpg";
// import bannerProducts from "@/assets/images/banner-product.png";
import bannerImage1 from "@/assets/images/banner1.webp"
import bannerImage2 from "@/assets/images/banner2.webp"
import bannerImage3 from "@/assets/images/banner3.webp"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import Link from "next/link";

const HomeBanner = () => {
    const slides = [
      {
        // title: (
        //   <>
        //     Complete Solutions for <br /> Modern Farming
        //   </>
        // ),
        // subtitle: (
        //   <>
        //     Explore a wide range of agricultural equipment across <br /> all
        //     categories - designed for performance and productivity.
        //   </>
        // ),
        backgroundImage: bannerImage1,
        link: "/product-category/farm-mechanization-equipments",
        // sideImage: bannerProducts,
        // btnLabel: "Explore Products",

      },
      {
        // title: (
        //   <>
        //     Lorem ipsum, dolor sit amet consectetur.
        //   </>
        // ),
        // subtitle: (
        //   <>
        //     Explore a wide range of agricultural equipment across <br /> all
        //     categories - designed for performance and productivity.
        //   </>
        // ),
        backgroundImage: bannerImage2,
        link: "/product-category/garden-lawn-care",
        // sideImage: bannerProducts,
        // btnLabel: "Explore Products",
      },
      {
        // title: (
        //   <>
        //     Lorem ipsum, dolor sit amet consectetur.
        //   </>
        // ),
        // subtitle: (
        //   <>
        //     Explore a wide range of agricultural equipment across <br /> all
        //     categories - designed for performance and productivity.
        //   </>
        // ),
        backgroundImage: bannerImage3,
        link: "/product-category/agriculture-sprayers",
        // sideImage: bannerProducts,
        // btnLabel: "Explore Products",
      },
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const hero = slides[activeIndex];

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
            <SwiperSlide key={index}>
            <Link href={slide.link}>
            <Image
              src={slide.backgroundImage}
              alt="Farm background banner"
              className={`${styles.bannerBackground}`}
              priority
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
