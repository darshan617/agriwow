import React from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import farmEquipments from "@/assets/images/agri-equipments.jpg";
import styles from "@/components/home/components/farm-equipmemts/FarmEqipments.module.css";
import ProductCard from "@/common-components/product-card/ProductCard";
import { useRouter } from "next/router";
import Link from "next/link";

const FarmEquipments = ({
  farmEquipmentsData,
  bannerImage = farmEquipments,
  title = "Farm Equipment's",
  bannerAlt = "Farm Equipments",
  categorySlug,
  subCategorySlug,
  categoriesData,
  viewAllLink = "/product-category/farm-mechanization-equipments",
  bannersLink,
}) => {
  return (
    <section className="sectionSpace" data-aos="zoom-in">
      <div className="container">
        <div className={`${styles.card}`}>
          <Image
            src={bannersLink?.image || bannerImage}
            alt={bannersLink?.name || bannerAlt}
            className={`${styles.bannerImage}`}
            priority
            width={100}
            height={100}
          />

          <div className={`${styles.content}`}>
            <h2 className={`${styles.title}`}>{title}</h2>

            <Link
              href={`/product-category/${bannersLink?.slug}` || viewAllLink}
            >
              <button type="button" className={`${styles.bannerBtn}`}>
                Explore Products
              </button>
            </Link>
          </div>
        </div>

        <div className={`${styles.productsWrapper}`}>
          <div className={styles.swiperWrapper}>
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                prevEl: ".farm-equipments-btn-prev",
                nextEl: ".farm-equipments-btn-next",
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                0: { slidesPerView: 2, spaceBetween: 5 },
                375: { slidesPerView: 2, spaceBetween: 5 },
                575: { slidesPerView: 3, spaceBetween: 14 },
                767: { slidesPerView: 3, spaceBetween: 16 },
                1024: { slidesPerView: 4, spaceBetween: 18 },
                1200: { slidesPerView: 4, spaceBetween: 18 },
                1366: { slidesPerView: 5, spaceBetween: 18 },
              }}
              className={styles.productsSwiper}
            >
              {farmEquipmentsData?.map((item) => (
                <SwiperSlide key={item?.id}>
                  <ProductCard
                    type="home"
                    image={item?.gallery[0]}
                    imageHover={item?.gallery[1]}
                    discount={item?.discount}
                    isBestSeller={item?.isBestSeller}
                    name={item?.name}
                    price={item?.selling_price}
                    oldPrice={item?.price}
                    reviews={item?.total_reviews}
                    average_rating={item?.average_rating}
                    slug={item?.slug}
                    productId={item?.id}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className={styles.viewAllBtnWrapper}>
            <Link
              href={`/product-category/${bannersLink?.slug}` || viewAllLink}
            >
              <button type="button" className={styles.viewAllBtn}>
                View All
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FarmEquipments;
