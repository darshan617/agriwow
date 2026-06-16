import ProductCard from "@/common-components/product-card/ProductCard";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/components/product-details/components/similar-product/SimilerProduct.module.css";

const SimilarProduct = ({ similarProducts = [], categorySlug }) => {
  const router = useRouter();
  const visibleItems = similarProducts.slice(0, 5);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isAnimating, setIsAnimating] = useState(false);
  const trackRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w <= 575) setVisibleCount(2);
      else if (w <= 768) setVisibleCount(2);
      else if (w <= 1199) setVisibleCount(3);
      else if (w <= 1800) setVisibleCount(5);
      else setVisibleCount(5);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!visibleItems.length) return null;

  const maxIndex = Math.max(0, visibleItems.length - visibleCount);
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= maxIndex;

  const slide = (nextIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(nextIndex);
    setTimeout(() => setIsAnimating(false), 350);
  };

  const handleNext = () => {
    if (!isAtEnd) slide(currentIndex + 1);
  };

  const handlePrev = () => {
    if (!isAtStart) slide(currentIndex - 1);
  };

  const GAP = 16;
  const translatePct = (currentIndex / visibleCount) * 100;

  return (
    <div className="container">
      <div className={styles.title}>
        <h2 className={styles.title}>Similar Products</h2>
      </div>

      <div className={styles.sliderRoot}>

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
              transform: `translateX(calc(-${translatePct}% - ${currentIndex * GAP}px))`,
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
                      ((product.price - product.selling_price) / product.price) * 100
                    )
                  : product?.discount ?? 0;

              return (
                <div
                  className={styles.slide}
                  key={product?.id ?? product?.slug ?? product?.name}
                  style={{ "--visible-count": visibleCount }}
                >
                  <ProductCard
                    type="productPage"
                    slug={product?.slug}
                    image={product?.gallery?.[0]}
                    imageHover={product?.gallery?.[1]}
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