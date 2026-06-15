import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoClose } from "react-icons/io5";
import styles from "@/components/product-category/components/breadcrumb/Breadcrumb.module.css";
import ProductCategoriesFilter from "@/components/product-category/components/product-categories-filter/ProductCategoriesFilter";
import ProductListingToolbar, {
  SORT_OPTIONS,
} from "@/components/product-category/components/product-listing-toolbar/ProductListingToolbar";
import {
  useGetProductsByCategoryQuery,
  useGetProductsBySubCategoryQuery,
} from "@/redux/apis/categoryApi";

const humanize = (slug = "") =>
  slug
    .toString()
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const ProductCategoryList = () => {
  const router = useRouter();
  const { categorySlug, subCategory } = router?.query;

  const categoryQuery = useGetProductsByCategoryQuery(categorySlug, {
    skip: !categorySlug || !!subCategory || !router?.isReady,
  });

  const subCategoryQuery = useGetProductsBySubCategoryQuery(
    { categorySlug, subCategorySlug: subCategory },
    { skip: !categorySlug || !subCategory || !router?.isReady },
  );

  const activeQuery = subCategory ? subCategoryQuery : categoryQuery;
  const { isFetching, isError } = activeQuery;
  const products = useMemo(
    () => activeQuery.data?.data ?? [],
    [activeQuery.data],
  );

  const resultCount = products?.length;

  const categoryName = products?.[0]?.category?.name || humanize(categorySlug);
  const subCategoryName =
    products?.[0]?.subcategory?.name || humanize(subCategory);

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
      <div className={`${styles.productSection} container`}>
        <h2 className={`${styles.title}`}>{categoryName || "Products"}</h2>
        <div className={`${styles.breadcrumb}`}>
          <div style={{ margin: "16px 0" }}>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li style={{ margin: "0 8px", color: "#6c757d" }}>/</li>
              <li>
                <Link href="/">Products</Link>
              </li>
              {categorySlug && (
                <>
                  <li style={{ margin: "0 8px", color: "#6c757d" }}>/</li>
                  <li>
                    <Link href={`/product-category/${categorySlug}`}>
                      {categoryName}
                    </Link>
                  </li>
                </>
              )}
              {subCategory && (
                <>
                  <li style={{ margin: "0 8px", color: "#6c757d" }}>/</li>
                  <li>
                    <Link
                      href={`/product-category/${categorySlug}/${subCategory}`}
                    >
                      {subCategoryName}
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className={`${styles.pageLayout}`}>
          <ProductCategoriesFilter
            drawerOpen={filterOpen}
            onDrawerClose={() => setFilterOpen(false)}
            resultCount={resultCount}
          />
          <div className={`${styles.mainContent}`}>
            <ProductListingToolbar
              resultCount={resultCount}
              products={products}
              sortBy={sortBy}
              onSortChange={setSortBy}
              isLoading={isFetching}
              isError={isError}
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
