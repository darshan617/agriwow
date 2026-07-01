import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react";
import Image from "next/image";
import styles from "@/components/product-details/components/item-detail/ItemDetail.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight, FiHeart } from "react-icons/fi";
import { FaShareAlt, FaHeart, FaStar } from "react-icons/fa";
import DiscountImg from "@/assets/icon/discount.png";
import coupon from "@/assets/icon/coupon.png";
import quality from "@/assets/icon/quality.png";
import { FaShippingFast } from "react-icons/fa";
import CustomPopup from "@/components/custom-popup/CustomPopup";
import AllCoupons from "@/components/all-coupons/AllCoupons";
import "swiper/css";
import { useAddToWishlistMutation } from "@/redux/apis/addToWishlist";
import Cookies from "js-cookie";
import { useToast } from "@/custom-hooks/toast/ToastProvider";
import Link from "next/link";
import { IoPlay } from "react-icons/io5";
import { useLoginPopup } from "@/custom-hooks/login-popup/LoginPopupProvider";
import { AiOutlineRise } from "react-icons/ai";
import { FaRegCreditCard } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";

const SPECIFICATIONS_PREVIEW_COUNT = 3;
const AUTOPLAY_DELAY = 3000;
const ZOOM_LEVEL = 2.5;
const LENS_RATIO = 0.4;

const getGalleryImageSrc = (item) =>
  typeof item === "string" ? item : item?.url || item?.src || "";

const ItemDetail = ({ productDetails }) => {
  const productData = productDetails?.data;
  const gallery = productDetails?.data?.gallery ?? [];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [autoplayKey, setAutoplayKey] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [canZoom, setCanZoom] = useState(false);
  const [lensStyle, setLensStyle] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [zoomBgStyle, setZoomBgStyle] = useState({
    backgroundSize: "0px 0px",
    backgroundPosition: "0px 0px",
  });
  const isPausedRef = useRef(false);
  const imageContainerRef = useRef(null);
  const zoomPaneRef = useRef(null);
  const lastMouseEventRef = useRef(null);

  const resetAutoplay = () => setAutoplayKey((key) => key + 1);

  useEffect(() => {
    if (gallery.length <= 1) return undefined;

    const timer = setInterval(() => {
      if (isPausedRef.current) return;
      setSelectedIndex((prev) => (prev >= gallery.length - 1 ? 0 : prev + 1));
    }, AUTOPLAY_DELAY);

    return () => clearInterval(timer);
  }, [gallery.length, autoplayKey]);

  useEffect(() => {
    const checkZoomSupport = () => setCanZoom(window.innerWidth >= 992);
    checkZoomSupport();
    window.addEventListener("resize", checkZoomSupport);
    return () => window.removeEventListener("resize", checkZoomSupport);
  }, []);

  useEffect(() => {
    setIsZooming(false);
  }, [selectedIndex]);

  const handleImageMouseMove = useCallback(
    (event) => {
      if (!canZoom) return;

      lastMouseEventRef.current = event;

      const container = imageContainerRef.current;
      const zoomPane = zoomPaneRef.current;
      if (!container || !zoomPane) return;

      const { left, top, width, height } = container.getBoundingClientRect();
      const lensWidth = width * LENS_RATIO;
      const lensHeight = height * LENS_RATIO;

      const cursorX = event.clientX - left;
      const cursorY = event.clientY - top;

      const lensLeft = Math.max(
        0,
        Math.min(cursorX - lensWidth / 2, width - lensWidth),
      );
      const lensTop = Math.max(
        0,
        Math.min(cursorY - lensHeight / 2, height - lensHeight),
      );

      const zoomPaneWidth = zoomPane.offsetWidth;
      const zoomPaneHeight = zoomPane.offsetHeight;
      const bgWidth = width * ZOOM_LEVEL;
      const bgHeight = height * ZOOM_LEVEL;
      const maxBgOffsetX = Math.max(bgWidth - zoomPaneWidth, 0);
      const maxBgOffsetY = Math.max(bgHeight - zoomPaneHeight, 0);
      const bgOffsetX =
        (lensLeft / Math.max(width - lensWidth, 1)) * maxBgOffsetX;
      const bgOffsetY =
        (lensTop / Math.max(height - lensHeight, 1)) * maxBgOffsetY;

      setLensStyle({
        left: lensLeft,
        top: lensTop,
        width: lensWidth,
        height: lensHeight,
      });
      setZoomBgStyle({
        backgroundSize: `${bgWidth}px ${bgHeight}px`,
        backgroundPosition: `-${bgOffsetX}px -${bgOffsetY}px`,
      });
    },
    [canZoom],
  );

  useLayoutEffect(() => {
    if (isZooming && lastMouseEventRef.current) {
      handleImageMouseMove(lastMouseEventRef.current);
    }
  }, [isZooming, handleImageMouseMove]);

  const handleImageMouseEnter = (event) => {
    isPausedRef.current = true;
    lastMouseEventRef.current = event;
    if (canZoom && getGalleryImageSrc(gallery[selectedIndex])) {
      setIsZooming(true);
    }
  };

  const handleImageMouseLeave = () => {
    isPausedRef.current = false;
    setIsZooming(false);
  };

  const currentImageSrc = getGalleryImageSrc(gallery[selectedIndex]);
  const [isPopupVisible, setIsPopupVisible] = useState("");
  const [showCouponsDrawer, setShowCouponsDrawer] = useState(false);
  const [activePopupTab, setActivePopupTab] = useState("specifications");
  const { openLoginPopup, getIsLoggedIn } = useLoginPopup();
  const specifications = productDetails?.data?.specification ?? [];
  const visibleSpecifications = specifications.slice(
    0,
    SPECIFICATIONS_PREVIEW_COUNT,
  );

  const openProductPopup = (tab = "specifications") => {
    setActivePopupTab(tab);
    setIsPopupVisible("prdInfo");
  };

  const closeProductPopup = () => {
    setIsPopupVisible("");
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
    { icon: <FaShippingFast size={20} />, label: "Free Shipping" },
    {
      icon: (
        <Image src={quality} alt="Quality Product" width={20} height={20} />
      ),
      label: "Quality Product",
    },
    {
      icon: <FaRegCreditCard size={20} />,
      label: "Secure Payment",
    },
    {
      icon: <FaRegCalendarAlt size={20} />,
      label: "10 Days Return",
    },
  ];

  const userData = Cookies.get("userData")
    ? JSON.parse(decodeURIComponent(Cookies.get("userData")))
    : null;
  const [addToWishlist, { isLoading: isAddToWishlistLoading }] =
    useAddToWishlistMutation();
  const { showToast } = useToast();

  const handleWishlist = async (productId) => {
    if (!userData?.id) {
      showToast("Please log in to add items to your wishlist", "warning");
      return;
    }

    const res = await addToWishlist({
      body: {
        user_id: userData.id,
        product_id: productId,
      },
    });

    if (res?.data?.success || res?.data?.status) {
      showToast(res?.data?.message, "success");
    } else {
      showToast(res?.data?.message || "Failed to add to wishlist", "error");
    }
  };

  const handleShare = () => {
    navigator.share({
      title: productDetails?.data?.name,
      text: productDetails?.data?.description,
      url: `${window?.location?.origin}${window?.location?.pathname}`,
    });
  };

  const getYoutubeId = (url) => {
    const regExp =
      /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^?&/]+)/;

    const match = url?.match(regExp);
    return match ? match[1] : url;
  };

  return (
    <div className={`${styles.itemDetail} container`}>
      <div className="row">
        <div
          className={`${styles.imageDetail} col-lg-5 ${
            isZooming ? styles.imageDetailZooming : ""
          }`}
        >
          <div className={styles.imageZoomArea}>
            <div
              ref={imageContainerRef}
              className={`${styles.mainImageWrapper} ${
                isZooming ? styles.mainImageWrapperZooming : ""
              }`}
              onMouseEnter={handleImageMouseEnter}
              onMouseLeave={handleImageMouseLeave}
              onMouseMove={handleImageMouseMove}
            >
              <Image
                src={gallery[selectedIndex]}
                alt={gallery[selectedIndex]?.alt}
                className={styles.mainImage}
                width={100}
                height={100}
              />
              {isZooming && (
                <div
                  className={styles.zoomLens}
                  style={{
                    left: `${lensStyle.left}px`,
                    top: `${lensStyle.top}px`,
                    width: `${lensStyle.width}px`,
                    height: `${lensStyle.height}px`,
                  }}
                />
              )}
            <div className={`${styles.quickActions}`}>
              <button
                type="button"
                className={`${styles.quickActionBtn1}`}
                aria-label="Share product"
                onClick={handleShare}
              >
                <FaShareAlt />
              </button>
              <button
                onClick={() => {
                  if (getIsLoggedIn()) {
                    handleWishlist(productDetails?.data?.id);
                  } else {
                    openLoginPopup();
                  }
                }}
                type="button"
                className={`${styles.quickActionBtn}`}
                aria-label="Wishlist"
                disabled={isAddToWishlistLoading}
              >
                {productDetails?.data?.is_wishlist ? (
                  <FaHeart color="#e0334b " />
                ) : (
                  <FiHeart />
                )}
              </button>
            </div>
            {productDetails?.data?.video_url && (
              <button
                className={`${styles.watchVideoBtn}`}
                onClick={() => setIsPopupVisible("video")}
              >
                <IoPlay />
                <span>Watch Video</span>
              </button>
            )}
            </div>
            {isZooming && currentImageSrc && (
              <div
                ref={zoomPaneRef}
                className={styles.zoomPane}
                aria-hidden="true"
              >
                <div
                  className={styles.zoomPaneImage}
                  style={{
                    backgroundImage: `url(${currentImageSrc})`,
                    ...zoomBgStyle,
                  }}
                />
              </div>
            )}
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
              {gallery.map((item, index) => (
                <SwiperSlide key={item.id ?? index}>
                  <button
                    type="button"
                    className={`${styles.thumbButton} ${
                      selectedIndex === index ? styles.thumbButtonActive : ""
                    }`}
                    onClick={() => {
                      setSelectedIndex(index);
                      resetAutoplay();
                    }}
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

        <div className={`${styles.productInfo} col-lg-5`}>
          <h2 className={`${styles.productName}`}>
            {productDetails?.data?.name}
          </h2>
          <div
            className={`${styles.productDescription} d-flex flex-row justify-content-between`}
          >
            <div className={`${styles.productPrice}`}>
              <div className={`${styles.productReviewCount}`}>
                {productDetails?.data?.rating_summary?.average_rating > 0 && (
                  <span
                    className={`${styles.productReviewCountStar} d-inline-flex gap-1`}
                  >
                    <FaStar
                      style={{
                        color:
                          productDetails?.data?.rating_summary
                            ?.average_rating >= 1
                            ? "#ffc107"
                            : "#ccc",
                      }}
                      className={`${styles.productReviewCountStarIcon}`}
                    />
                    <FaStar
                      style={{
                        color:
                          productDetails?.data?.rating_summary
                            ?.average_rating >= 2
                            ? "#ffc107"
                            : "#ccc",
                      }}
                      className={`${styles.productReviewCountStarIcon}`}
                    />
                    <FaStar
                      style={{
                        color:
                          productDetails?.data?.rating_summary
                            ?.average_rating >= 3
                            ? "#ffc107"
                            : "#ccc",
                      }}
                      className={`${styles.productReviewCountStarIcon}`}
                    />
                    <FaStar
                      style={{
                        color:
                          productDetails?.data?.rating_summary
                            ?.average_rating >= 4
                            ? "#ffc107"
                            : "#ccc",
                      }}
                      className={`${styles.productReviewCountStarIcon}`}
                    />
                    <FaStar
                      style={{
                        color:
                          productDetails?.data?.rating_summary
                            ?.average_rating >= 5
                            ? "#ffc107"
                            : "#ccc",
                      }}
                      className={`${styles.productReviewCountStarIcon}`}
                    />
                  </span>
                )}
                {productDetails?.data?.rating_summary?.average_rating > 0 && (
                  <span className={`${styles.productReviewCountValue}`}>
                    {productDetails?.data?.rating_summary?.average_rating}
                  </span>
                )}
                {productDetails?.data?.rating_summary?.total_reviews > 0 && (
                  <span className={`${styles.productReviewCountText}`}>
                    <Link
                      href={`#review-card`}
                      className={`${styles.productReviewCountValue}`}
                      prefetch={true}
                    >
                      ({productDetails?.data?.rating_summary?.total_reviews}{" "}
                      reviews)
                    </Link>
                  </span>
                )}
                <div className={styles.priceRow}>
                  <span className={styles.currentPrice}>
                    ₹ {productDetails?.data?.selling_price.toLocaleString()}
                    <span className={styles.gsttPriceSmall}>
                      +₹
                      {(productDetails?.data?.selling_price * 0.18)
                        .toFixed(2)
                        .toLocaleString()}{" "}
                      GST
                    </span>
                  </span>

                  <span className={styles.mrpText}>
                    MRP
                    <span className={styles.oldPrice}>
                      {" "}
                      ₹ {productDetails?.data?.price.toLocaleString()}
                    </span>
                    <div className={`${styles.discountRow}`}>
                      {productDetails?.data?.price > 0 &&
                        productDetails?.data?.selling_price <
                          productDetails?.data?.price && (
                          <>
                            <span className={`${styles.discountText}`}>
                              {`${Math.round(((productDetails?.data?.price - productDetails?.data?.selling_price) / productDetails?.data?.price) * 100)}% OFF`}
                            </span>
                          </>
                        )}
                    </div>
                  </span>
                </div>
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
                      <AiOutlineRise size={25} />
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

          <div
            className={`${styles.coupon}`}
            role="button"
            tabIndex={0}
            onClick={() => setShowCouponsDrawer(true)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setShowCouponsDrawer(true);
              }
            }}
          >
            <Image src={coupon} alt="coupon" width={30} height={30} />
            <span className={`${styles.couponText}`}>All coupons & offers</span>
            <span className={`${styles.couponArrow} d-inline-flex `}>
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
                  __html: productDetails?.data?.description_html || "-",
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
                  <span className={`${styles.policyIcon}`}>{policy.icon}</span>
                  <span className={`${styles.policyLabel}`}>
                    {policy.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AllCoupons
        open={showCouponsDrawer}
        onClose={() => setShowCouponsDrawer(false)}
        productId={productData?.id}
        productName={productData?.name}
      />

      {isPopupVisible === "prdInfo" && (
        <CustomPopup onclose={closeProductPopup} wide maxWidth="600px">
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

          </div>
        </CustomPopup>
      )}
      {isPopupVisible === "video" && (
        <CustomPopup
          onclose={() => setIsPopupVisible("")}
          wide
          maxWidth="600px"
        >
          <div className={`${styles.videoPopup}`}>
            <iframe
              src={`https://www.youtube.com/embed/${getYoutubeId(productDetails?.data?.video_url)}`}
              title="YouTube video player"
              className={`${styles.videoPopupVideo}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </CustomPopup>
      )}
    </div>
  );
};

export default ItemDetail;
