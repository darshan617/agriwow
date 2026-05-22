import React, { useState } from "react";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import styles from "@/components/product-category/components/breadcrumb/Breadcrumb.module.css";
import ProductCategoriesFilter from "@/components/product-category/components/product-categories-filter/ProductCategoriesFilter";
import ProductListingToolbar, {
  SORT_OPTIONS,
} from "@/components/product-category/components/product-listing-toolbar/ProductListingToolbar";
import { useGetHomeDataQuery } from "@/redux/apis/homeApi";

const ProductCategoryList = () => {
  const { data: homeData } = useGetHomeDataQuery();
  const products = homeData?.data?.products?.garden_tools ?? [];
  const [sortBy, setSortBy] = useState("default");
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  function openSort() {
    setFilterOpen(false);
    setSortOpen(true);
  }

  function openFilter() {
    setSortOpen(false);
    setFilterOpen(true);
  }
  return (
    <div>
      <div className="container">
        <h2 className={`${styles.title}`}>Garden & Lawn Care</h2>
        <div className={`${styles.breadcrumb} `}>
          <div  style={{ margin: "16px 0" }}>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li style={{ margin: "0 8px", color: "#6c757d" }}>/</li>
              <li>
                <Link href="/products">Products</Link>
              </li>
              <li style={{ margin: "0 8px", color: "#6c757d" }}>/</li>
              <li>
                <Link href="/products/garden-and-lawn-care">
                  Garden & Lawn Care
                </Link>
              </li>
              <li style={{ margin: "0 8px", color: "#6c757d" }}>/</li>
              <li>
                <Link href="/products/garden-tools">Garden Tools</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.pageLayout}>
          <ProductCategoriesFilter
            drawerOpen={filterOpen}
            onDrawerClose={() => setFilterOpen(false)}
          />
          <div className={styles.mainContent}>
            <ProductListingToolbar
              resultCount={products.length || 8}
              products={products}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>
        </div>

        <div className={styles.bottomBar}>
          <button
            type="button"
            className={styles.bottomBarBtn}
            onClick={openSort}
            aria-expanded={sortOpen}
          >
            Sort by
          </button>
          <button
            type="button"
            className={`${styles.bottomBarBtn} ${filterOpen ? styles.bottomBarBtnActive : ""}`}
            onClick={openFilter}
            aria-expanded={filterOpen}
          >
            Filter
          </button>
        </div>

        {sortOpen && (
          <div
            className={styles.overlay}
            onClick={() => setSortOpen(false)}
            role="presentation"
          />
        )}

        <div
          className={`${styles.sortSheet} ${sortOpen ? styles.sortSheetOpen : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="Sort products"
          aria-hidden={!sortOpen}
        >
          <div className={styles.sheetHeader}>
            <h3 className={styles.sheetTitle}>Sort by</h3>
            <button
              type="button"
              className={styles.sheetClose}
              onClick={() => setSortOpen(false)}
              aria-label="Close sort options"
            >
              <IoClose />
            </button>
          </div>
          <ul className={styles.sortList}>
            {SORT_OPTIONS.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  className={`${styles.sortOption} ${sortBy === option.value ? styles.sortOptionActive : ""}`}
                  onClick={() => {
                    setSortBy(option.value);
                    setSortOpen(false);
                  }}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryList;
