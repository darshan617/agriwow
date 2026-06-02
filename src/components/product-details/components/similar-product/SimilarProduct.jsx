import ProductCard from "@/common-components/product-card/ProductCard";
import { FaChevronRight } from "react-icons/fa";
import React from "react";
import { useRouter } from "next/router";
import styles from "@/components/product-details/components/similar-product/SimilerProduct.module.css";

const SimilarProduct = ({ similarProducts = [], categorySlug }) => {
  const router = useRouter();
  const visibleItems = similarProducts.slice(0, 5);

  if (!visibleItems.length) {
    return null;
  }

  const handleViewAll = () => {
    if (categorySlug) {
      router.push(`/product-category/${categorySlug}`);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className={`${styles.title} mb-4`}>Similar Products</h2>

      <div className={`${styles.productsRow} row `}>
        {visibleItems.map((similar_products
) => (
          <div
            className={`${styles.productItem} col-lg-2 col-md-4 col-sm-6 mb-4`}
            key={similar_products
              ?.id ?? similar_products?.slug ?? similar_products?.name}
          >
            <ProductCard
              type="productPage"
              slug={similar_products?.slug}
              image={similar_products?.gallery?.[0]}
              imageHover={similar_products?.gallery?.[1]}
              discount={similar_products?.discount}
              isBestSeller={similar_products?.is_best_selling}
              isTrending={similar_products?.is_trending}
              isFeatured={similar_products?.is_featured}
              isTopRated={similar_products?.is_top_rated}
              name={similar_products?.name}
              price={similar_products?.selling_price}
              oldPrice={similar_products?.price}
              reviews={
                similar_products?.reviews?.length ?? similar_products?.review_count ?? 0
              }
              rating={similar_products?.rating}
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
