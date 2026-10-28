import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import {
  getPathnameFromAsPath,
  isPopNavigation,
  markListingPageRestorePath,
  readListingPage,
  saveListingPage,
  shouldRestoreListingPage,
} from "@/utils/listingPaginationMemory";

const humanize = (slug = "") =>
  slug
    .toString()
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const parsePageParam = (value) => {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

const getPageFromLocation = (router) => {
  const fromQuery = parsePageParam(router?.query?.page);
  if (fromQuery) return fromQuery;

  const sources = [router?.asPath];
  if (typeof window !== "undefined") {
    sources.push(window.location.href);
  }

  for (const src of sources) {
    if (!src || !String(src).includes("page=")) continue;
    try {
      const page = parsePageParam(
        new URL(src, "http://localhost").searchParams.get("page"),
      );
      if (page) return page;
    } catch {
      // ignore invalid URL
    }
  }

  return 1;
};

const getInitialListingPage = (router) => {
  const urlPage = getPageFromLocation(router);
  if (urlPage > 1) return urlPage;
  if (typeof window === "undefined") return 1;
  if (
    !isPopNavigation() ||
    !shouldRestoreListingPage(window.location.pathname)
  ) {
    return 1;
  }
  return (
    readListingPage(window.location.pathname) ||
    readListingPage(getPathnameFromAsPath(router?.asPath)) ||
    1
  );
};

const ProductCategoryList = () => {
  const router = useRouter();
  const { categorySlug, subCategory } = router?.query;
  const [currentPage, setCurrentPage] = useState(() => getInitialListingPage(router));
  const skipUrlSyncOnMount = useRef(
    typeof window !== "undefined" &&
      isPopNavigation() &&
      shouldRestoreListingPage(window.location.pathname) &&
      !parsePageParam(new URL(window.location.href).searchParams.get("page")) &&
      (readListingPage(window.location.pathname) || 1) > 1,
  );
  const restoredPageRef = useRef(
    skipUrlSyncOnMount.current ? getInitialListingPage(router) : null,
  );
  const pageSize = 12;
  const listTrackedKey = useRef("");
  const userChangedPrice = useRef(false);
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

  const setPageInUrl = useCallback(
    (page, { replace = false, scroll = false } = {}) => {
      if (!router.isReady || typeof window === "undefined") return;

      const query = { ...router.query };
      if (page <= 1) {
        delete query.page;
      } else {
        query.page = String(page);
      }

      const url = new URL(window.location.href);
      if (page <= 1) {
        url.searchParams.delete("page");
      } else {
        url.searchParams.set("page", String(page));
      }
      const as = `${url.pathname}${url.search}${url.hash}`;
      if (as === router.asPath) return;

      const nav = replace ? router.replace : router.push;
      nav({ pathname: router.pathname, query }, as, {
        shallow: true,
        scroll,
      });
    },
    [router],
  );

  const goToListingPage = useCallback(
    (page, { replace = false, scroll = false } = {}) => {
      restoredPageRef.current = null;
      setCurrentPage(page);
      saveListingPage(
        getPathnameFromAsPath(router.asPath) || window.location.pathname,
        page,
      );
      setPageInUrl(page, { replace, scroll });
    },
    [router.asPath, setPageInUrl],
  );

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

  const handleMinPriceChange = (value) => {
    userChangedPrice.current = true;
    setMinPrice(value);
  };

  const handleMaxPriceChange = (value) => {
    userChangedPrice.current = true;
    setMaxPrice(value);
  };

  useEffect(() => {
    if (!userChangedPrice.current) return;
    userChangedPrice.current = false;
    if (currentPage === 1) return;
    goToListingPage(1, { replace: true });
  }, [
    currentPage,
    debouncedPriceFilter.minPrice,
    debouncedPriceFilter.maxPrice,
    goToListingPage,
  ]);

  useEffect(() => {
    if (!router.isReady) return;

    if (skipUrlSyncOnMount.current) {
      skipUrlSyncOnMount.current = false;
      setPageInUrl(currentPage, { replace: true });
      markListingPageRestorePath("");
      return;
    }

    if (
      typeof window !== "undefined" &&
      shouldRestoreListingPage(window.location.pathname)
    ) {
      markListingPageRestorePath("");
    }

    const urlPage = getPageFromLocation(router);
    if (restoredPageRef.current && urlPage === 1) {
      setPageInUrl(restoredPageRef.current, { replace: true });
      return;
    }
    if (urlPage > 1) {
      restoredPageRef.current = null;
    }
    setCurrentPage((prev) => (prev === urlPage ? prev : urlPage));
    // Restore on back uses the first-render page; don't re-run when it changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.asPath, router.query.page, setPageInUrl]);

  useEffect(() => {
    if (!router.isReady) return;
    const path =
      getPathnameFromAsPath(router.asPath) ||
      (typeof window !== "undefined" ? window.location.pathname : "");
    saveListingPage(path, currentPage);
  }, [currentPage, router.asPath, router.isReady]);

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
  const categoryPagination =
    categoryData?.pagination ?? categoryData?.meta ?? null;
  const categoryCount = Number(
    categoryPagination?.total ??
      categoryPagination?.total_count ??
      categoryPagination?.totalCount ??
      categoryData?.data?.length ??
      0,
  );

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
      setMaxPrice(Number(Cookies.get("maxPrice")));
    } else {
      const apiMax =
        categoryData?.price_range?.max_price ||
        subCategoryData?.price_range?.max_price;
      if (apiMax != null) {
        setMaxPrice(Number(apiMax));
      }
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
            setMinPrice={handleMinPriceChange}
            setMaxPrice={handleMaxPriceChange}
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
              onPageChange={(page) => goToListingPage(page, { scroll: true })}
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
