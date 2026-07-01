import ProductCard from "@/common-components/product-card/ProductCard";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/components/product-details/components/similar-product/SimilerProduct.module.css";

const AUTOPLAY_DELAY = 3000;

const getSliderConfig = (width) => {
  if (width <= 425) return { visibleCount: 2, gap: 5 };
  if (width <= 575) return { visibleCount: 2, gap: 14 };
  if (width <= 768) return { visibleCount: 2, gap: 16 };
  if (width <= 1199) return { visibleCount: 3, gap: 18 };
  if (width <= 1800) return { visibleCount: 5, gap: 20 };
  return { visibleCount: 5, gap: 20 };
};

const SimilarProduct = ({ similarProducts = [], categorySlug }) => {
  const router = useRouter();
  const visibleItems = similarProducts.slice(0, 5);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [gap, setGap] = useState(16);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoplayKey, setAutoplayKey] = useState(0);
  const trackRef = useRef(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const update = () => {
      const { visibleCount: count, gap: slideGap } = getSliderConfig(
        window.innerWidth,
      );
      setVisibleCount(count);
      setGap(slideGap);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, visibleItems.length - visibleCount);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (!visibleItems.length || maxIndex === 0) return undefined;

    const timer = setInterval(() => {
      if (isPausedRef.current) return;
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), 350);
    }, AUTOPLAY_DELAY);

    return () => clearInterval(timer);
  }, [maxIndex, autoplayKey, visibleItems.length]);

  if (!visibleItems.length) return null;

  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= maxIndex;

  const resetAutoplay = () => setAutoplayKey((key) => key + 1);

  const slide = (nextIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(nextIndex);
    resetAutoplay();
    setTimeout(() => setIsAnimating(false), 350);
  };

  const handleNext = () => {
    if (!isAtEnd) slide(currentIndex + 1);
  };

  const handlePrev = () => {
    if (!isAtStart) slide(currentIndex - 1);
  };

  const translatePct = (currentIndex / visibleCount) * 100;

  return (
    <div className="container">
      <div className={styles.title}>
        <h2 className={styles.title}>Similar Products</h2>
      </div>

      <div
        className={styles.sliderRoot}
        onMouseEnter={() => {
          isPausedRef.current = true;
        }}
        onMouseLeave={() => {
          isPausedRef.current = false;
        }}
      >
        <button
          className={`${styles.navBtn} ${styles.sideBtn} ${isAtStart ? styles.hidden : ""}`}
          onClick={handlePrev}
          aria-label="Previous"
        >
          <FaChevronLeft />
        </button>

        <div className={styles.viewport}>
          <div
            ref={trackRef}
            className={styles.track}
            style={{
              "--slide-gap": `${gap}px`,
              transform: `translateX(calc(-${translatePct}% - ${currentIndex * gap}px))`,
              transition: isAnimating
                ? "transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)"
                : "none",
            }}
          >
            {visibleItems.map((product) => {
              const computedDiscount =
                product?.price &&
                product?.selling_price &&
                product.price > product.selling_price
                  ? Math.round(
                      ((product.price - product.selling_price) /
                        product.price) *
                        100,
                    )
                  : (product?.discount ?? 0);

              return (
                <div
                  className={styles.slide}
                  key={product?.id ?? product?.slug ?? product?.name}
                  style={{
                    "--visible-count": visibleCount,
                    "--slide-gap": `${gap}px`,
                  }}
                >
                  <ProductCard
                    type="productPage"
                    slug={product?.slug}
                    image={product?.gallery?.[1]}
                    imageHover={product?.gallery?.[0]}
                    discount={computedDiscount}
                    isBestSeller={product?.is_best_selling}
                    isTrending={product?.is_trending}
                    isFeatured={product?.is_featured}
                    isTopRated={product?.is_top_rated}
                    name={product?.name}
                    price={product?.selling_price}
                    oldPrice={product?.price}
                    reviews={
                      product?.reviews?.length ?? product?.review_count ?? 0
                    }
                    average_rating={product?.average_rating}
                    productId={product?.id}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <button
          className={`${styles.navBtn} ${styles.sideBtn} ${isAtEnd ? styles.hidden : ""}`}
          onClick={handleNext}
          aria-label="Next"
        >
          <FaChevronRight />
        </button>

        <div className={styles.mobileControls}>
          <button
            className={`${styles.navBtn} ${isAtStart ? styles.hidden : ""}`}
            onClick={handlePrev}
            aria-label="Previous"
          >
            <FaChevronLeft />
          </button>
          <button
            className={`${styles.navBtn} ${isAtEnd ? styles.hidden : ""}`}
            onClick={handleNext}
            aria-label="Next"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimilarProduct;
