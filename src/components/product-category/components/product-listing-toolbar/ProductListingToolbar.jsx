import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import styles from "@/components/product-category/components/product-listing-toolbar/ProductListingToolbar.module.css";
import ProductCard from "@/common-components/product-card/ProductCard";

export const SORT_OPTIONS = [
  { value: "default", label: "Default Sorting" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
];

const INITIAL_FILTERS = [
  { id: "price", label: "Price : ₹ 10,000 - ₹ 15,000" },
  { id: "best-seller", label: "Best Seller" },
  { id: "in-stock", label: "In Stock" },
];

function ProductListingToolbar({
  resultCount = 8,
  products = [],
  sortBy: controlledSortBy,
  onSortChange,
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

  return (
    <div className={styles.toolbar}>
      <div className={styles.topRow}>
        <p className={styles.resultsText}>
          Showing <span className={styles.resultsCount}>{resultCount}</span>{" "}
          results found
        </p>

        <div className={styles.sortGroup}>
          <label className={styles.sortLabel} htmlFor="product-sort">
            Sort by:
          </label>
          <div className={styles.sortSelectWrap}>
            <select
              id="product-sort"
              className={styles.sortSelect}
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FaChevronDown className={styles.sortChevron} aria-hidden />
          </div>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className={styles.activeFiltersRow}>
          <span className={styles.activeFiltersLabel}>Active Filter</span>
          <ul className={styles.chipList}>
            {activeFilters.map((filter) => (
              <li key={filter.id}>
                <span className={styles.chip}>
                  {filter.label}
                  <button
                    type="button"
                    className={styles.chipRemove}
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
            className={styles.clearAll}
            onClick={clearAllFilters}
          >
            Clear All
          </button>
        </div>
      )}
      <div className={`${styles.productListWrapper}`}>
        
          {products.map((item) => (
              <ProductCard
                key={item?.id ?? item?.slug ?? item?.name}
                type="productPage"
                image={item?.gallery?.[0]}
                imageHover={item?.gallery?.[1]}
                discount={item?.discount}
                isBestSeller={item?.is_best_selling}
                name={item?.name}
                price={item?.selling_price}
                oldPrice={item?.price}
                reviews={item?.total_reviews}
                rating={item?.rating}
              />
          ))}
  
      </div>
    </div>  
  );
}

export default ProductListingToolbar;
