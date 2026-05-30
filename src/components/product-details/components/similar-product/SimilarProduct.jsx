import ProductCard from "@/common-components/product-card/ProductCard";
import { FaChevronRight } from "react-icons/fa";
import React from "react";
import { useRouter } from "next/navigation";
import styles from '@/components/product-details/components/similar-product/SimilerProduct.module.css'
const SimilarProduct = ({ categoriesData }) => {
  const router = useRouter();

  const visibleItems = categoriesData?.slice(0, 5) ?? [];

  return (
    <div className="container mt-4">
      <h2 className={`${styles.title} mb-4`}>Similar Products</h2>

      <div className={`${styles.productsRow} row `}>
        {visibleItems.map((item) => (
          <div
            className={`${styles.productItem} col-lg-2 col-md-4 col-sm-6 mb-4`}
            key={item?.id ?? item?.slug ?? item?.name}
          >
            <ProductCard
              type="productPage"
              image={item?.image ?? item?.icon ?? item?.thumbnail}
              imageHover={item?.image ?? item?.thumbnail}
              discount={item?.discount}
              isBestSeller={item?.is_best_selling}
              isTrending={item?.is_trending}
              isFeatured={item?.is_featured}
              isTopRated={item?.is_top_rated}
              name={item?.name}
              price={item?.selling_price}
              oldPrice={item?.price}
              reviews={item?.reviews?.length ?? item?.total_reviews ?? 0}
              rating={item?.rating ?? "4.5"}
            />
          </div>
        ))}

        <div className={`${styles.viewAllBtn} col-lg-2 col-md-4 col-sm-6 mb-4 d-flex align-items-center justify-content-end`}>
          <button
            className="btn btn-outline-secondary rounded-circle"
            style={{ width: "48px", height: "48px", fontSize: "20px" }}
            title="View All"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimilarProduct;  