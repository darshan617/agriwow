import React, { useState } from "react";
import Image from "next/image";
import styles from "@/components/product-details/components/item-detail/ItemDetail.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaShareAlt, FaHeart, FaStar } from "react-icons/fa";
import DiscountImg from "@/assets/icon/discount.png";
import rise from "@/assets/icon/rise.png";
import coupon from "@/assets/icon/coupon.png";
import shipping from "@/assets/icon/shipping.png";
import quality from "@/assets/icon/quality.png";
import secure from "@/assets/icon/payment.png";
import return1 from "@/assets/icon/return1.png";

import CustomPopup from "@/components/custom-popup/CustomPopup";
import "swiper/css";

const SPECIFICATIONS_PREVIEW_COUNT = 3;

const ItemDetail = ({ productDetails }) => {
  console.log("productDetails", productDetails);
  const productData = productDetails?.data;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showProductPopup, setShowProductPopup] = useState(false);
  const [activePopupTab, setActivePopupTab] = useState("specifications");

  const specifications = productDetails?.data?.specification ?? [];
  const visibleSpecifications = specifications.slice(
    0,
    SPECIFICATIONS_PREVIEW_COUNT,
  );

  const openProductPopup = (tab = "specifications") => {
    setActivePopupTab(tab);
    setShowProductPopup(true);
  };

  const closeProductPopup = () => {
    setShowProductPopup(false);
    setActivePopupTab("specifications");
  };

  const renderSpecificationsTable = (specs, isPopup = false) => (
    <table
      className={`${styles.productSpecificationsTable} ${
        isPopup ? styles.popupSpecificationsTable : ""
      }`}
    >
      <tbody>
        {specs.map((specification, index) => (
          <tr key={index}>
            <td className={`${styles.specLabel}`}>{specification.key}</td>
            <td className={`${styles.specValue}`}>{specification.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const policiesData = [
    { icon: shipping, label: "Free Shipping" },
    { icon: quality, label: "Quality Product" },
    { icon: secure, label: "Secure Payment" },
    { icon: return1, label: "10 Days Return" },
  ];

  return (
    <div className={`${styles.itemDetail} container`}>
      <div className="row">
        <div className={`${styles.imageDetail} col-lg-5`}>
          <div className={`${styles.mainImageWrapper}`}>
            <Image
              src={productDetails?.data?.gallery[selectedIndex]}
              alt={productDetails?.data?.gallery[selectedIndex]?.alt}
              className={styles.mainImage}
              width={100}
              height={100}
            />
            <div className={`${styles.quickActions}`}>
              <button
                type="button"
                className={`${styles.quickActionBtn1}`}
                aria-label="Share product"
              >
                <FaShareAlt />
              </button>
              <button
                type="button"
                className={`${styles.quickActionBtn}`}
                aria-label="Wishlist"
              >
                <FaHeart />
              </button>
            </div>
          </div>

          <div className={`${styles.thumbRow}`}>
            <button
              className={`item-thumb-prev ${styles.thumbNavBtn}`}
              aria-label="Previous image"
            >
              <FiChevronLeft />
            </button>
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: ".item-thumb-prev",
                nextEl: ".item-thumb-next",
              }}
              className={styles.thumbSwiper}
              spaceBetween={10}
              slidesPerView={4}
              breakpoints={{
                0: { slidesPerView: 3 },
                576: { slidesPerView: 4 },
              }}
            >
              {productDetails?.data?.gallery.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <button
                    type="button"
                    className={`${styles.thumbButton} ${
                      selectedIndex === index ? styles.thumbButtonActive : ""
                    }`}
                    onClick={() => setSelectedIndex(index)}
                    aria-label={`Show image ${item.id}`}
                  >
                    <Image
                      src={item}
                      alt={`Product thumbnail ${item}`}
                      className={styles.thumbImage}
                      width={100}
                      height={100}
                    />
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              className={`item-thumb-next ${styles.thumbNavBtn}`}
              aria-label="Next image"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>

        <div className={`${styles.productInfo} col-lg-4`}>
          <h2 className={`${styles.productName}`}>
            {productDetails?.data?.name}
          </h2>
          <div
            className={`${styles.productDescription} d-flex flex-row justify-content-between`}
          >
            <div className={`${styles.productPrice}`}>
              <div className={`${styles.productReviewCount}`}>
                <span
                  className={`${styles.productReviewCountStar} d-inline-flex gap-1`}
                >
                  <FaStar className={`${styles.productReviewCountStarIcon}`} />
                  <FaStar className={`${styles.productReviewCountStarIcon}`} />
                  <FaStar className={`${styles.productReviewCountStarIcon}`} />
                  <FaStar className={`${styles.productReviewCountStarIcon}`} />
                  <FaStar className={`${styles.productReviewCountStarIcon}`} />
                </span>
                <span className={`${styles.productReviewCountValue}`}>4.5</span>
                <span className={`${styles.productReviewCountText}`}>
                  <span className={`${styles.productReviewCountValue}`}>
                    (35 reviews)
                  </span>
                </span>
                <p className={`${styles.priceRow}`}>
                  <span className={`${styles.currentPrice}`}>
                    ₹ {productDetails?.data?.selling_price}
                  </span>
                  <span className={`${styles.oldPrice}`}>
                    ₹ {productDetails?.data?.price}
                  </span>
                </p>
                <div
                  className={`${styles.discountRow} d-inline-flex gap-2 align-items-center`}
                >
                  {productDetails?.data?.discount > 0 && (
                    <div className={`${styles.discountImg}`}>
                      <Image
                        src={DiscountImg}
                        alt="discount"
                        width={18}
                        height={18}
                        fetchPriority="high"
                        priority={true}
                      />
                    </div>
                  )}
                  {productDetails?.data?.discount > 0 && (
                    <span className={`${styles.discountText}`}>
                      Save ₹{" "}
                      {productDetails?.data?.selling_price -
                        productDetails?.data?.price}
                    </span>
                  )}
                </div>
                {productData?.recently_bought?.count > 0 && (
                  <div className={`${styles.boughtPeopleRow}`}>
                    <div
                      className={`${styles.discountImg} d-inline-flex align-items-center`}
                    >
                      <Image src={rise} alt="rise" width={18} height={18} />
                    </div>
                    <span className={`${styles.peopleBought}`}>
                      {productData?.recently_bought?.count} people bought this
                      recently
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div
              className={`${styles.stockStatus} d-inline-flex align-items-center`}
            >
              <span className={`${styles.stockStatusText}`}>
                {productDetails?.data?.in_stock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>

          <div className={`${styles.coupon}`}>
            <Image src={coupon} alt="coupon" width={30} height={30} />
            <span className={`${styles.couponText}`}>All coupons & offers</span>
            <span
              className={`${styles.couponArrow} d-inline-flex justify-content-end`}
            >
              <FiChevronRight />
            </span>
          </div>

          <div className={`${styles.aboutProduct}`}>
            <h3 className={`${styles.aboutProductTitle}`}>
              About this product
            </h3>

            <div className={`${styles.aboutProductContent}`}>
              <p className={`${styles.aboutProductSubTitle}`}>Key Features</p>

              <ul className={`${styles.aboutProductList}`}>
                {productDetails?.data?.key_features
                  ?.slice(0, 3)
                  .map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
              </ul>
              <button
                type="button"
                className={`${styles.showAllButton}`}
                onClick={() => openProductPopup("key_features")}
              >
                View All
              </button>
            </div>

            <div className={`${styles.aboutProductContent}`}>
              <h3 className={`${styles.aboutProductSubTitle}`}>
                Product Specifications
              </h3>
              {renderSpecificationsTable(visibleSpecifications)}
              {specifications.length > SPECIFICATIONS_PREVIEW_COUNT && (
                <button
                  type="button"
                  className={`${styles.showAllButton}`}
                  onClick={() => openProductPopup("specifications")}
                >
                  See all Specifications
                </button>
              )}
            </div>
            <div className={`${styles.aboutProductContent}`}>
              <h3 className={`${styles.aboutProductSubTitle}`}>
                Product Details
              </h3>
              <p
                className={`${styles.aboutProductDetailsText}`}
                dangerouslySetInnerHTML={{
                  __html: productDetails?.data?.description || "-",
                }}
              />
              <button
                type="button"
                className={`${styles.showAllButton}`}
                onClick={() => openProductPopup("details")}
              >
                Read More
              </button>
            </div>
          </div>

          <div className={`${styles.policies}`}>
            <div className={`${styles.policiesGrid}`}>
              {policiesData.map((policy, index) => (
                <div key={index} className={`${styles.policyItem}`}>
                  <span className={`${styles.policyIcon}`}>
                    <Image
                      src={policy.icon}
                      alt={policy.label}
                      width={20}
                      height={20}
                    />
                  </span>
                  <span className={`${styles.policyLabel}`}>
                    {policy.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showProductPopup && (
        <CustomPopup onclose={closeProductPopup} wide>
          <div className={`${styles.productInfoPopup}`}>
            <div className={`${styles.productInfoPopupTabs}`}>
              <button
                type="button"
                className={`${styles.productInfoPopupTab} ${
                  activePopupTab === "specifications"
                    ? styles.productInfoPopupTabActive
                    : ""
                }`}
                onClick={() => setActivePopupTab("specifications")}
              >
                Specifications
              </button>
              <button
                type="button"
                className={`${styles.productInfoPopupTab} ${
                  activePopupTab === "details"
                    ? styles.productInfoPopupTabActive
                    : ""
                }`}
                onClick={() => setActivePopupTab("details")}
              >
                Product Details
              </button>
              <button
                type="button"
                className={`${styles.productInfoPopupTab} ${
                  activePopupTab === "key_features"
                    ? styles.productInfoPopupTabActive
                    : ""
                }`}
                onClick={() => setActivePopupTab("key_features")}
              >
                Key Features
              </button>
            </div>

            <div className={`${styles.productInfoPopupBody}`}>
              {activePopupTab === "specifications" &&
                renderSpecificationsTable(specifications, true)}
              {activePopupTab === "details" && (
                <div
                  className={`${styles.productInfoPopupDetails}`}
                  dangerouslySetInnerHTML={{
                    __html: productDetails?.data?.description || "-",
                  }}
                />
              )}
              {activePopupTab === "key_features" && (
                <div className={`${styles.productInfoPopupDetails}`}>
                  <ul className={`${styles.aboutProductList}`}>
                    {productDetails?.data?.key_features?.map(
                      (feature, index) => (
                        <li key={index}>{feature}</li>
                      ),
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* <button
              type="button"
              className={`${styles.showLessButton}`}
              onClick={closeProductPopup}
            >
              SHOW LESS
            </button> */}
          </div>
        </CustomPopup>
      )}
    </div>
  );
};

export default ItemDetail;
