import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import SeoHead from "@/components/seo/SeoHead";
import { buildCategorySeoFromProducts } from "@/utils/seo";
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
import { useSelector } from "react-redux";
import { trackViewItemList } from "@/utils/gtm";

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
  const requestedPage = Array.isArray(router?.query?.page)
    ? router.query.page[0]
    : router?.query?.page;
  const currentPage = Math.max(1, Number.parseInt(requestedPage, 10) || 1);
  const pageSize = 10;
  const listTrackedKey = useRef("");
  const prevListKey = useRef("");
  const [sortBy, setSortBy] = useState("default");
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(
    Number(Cookies.get("minPrice")) || 0,
  );
  const [maxPrice, setMaxPrice] = useState(Number(Cookies.get("maxPrice")));
  const [debouncedPriceFilter, setDebouncedPriceFilter] = useState(() => ({
    minPrice: Number(Cookies.get("minPrice")) || 1000,
    maxPrice: Number(Cookies.get("maxPrice")) || undefined,
  }));
  const [priceMaxBound, setPriceMaxBound] = useState(50000);
  const categories = useSelector((state) => state.category.categories);

  const setPageInUrl = (page, { replace = false } = {}) => {
    if (!router.isReady) return;
    const url = new URL(router.asPath, window.location.origin);
    if (page <= 1) {
      url.searchParams.delete("page");
    } else {
      url.searchParams.set("page", String(page));
    }
    const next = `${url.pathname}${url.search}${url.hash}`;
    if (next === router.asPath) return;
    const nav = replace ? router.replace : router.push;
    nav(next, undefined, { shallow: true, scroll: true });
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (!requestedPage) return;
    if (requestedPage === String(currentPage)) return;
    setPageInUrl(currentPage, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, requestedPage, router.isReady]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPriceFilter((prev) => {
        if (prev.minPrice === minPrice && prev.maxPrice === maxPrice) {
          return prev;
        }
        return { minPrice, maxPrice };
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, [minPrice, maxPrice]);

  const skipPricePageReset = useRef(true);
  useEffect(() => {
    if (!router.isReady) return;
    if (skipPricePageReset.current) {
      skipPricePageReset.current = false;
      return;
    }
    if (currentPage === 1) return;
    setPageInUrl(1, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPriceFilter.minPrice, debouncedPriceFilter.maxPrice]);

  // New category / subcategory → reset to page 1 (skip first mount)
  useEffect(() => {
    if (!router.isReady) return;
    const listKey = `${categorySlug || ""}/${subCategory || ""}`;
    if (!prevListKey.current) {
      prevListKey.current = listKey;
      return;
    }
    if (prevListKey.current === listKey) return;
    prevListKey.current = listKey;
    if (currentPage !== 1) {
      setPageInUrl(1, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySlug, subCategory, router.isReady]);

  const {
    data: categoryData,
    isFetching: categoryIsFetching,
    isLoading: categoryIsLoading,
    isError: categoryIsError,
  } = useGetProductsByCategoryQuery(
    {
      slug: categorySlug,
      minPrice: debouncedPriceFilter?.minPrice,
      maxPrice: debouncedPriceFilter?.maxPrice,
      page: currentPage,
      per_page: pageSize,
    },
    {
      skip: !categorySlug || !router?.isReady || !debouncedPriceFilter,
    },
  );

  const {
    data: subCategoryData,
    isFetching: subCategoryIsFetching,
    isLoading: subCategoryIsLoading,
    isError: subCategoryIsError,
  } = useGetProductsBySubCategoryQuery(
    {
      categorySlug,
      subCategorySlug: subCategory,
      minPrice: debouncedPriceFilter?.minPrice,
      maxPrice: debouncedPriceFilter?.maxPrice,
      page: currentPage,
      per_page: pageSize,
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
  const isLoading = subCategory ? subCategoryIsLoading : categoryIsLoading;
  const isError = subCategory ? subCategoryIsError : categoryIsError;
  const products = useMemo(() => activeQuery?.data ?? [], [activeQuery?.data]);
  const pagination = activeQuery?.pagination ?? activeQuery?.meta ?? null;
  const totalItems = Number(
    pagination?.total ?? pagination?.total_count ?? pagination?.totalCount ?? 0,
  );
  const totalPages = Math.max(
    1,
    Number(
      pagination?.last_page ??
        pagination?.total_pages ??
        pagination?.totalPages,
    ) || (totalItems ? Math.ceil(totalItems / pageSize) : 1),
  );
  const rangeFrom = Number(pagination?.from) || null;
  const rangeTo = Number(pagination?.to) || null;

  const isProductsPending =
    !router?.isReady ||
    !debouncedPriceFilter ||
    isLoading ||
    (isFetching && products.length === 0);

  const resultCount = totalItems || products.length;
  const categoryCount = categoryData?.data?.length;

  const categoryName = products?.[0]?.category?.name || humanize(categorySlug);
  const subCategoryName =
    products?.[0]?.subcategory?.name || humanize(subCategory);
  // Only override once product data is available so SSR title from pageProps stays in the HTML.
  const categorySeo =
    products.length > 0
      ? buildCategorySeoFromProducts(products, {
          categorySlug,
          subCategorySlug: subCategory,
          description:
            products?.[0]?.category?.meta_description ||
            products?.[0]?.subcategory?.meta_description,
          keywords:
            products?.[0]?.category?.meta_keywords ||
            products?.[0]?.subcategory?.meta_keywords,
        })
      : null;

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

  useEffect(() => {
    if (!products?.length) return;

    const listName = subCategory
      ? `${categoryName} / ${subCategoryName}`
      : categoryName || "Products";
    const trackKey = `${listName}:${products.map((p) => p?.id).join(",")}`;

    if (listTrackedKey.current === trackKey) return;
    listTrackedKey.current = trackKey;

    trackViewItemList(listName, products, categorySlug);
  }, [products, categorySlug, subCategory, categoryName, subCategoryName]);

  return (
    <div>
      {categorySeo ? <SeoHead {...categorySeo} /> : null}
      <div className={`${styles.productSection} container`}>
        <h2 className={`${styles.title}`}>{categoryName || "Products"}</h2>
        <div className={`${styles.breadcrumb}`}>
          <div>
            <ul>
              <li>
                <Link href="/" prefetch={true}>
                  Home
                </Link>
              </li>
              <li style={{ margin: "0 8px", color: "#6c757d" }}>/</li>
              <li>
                <Link
                  href={`/product-category/${categories?.[0]?.slug}`}
                  prefetch={true}
                >
                  Products
                </Link>
              </li>
              {categorySlug && (
                <>
                  <li style={{ margin: "0 8px", color: "#6c757d" }}>/</li>
                  <li>
                    <Link
                      href={`/product-category/${categorySlug}`}
                      prefetch={true}
                    >
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
                      prefetch={true}
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
            categoryCount={categoryCount}
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
              isLoading={isProductsPending}
              isFetching={isFetching}
              isError={isError}
              minPrice={minPrice}
              maxPrice={maxPrice}
              pageSize={pageSize}
              currentPage={currentPage}
              totalPages={totalPages}
              rangeFrom={rangeFrom}
              rangeTo={rangeTo}
              serverPaginated
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
