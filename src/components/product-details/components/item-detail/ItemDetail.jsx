import React, { useState } from "react";
import Image from "next/image";
import Img1 from "@/assets/products/item1.jpg";
import Img2 from "@/assets/products/item2.jpg";
import Img3 from "@/assets/products/item3.jpg";
import Img4 from "@/assets/products/item4.jpg";
import styles from "@/components/product-details/components/item-detail/ItemDetail.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaShareAlt, FaHeart, FaStar, FaTruck, FaAward, FaLock, FaUndo } from "react-icons/fa";
import DiscountImg from "@/assets/icon/discount.png";
import rise from "@/assets/icon/rise.png";
import coupon from "@/assets/icon/coupon.png";
import shipping from "@/assets/icon/shipping.png";
import quality from "@/assets/icon/quality.png";
import secure from "@/assets/icon/payment.png";
import return1 from "@/assets/icon/return1.png";

import "swiper/css";

const ItemDetail = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const imageDetail = [
    { id: 1, image: Img1 },
    { id: 2, image: Img2 },
    { id: 3, image: Img3 },
    { id: 4, image: Img4 },
    { id: 5, image: Img4 },
  ];

  const specifications = [
    { label: "Brand", value: "NEPTUNE SIMPLIFY FARMING" },
    { label: "Material", value: "Plastic, Polyvinyl Chloride" },
    { label: "Colour", value: "Multicolour" },
    { label: "Item dimensions L x W x H", value: "25 x 17 x 31 Centimeters" },
    { label: "Style", value: "Wall Mount" },
  ];

  const policiesData = [
    { icon: shipping, label: "Free Shipping" },
    { icon: quality, label: "Quality Product" },
    { icon: secure, label: "Secure Payment" },
    { icon: return1, label: "10 Days Return" },
  ];

  return (
    <div className={`${styles.itemDetail} container`}>
      <div className="row">
        <div className={`${styles.imageDetail} col-lg-4`}>
          <div className={`${styles.mainImageWrapper}`}>
            <Image
              src={imageDetail[selectedIndex]?.image}
              alt={`Product view ${selectedIndex + 1}`}
              className={styles.mainImage}
              width={100}
              height={100}
            />
            <div className={`${styles.quickActions}`}>
              <button
                type="button"
                className={`${styles.quickActionBtn}`}
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
              {imageDetail.map((item, index) => (
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
                      src={item.image}
                      alt={`Product thumbnail ${item.id}`}
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

        <div className={`${styles.productInfo} col-lg-5`}>
          <h2 className={`${styles.productName}`}>
            Neptune Mini Hose Reel | 10M Heavy Duty Hose | <br /> Versatile
            7-in-1 Spray Nozzle with Hose Connector | <br /> Ideal for Car Wash,
            Lawn Care & Household Watering
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
                  <span className={`${styles.currentPrice}`}>₹ 2,150</span>
                  <span className={`${styles.oldPrice}`}>₹ 4,000.00</span>
                </p>
                <div
                  className={`${styles.discountRow} d-inline-flex gap-2 align-items-center`}
                >
                  <div className={`${styles.discountImg}`}>
                    <Image
                      src={DiscountImg}
                      alt="discount"
                      width={18}
                      height={18}
                    />
                  </div>
                  <span className={`${styles.discountText}`}>
                    Save ₹ 1,850.00
                  </span>
                </div>
                <div className={`${styles.boughtPeopleRow}`}>
                  <div
                    className={`${styles.discountImg} d-inline-flex align-items-center`}
                  >
                    <Image src={rise} alt="rise" width={18} height={18} />
                  </div>
                  <span className={`${styles.peopleBought}`}>
                    1502+ people bought this recently
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`${styles.stockStatus} d-inline-flex align-items-center`}
            >
              <span className={`${styles.stockStatusText}`}>In Stock</span>
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
                <li className={`${styles.aboutProductListItem}`}>
                  10 m heavy-duty hose
                </li>
                <li className={`${styles.aboutProductListItem}`}>
                  Portable & wall-mounted reel
                </li>
                <li className={`${styles.aboutProductListItem}`}>
                  7-in-1 spray nozzle
                </li>
                <li className={`${styles.aboutProductListItem}`}>
                  Quick hose connector
                </li>
                <li className={`${styles.aboutProductListItem}`}>
                  For car wash & lawn care
                </li>
                <li className={`${styles.aboutProductListItem}`}>
                  Easy household watering
                </li>
              </ul>
            </div>

            <div className={`${styles.aboutProductContent}`}>
              <h3 className={`${styles.aboutProductSubTitle}`}>
                Product Specifications
              </h3>
              <table className={`${styles.productSpecificationsTable}`}>
                <tbody>
                  {specifications.map((spec, index) => (
                    <tr key={index}>
                      <td className={`${styles.specLabel}`}>{spec.label}</td>
                      <td className={`${styles.specValue}`}>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className={`${styles.showAllButton}`}>
                Show All Specifications
              </button>
            </div>
            <div className={`${styles.aboutProductContent}`}>
              <h3 className={`${styles.aboutProductSubTitle}`}>
                Product Details
              </h3>
              <p className={`${styles.aboutProductDetailsText}`}>
                Neptune Simplify Farming Mini Garden Hose Reel is a compact,
                heavy-duty <br /> 10M hose solution designed for both portable
                use and wall mounting. <br /> Equipped with a versatile 7-in-1
                spray nozzle and durable hose connector, <br />
                it delivers smooth water flow for . Easy to use, tangle-free,
                and built... <br />
              </p>
              <button className={`${styles.showAllButton}`}>Read More</button>
            </div>
          </div>

          <div className={`${styles.policies}`}>
            <div className={`${styles.policiesGrid}`}>
              {policiesData.map((policy, index) => (
                <div key={index} className={`${styles.policyItem}`}>
                  <span className={`${styles.policyIcon}`}>
                    <Image src={policy.icon} alt={policy.label} width={20} height={20} />
                  </span>
                  <span className={`${styles.policyLabel}`}>{policy.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;