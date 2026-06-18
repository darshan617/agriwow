import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoClose } from "react-icons/io5";
import styles from "@/components/product-category/components/ProductCategoryList/ProductCategoryList.module.css";
import ProductCategoriesFilter from "@/components/product-category/components/product-categories-filter/ProductCategoriesFilter";
import ProductListingToolbar, {
  SORT_OPTIONS,
} from "@/components/product-category/components/product-listing-toolbar/ProductListingToolbar";
import {
  useGetProductsByCategoryQuery,
  useGetProductsBySubCategoryQuery,
} from "@/redux/apis/categoryApi";
import Cookies from "js-cookie";

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
  const [sortBy, setSortBy] = useState("default");
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(
    Number(Cookies.get("minPrice")) || 1000,
  );
  const [maxPrice, setMaxPrice] = useState(Number(Cookies.get("maxPrice")));
  const [debouncedPriceFilter, setDebouncedPriceFilter] = useState(null);
  const [priceMaxBound, setPriceMaxBound] = useState(50000);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPriceFilter({ minPrice, maxPrice });
    }, 1500);

    return () => clearTimeout(timer);
  }, [minPrice, maxPrice]);

  const {
    data: categoryData,
    isFetching: categoryIsFetching,
    isError: categoryIsError,
  } = useGetProductsByCategoryQuery(
    {
      slug: categorySlug,
      minPrice: debouncedPriceFilter?.minPrice,
      maxPrice: debouncedPriceFilter?.maxPrice,
    },
    {
      skip:
        !categorySlug ||
        !!subCategory ||
        !router?.isReady ||
        !debouncedPriceFilter,
    },
  );

  const {
    data: subCategoryData,
    isFetching: subCategoryIsFetching,
    isError: subCategoryIsError,
  } = useGetProductsBySubCategoryQuery(
    {
      categorySlug,
      subCategorySlug: subCategory,
      minPrice: debouncedPriceFilter?.minPrice,
      maxPrice: debouncedPriceFilter?.maxPrice,
    },
    {
      skip:
        !categorySlug ||
        !subCategory ||
        !router?.isReady ||
        !debouncedPriceFilter,
    },
  );

  const activeQuery = subCategory ? subCategoryData : categoryData;

  const isFetching = subCategory ? subCategoryIsFetching : categoryIsFetching;
  const isError = subCategory ? subCategoryIsError : categoryIsError;
  const products = useMemo(() => activeQuery?.data ?? [], [activeQuery?.data]);

  const resultCount = products?.length;

  const categoryName = products?.[0]?.category?.name || humanize(categorySlug);
  const subCategoryName =
    products?.[0]?.subcategory?.name || humanize(subCategory);

  function openSort() {
    setFilterOpen(false);
    setSortOpen(true);
  }

  function openFilter() {
    setSortOpen(false);
    setFilterOpen(true);
  }

  useEffect(() => {
    if (Cookies.get("maxPrice")) {
      setMaxPrice(Cookies.get("maxPrice"));
    } else {
      setMaxPrice(
        categoryData?.price_range?.max_price ||
          subCategoryData?.price_range?.max_price,
      );
    }
  }, [categoryData, subCategoryData]);

  useEffect(() => {
    const apiMax =
      categoryData?.price_range?.max_price ||
      subCategoryData?.price_range?.max_price;

    if (apiMax && priceMaxBound === 50000) {
      setPriceMaxBound(apiMax);
    }
  }, [categoryData, subCategoryData]);
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
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            PRICE_MAX_BOUND={priceMaxBound}
          />
          <div className={`${styles.mainContent}`}>
            <ProductListingToolbar
              resultCount={resultCount}
              products={products}
              sortBy={sortBy}
              onSortChange={setSortBy}
              isLoading={isFetching}
              isError={isError}
              minPrice={minPrice}
              maxPrice={maxPrice}
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
