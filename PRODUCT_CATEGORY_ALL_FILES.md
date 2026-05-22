# AgriWow — Full Code Export (product category + layout)

> Regenerated after header CSS fix. Open this file for complete copy-paste source.

---
## src/pages/product-category/[categorySlug]/index.js

`javascript
import ProductCategoryCompnent from "@/components/product-category/ProductCategoryComponent";
import React from "react";

const ProductCategory = () => {
  return <ProductCategoryCompnent />;
};

export default ProductCategory;
`

---
## src/pages/product-category/[categorySlug]/[subCategory].js

`javascript
import ProductCategoryCompnent from '@/components/product-category/ProductCategoryComponent'
import React from 'react'

const SubCategory = () => {
  return <ProductCategoryCompnent />
}

export default SubCategory
`

---
## src/components/product-category/ProductCategoryComponent.jsx

`javascript
import React from 'react'
import Layout from '@/components/layout/Layout'
import { useGetHomeDataQuery } from '@/redux/apis/homeApi'
import ProductCategoryList from './components/breadcrumb/Breadcrumb'
import OrderInformation from './components/order-information/OrderInformation'

const ProductCategoryComponent = () => {
  const { data: homeData } = useGetHomeDataQuery()
  const categoriesData = homeData?.data?.categories

  return (
    <Layout categoriesData={categoriesData}>
      <ProductCategoryList />
      <OrderInformation />
    </Layout>
  ) 
}

export default ProductCategoryComponent
`

---
## src/components/product-category/components/breadcrumb/Breadcrumb.jsx

`javascript
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
`

---
## src/components/product-category/components/breadcrumb/Breadcrumb.module.css

`css
.title {
  color: #333;
  margin: 20px 0 -14px;
  font-size: 28px;
  font-weight: 700;
}
.breadcrumb ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin-bottom: 50px;
  font-size: 14px;
}

.pageLayout {
  align-items: flex-start;
  gap: 32px;
  padding: 24px 40px 40px;
  display: flex;
  background: #ffffff;
  border-radius: 50px 50px 0 0;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.mainContent {
  flex: 1;
  min-width: 0;
}

@media (max-width: 768px) {
  .breadcrumb ul {
    font-size: 12px;
  }
  .title {
    font-size: 25px;
  }

  .pageLayout {
    padding-bottom: 80px;
  }
}

@media (max-width: 575px) {
  .pageLayout {
    border-radius: 20px 20px 0 0;
    padding: 24px 20px 20px;
  }
  .breadcrumb ul {
    font-size: 11px;
    margin-bottom: 20px;
  }
}

@media (max-width: 425px) {
  .pageLayout {
    padding: 24px 10px 20px;
  }
}

.bottomBar {
  display: none;
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 1100;
  background: rgba(0, 0, 0, 0.45);
}

.sortSheet {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1101;
  max-height: 70vh;
  background: #ffffff;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  visibility: hidden;
  pointer-events: none;
}

.sortSheetOpen {
  transform: translateY(0);
  visibility: visible;
  pointer-events: auto;
}

.sheetHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #e8e8e8;
}

.sheetTitle {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #323333;
}

.sheetClose {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border: none;
  background: transparent;
  font-size: 22px;
  color: #545454;
  cursor: pointer;
}

.sortList {
  list-style: none;
  margin: 0;
  padding: 8px 0 24px;
  overflow-y: auto;
}

.sortOption {
  display: block;
  width: 100%;
  padding: 14px 20px;
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 400;
  font-family: inherit;
  color: #545454;
  text-align: left;
  cursor: pointer;
}

.sortOption:hover {
  background: #f5f5f5;
}

.sortOptionActive {
  color: #239c3d;
  font-weight: 600;
  background: #f0faf2;
}

@media (max-width: 768px) {
  .bottomBar {
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    gap: 12px;
    padding: 12px 16px;
    background: #ffffff;
    border-top: 1px solid #e8e8e8;
    box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.08);
  }

  .bottomBarBtn {
    flex: 1;
    padding: 12px 16px;
    font-size: 14px;
    font-weight: 600;
    font-family: inherit;
    color: #323333;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
  }

  .bottomBarBtn:hover {
    border-color: #239c3d;
    color: #239c3d;
  }

  .bottomBarBtnActive {
    border-color: #239c3d;
    color: #239c3d;
    background: #f0faf2;
  }
}
`

---
## src/components/product-category/components/product-categories-filter/ProductCategoriesFilter.jsx

`javascript
import { useState } from "react";
import { FaAngleUp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import style from "@/components/product-category/components/product-categories-filter/ProductCategoriesFilter.module.css";

const PRICE_MIN_BOUND = 1000;
const PRICE_MAX_BOUND = 200000;
const PRICE_STEP = 1000;

function formatPrice(value) {
  return new Intl.NumberFormat("en-IN").format(value);
}

function PriceRangeSlider({ minValue, maxValue, onMinChange, onMaxChange }) {
  const minPercent =
    ((minValue - PRICE_MIN_BOUND) / (PRICE_MAX_BOUND - PRICE_MIN_BOUND)) * 100;
  const maxPercent =
    ((maxValue - PRICE_MIN_BOUND) / (PRICE_MAX_BOUND - PRICE_MIN_BOUND)) * 100;

  function handleMinChange(e) {
    const value = Math.min(Number(e.target.value), maxValue - PRICE_STEP);
    onMinChange(value);
  }

  function handleMaxChange(e) {
    const value = Math.max(Number(e.target.value), minValue + PRICE_STEP);
    onMaxChange(value);
  }

  return (
    <div className={`${style.slider}`}>
      <div className={`${style.sliderTrack}`}>
        <div
          className={`${style.sliderRange}`}
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        />
      </div>
      <input
        type="range"
        className={`${style.sliderInput}`}
        min={PRICE_MIN_BOUND}
        max={PRICE_MAX_BOUND}
        step={PRICE_STEP}
        value={minValue}
        onChange={handleMinChange}
        aria-label="Minimum price"
      />
      <input
        type="range"
        className={`${style.sliderInput}`}
        min={PRICE_MIN_BOUND}
        max={PRICE_MAX_BOUND}
        step={PRICE_STEP}
        value={maxValue}
        onChange={handleMaxChange}
        aria-label="Maximum price"
      />
    </div>
  );
}

const CATEGORIES = [
  { id: "agriculture-sprayers", name: "Agriculture Sprayers", count: 68 },
  { id: "farm-equipments", name: "Farm Equipment's", count: 20 },
  {
    id: "fogging-machines",
    name: "Fogging Machines",
    count: 4,
    subcategories: [
      { id: "garden-tools-sub", name: "Garden Tools", count: 8 },
      { id: "nursery-tools", name: "Nursery Tools", count: 8 },
    ],
  },
  {
    id: "garden-lawn-care",
    name: "Garden & Lawn Care",
    count: 17,
    subcategories: [
      { id: "garden-tools-sub", name: "Garden Tools", count: 8 },
      { id: "nursery-tools", name: "Nursery Tools", count: 8 },
    ],
  },
  { id: "garden-tools", name: "Garden Tools", count: 27 },
  { id: "industrial-products", name: "Industrial Products", count: 7 },
  { id: "post-harvest", name: "Post Harvest", count: 5 },
];

function CheckboxItem({ id, name, count, isChecked, onToggle }) {
  return (
    <label className={`${style.label}`} htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        className={`${style.checkbox}`}
        checked={isChecked}
        onChange={() => onToggle(id)}
      />
      <span
        className={`${style.checkboxBox} ${isChecked ? `${style.checkboxBoxChecked}` : ""}`}
      >
        {isChecked && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M2 5l2.5 2.5L8 3"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span className={`${style.name}`}>{name}</span>
      <span className={`${style.count}`}>{String(count).padStart(2, "0")}</span>
    </label>
  );
}

function ProductCategoriesFilter({ drawerOpen = false, onDrawerClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [selected, setSelected] = useState(new Set(["agriculture-sprayers"]));
  const [minPrice, setMinPrice] = useState(10000);
  const [maxPrice, setMaxPrice] = useState(100000);

  function toggleCategory(id) {
    const next = new Set(selected);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelected(next);
  }

  return (
    <>
      {drawerOpen && (
        <div
          className={style.drawerOverlay}
          onClick={onDrawerClose}
          role="presentation"
        />
      )}
      <aside
        className={`${style.section} ${drawerOpen ? style.sectionDrawerOpen : ""}`}
      >
        {drawerOpen && (
          <div className={style.drawerHeader}>
            <h3 className={style.drawerTitle}>Filter</h3>
            <button
              type="button"
              className={style.drawerClose}
              onClick={onDrawerClose}
              aria-label="Close filters"
            >
              <IoClose />
            </button>
          </div>
        )}
      <button
        type="button"
        className={`${style.header}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className={`${style.title}`}>Product Categories</h3>
        <FaAngleUp
          className={`${style.chevron} ${!isOpen ? `${style.chevronCollapsed}` : ""}`}
        />
      </button>

      {isOpen && (
        <ul className={`${style.list}`}>
          {CATEGORIES.map((category) => {
            const isChecked = selected.has(category.id);
            const hasSubcategories =
              category.subcategories && category.subcategories.length > 0;

            return (
              <li key={category.id} className={`${style.item}`}>
                <CheckboxItem
                  id={category.id}
                  name={category.name}
                  count={category.count}
                  isChecked={isChecked}
                  onToggle={toggleCategory}
                />

                {hasSubcategories && isChecked && (
                  <ul className={`${style.subList}`}>
                    {category.subcategories.map((sub) => (
                      <li key={sub.id} className={`${style.subItem}`}>
                        {/* <CheckboxItem
                          id={sub.id}
                          name={sub.name}
                          count={sub.count}
                          isChecked={selected.has(sub.id)}
                          onToggle={toggleCategory}
                        /> */}
                        <span className={`${style.name}`}>{sub.name}</span>
                        <span className={`${style.count}`}>
                          {String(sub.count).padStart(2, "0")}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <div className={style.priceSection}>
        <button
          type="button"
          className={style.header}
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          aria-expanded={isPriceOpen}
        >
          <h3 className={style.title}>Price</h3>
          <FaAngleUp
            className={`${style.chevron} ${!isPriceOpen ? style.chevronCollapsed : ""}`}
          />
        </button>

        {isPriceOpen && (
          <div className={style.priceContent}>
            <p className={style.priceRange}>
              ₹ {formatPrice(minPrice)} - ₹ {formatPrice(maxPrice)}
            </p>
            <PriceRangeSlider
              minValue={minPrice}
              maxValue={maxPrice}
              onMinChange={setMinPrice}
              onMaxChange={setMaxPrice}
            />
          </div>
        )}
      </div>
    </aside>
    </>
  );
}

export default ProductCategoriesFilter;
`

---
## src/components/product-category/components/product-categories-filter/ProductCategoriesFilter.module.css

`css
.section {
  width: 100%;
  max-width: 320px;
  background: #ffffff;
  padding-bottom: 4px;
  position: sticky;
  top: 24px;
  align-self: flex-start;
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  z-index: 2;
}

.priceSection {
  width: 100%;
  max-width: 320px;
  background: #ffffff;
  padding-bottom: 20px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 0 14px;
  border: none;
  border-bottom: 1px solid #e8e8e8;
  background: transparent;
  cursor: pointer;
  user-select: none;
}

.title {
  font-size: 20px;
  font-weight: 700;
  color: #323333;
  margin: 0;
}

.chevron {
  font-size: 18px;
  color: #545454;
  transition: transform 0.2s ease;
}

.chevronCollapsed {
  transform: rotate(180deg);
}

.list {
  list-style: none;
  margin: 0;
  padding: 12px 0 0;
}

.item {
  margin-bottom: 14px;
}

.item:last-child {
  margin-bottom: 0;
}

.label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  width: 100%;
}

.checkbox {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.checkboxBox {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border: 1.5px solid #d0d0d0;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.checkbox:checked + .checkboxBox {
  background: #239c3d;
  border-color: #239c3d;
}

.checkIcon {
  font-size: 12px;
  color: #ffffff;
  opacity: 0;
  transition: opacity 0.15s ease;
}

.checkbox:checked + .checkboxBox .checkIcon {
  opacity: 1;
}

.name {
  flex: 1;
  font-size: 14px;
  font-weight: 400;
  color: #545454;
  line-height: 1.4;
}

.count {
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 400;
  color: #9a9a9a;
  min-width: 24px;
  text-align: right;
}

.subList {
  list-style: none;
  margin: 10px 0 0;
  padding: 0 0 0 28px;
}

.subItem {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  cursor: pointer;
}

.subItem:last-child {
  margin-bottom: 0;
}

.priceContent {
  padding-top: 14px;
}

.priceRange {
  margin: 0 0 16px;
  font-size: 14px;
  font-weight: 400;
  color: #9a9a9a;
  line-height: 1.4;
}

.slider {
  position: relative;
  height: 20px;
  display: flex;
  align-items: center;
}

.sliderTrack {
  position: absolute;
  left: 0;
  right: 0;
  height: 4px;
  background: #e8e8e8;
  border-radius: 2px;
}

.sliderRange {
  position: absolute;
  height: 4px;
  background: #239c3d;
  border-radius: 2px;
}

.sliderInput {
  position: absolute;
  width: 100%;
  height: 4px;
  margin: 0;
  padding: 0;
  pointer-events: none;
  appearance: none;
  background: transparent;
  outline: none;
  border: none;
}

.sliderInput::-webkit-slider-runnable-track {
  appearance: none;
  background: transparent;
  border: none;
}

.sliderInput::-moz-range-track {
  background: transparent;
  border: none;
}

.sliderInput::-webkit-slider-thumb {
  appearance: none;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #239c3d;
  border: none;
  cursor: pointer;
  pointer-events: all;
}

.sliderInput::-moz-range-thumb {
  pointer-events: all;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #239c3d;
  border: none;
  cursor: pointer;
}

.sliderInput:first-of-type {
  z-index: 3;
}

.sliderInput:last-of-type {
  z-index: 4;
}

@media (max-width: 1024px) {
  .section {
    max-width: 250px;
  }
}

.drawerOverlay {
  display: none;
}

.drawerHeader {
  display: none;
}

@media (max-width: 768px) {
  .section {
    display: none;
  }

  .drawerOverlay {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 1100;
    background: rgba(0, 0, 0, 0.45);
  }

  .section.sectionDrawerOpen {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1101;
    max-width: min(360px, 92vw);
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0 20px 24px;
    overflow-y: auto;
    background: #ffffff;
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.12);
    transform: translateX(-100%);
    opacity: 0;
    transition:
      transform 0.32s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.27s cubic-bezier(0.4, 0, 0.2, 1);
    animation: drawer-slide-in 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  @keyframes drawer-slide-in {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
 
  .drawerHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 1;
    padding: 16px 0;
    margin-bottom: 4px;
    background: #ffffff;
    border-bottom: 1px solid #e8e8e8;
  }

  .drawerTitle {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: #323333;
  }

  .drawerClose {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border: none;
    background: transparent;
    font-size: 22px;
    color: #545454;
    cursor: pointer;
  }

  .priceSection {
    max-width: none;
  }
}
`

---
## src/components/product-category/components/product-listing-toolbar/ProductListingToolbar.jsx

`javascript
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
`

---
## src/components/product-category/components/product-listing-toolbar/ProductListingToolbar.module.css

`css
.toolbar {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.topRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.resultsText {
  margin: 0;
  font-size: 12.5px;
  font-weight: 400;
  color: #2b2b2b;
  line-height: 1.4;
}

.resultsCount {
  color: #2b2b2b;
}

.sortGroup {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sortLabel {
  font-size: 12.5px;
  font-weight: 400;
  color: #2b2b2b;
  white-space: nowrap;
}

.sortSelectWrap {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.sortSelect {
  appearance: none;
  min-width: 200px;
  padding: 10px 36px 10px 14px;
  font-size: 12.5px;
  font-weight: 400;
  font-family: inherit;
  color: #2b2b2b;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  outline: none;
}

.sortSelect:focus {
  border-color: #239c3d;
}

.sortChevron {
  position: absolute;
  right: 12px;
  pointer-events: none;
  font-size: 12px;
  color: #2b2b2b;
}

.activeFiltersRow {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 60px;
}

.activeFiltersLabel {
  font-size: 12.5px;
  font-weight: 400;
  color: #2b2b2b;
  white-space: nowrap;
}

.chipList {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 55px;
  padding: 12px 27px;
  font-size: 12.5px;
  font-weight: 500;
  color: #ffffff;
  background: #3f8708;
  border-radius: 6px;
  line-height: 1.2;
}

.chipRemove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: transparent;
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
}

.chipRemove:hover {
  opacity: 0.85;
}

.clearAll {
  padding: 0;
  border: none;
  background: transparent;
  font-size: 12.5px;
  font-weight: 500;
  font-family: inherit;
  color: #fd8a01;
  text-decoration: underline;
  cursor: pointer;
  white-space: nowrap;
}

.clearAll:hover {
  color: #e06d0a;
}

.productListWrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  width: 100%;
}

.productListItem {
  min-width: 0;
  height: 100%;
}

.emptyState {
  grid-column: 1 / -1;
  margin: 0;
  padding: 48px 16px;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  color: #9a9a9a;
}

.swiperWrapper {
  position: relative;
  width: 100%;
}

.productsSwiper {
  width: 100%;
  padding-bottom: 4px;
}

.swiperSlide {
  height: auto;
}

.swiperNav {
  justify-content: flex-end;
  gap: 8px;
  margin-top: 20px;
  display: flex;
}

.swiperNavBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  background: none;
}

.swiperNavBtn:hover {
  background: #f0f0f0;
  border-color: #999;
}

.swiperNavBtn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

@media (max-width: 1399px) {
  .productListWrapper {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1024px) {
  .productListWrapper {
    grid-template-columns: repeat(3, 1fr);
  }

  .chip {
    gap: 10px;
    padding: 10px 15px;
    font-size: 10.5px;
  }

  .activeFiltersRow {
    flex-wrap: nowrap;
    gap: 10px;
  }
}

@media (max-width: 992px) {
  .productListWrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .sortSelect {
    min-width: 180px;
  }

  .productListWrapper {
    grid-template-columns: repeat(3, 1fr);
  }

  .sortGroup {
    display: none;
  }
}

@media (max-width: 575px) {
  .chip {
    gap: 7px;
    padding: 7px 12px;
    font-size: 10px;
  }

  .productListWrapper {
    grid-template-columns: repeat(2, 1fr);
  }

  .activeFiltersRow {
    display: none;
  }
}

@media (max-width: 480px) {
  .productListWrapper {
    grid-template-columns: repeat(2, 1fr);
  }

  .sortGroup {
    display: none;
  }

  .resultsText {
    font-size: 10px;
  }

  .resultsCount {
    font-size: 10px;
  }

  .topRow {
    justify-content: center;
  }
}

@media (max-width: 375px) {
  .productListWrapper {
    grid-template-columns: repeat(1, 1fr);
  }
}
`

---
## src/components/product-category/components/order-information/OrderInformation.jsx

`javascript
import React from "react";
import styles from "@/components/product-category/components/order-information/OrderInformation.module.css";
import shield from "@/assets/icon/shield.png";
import { FaShippingFast, FaUndo } from "react-icons/fa";
import Image from "next/image";

const OrderInformation = () => {
  return (
    <div>
      <section className={`${styles.orderInformation}`}>
        <div className="container">
          <div className="detail-section">
            <div className="row">
              <div className="col-md-4">
                <div className={`${styles.orderInformationContent}`}>
                  <FaShippingFast size={48} color="#239c3d" aria-hidden />
                  <div className={`${styles.orderInformationContentText}`}>
                    <h2>Free Shipping on Orders Over Rs.00</h2>
                    <p>
                      Enjoy free standard shipping when you spend Rs.00 or{" "}
                      <br />
                      more. No hidden fees — just more value with every order.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className={`${styles.orderInformationContent}`}>
                  <FaUndo size={48} color="#239c3d" aria-hidden />
                  <div className={`${styles.orderInformationContentText}`}>
                    <h2>Easy 30-day Returns</h2>
                    <p>
                      Changed your mind? No problem. You have 30 days <br />
                      to return your item, no questions asked.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className={`${styles.orderInformationContent}`}>
                  <Image src={shield} alt="Shield" width={60} height={60} />
                  <div className={`${styles.orderInformationContentText}`}>
                    <h2>Payment Security</h2>
                    <p>
                      Your security is our priority. All payments are encrypted{" "}
                      <br />
                      and processed securely — we never store your payment{" "}
                      <br />
                      details.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderInformation;
`

---
## src/components/product-category/components/order-information/OrderInformation.module.css

`css
.orderInformation{
    background: #258139;
    padding: 30px 0 10px;
}
.orderInformationContent{
    display: flex;
    align-items: center;
    gap: 10px;
    color: #ffffff;
}
.orderInformationContent img{
    background: #ffffff;
    border-radius: 50%;
    padding: 10px;
    position: relative;

}
.orderInformationContent h2{
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
}
.orderInformationContent p{
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
    margin-bottom: 0;
}

@media (max-width: 1024px){
    .orderInformationContent h2{
        font-size: 16px;
    }
    .orderInformationContent p{
        font-size: 12px;
    }
    .orderInformationContent p br{
        display: none;
    }
}

@media (max-width: 768px){
    .orderInformationContent h2{
        font-size: 14px;
    }
    .orderInformationContent p{
        font-size: 10px;
    }
}

@media (max-width: 575px){
    .orderInformationContent{
        padding: 15px 0;
        padding-top: 0;
    }
    .orderInformation{
        padding: 10px 0;
    }
    .orderInformationContent img{
        width: 40px;
        height: 40px;
        padding: 5px;
    }
}
`

---
## src/common-components/product-card/ProductCard.jsx

`javascript
import React from "react";
import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import { MdAddShoppingCart } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import imageHoverImage from "@/assets/images/hover-product.png";
import styles from "@/common-components/product-card/ProductCard.module.css";
const ProductCard = ({
  discount = "0",
  isBestSeller = true,
  name = "-",
  price = "0",
  oldPrice = "0",
  reviews = "0 Reviews",
  image = null,
  imageHover = imageHoverImage,
  rating = "4.5",
  type = "homePage",
}) => {
  const hoverImage = imageHover || image;
  const showHoverImage = Boolean(image && hoverImage && hoverImage !== image);

  return (
    <div
      className={`${styles.productCard}`}
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <div className={`${styles.cardTags}`}>
        <span className={`${styles.discountTag}`}>{discount}% OFF</span>
        {type === "productPage" ? (
          <button
            type="button"
            className={`${styles.wishlistBtn}`}
            aria-label="Add to wishlist"
          >
            <FiHeart />
          </button>
        ) : (
          isBestSeller && (
            <span className={`${styles.bestsellerTag}`}>BESTSELLER</span>
          )
        )}
      </div>

      <div className={`${styles.imageWrap}`}>
        <div className={`${styles.imageLayer} ${styles.imageLayerPrimary}`}>
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 575px) 45vw, (max-width: 1199px) 25vw, 20vw"
            className={`${styles.productImg}`}
          />
        </div>
        {showHoverImage && (
          <div className={`${styles.imageLayer} ${styles.imageLayerHover}`}>
            <Image
              src={hoverImage}
              alt={name}
              fill
              sizes="(max-width: 575px) 45vw, (max-width: 1199px) 25vw, 20vw"
              className={`${styles.productImg}`}
            />
          </div>
        )}
      </div>

      <div className={`${styles.cardInfo}`}>
        <div className={`${styles.ratingLine}`}>
          <span className={`${styles.ratingBadge}`}>
            <IoMdStar style={{ marginRight: 2, verticalAlign: "middle" }} />
            {rating}
          </span>
          <span className={`${styles.reviewText}`}>({reviews})</span>
        </div>

        <h3 className={`${styles.productName}`}>{name}</h3>

        <p className={`${styles.priceRow}`}>
          <span className={`${styles.currentPrice}`}>₹ {price}</span>
          <span className={`${styles.oldPrice}`}>₹ {oldPrice}</span>
        </p>
        {type === "productPage" && (
          <div className={`${styles.discountRow}`}>
            <span>Save ₹ 9200</span>
          </div>
        )}
      </div>

      <div className={`${styles.cardActions}`}>
        <button type="button" className={`${styles.addToCartBtn}`}>
          <span>
            <MdAddShoppingCart className={`${styles.btnIcon}`} />
            Add to Cart
          </span>
        </button>
        <button type="button" className={`${styles.buyNowBtn}`}>
          <span>Buy Now</span>
        </button>
        {type !== "productPage" && (
          <button
            type="button"
            className={`${styles.wishlistBtn}`}
            aria-label="Add to wishlist"
          >
            <FiHeart />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
`

---
## src/common-components/product-card/ProductCard.module.css

`css
.productCard {
  position: relative;
  background: #f2f2f2;
  border-radius: 6px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  min-height: 450px;
  transition: padding-bottom 0.25s ease;
}

.productCard:hover {
  padding-bottom: 58px;
}

.cardTags {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  min-height: 20px;
  flex-shrink: 0;
}

.discountTag {
  background: #8dba3b;
  color: #ffffff;
  font-size: 9px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 3px;
  letter-spacing: 0.3px;
}

.bestsellerTag {
  background: #fd8a01;
  color: #ffffff;
  font-size: 8px;
  font-weight: 700;
  padding: 3px 7px;
  border-radius: 3px;
  margin-left: auto;
}

.discountRow {
  display: flex;
  align-items: center;
  gap: 4px;
  /* position: absolute; */
  bottom: 20px;
  left: 0;
  right: 0;
  margin: 0;
  z-index: 1;
}

.discountRow span {
  color: #101010;
  font-size: 12px;
  font-weight: 500;
}

.imageWrap {
  position: relative;
  flex: 1 1 auto;
  min-height: 160px;
  margin-top: 4px;
  overflow: hidden;
}

.imageLayer {
  position: absolute;
  inset: 0;
  transition: opacity 0.4s ease;
}

.imageLayerPrimary {
  opacity: 1;
  z-index: 1;
}

.imageLayerHover {
  opacity: 0;
  z-index: 2;
}

.productCard:hover .imageLayerHover {
  opacity: 1;
}

.productCard:hover .imageLayerPrimary {
  opacity: 0;
}

.productImg {
  object-fit: contain;
}

.cardInfo {
  position: relative;
  height: 108px;
  margin-top: 6px;
  overflow: hidden;
  flex-shrink: 0;
  transition: height 0.25s ease;
}

.ratingLine {
  display: flex;
  align-items: center;
  gap: 6px;
  top: 0;
  left: 0;
  right: 0;
  transition: opacity 0.2s ease, transform 0.25s ease;
}

.ratingBadge {
  background: #239c3d;
  color: #ffffff;
  font-size: 9px;
  font-weight: 700;
  border-radius: 3px;
  padding: 2px 5px;
}

.reviewText {
  font-size: 10px;
  color: #6f6f6f;
  font-weight: 500;
}

.productName {
  color: #1d1d1d;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.35;
  min-height: calc(1.35em * 2);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  word-break: break-word;
  /* position: absolute; */
  top: 28px;
  left: 0;
  right: 0;
  margin: 0;
  transition: transform 0.25s ease;
}

.priceRow {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 8px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  z-index: 1;
}

.currentPrice,
.oldPrice {
  white-space: nowrap;
}

.currentPrice {
  color: #101010;
  font-size: 14px;
  font-weight: 700;
}

.oldPrice {
  color: #7d7d7d;
  font-size: 12px;
  text-decoration: line-through;
}

.productCard:hover .ratingLine {
  opacity: 0;
  transform: translateY(-8px);
  pointer-events: none;
}

.productCard:hover .productName {
  transform: translateY(-20px);
}

.productCard:hover .cardInfo {
  height: 96px;
}

.cardActions {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 6px;
  padding: 8px;
  background: rgba(242, 242, 242, 0.97);
  transform: translateY(100%);
  opacity: 0;
  transition: transform 0.25s ease, opacity 0.2s ease;
}

.productCard:hover .cardActions {
  transform: translateY(0);
  opacity: 1;
}

.addToCartBtn,
.buyNowBtn {
  cursor: pointer;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  position: relative;
  overflow: hidden;
}

.addToCartBtn::before,
.buyNowBtn::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -60%;
  width: 50%;
  height: 200%;
  transform: skewX(-20deg) translateX(-100%);
  transition: transform 0.4s ease;
  z-index: 0;
}

.addToCartBtn span,
.buyNowBtn span {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 4px;
}

.addToCartBtn {
  background: transparent;
  color: #1ea53b;
  border: 1px solid #1ea53b;
  transition: color 0.3s ease;
}

.addToCartBtn::before {
  background: #1ea53b;
}



.addToCartBtn:hover::before {
  transform: skewX(-20deg) translateX(400%);
}

.buyNowBtn {
  background: #239c3d;
  color: #ffffff;
  border: none;
  transition: color 0.3s ease;
}

.buyNowBtn::before {
  background: rgba(255, 255, 255, 0.18);
}

.buyNowBtn:hover::before {
  transform: skewX(-20deg) translateX(400%);
}

.btnIcon {
  font-size: 14px;
}

.wishlistBtn {
  border: none;
  border-radius: 3px;
  width: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #6f6f6f;
  cursor: pointer;
  font-size: 14px;
  background: transparent;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.wishlistBtn:hover {
  color: #e0334b;
  border-color: #e0334b;
}

@media (max-width: 1199px) {
  .productCard {
    padding: 8px 8px 10px;
  }
}

@media (max-width: 1024px) {
  .imageWrap {
    min-height: 130px;
  }
}

@media (max-width: 992px) {
  .productCard {
    min-height: 350px;
  }
}

@media (max-width: 575px) {
  .productCard:hover {
    padding-bottom: 15px;
  }

  .productCard:hover .cardInfo {
    height: auto;
  }

  .productCard:hover .ratingLine,
  .ratingLine {
    opacity: 1;
    transform: none;
    pointer-events: auto;
  }

  .productCard:hover .productName,
  .productName {
    transform: none;
  }

  .productCard:hover .priceRow,
  .priceRow {
    opacity: 1;
    transform: none;
    pointer-events: auto;
  }

  .cardInfo {
    position: static;
    height: auto;
    overflow: visible;
  }

  .ratingLine,
  .productName,
  .priceRow {
    position: static;
  }

  .priceRow {
    margin-top: 8px;
  }

  .cardActions,
  .productCard:hover .cardActions {
    position: static;
    transform: none;
    opacity: 1;
    margin-top: 10px;
    padding: 0;
    background: transparent;
  }

  .addToCartBtn,
  .buyNowBtn {
    padding: 7px 0;
    font-size: 13px;
  }
}

@media (max-width: 768px) {
  .productCard {
    min-height: 320px;
  }

  .addToCartBtn,
  .buyNowBtn {
    padding: 7px 0;
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .productName {
    font-size: 13px;
  }

  .currentPrice {
    font-size: 13px;
  }

  .addToCartBtn,
  .buyNowBtn {
    padding: 7px 0;
    font-size: 9px;
  }
}
`

---
## src/components/layout/Layout.jsx

`javascript
import React from "react";
import TopHeader from "@/components/layout/top-header/TopHeader";
import TopBanner from "@/components/layout/top-banner/TopBanner";
import Footer from "@/components/layout/footer/Footer";
import styles from "@/components/layout/Layout.module.css";

const Layout = ({ children, categoriesData }) => (
  <div className={styles.page}>
    <TopHeader />
    {categoriesData?.length > 0 && (
      <TopBanner categoriesData={categoriesData} />
    )}
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
`

---
## src/components/layout/Layout.module.css

`css
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page main {
  flex: 1;
  /* Clear fixed promo bar (~60px) + main header (~70px) */
  padding-top: 130px;
}

@media (max-width: 768px) {
  .page main {
    padding-top: 110px;
  }
}

@media (max-width: 575px) {
  .page main {
    padding-top: 100px;
  }
}
`

---
## src/components/layout/top-header/TopHeader.jsx

`javascript
import React, { useEffect, useState } from "react";
import Header from "@/components/layout/header/Header";
import {
  TopHeaderLeftLinks,
  TopHeaderHelp,
  TopHeaderSocial,
} from "@/components/layout/top-header/TopHeaderExtras";
import styles from "@/components/layout/top-header/TopHeader.module.css";

const SCROLL_THRESHOLD = 20;

const TopHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > SCROLL_THRESHOLD);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={styles.siteHeader}>
      <div className={`${styles.topHeaderBar} ${scrolled ? styles.collapsed : ""}`}>
        <div className="container">
          <div className={styles.TopHeader}>
            <div className="col-md-4">
              <div className={`${styles.topHeaderBarExtras} d-flex flex-row`}>
                <TopHeaderLeftLinks />
              </div>
            </div>
            <div className="col-md-4 d-flex flex-row justify-content-center">
              <div className={`${styles.topHeaderCenter} d-flex flex-row gap-2`}>
                <div className={styles.topHeaderTicker}>
                  <p className="text-center m-0 ">
                    Sale Up to <span>60% Off</span> on Everything*
                  </p>
                </div>
                <button className={styles.shopNowButton}>Shop Now</button>
              </div>
            </div>
            <div
              className={`col-md-4 d-flex flex-row justify-content-end gap-3 ${styles.topHeaderBarExtras}`}
            >
              <TopHeaderHelp />
              <TopHeaderSocial />
            </div>
          </div>
        </div>
      </div>
      <Header scrolled={scrolled} />
    </div>
  );
};

export default TopHeader;
`

---
## src/components/layout/top-header/TopHeaderExtras.jsx

`javascript
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import styles from "@/components/layout/top-header/TopHeader.module.css";

export const TopHeaderLeftLinks = () => (
  <div className={styles.topHeaderLeft}>
    <ul className="d-flex gap-3">
      <li><Link href="#">About</Link></li>
      <li><Link href="#">Shipping & Returns</Link></li>
      <li><Link href="#">My Account</Link></li>
    </ul>
  </div>
);

export const TopHeaderHelp = () => (
  <div className={styles.topHeaderRight}>
    <h2>Need Help?</h2>
    <Link href="tel:+91 9229297668">+91 9229297668</Link>
  </div>
);

export const TopHeaderSocial = () => (
  <div className={`${styles.socialIcons} d-flex flex-row gap-1`}>
    <FaFacebookF className={styles.topHeaderRightIcon} />
    <FaXTwitter className={styles.topHeaderRightIcon} />
    <FaInstagram className={styles.topHeaderRightIcon} />
  </div>
);

const TopHeaderExtras = ({ variant = "bar" }) => (
  <div className={variant === "drawer" ? styles.drawerExtras : undefined}>
    <TopHeaderLeftLinks />
    <TopHeaderHelp />
    <TopHeaderSocial />
  </div>
);

export default TopHeaderExtras;
`

---
## src/components/layout/top-header/TopHeader.module.css

`css
.siteHeader {
    position: relative;
    width: 100%;
    z-index: 200;
}

.topHeaderBar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 201;
    height: auto;
    overflow: hidden;
    background: #f0f0f0;
    border-bottom: 1px solid #e8e8e8;
    transition:
        max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
        opacity 0.35s ease,
        border-color 0.35s ease;
}

.collapsed {
    max-height: 0;
    opacity: 0;
    border-bottom-color: transparent;
    pointer-events: none;
}

.TopHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    max-width: 100%;
}

.topHeaderLeft ul {
    color: #323333;
    margin: 0;
    padding: 0;
    font-size: 13px;
    list-style: none;
    font-weight: 500;
}

.topHeaderLeft a:hover {
    color: #239c3d;
}

.topHeaderCenter {
    list-style: none;
    font-size: 16px;
    color: #323333;
    align-items: center;
}

.topHeaderCenter span {
    font-weight: 700;
    text-decoration: underline;
}

.topHeaderTickerWrapper {
    overflow: hidden;
}

.shopNowButton {
    background: linear-gradient(to right, #f6c417, #8dba3b);
    border: 1px solid #323333;
    padding: 10px 18px;
    height: auto;
    border-radius: 5px;
    font-size: 12px;
    font-weight: 600;
    line-height: 1.2;
    cursor: pointer;
    transition: all 0.3s ease;
}

.topHeaderRight h2 {
    color: #5a5a5a;
    margin: 0;
    font-size: 13px;
    line-height: 1.2;
    font-weight: 500;
}

.topHeaderRight {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}

.socialIcons {
    align-items: center;
}

.topHeaderRight a {
    color: #239c3d;
    margin-bottom: 0;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.2;
    text-decoration: none;
}

.topHeaderRightIcon {
    color: #239c3d;
    cursor: pointer;
    box-sizing: content-box;
    border: 1px solid #239c3d;
    border-radius: 2px;
    padding: 2px;
    font-size: 17px;
    transition: all .3s;
}

.topHeaderTicker p {
    animation: verticalTicker 3s linear infinite;
    font-size: 18px;
}

@keyframes verticalTicker {
    0% {
        transform: translateY(100%);
        opacity: 0;
    }

    10% {
        transform: translateY(0);
        opacity: 1;
    }

    80% {
        transform: translateY(0);
        opacity: 1;
    }

    100% {
        transform: translateY(-100%);
        opacity: 0;
    }
}

@media (max-width: 1024px) {
    .topHeaderLeft ul {
        font-size: 10px;
        gap: 0.75rem !important;
        flex-wrap: wrap;
    }

    .topHeaderTicker p {
        font-size: 13px;
    }

    .shopNowButton {
        padding: 8px 14px;
        font-size: 11px;
    }

    .topHeaderRight h2 {
        font-size: 10px;
    }

    .topHeaderRight a {
        font-size: 12px;
    }

    .topHeaderRightIcon {
        font-size: 12px;
    }
}

@media (max-width: 768px) {
    .topHeaderBar {
        max-height: 140px;
    }

    .topHeaderBar.collapsed {
        max-height: 0;
    }

    .TopHeader> :global(.col-md-4) {
        flex: 1 1 100%;
        max-width: 100%;
        width: 100%;
    }


    .topHeaderLeft ul {
        width: 100%;
    }

    .topHeaderCenter {
        flex-direction: column;
        width: 100%;
        justify-content: center;
        align-items: center;
        gap: 8px !important;
    }

    .topHeaderTicker p {
        font-size: 12px;
    }

    .topHeaderRight {
        align-items: center;
        width: 100%;
    }

    .TopHeader> :global(.col-md-4.d-flex) {
        justify-content: center !important;
    }

    .socialIcons {
        justify-content: center;
    }

    .shopNowButton {
        padding: 7px 9px;
        font-size: 9px;
        width: 100px;
    }
}

@media (max-width: 575px) {
    .topHeaderBar {
        max-height: 56px;
    }

    .topHeaderBar.collapsed {
        max-height: 0;
    }

    .TopHeader {
        flex-direction: column;
        align-items: center;
        padding: 8px 0;
        justify-content: left;
    }

    .topHeaderCenter {
        align-items: center;
        gap: 50px !important;
    }

    .topHeaderTicker p {
        font-size: 11px;
    }

    .topHeaderLeft ul {
        display: none;
    }

    .topHeaderBar .topHeaderBarExtras {
        display: none !important;
    }
}

@media (max-width: 480px) {
    .drawerExtras .topHeaderLeft a {
        font-size: 13px !important;
        font-weight: 600;
    }
}

.drawerExtras {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 0 18px;
}

.drawerExtras .topHeaderLeft ul {
    display: flex;
    flex-direction: column-reverse;
    gap: 0;
    width: 100%;
    margin: 0;
    padding: 0;
}

.drawerExtras .topHeaderLeft li {
    list-style: none;
    border-bottom: 1px solid #ececec;
}

.drawerExtras .topHeaderLeft a {
    display: block;
    padding: 12px 0;
    font-size: 11px;
    color: #323333;
    text-decoration: none;
}

.drawerExtras .topHeaderRight {
    align-items: flex-start;
    width: 100%;
}

.drawerExtras .topHeaderRight h2 {
    font-size: 12px;
    margin-bottom: 10px;
}

.drawerExtras .topHeaderRight a {
    font-size: 14px;
}

.drawerExtras .socialIcons {
    justify-content: flex-start;
    gap: 8px !important;
}

.drawerExtras .topHeaderRightIcon {
    font-size: 14px;
    padding: 4px;
}
`

---
## src/components/layout/header/Header.jsx

`javascript
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/assets/images/logo.png'
import { BiSearch } from 'react-icons/bi'
import { FaUserCircle, FaHeart, FaShoppingCart } from 'react-icons/fa'
import { IoClose, IoChevronDown } from 'react-icons/io5'
import { IoMdStar } from 'react-icons/io'
import menu from '@/assets/icon/menu.png'
import TopHeaderExtras from '@/components/layout/top-header/TopHeaderExtras'
import styles from '@/components/layout/header/Header.module.css'
import { useGetMenuProductDataQuery } from '@/redux/apis/homeApi'

const NAV_LINKS = [
    { href: '#', label: 'Home' },
    { href: '#', label: 'Products' },
    { href: '#', label: 'Blogs' },
    { href: '#', label: 'Contact us' },
]

const renderMenuProductColumns = (menuProductData, { linkClassName, onLinkClick } = {}) => (
    <>
        {menuProductData?.data?.AllCategory?.slice(0, 5)?.map((item) => (
            <div
                key={item?.name}
                className={`${styles.megaColumn} ${item?.name === 'Top Rating' ? styles.megaColumnTopRating : ''}`}
            >
                <p className={styles.megaColumnTitle}>{item?.name}</p>
                <ul className={styles.megaList}>
                    {item?.subcategories?.map((link) => (
                        <li key={link?.slug ?? link?.name}>
                            <Link
                                href={link?.slug ?? '#'}
                                className={linkClassName}
                                onClick={onLinkClick}
                            >
                                {link?.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        ))}
        <div className={styles.megaColumn}>
            <h2 className={styles.megaColumnTitle}>Best Seller</h2>
            <ul className={styles.megaList}>
                {menuProductData?.data?.Product?.map((prd) => (
                    <li key={prd?.id ?? prd?.slug ?? prd?.name}>
                        <Link
                            href={prd?.slug ?? '#'}
                            className={styles.megaProductCard}
                            onClick={onLinkClick}
                        >
                            <div className={styles.megaProductImage}>
                                <Image
                                    src={prd.thumbnail}
                                    alt={prd.name ?? prd.subcategory_name ?? 'Product'}
                                    width={72}
                                    height={72}
                                />
                            </div>
                            <div className={styles.megaProductInfo}>
                                {prd.name && (
                                    <p className={styles.megaProductName}>{prd.name}</p>
                                )}
                                <span className={styles.megaProductRating}>
                                    <IoMdStar aria-hidden />
                                    {prd.total_reviews}
                                </span>
                                <p className={styles.megaProductPrice}>₹ {prd.selling_price}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </>
)

const Header = ({ scrolled: scrolledFromParent }) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [productsExpanded, setProductsExpanded] = useState(false)
    const [scrolledLocal, setScrolledLocal] = useState(false)
    const scrolled = scrolledFromParent ?? scrolledLocal
    const navRef = useRef(null)
    const { data: menuProductData } = useGetMenuProductDataQuery()
    const closeMenu = () => setMenuOpen(false)

    useEffect(() => {
        if (scrolledFromParent !== undefined) return undefined
        const onScroll = () => setScrolledLocal(window.scrollY > 10)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [scrolledFromParent])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                closeMenu()
            }
        }
        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [menuOpen])

    useEffect(() => {
        if (!menuOpen) return
        const onKeyDown = (e) => { if (e.key === 'Escape') closeMenu() }
        document.addEventListener('keydown', onKeyDown)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', onKeyDown)
            document.body.style.overflow = ''
        }
    }, [menuOpen])

    useEffect(() => {
        if (!menuOpen) setProductsExpanded(false)
    }, [menuOpen])

    return (
        <header className={`${styles.headerOuter} ${scrolled ? styles.scrolled : ''}`}>
            <div className={`container`}>
                <div className={`${styles.headerContainer}`}>
                    <div className={`${styles.logoWrap}`}>
                        <Image src={logo} alt="Agriwow logo" width={800} priority />
                    </div>

                    <nav className={`${styles.navLinksDesktop}`}>
                        {NAV_LINKS.map((item) => (
                            item.label === 'Products' ? (
                                <div key={item.label} className={styles.navItemWithMegaMenu}>
                                    <Link href={item.href}>{item.label}</Link>
                                </div>
                            ) : (
                                <Link key={item?.label} href={item?.href}>{item?.label}</Link>
                            )
                        ))}
                    </nav>

                    <div className={`${styles.searchWrap}`}>
                        <input
                            type="text"
                            className={`${styles.searchInput}`}
                            placeholder="Search Product, Category, Brands..."
                        />
                        <button type="button" className={`${styles.searchBtn}`} aria-label="Search">
                            <BiSearch size={17} />
                        </button>
                    </div>

                    <div className={`${styles.actions}`}>
                        <button type="button" className={styles.iconBtn} aria-label="Account">
                            <FaUserCircle size={21} />
                        </button>
                        <button type="button" className={`${styles.iconBtn}`} aria-label="Wishlist">
                            <FaHeart size={21} />
                            <span className={styles.badge}>0</span>
                        </button>
                        <button type="button" className={`${styles.iconBtn}`} aria-label="Cart">
                            <FaShoppingCart size={21} />
                            <span className={styles.badge}>0</span>
                        </button>
                        <button
                            type="button"
                            className={`${styles.menuToggle}`}
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            onClick={() => setMenuOpen((open) => !open)}
                        >
                            <Image src={menu} alt="" width={17} height={17} />
                        </button>
                    </div>

                    <div
                        className={styles.megaDropdown}
                        id="mega-products-menu"
                        role="navigation"
                        aria-label="Product categories"
                    >
                        <div className={`${styles.megaInner}`}>
                            <div className={styles.megaGrid}>
                                {renderMenuProductColumns(menuProductData)}
                            </div>
                            <div className={styles.megaViewAllWrap}>
                                <Link href="#" className={styles.megaViewAllBtn}>
                                    View All Product
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {menuOpen && (
                <div className={`${styles.menuOverlay}`} onClick={closeMenu} />
            )}

            <aside
                ref={navRef}
                className={`${styles.navDrawer} ${menuOpen ? styles.open : ''}`}
            >
                <div className={`${styles.drawerHeader}`}>
                    <Image src={logo} alt="Agriwow logo" width={120} priority />
                    <button type="button" className={`${styles.drawerClose}`} onClick={closeMenu} aria-label="Close">
                        <IoClose size={26} />
                    </button>
                </div>
                <div className={`${styles.drawerLinks}`}>
                    {NAV_LINKS.map((item) =>
                        item.label === 'Products' ? (
                            <div key={item.label} className={styles.drawerNavItem}>
                                <button
                                    type="button"
                                    className={`${styles.drawerProductsToggle} ${productsExpanded ? styles.drawerProductsToggleOpen : ''}`}
                                    onClick={() => setProductsExpanded((open) => !open)}
                                    aria-expanded={productsExpanded}
                                    aria-controls="drawer-mega-products"
                                >
                                    {item.label}
                                    <IoChevronDown
                                        size={18}
                                        className={styles.drawerProductsChevron}
                                        aria-hidden
                                    />
                                </button>
                                <div
                                    id="drawer-mega-products"
                                    className={styles.drawerMegaDropdown}
                                    role="navigation"
                                    aria-label="Product categories"
                                    hidden={!productsExpanded}
                                >
                                    <div className={styles.drawerMegaGrid}>
                                        {renderMenuProductColumns(menuProductData, {
                                            linkClassName: styles.drawerMegaLink,
                                            onLinkClick: closeMenu,
                                        })}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link key={item.label} href={item.href} onClick={closeMenu}>
                                {item.label}
                            </Link>
                        )
                    )}
                </div>
                <div className={`${styles.drawerTopExtras}`}>
                    <TopHeaderExtras variant="drawer" />
                </div>
            </aside>
        </header>
    )
}

export default Header
`

---
## src/components/layout/header/Header.module.css

`css
   .headerOuter {
       position: fixed;
       top: 60px;
       left: 0;
       right: 0;
       width: 100%;
       z-index: 200;
       background: #ffffff;
       border-bottom: 1px solid #e8e8e8;
       box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
       transition:
           top 0.3s ease,
           box-shadow 0.35s ease,
           background 0.35s ease,
           backdrop-filter 0.35s ease;
   }

   .scrolled {
       top: 0;
       background: rgba(255, 255, 255, 0.932);
       backdrop-filter: blur(20px);
       -webkit-backdrop-filter: blur(20px);
       box-shadow: 0 2px 16px rgba(0, 0, 0, 0.10);
   }

   .headerContainer {
       position: relative;
       display: flex;
       align-items: center;
       gap: 32px;
       padding: 18px 0;
       min-height: 64px;
       flex-wrap: nowrap;
       transition:
           padding 0.4s cubic-bezier(0.4, 0, 0.2, 1),
           gap 0.4s cubic-bezier(0.4, 0, 0.2, 1);
   }

   .scrolled .headerContainer {
       padding: 12px 0;
       min-height: 56px;
   }

   .scrolled .megaDropdown {
       top: 60px;
   }

   .logoWrap {
       position: relative;
       z-index: 2;
       flex: 0 0 auto;
       display: flex;
       align-items: center;
   }

   .logoWrap img {
       width: 250px !important;
       height: auto !important;
       display: block;
       margin-top: -10px;
       transform: translateZ(0);
   }

   .scrolled .logoWrap img {
       width: 160px !important;
   }

   .navLinksDesktop {
       display: flex;
       align-items: center;
       align-self: stretch;
       flex: 0 0 auto;
       gap: 36px;
       margin-left: auto;
       white-space: nowrap;
   }

   .navLinksDesktop a {
       font-size: 14px;
       font-weight: 600;
       color: #545454;
       text-transform: capitalize;
       transition: color 0.2s ease;
   }

   .navLinksDesktop>a:first-child {
       color: #7ac043;
   }

   .navLinksDesktop a:hover {
       color: #7ac043;
   }

   .navItemWithMegaMenu {
       position: relative;
       display: flex;
       align-items: center;
       align-self: stretch;
   }

   .megaDropdown {
       position: fixed;
       top: 130px;
       left: 0;
       width: 100vw;
       background: #ffffff;
       border-top: 2px solid #7ac043;
       box-shadow: 0 16px 40px rgba(0, 0, 0, 0.10);
       opacity: 0;
       visibility: hidden;
       pointer-events: none;
       transition:
           opacity 0.22s ease,
           visibility 0.22s ease,
           top 0.4s cubic-bezier(0.4, 0, 0.2, 1);
       z-index: 199;
   }

   .navItemWithMegaMenu::after {
       content: "";
       position: absolute;
       left: 0;
       top: 100%;
       width: 100%;
       height: 20px;
   }

   .headerContainer:has(.navItemWithMegaMenu:hover) .megaDropdown,
   .headerContainer:has(.navItemWithMegaMenu:focus-within) .megaDropdown,
   .headerContainer:has(.megaDropdown:hover) .megaDropdown {
       opacity: 1;
       visibility: visible;
       pointer-events: auto;
   }

   .megaInner {
       padding: 40px 50px 32px;
   }

   .megaGrid {
       display: grid;
       grid-template-columns: repeat(6, 1fr);
       gap: 28px 40px;
   }

   .megaColumn {
       min-width: 0;
   }

   .megaColumnTitle {
       display: block;
       margin: 0 0 14px;
       padding-bottom: 10px;
       border-bottom: 1px solid #ececec;
       font-size: 15px;
       font-weight: 700;
       color: #eeb31e;
       line-height: 1.3;
   }

   .megaList {
       list-style: none;
       margin: 0;
       padding: 0;
       display: flex;
       flex-direction: column;
       gap: 10px;
   }

   .megaList a:hover {
       color: #239c3d;
   }

   .megaList li {
       min-width: 0;
   }

   .megaLink {
       font-size: 13px;
       font-weight: 500;
       color: #545454;
       line-height: 1.4;
       transition: color 0.18s ease, padding-left 0.18s ease;
       max-width: 100%;
       overflow: hidden;
       text-overflow: ellipsis;
       display: -webkit-box;
       -webkit-line-clamp: 1;
       -webkit-box-orient: vertical;
       word-break: break-word;
   }

   .megaLink:hover {
       color: #7ac043;
       padding-left: 4px;
   }

   .megaProductCard {
       display: flex;
       align-items: flex-start;
       gap: 10px;
       text-decoration: none;
       transition: opacity 0.18s ease;
       margin-bottom: 10px;
   }

   .megaProductCard:hover {
       opacity: 0.85;
   }

   .megaProductImage {
       flex-shrink: 0;
       width: 72px;
       height: 72px;
       border-radius: 6px;
       overflow: hidden;
       background: #f2f2f2;
   }

   .megaProductImage img {
       width: 100%;
       height: 100%;
       object-fit: contain;
   }

   .megaProductInfo {
       display: flex;
       flex-direction: column;
       gap: 4px;
   }

   .megaProductRating {
       display: inline-flex;
       align-items: center;
       gap: 3px;
       align-self: flex-start;
       background: #239c3d;
       color: #ffffff;
       font-size: 10px;
       font-weight: 700;
       border-radius: 3px;
       padding: 2px 6px;
       line-height: 1.2;
   }

   .megaProductName {
       margin: 0;
       font-size: 14px;
       font-weight: 500;
       color: #1f1f1f;
       line-height: 1.35;
       display: -webkit-box;
       -webkit-line-clamp: 1;
       -webkit-box-orient: vertical;
       overflow: hidden;
   }

   .megaProductPrice {
       margin: 0;
       font-size: 14px;
       font-weight: 700;
       color: #101010;
   }

   .megaViewAllWrap {
       display: none;
   }

   .megaViewAllBtn {
       border: 0;
       background: none;
       color: #239c3d;
       font-size: 15px;
       font-weight: 700;
       text-decoration: underline;
       text-underline-offset: 4px;
       cursor: pointer;
       padding: 8px 12px;
       transition: color 0.2s ease;
   }

   .megaViewAllBtn:hover {
       color: #1a7a30;
   }

   .searchWrap {
       flex: 0 1 480px;
       width: 100%;
       max-width: 480px;
       min-width: 200px;
       position: relative;
       display: flex;
       align-items: center;
   }

   .searchInput {
       width: 100%;
       height: 38px;
       padding: 0 44px 0 16px;
       font-size: 12px;
       color: #3a3a3a;
       background: #f3f3f3;
       border: 1px solid #d0d0d0;
       border-radius: 6px;
       outline: none;
       transition: border-color 0.2s ease, background 0.2s ease;
   }

   .searchInput::placeholder {
       color: #aaaaaa;
   }

   .searchInput:focus {
       background: #ebebeb;
       border-color: #7ac043;
   }

   .searchBtn {
       position: absolute;
       top: 50%;
       right: 10px;
       transform: translateY(-50%);
       display: flex;
       align-items: center;
       justify-content: center;
       width: 28px;
       height: 28px;
       color: #6e6e6e;
       background: none;
       border: none;
       cursor: pointer;
       transition: color 0.2s ease;
   }

   .searchBtn:hover {
       color: #7ac043;
   }

   .actions {
       display: flex;
       align-items: center;
       flex: 0 0 auto;
       gap: 18px;
   }

   .iconBtn {
       position: relative;
       display: flex;
       align-items: center;
       justify-content: center;
       width: 26px;
       height: 26px;
       border: none;
       background: transparent;
       color: #5c5c5c;
       cursor: pointer;
       transition: color 0.2s ease;
   }

   .iconBtn:hover {
       color: #7ac043;
   }

   .badge {
       position: absolute;
       top: -5px;
       right: -6px;
       display: flex;
       align-items: center;
       justify-content: center;
       min-width: 14px;
       height: 14px;
       border-radius: 7px;
       padding: 0 2px;
       background: #7ac043;
       color: #ffffff;
       font-size: 9px;
       font-weight: 700;
       line-height: 1;
   }

   .menuToggle {
       display: flex;
       align-items: center;
       justify-content: center;
       padding: 4px;
       border: none;
       background: transparent;
       cursor: pointer;
       line-height: 0;
       transition: opacity 0.2s ease;
   }

   .menuToggle:hover {
       opacity: 0.7;
   }

   .menuOverlay {
       position: fixed;
       inset: 0;
       z-index: 1000;
       background: rgba(0, 0, 0, 0.45);
       animation: overlayIn 0.25s ease forwards;
   }

   @keyframes overlayIn {
       from {
           opacity: 0;
       }

       to {
           opacity: 1;
       }
   }

   .navDrawer {
       position: fixed;
       top: 0;
       right: 0;
       width: min(420px, 86vw);
       height: 100vh;
       height: 100dvh;
       display: flex;
       flex-direction: column;
       background: #ffffff;
       box-shadow: -8px 0 32px rgba(0, 0, 0, 0.12);
       z-index: 1001;
       transform: translateX(100%);
       transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
       overflow: hidden;
   }

   .navDrawer.open {
       transform: translateX(0);
   }

   .drawerHeader {
       display: flex;
       align-items: center;
       justify-content: space-between;
       flex-shrink: 0;
       padding: 16px 20px;
       border-bottom: 1px solid #efefef;
   }

   .drawerClose {
       display: flex;
       align-items: center;
       justify-content: center;
       padding: 4px;
       border: none;
       background: transparent;
       color: #444444;
       cursor: pointer;
       line-height: 0;
       border-radius: 4px;
       transition: color 0.2s ease, background 0.2s ease;
   }

   .drawerClose:hover {
       color: #7ac043;
       background: #f5f5f5;
   }

   .drawerLinks {
       display: flex;
       flex-direction: column;
       flex: 1 1 auto;
       overflow-y: auto;
       padding: 8px 0;
   }

   .drawerLinks>a {
       display: block;
       padding: 14px 20px;
       font-size: 15px;
       font-weight: 600;
       color: #545454;
       text-transform: capitalize;
       border-bottom: 1px solid #f5f5f5;
       transition: color 0.2s ease, background 0.2s ease;
   }

   .drawerLinks>a:first-child {
       color: #7ac043;
   }

   .drawerLinks>a:hover {
       color: #7ac043;
       background: #fafafa;
   }

   .drawerNavItem {
       border-bottom: 1px solid #f5f5f5;
   }

   .drawerProductsToggle {
       display: flex;
       align-items: center;
       justify-content: space-between;
       width: 100%;
       padding: 14px 20px;
       font-size: 15px;
       font-weight: 600;
       color: #545454;
       text-transform: capitalize;
       border: none;
       background: transparent;
       cursor: pointer;
       text-align: left;
       transition: color 0.2s ease, background 0.2s ease;
   }

   .drawerProductsToggle:hover {
       color: #7ac043;
       background: #fafafa;
   }

   .drawerProductsToggleOpen {
       color: #7ac043;
       background: #fafafa;
   }

   .drawerProductsChevron {
       flex-shrink: 0;
       transition: transform 0.25s ease;
   }

   .drawerProductsToggleOpen .drawerProductsChevron {
       transform: rotate(180deg);
   }

   .drawerMegaDropdown {
       padding: 0 20px 16px;
       background: #f9f9f9;
       border-top: 1px solid #efefef;
   }

   .drawerMegaGrid {
       display: flex;
       flex-direction: column;
       gap: 18px;
       padding-top: 14px;
   }

   .drawerMegaDropdown .megaColumnTitle {
       font-size: 13px;
       font-weight: 700;
       margin-bottom: 10px;
       padding-bottom: 8px;
       border-bottom: 1px solid #e5e5e5;
       color: #1f1f1f;
   }

   .drawerMegaDropdown .megaList {
       gap: 8px;
   }

   .drawerMegaLink {
       font-size: 13px;
       font-weight: 500;
       color: #545454;
       line-height: 1.4;
       transition: color 0.18s ease;
       max-width: 100%;
       overflow: hidden;
       text-overflow: ellipsis;
       display: -webkit-box;
       -webkit-line-clamp: 1;
       -webkit-box-orient: vertical;
       word-break: break-word;
   }

   .drawerMegaLink:hover {
       color: #7ac043;
   }

   .drawerTopExtras {
       display: none;
       flex-shrink: 0;
       padding: 0;
       border-top: 1px solid #efefef;
   }


   @media (max-width: 1500px) {
       .headerContainer {
           gap: 24px;
       }

       .navLinksDesktop {
           gap: 28px;
       }

       .searchWrap {
           flex: 0 1 380px;
           max-width: 380px;
       }

       .megaInner {
           padding: 36px 20px 28px;
       }

       .megaGrid {
           grid-template-columns: repeat(6, minmax(0, 1fr));
           gap: 24px 32px;
       }

       .megaDropdown {
           width: 100vw;
       }
   }

   @media (max-width: 1440px) {
       .headerOuter {
           top: 60px;
       }

       .scrolled {
           top: 0;
       }

       .headerContainer {
           padding: 10px 0;
       }

       .scrolled .headerContainer {
           padding: 8px 0;
       }

       .logoWrap img {
           width: 150px !important;
       }

       .scrolled .logoWrap img {
           width: 130px !important;
       }

       .navLinksDesktop {
           gap: 20px;
       }
   }

   @media (max-width: 1024px) {
       .headerContainer {
           gap: 16px;
           padding: 10px 0;
           min-height: 56px;
       }

       .logoWrap img {
           width: 150px !important;
       }

       .scrolled .logoWrap img {
           width: 120px !important;
       }

       .scrolled .headerContainer {
           padding: 8px 0;
           min-height: 52px;
       }

       .navLinksDesktop {
           gap: 20px;
       }

       .navLinksDesktop a {
           font-size: 12px;
       }

       .searchWrap {
           flex: 1 1 auto;
           max-width: none;
           min-width: 140px;
       }

       .actions {
           gap: 12px;
       }

       .megaInner {
           padding: 28px 16px 22px;
       }

       .megaGrid {
           grid-template-columns: repeat(4, minmax(0, 1fr));
           gap: 20px 24px;
       }

       .megaColumnTopRating {
           display: none;
       }

       .megaViewAllWrap {
           display: flex;
           justify-content: center;
           margin-top: 20px;
       }

       .megaColumnTitle {
           font-size: 13px;
           margin-bottom: 10px;
           padding-bottom: 8px;
       }

       .megaLink {
           font-size: 12px;
       }

       .megaDropdown {
           top: 110px;
       }

       .scrolled .megaDropdown {
           top: 50px;
       }
   }

   @media (max-width: 992px) {
       .megaGrid {
           grid-template-columns: repeat(3, minmax(0, 1fr));
           gap: 20px 24px;
       }
   }

   @media (max-width: 768px) {
       .logoWrap img {
           width: 120px !important;
       }

       .navLinksDesktop {
           display: none;
       }

       .megaDropdown {
           display: none;
       }

       .menuToggle {
           display: flex;
       }

       .actions {
           margin-left: auto;
           gap: 10px;
       }

       .searchInput {
           display: none;
       }

       .searchBtn {
           right: -10px;
       }

       .headerOuter {
           top: 60px;
       }

       .scrolled {
           top: 0;
       }

       .headerContainer {
           padding: 10px 0;
       }

       .logoWrap img {
           width: 150px !important;
       }

       .navLinksDesktop {
           gap: 20px;
       }
     
   }

   @media (max-width: 575px) {
       .headerOuter {
           top: 40px;
       }

       .scrolled {
           top: 0;
       }

       .headerContainer {
           gap: 12px;
           padding: 10px 0;
       }

       .logoWrap img {
           width: 110px !important;
       }

       .scrolled .megaDropdown {
           top: 64px;
       }

       .scrolled .logoWrap img {
           width: 100px !important;
       }
   }

   @media (max-width: 425px) {
       .logoWrap img {
           width: 100px !important;
       }

       .searchInput {
           display: none;
       }

       .actions {
           gap: 8px;
       }

       .iconBtn {
           width: 24px;
           height: 24px;
       }
   }

   @media (max-width: 375px) {
       .headerContainer {
           gap: 0;
       }

       .logoWrap img {
           width: 85px !important;
       }

       .actions {
           gap: 6px;
       }

       .iconBtn svg {
           width: 15px;
           height: 15px;
       }

       .badge {
           top: -4px;
           right: -5px;
           min-width: 12px;
           height: 12px;
           font-size: 8px;
       }

       .searchBtn {
           right: -5px;
       }
   }

   @media (max-width: 320px) {
       .headerContainer {
           gap: 0;
       }

       .logoWrap img {
           width: 75px !important;
       }

       .actions {
           gap: 3px;
           margin-left: -26px;
       }

       .iconBtn svg {
           width: 15px;
           height: 15px;
       }

       .badge {
           top: -4px;
           right: -5px;
           height: 12px;
           font-size: 8px;
       }

       .searchBtn {
           right: 26px;
       }

   }
`

---
## src/components/layout/top-banner/TopBanner.jsx

`javascript
import React from 'react'
import styles from '@/components/layout/top-banner/TopBanner.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { useGetHomeDataQuery } from '@/redux/apis/homeApi'

const TopBanner = () => {
    const {data: homeData, isLoading: isHomeDataLoading} = useGetHomeDataQuery() 
    const categoriesData = homeData?.data?.categories

    return (
        <div className="container">
            <div className={`${styles.topBannerWrapper}`}>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={5}
                    slidesPerView={4}
                    loop={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    speed={1000}
                    breakpoints={{
                        0: { slidesPerView: 3 },
                        375: { slidesPerView: 4 },
                        425: { slidesPerView: 4 },
                        576: { slidesPerView: 5 },
                        768: { slidesPerView: 6 },
                        992: { slidesPerView: 6 },
                    }}
                >
                    {categoriesData?.map((category, idx) => (
                        <SwiperSlide key={idx}>
                            <Link href={category?.slug}>
                                <div className={`${styles.categoryItem}`}>
                                    <div className={`${styles.categoryImgWrapper}`}>
                                        <Image
                                            src={category?.image}
                                            alt={category?.name}
                                            className={`${styles.categoryImg}`}
                                            width={100}
                                            height={100}
                                        />
                                    </div>
                                    <p className={`${styles.categoryLabel}` }>{category?.name}</p>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default TopBanner
`

---
## src/components/layout/top-banner/TopBanner.module.css

`css
.topBannerWrapper {
    justify-content: center;
    align-items: stretch;
    width: 100%;
    max-width: 1200px;
    margin: auto;
    padding: 0px 0;
    display: flex;
    overflow-x: auto;
    padding-top: 25px;
    margin-top: 130px;
}

.categoryItem {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}


.categoryImgWrapper {
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    display: flex;
    background: #e5f2cd;
    padding: 6px;
    border-radius: 50%;
    flex-shrink: 0;
    overflow: hidden;
}

.categoryImgWrapper:hover {
    transform: scale(1.02);
    transition: 0.3s ease-in-out;
    background: #275A00A5;
}

.categoryImg {
    width: 100%;
    height: auto;
    object-fit: cover;
}

.categoryLabel {
    margin-top: 10px;
    font-size: 15px;
    line-height: 1.3;
    color: #333333e3;
    font-weight: 600;
}

.categoryItem:hover .categoryLabel {
    color: #7ac043;
    transition: 0.3s ease-in-out;
}

@media (max-width: 768px) {
    .categoryImgWrapper {
        height: 70px;
        width: 70px;
    }

    .topBannerWrapper {
        padding: 10px 0 0;
    }

    .categoryLabel {
        font-size: 12px;
    }
}

@media (max-width: 480px) {
    .categoryImgWrapper {
        height: 50px;
        width: 50px;
    }

    .categoryImgWrapper {
        padding: 6px;
    }

    .categoryLabel {
        font-size: 11px;
    }

    .topBannerWrapper {
        margin-top: 100px;
    }
}
`

---
## src/components/layout/footer/Footer.jsx

`javascript
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/assets/images/logo.png'
import styles from '@/components/layout/footer/Footer.module.css'
import { CiMail } from "react-icons/ci";
import { FaArrowRightLong, FaXTwitter } from "react-icons/fa6"
import { IoCallOutline } from "react-icons/io5";;
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import maestro from '@/assets/icon/Maestro_logo.png'
import visa from '@/assets/icon/Visa.png'
import paypal from '@/assets/icon/paypal.png'
import mastercard from '@/assets/icon/smartcard.png'


const Footer = () => {
    return (
        <footer className={`${styles.footer}`}>
            <div className='container'>
                <div className={`${styles.footerTop}`}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="newsletter">
                                <p className={`${styles.footerPara}`}>Newsletter Signup</p>
                                <h2 className={`${styles.footerText}`}>Join Our Exclusive Community</h2>
                                <p className={`${styles.footerShortPara}`}>Get exclusive offers, early access, and inspiration.</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={`${styles.footerForm}`}>
                                <form style={{ position: "relative", width: "100%" }}>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        style={{
                                            paddingLeft: "32px"
                                        }}
                                        className={`${styles.footerFormInput}`}
                                    />
                                    <span
                                        className={`${styles.footerFormIconWrapper}`}
                                    >
                                        <CiMail className={`${styles.footerFormIcon}`} />
                                    </span>
                                    <button className={`${styles.inputIconRight}`}>
                                        <FaArrowRightLong className={`${styles.footerFormButtonIcon}`} />
                                    </button>
                                </form>
                                <p className={`${styles.footerFormPara}`}>By clicking the button you agree to the <span>Privacy Policy</span> and <span>Terms and Conditions.</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.footerBottom}`}>
                    <div className={`${styles.footerMain}`}>
                        <div className={styles.footerMainGrid}>
                            <div className={`${styles.footerBrand} `}>
                                <Link href="/" className={styles.footerLogoLink}>
                                    <Image src={logo} alt="Agriwow" width={170} priority />
                                </Link>
                                <p className={`${styles.footerBrandText}`}>
                                    Get top-quality agricultural machinery at <br /> unbeatable prices. Shop smart, farm better <br /> with Agriwow.
                                </p>
                                <p className={`${styles.footerPhone}`}>
                                    <IoCallOutline className={styles.footerPhoneIcon} aria-hidden />
                                    <Link href="tel:0000000000" className={styles.footerPhoneLink}>000-000-0000</Link>
                                </p>
                            </div>
                            <div className={styles.footerNavGroup}>
                                <nav className={styles.footerNavCol} aria-label="Agriwow">
                                    <h3 className={styles.footerNavHeading}>Agriwow</h3>
                                    <ul className={styles.footerNavList}>
                                        <li><Link href="/">Home</Link></li>
                                        <li><Link href="#">My Account</Link></li>
                                        <li><Link href="#">Videos</Link></li>
                                        <li><Link href="#">Testimonials</Link></li>
                                        <li><Link href="#">Blog</Link></li>
                                    </ul>
                                </nav>
                                <nav className={styles.footerNavCol} aria-label="Help">
                                    <h3 className={styles.footerNavHeading}>Help</h3>
                                    <ul className={styles.footerNavList}>
                                        <li><Link href="#">Contact Us</Link></li>
                                        <li><Link href="#">Track My Order</Link></li>
                                        <li><Link href="#">Buying Guide</Link></li>
                                    </ul>
                                </nav>
                                <nav className={styles.footerNavCol} aria-label="FAQs">
                                    <h3 className={styles.footerNavHeading}>FAQs</h3>
                                    <ul className={styles.footerNavList}>
                                        <li><Link href="#">Order Tracking</Link></li>
                                        <li><Link href="#">Cancellation and Return</Link></li>
                                        <li><Link href="#">Refund</Link></li>
                                        <li><Link href="#">Payment Option</Link></li>
                                    </ul>
                                </nav>
                            </div>
                            <div className={styles.footerAside}>
                                <div className={styles.footerSocialWrap}>
                                    <div className={styles.footerSocial}>
                                        <Link href="#" className={styles.footerSocialBtn} aria-label="Facebook"><FaFacebookF /></Link>
                                        <Link href="#" className={styles.footerSocialBtn} aria-label="X"><FaXTwitter /></Link>
                                        <Link href="#" className={styles.footerSocialBtn} aria-label="Instagram"><FaInstagram /></Link>
                                        <Link href="#" className={styles.footerSocialBtn} aria-label="YouTube"><FaYoutube /></Link>
                                    </div>
                                </div>
                                <div className={styles.footerPayments} aria-hidden>
                                    <span className={styles.footerPaymentMaestro} title="Maestro">
                                        <Image src={maestro} alt="Maestro" width={35} priority />
                                    </span>
                                    <Image src={visa} alt="Visa" width={38} priority />
                                    <Image src={paypal} alt="PayPal" width={38} priority />
                                    <Image src={mastercard} alt="Mastercard" width={38} priority />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`row align-items-center ${styles.footerBottomRow}`}>
                        <div className="col-lg-6">
                            <p className={`${styles.footerCopyright}`}>
                                Copyright © 2026 AGRIWOW. All rights reserved. Designed by{' '}
                                <Link href="https://goyalinfotech.com" target="_blank" className={styles.footerCredit}>
                                    Goyal Infotech
                                </Link>
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <nav className={`${styles.footerLegal}`} aria-label="Legal">
                                <Link href="#">Privacy Policy</Link>
                                <Link href="#">Terms of Use</Link>
                                <Link href="#">Shipping &amp; Delivery Policy</Link>
                                <Link href="#">Cancellation / Return Policy</Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
`

---
## src/components/layout/footer/Footer.module.css

`css
/* ── Newsletter (top section) ── */
.footer {
    background: #333333;
    color: #fff;
}

.footerForm input {
    padding: 15px;
    border-radius: 5px;
    width: 100%;
}

.footerText {
    font-size: 30px;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 10px;
    color: #fff;
}

.footerPara {
    color: #8dba3b;
    margin-bottom: 2px;
}

.footerShortPara {
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
}

.footerFormIconWrapper {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
}

.footerFormIcon {
    font-size: 16px;
    color: #333;
}

.inputIconRight {
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
    position: absolute;
    right: 10px;
    top: 30%;
}

.footerFormButtonIcon {
    color: #333;
    font-size: 15px;
}

.footerFormPara {
    color: #fff;
    font-size: 14px;
    padding-top: 20px;
}

.footerFormPara span {
    color: #8dba3b;
}

.footerTop {
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
    padding: 60px 0;
}

/* ── Main footer content ── */
.footerBottom {
    padding: 0 0 48px;
}

.footerMain {
    padding: 48px 0 0;
}

.footerMainGrid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
    align-items: start;
}

/* Brand column */
.footerBrand {
    max-width: 300px;
}

.footerLogoLink {
    display: inline-block;
    margin-bottom: 16px;
}

.footerLogoLink img {
    height: auto;
    max-width: 170px;
    width: auto;
}

.footerBrandText {
    color: rgba(255, 255, 255, 0.55);
    font-size: 13px;
    line-height: 1.6;
    margin: 0 0 24px;
}

.footerPhone {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0;
}

.footerPhoneIcon {
    color: #fff;
    font-size: 22px;
    flex-shrink: 0;
}

.footerPhoneLink {
    color: #fff;
    font-size: 26px;
    font-weight: 700;
    letter-spacing: 0.01em;
    text-decoration: none;
    line-height: 1;
}

.footerPhoneLink:hover {
    color: #8dba3b;
}

.footerNavGroup {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 28px 24px;
}

.footerNavCol {
    min-width: 0;
}

.footerNavHeading {
    color: #8dba3b;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.06em;
    margin: 0 0 16px;
    text-transform: uppercase;
}

.footerNavList {
    list-style: none;
    margin: 0;
    padding: 0;
}

.footerNavList li:last-child {
    margin-bottom: 0;
}

.footerNavList a {
    color: rgba(255, 255, 255, 0.55);
    font-size: 14px;
    line-height: 1.4;
    text-decoration: none;
    transition: color 0.2s ease;
}

.footerNavList a:hover {
    color: #8dba3b;
}

.footerAside {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 28px;
}

.footerSocialWrap {
    display: flex;
    justify-content: flex-start;
}

.footerSocial {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.footerSocialBtn {
    align-items: center;
    border: 1px solid #fff;
    border-radius: 2px;
    color: #fff;
    display: inline-flex;
    font-size: 15px;
    height: 24px;
    justify-content: center;
    text-decoration: none;
    transition: color 0.2s, border-color 0.2s, background 0.2s;
    width: 24px;
}

.footerSocialBtn:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: #8dba3b;
    color: #8dba3b;
}

.footerPayments {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 10px 14px;
    justify-content: flex-start;
    margin-top: 0;
}

.footerPaymentMaestro {
    display: inline-flex;
    line-height: 0;
}

.footerPayments img {
    height: auto;
    object-fit: contain;
}

.footerBottomRow {
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    margin-top: 40px;
    padding-top: 24px;
    row-gap: 1rem;
}

.footerCopyright {
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
    line-height: 1.5;
    margin: 0;
}

.footerCredit {
    color: #8dba3b;
    font-weight: 600;
    text-decoration: none;
}

.footerCredit:hover {
    color: #a4d655;
    text-decoration: underline;
}

.footerLegal {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.25rem 1.75rem;
    justify-content: flex-start;
    margin: 0;
}

.footerLegal a {
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
    text-decoration: none;
    white-space: nowrap;
}

.footerLegal a:hover {
    color: #8dba3b;
}

/* ── Tablet ── */
@media (min-width: 768px) {
    .footerNavGroup {
        grid-template-columns: repeat(3, 1fr);
        gap: 32px 40px;
    }

    .footerNavCol:last-child {
        grid-column: auto;
    }
}

@media (min-width: 992px) {
    .footerMainGrid {
        grid-template-columns: minmax(220px, 1.35fr) minmax(0, 2.2fr) minmax(120px, 0.55fr);
        column-gap: 48px;
        row-gap: 0;
        align-items: start;
    }

    .footerBrand {
        grid-column: 1;
        max-width: 280px;
    }

    .footerNavGroup {
        grid-column: 2;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px 48px;
    }

    .footerAside {
        grid-column: 3;
        align-items: flex-end;
        align-self: stretch;
        justify-content: space-between;
        min-height: 100%;
        padding-top: 2px;
    }

    .footerSocialWrap {
        justify-content: flex-end;
    }

    .footerPayments {
        justify-content: flex-end;
        margin-top: auto;
    }

    .footerLegal {
        justify-content: flex-end;
    }
}

@media (min-width: 1200px) {
    .footerMainGrid {
        column-gap: 64px;
    }

    .footerNavGroup {
        gap: 24px 72px;
    }
}

@media (max-width: 991px) {
    .footerMainGrid {
        gap: 36px;
    }

    .footerAside {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        gap: 20px;
    }

    .footerPayments {
        margin-left: auto;
    }
}

@media (max-width: 768px) {
    .footerTop {
        padding: 40px 0;
    }

    .footerTop .row {
        flex-direction: column;
        gap: 24px;
    }

    .footerText {
        font-size: 1.4rem;
    }

    .footerPara {
        font-size: 0.85rem;
    }

    .footerFormInput {
        width: 100%;
    }

    .footerMain {
        padding-top: 36px;
    }

    .footerAside {
        flex-direction: column;
        align-items: flex-start;
    }

    .footerPayments {
        margin-left: 0;
    }

    .footerBottomRow {
        text-align: center;
    }

    .footerLegal {
        justify-content: center;
        gap: 8px 16px;
    }

    .footerCopyright {
        text-align: center;
    }
}

@media (max-width: 480px) {
    .footerTop {
        padding: 32px 0 24px;
    }

    .footerText {
        font-size: 1.2rem;
    }

    .footerShortPara {
        font-size: 0.8rem;
    }

    .footerNavGroup {
        grid-template-columns: 1fr 1fr;
        gap: 24px 16px;
    }

    .footerNavCol:last-child {
        grid-column: 1 / -1;
    }

    .footerSocialBtn {
        width: 28px;
        height: 28px;
        font-size: 11px;
    }

    .footerNavHeading {
        font-size: 12px;
    }

    .footerForm input {
        padding: 8px;
    }

    .footerFormButtonIcon {
        font-size: 13px;
    }

    .inputIconRight {
        top: 20%;
        right: 5px;
    }
}

@media (max-width: 375px) {
    .footerText {
        font-size: 1.05rem;
    }

    .footerFormInput {
        font-size: 0.8rem;
        padding-left: 28px;
    }

    .footerPhoneLink {
        font-size: 1.1rem;
    }

    .footerSocialBtn {
        width: 26px;
        height: 26px;
        font-size: 10px;
    }

    .footerPayments img {
        width: 32px !important;
    }

    .footerCopyright,
    .footerLegal a {
        font-size: 0.72rem;
    }
}
`

---
## src/redux/apis/homeApi.js

`javascript
import { apiSlice } from "../apiSlice";

const testApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getHomeData: builder.query({
            query: () => {
                return {
                    url: "/home",
                    method: "GET",
                }
            },
            providesTags:['HomeData'],

        }),
        getMenuProductData: builder.query({
            query: () => {
                return {
                    url: "/all-category-subcategories",
                    method: "GET",
                }
            },
            providesTags:['MenuProductData'],
        }),
        getProducts: builder.query({
            query: (params = {}) => ({
                url: "/products",
                method: "GET",
                params,
            }),
            providesTags: ['Products'],
        }),

    }),
})

export const {
    useGetHomeDataQuery,
    useGetMenuProductDataQuery,
    useGetProductsQuery,
} = testApi
`

---
## src/redux/apiSlice.js

`javascript
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://goyalinfotech.in/agriwow/public/api",
  }),
  tagTypes: [
    'HomeData',
    'MenuProductData',
    'Products',
  ],
  endpoints: (builder) => ({}),
});
`

---
