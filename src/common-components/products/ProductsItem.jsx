import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import productImage from "@/assets/images/agriculture-sprayer.jpg";
import ProductCard from "@/common-components/product-card/ProductCard";
import styles from "@/common-components/products/ProductsItems.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import Link from "next/link";

const ProductsItem = ({
  bannerTitle,
  bannerDescription,
  description,
  agricultureProductsData,
  variant = "default",
  title = "",
  bannerImage = productImage,
  productsSectionClassName = "",
  sectionClassName = "sectionSpace",
  overlayHeading,
  overlayVariant = "default",
  overlayProducts = [],
  overlayFooter,
  hideOverlay = false,
  customOverlay,
  bannerImageProps = {},
  viewAllLink = "/product-category/agriculture-sprayers",
}) => {
  const {
    className: bannerImageClassName,
    style: bannerImageStyle,
    ...restBannerImageProps
  } = bannerImageProps;
  const isEquipment = variant === "equipment";
  const isIndustrialOverlay = overlayVariant === "industrial";
  const isPostHarvestOverlay = overlayVariant === "postHarvest";
  const isBestSellingOverlay = overlayVariant === "bestSelling";

  const productsSectionClassNames = [
    styles.productsSection,
    isEquipment && styles.productsSectionEquipment,
    productsSectionClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={sectionClassName}>
      <div className="container">
        <div className={productsSectionClassNames}>
          <div className="row g-3 align-items-stretch">
            {!isEquipment && (
              <div className="col-12">
                <h2 className={`${styles.productsTitle} text-center`}>
                  {title}
                </h2>
              </div>
            )}

            {!isEquipment && (
              <div className={`col-lg-3 col-md-4 col-12 ${styles.promoCol}`}>
                <Link href={viewAllLink}>
                  <div
                    className={`${styles.promoCard} ${isIndustrialOverlay ? styles.promoCardIndustrial : ""}`}
                  >
                    <Image
                      src={bannerImage}
                      alt={title}
                      fill
                      sizes="(max-width: 767px) 100vw, 25vw"
                      className={[styles.promoImage, bannerImageClassName]
                        .filter(Boolean)
                        .join(" ")}
                      style={{ objectFit: "cover", ...bannerImageStyle }}
                      {...restBannerImageProps}
                    />
                    {!hideOverlay &&
                      (customOverlay ? (
                        customOverlay
                      ) : isIndustrialOverlay ? (
                        <div
                          className={`${styles.overlayContent} ${styles.overlayContentIndustrial}`}
                        >
                          <h3
                            className={`${styles.overlayTitle} ${styles.overlayTitleIndustrial}`}
                          >
                            {overlayHeading || title}
                          </h3>
                        </div>
                      ) : isPostHarvestOverlay ? (
                        <div className={`${styles.overlayContent} `}>
                          <h3 className={`${styles.overlayTitle} `}>
                            {overlayHeading || title}
                          </h3>
                        </div>
                      ) : isBestSellingOverlay ? (
                        <>
                          <div
                            className={`${styles.overlayContent} ${styles.overlayContentBestSelling}`}
                          >
                            <h3
                              className={`${styles.overlayTitle} ${styles.overlayTitleBestSelling}`}
                            >
                              {overlayHeading || title}
                            </h3>
                          </div>

                          {overlayFooter && (
                            <div className={styles.bestSellingFooter}>
                              {overlayFooter}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className={styles.overlayContent}>
                          <h3 className={styles.overlayTitle}>{bannerTitle}</h3>
                          {bannerDescription && (
                            <p className={styles.overlayDescription}>
                              {bannerDescription}
                            </p>
                          )}
                        </div>
                      ))}
                  </div>
                </Link>
              </div>
            )}
            <div
              className={
                isEquipment
                  ? "col-12"
                  : `col-lg-9 col-md-8 col-12 ${styles.cardsCol}`
              }
            >
              <div className={`${styles.swiperWrapper}`}>
                <Swiper
                  modules={[Navigation, Autoplay]}
                  navigation={{
                    prevEl: ".swiper-btn-prev",
                    nextEl: ".swiper-btn-next",
                  }}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  spaceBetween={16}
                  breakpoints={{
                    0: {
                      slidesPerView: isEquipment ? 1 : 1,
                    },
                    425: {
                      slidesPerView: isEquipment ? 2 : 1,
                    },
                    575: {
                      slidesPerView: isEquipment ? 2 : 2,
                    },
                    768: {
                      slidesPerView: isEquipment ? 3 : 3,
                    },
                    991: {
                      slidesPerView: isEquipment ? 4 : 3,
                    },
                    1024: {
                      slidesPerView: isEquipment ? 4 : 4,
                    },
                    1200: {
                      slidesPerView: isEquipment ? 4 : 4,
                    },
                  }}
                  className={styles.cardsRow}
                >
                  {agricultureProductsData?.map((item) => (
                    <SwiperSlide key={item.id}>
                      <ProductCard
                        type="home"
                        image={item?.gallery[0]}
                        imageHover={item?.gallery[1]}
                        discount={item?.discount}
                        isBestSeller={item?.is_best_selling}
                        name={item?.name}
                        price={item?.selling_price}
                        oldPrice={item?.price}
                        reviews={item?.total_reviews}
                        rating={item?.rating}
                        isTrending={item?.is_trending}
                        isFeatured={item?.is_featured}
                        isTopRated={item?.is_top_rated}
                        slug={item?.slug}
                        productId={item?.id}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {!isEquipment && (
                  <div className={`${styles.swiperNav}`}>
                    <button
                      className={`swiper-btn-prev ${styles.swiperNavBtn}`}
                      aria-label="Previous"
                    >
                      <FiChevronLeft />
                    </button>

                    <button
                      className={`swiper-btn-next ${styles.swiperNavBtn}`}
                      aria-label="Next"
                    >
                      <FiChevronRight />
                    </button>
                  </div>
                )}
              </div>

              <div
                className={
                  isEquipment
                    ? `${styles.viewAllWrapper} ${styles.centerViewAll}`
                    : styles.viewAllWrapper
                }
              >
                <Link href={viewAllLink} className={`${styles.viewAllBtn} `}>
                    View All
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsItem;
