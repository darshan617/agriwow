import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import productImage from "@/assets/images/agriculture-sprayer.jpg";
import ProductCard from "@/common-components/product-card/ProductCard";
import styles from "@/common-components/products/ProductsItems.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import Link from "next/link";
import { useRouter } from "next/router";
import ProductCardShimmer from "../product-card/ProductCardShimmer";
import { useEffect, useState } from "react";

const ProductsItem = ({
  isHomeDataLoading,
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
  categorySlug,
  viewAllLink = "/product-category/agriculture-sprayers",
  bannersLink,
}) => {
  const [shimmerCount, setShimmerCount] = useState(4);
  const {
    className: bannerImageClassName,
    style: bannerImageStyle,
    ...restBannerImageProps
  } = bannerImageProps;
  const isEquipment = variant === "equipment";
  const isIndustrialOverlay = overlayVariant === "industrial";
  const isPostHarvestOverlay = overlayVariant === "postHarvest";
  const isBestSellingOverlay = overlayVariant === "bestSelling";
  const router = useRouter();
  const productsSectionClassNames = [
    styles.productsSection,
    isEquipment && styles.productsSectionEquipment,
    productsSectionClassName,
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth <= 425) {
        setShimmerCount(2);
      } else if (window.innerWidth <= 575) {
        setShimmerCount(3);
      } else if (window.innerWidth <= 768) {
        setShimmerCount(3);
      } else {
        setShimmerCount(4);
      }
    };

    updateCount();
    window.addEventListener("resize", updateCount);

    return () => window.removeEventListener("resize", updateCount);
  }, []);

  return (
    <section className={sectionClassName}>
      {agricultureProductsData?.length > 0 ? (
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
                  <Link
                    href={
                      `/product-category/${bannersLink?.slug}` || viewAllLink
                    }
                    prefetch={true}
                  >
                    <div
                      className={`${styles.promoCard} ${isIndustrialOverlay ? styles.promoCardIndustrial : ""}`}
                    >
                      <Image
                        src={bannersLink?.image || bannerImage}
                        alt={bannersLink?.name || bannerTitle || title}
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
                            <h3 className={styles.overlayTitle}>
                              {bannerTitle}
                            </h3>
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
                      delay: 9000,
                      disableOnInteraction: false,
                    }}
                    breakpoints={{
                      0: {
                        slidesPerView: isEquipment ? 2 : 2,
                        spaceBetween: 5,
                      },
                      425: {
                        slidesPerView: isEquipment ? 2 : 2,
                        spaceBetween: 5,
                      },
                      575: {
                        slidesPerView: isEquipment ? 3 : 3,
                        spaceBetween: 14,
                      },
                      767: {
                        slidesPerView: isEquipment ? 3 : 3,
                        spaceBetween: 16,
                      },
                      1024: {
                        slidesPerView: isEquipment ? 4 : 4,
                        spaceBetween: 18,
                      },
                      1200: {
                        slidesPerView: isEquipment ? 4 : 4,
                        spaceBetween: 20,
                      },
                    }}
                    className={styles.cardsRow}
                  >
                    {isHomeDataLoading ? (
                      <div className={styles.productsShimmer}>
                        {Array.from({ length: shimmerCount }).map(
                          (_, index) => (
                            <ProductCardShimmer key={index} />
                          ),
                        )}
                      </div>
                    ) : (
                      agricultureProductsData?.map((item) => {
                        return (
                          <SwiperSlide key={item.id}>
                            <ProductCard
                              type="home"
                              image={item?.thumbnail}
                              imageHover={item?.gallery[0]}
                              discount={item?.discount}
                              isBestSeller={item?.is_best_selling}
                              name={item?.name}
                              price={item?.selling_price}
                              oldPrice={item?.price}
                              reviews={item?.total_reviews}
                              average_rating={item?.average_rating}
                              isTrending={item?.is_trending}
                              isFeatured={item?.is_featured}
                              isTopRated={item?.is_top_rated}
                              slug={item?.slug}
                              productId={item?.id}
                              isWishlist={item?.is_wishlist}
                            />
                          </SwiperSlide>
                        );
                      })
                    )}
                  </Swiper>

                  {!isEquipment && agricultureProductsData?.length > 0 && (
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

                {agricultureProductsData?.length > 0 && (
                  <div
                    className={
                      isEquipment
                        ? `${styles.viewAllWrapper} ${styles.centerViewAll}`
                        : styles.viewAllWrapper
                    }
                  >
                    <Link
                      href={viewAllLink}
                      className={`${styles.viewAllBtn} `}
                    >
                      View All
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default ProductsItem;
