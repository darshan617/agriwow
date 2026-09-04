import { useEffect, useMemo, useRef, useState } from "react";
import ProductCard from "@/common-components/product-card/ProductCard";
import ProductCardShimmer from "@/common-components/product-card/ProductCardShimmer";
import Layout from "@/components/layout/Layout";
import { useGetBestSellerProductsQuery } from "@/redux/apis/productApi";
import styles from "@/components/product-category/components/product-listing-toolbar/ProductListingToolbar.module.css";
import categoryStyles from "@/components/product-category/components/ProductCategoryList/ProductCategoryList.module.css";
import Link from "next/link";
import OrderInformation from "@/components/product-category/components/order-information/OrderInformation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const PAGE_SIZE = 15;

const BestSeller = () => {
  const { data: bestSellerProducts, isLoading } =
    useGetBestSellerProductsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const listRef = useRef(null);

  const products = Array.isArray(bestSellerProducts)
    ? bestSellerProducts
    : (bestSellerProducts?.data ?? []);

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return products.slice(start, start + PAGE_SIZE);
  }, [products, currentPage]);

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  function scrollToList() {
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function goToPage(page) {
    const target = Math.min(Math.max(1, page), totalPages);
    if (target === currentPage) return;
    setCurrentPage(target);
    scrollToList();
  }

  const pageItems = useMemo(() => {
    const items = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i += 1) items.push(i);
      return items;
    }

    const left = Math.max(2, currentPage - 1);
    const right = Math.min(totalPages - 1, currentPage + 1);

    items.push(1);
    if (left > 2) items.push("left-ellipsis");
    for (let i = left; i <= right; i += 1) items.push(i);
    if (right < totalPages - 1) items.push("right-ellipsis");
    items.push(totalPages);

    return items;
  }, [currentPage, totalPages]);

  return (
    <Layout>
      <div className={`${categoryStyles.productSection} container py-5 pt-0`}>
        <h2 className={categoryStyles.title}>Best Seller</h2>
        <div className={categoryStyles.breadcrumb}>
          <div>
            <ul>
              <li>
                <Link href="/" prefetch={true}>
                  Home
                </Link>
              </li>
              <li style={{ margin: "0 8px", color: "#6c757d" }}>/</li>
              <li>Best Seller</li>
            </ul>
          </div>
        </div>
        <div ref={listRef} className={styles.bestProductListWrapper}>
          {isLoading ? (
            Array.from({ length: PAGE_SIZE }).map((_, index) => (
              <ProductCardShimmer key={index} />
            ))
          ) : paginatedProducts.length > 0 ? (
            paginatedProducts?.map((item, index) => (
              <ProductCard
                key={item?.id}
                type="productPage"
                image={item?.thumbnail}
                imageHover={item?.gallery?.[0]}
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
                similarProductData={item}
                quantity={item?.quantity}
                itemListName="Best Seller"
                itemIndex={(currentPage - 1) * PAGE_SIZE + index}
              />
            ))
          ) : (
            <p className={styles.emptyState}>No products found.</p>
          )}
        </div>
        {products.length > 0 && totalPages > 1 && (
          <div
            className={styles.paginationWrapper}
            aria-label="Best seller pagination"
          >
            <div className={styles.pagination}>
              <button
                type="button"
                className={styles.paginationButton}
                onClick={() => goToPage(currentPage - 1)}
                disabled={isFirstPage}
                aria-label="Previous page"
              >
                <FaChevronLeft />
              </button>
            </div>

            <ul className={styles.pageList}>
              {pageItems.map((item, index) => {
                if (typeof item === "string") {
                  return (
                    <li key={`${item}-${index}`}>
                      <span className={styles.pageEllipsis} aria-hidden="true">
                        …
                      </span>
                    </li>
                  );
                }

                const isActive = item === currentPage;
                return (
                  <li key={item}>
                    <button
                      type="button"
                      className={`${styles.paginationButton} ${
                        isActive ? styles.paginationButtonActive : ""
                      }`}
                      onClick={() => goToPage(item)}
                      aria-label={`Go to page ${item}`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className={styles.pagination}>
              <button
                type="button"
                className={styles.paginationButton}
                onClick={() => goToPage(currentPage + 1)}
                disabled={isLastPage}
                aria-label="Next page"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
      <OrderInformation />
    </Layout>
  );
};

export default BestSeller;
