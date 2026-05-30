import { useEffect, useMemo, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import styles from "@/components/product-category/components/product-listing-toolbar/ProductListingToolbar.module.css";
import ProductCard from "@/common-components/product-card/ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export const SORT_OPTIONS = [
  { value: "default", label: "Default Sorting" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
];

const INITIAL_FILTERS = [];

function ProductListingToolbar({
  resultCount,
  products = [],  
  sortBy: controlledSortBy,
  onSortChange,
  pageSize = 12,
  isLoading = false,
  isError = false,  
}) {
  const [internalSortBy, setInternalSortBy] = useState("default");
  const sortBy = controlledSortBy ?? internalSortBy;

  function handleSortChange(value) {
    onSortChange?.(value);
    if (controlledSortBy === undefined) {
      setInternalSortBy(value);
    }
  }
  const [activeFilters, setActiveFilters] = useState(INITIAL_FILTERS);

  function removeFilter(id) {
    setActiveFilters((prev) => prev.filter((filter) => filter.id !== id));
  }

  function clearAllFilters() {
    setActiveFilters([]);
  }

  const sortedProducts = useMemo(() => {
    const list = [...products];
    switch (sortBy) {
      case "price-low":
        return list.sort(
          (a, b) => (a?.selling_price ?? 0) - (b?.selling_price ?? 0)
        );
      case "price-high":
        return list.sort(
          (a, b) => (b?.selling_price ?? 0) - (a?.selling_price ?? 0)
        );
      case "name-asc":
        return list.sort((a, b) =>
          (a?.name ?? "").localeCompare(b?.name ?? "")
        );
      case "name-desc":
        return list.sort((a, b) =>
          (b?.name ?? "").localeCompare(a?.name ?? "")
        );
      default:
        return list;
    }
  }, [products, sortBy]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / pageSize));
  const displayCount = resultCount ?? sortedProducts.length;

  useEffect(() => {
    setCurrentPage(1);
  }, [products.length, sortBy]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedProducts.slice(start, start + pageSize);
  }, [sortedProducts, currentPage, pageSize]);

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  function goToPrevPage() {
    if (isFirstPage) return;
    setCurrentPage((page) => Math.max(1, page - 1));
  }

  function goToNextPage() {
    if (isLastPage) return;
    setCurrentPage((page) => Math.min(totalPages, page + 1));
  }

  function goToPage(page) {
    const target = Math.min(Math.max(1, page), totalPages);
    if (target === currentPage) return;
    setCurrentPage(target);
  }

  const pageItems = useMemo(() => {
    const items = [];
    const maxVisible = 5  ;

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
    <div className={`${styles.toolbar} `}>
      <div className={`${styles.topRow}`}>
        <p className={`${styles.resultsText}`}>
          Showing <span className={`${styles.resultsCount}`}>{displayCount}</span>{" "}
          results found
        </p>

        <div className={`${styles.sortGroup}`}>
          <label className={`${styles.sortLabel}`} htmlFor="product-sort">
            Sort by:
          </label>
          <div className={`${styles.sortSelectWrap}`}>
            <select
              id="product-sort"
              className={`${styles.sortSelect}`}
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FaChevronDown className={`${styles.sortChevron}`} aria-hidden />
          </div>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className={`${styles.activeFiltersRow}`}>
          <span className={`${styles.activeFiltersLabel}`}>Active Filter</span>
          <ul className={`${styles.chipList}`}>
            {activeFilters.map((filter) => (
              <li key={filter.id}>
                <span className={`${styles.chip}`}>
                  {filter.label}
                  <button
                    type="button"
                    className={`${styles.chipRemove}`}
                    onClick={() => removeFilter(filter.id)}
                    aria-label={`Remove ${filter.label} filter`}
                  >
                    <IoClose />
                  </button>
                </span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={`${styles.clearAll}`}
            onClick={clearAllFilters}
          >
            Clear All
          </button>
        </div>
      )}
      <div className={`${styles.productListWrapper}`}>
        {isLoading && products.length === 0 ? (
          <p className={`${styles.emptyState}`}>Loading products...</p>
        ) : isError ? (
          <p className={`${styles.emptyState}`}>
            No products found.
          </p>  
        ) : (
          paginatedProducts.map((item) => (
            <ProductCard
              key={item?.id ?? item?.slug ?? item?.name}
              type="productPage"
              image={item?.thumbnail ?? item?.gallery?.[0]}
              imageHover={item?.gallery?.[1] ?? item?.gallery?.[0]}
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
          ))
        )}
      </div>
      {products.length > 0 && (
        <div className={`${styles.paginationWrapper}`}>
          <div className={`${styles.pagination}`}>
            <button
              type="button"
              className={`${styles.paginationButton}`}
              onClick={goToPrevPage}
              disabled={isFirstPage}
              aria-label="Previous page"
            >
              <FaChevronLeft />
            </button>
          </div>

          <ul className={`${styles.pageList}`}>
            {pageItems.map((item, index) => {
              if (typeof item === "string") {
                return (
                  <li key={`${item}-${index}`}>
                    <span
                      className={`${styles.pageEllipsis}`}
                      aria-hidden="true"
                    >
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

          <div className={`${styles.pagination}`}>
            <button
              type="button"
              className={`${styles.paginationButton}`}
              onClick={goToNextPage}
              disabled={isLastPage}
              aria-label="Next page"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>  
  );
}

export default ProductListingToolbar;
