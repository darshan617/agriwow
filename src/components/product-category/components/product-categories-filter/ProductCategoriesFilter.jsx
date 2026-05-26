import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaAngleUp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import style from "@/components/product-category/components/product-categories-filter/ProductCategoriesFilter.module.css";
import { useGetMenuProductDataQuery } from "@/redux/apis/homeApi";

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

function CategoryCheckbox({ slug, name, count, isChecked, href }) {
  return (
    <Link href={href} className={`${style.label}`}>
      <input
        type="checkbox"
        id={slug}
        className={`${style.checkbox}`}
        checked={isChecked}
        readOnly
        tabIndex={-1}
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
      {typeof count === "number" && count > 0 && (
        <span className={`${style.count}`}>
          {String(count).padStart(2, "0")}
        </span>
      )}
    </Link>
  );
}

function ProductCategoriesFilter({ drawerOpen = false, onDrawerClose }) {
  const router = useRouter();
  const { categorySlug: activeCategorySlug, subCategory: activeSubCategorySlug } =
    router.query;

  const { data: menuProductData, isFetching } = useGetMenuProductDataQuery();

  const categories = useMemo(
    () => menuProductData?.data?.AllCategory ?? [],
    [menuProductData]
  );

  const [isOpen, setIsOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [minPrice, setMinPrice] = useState(10000);
  const [maxPrice, setMaxPrice] = useState(100000);

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
            {isFetching && categories.length === 0 && (
              <li className={`${style.item}`}>
                <span className={`${style.name}`}>Loading categories...</span>
              </li>
            )}

            {!isFetching && categories.length === 0 && (
              <li className={`${style.item}`}>
                <span className={`${style.name}`}>No categories available.</span>
              </li>
            )}

            {categories.map((category) => {
              const isCategoryActive =
                activeCategorySlug === category?.slug;
              const subcategories = category?.subcategories ?? [];
              const hasSubcategories = subcategories.length > 0;

              return (
                <li key={category?.id ?? category?.slug} className={`${style.item}`}>
                  <CategoryCheckbox
                    slug={category?.slug}
                    name={category?.name}
                    count={
                      typeof category?.products_count === "number"
                        ? category.products_count
                        : hasSubcategories
                          ? subcategories.length
                          : undefined
                    }
                    isChecked={isCategoryActive}
                    href={`/product-category/${category?.slug}`}
                  />

                  {hasSubcategories && isCategoryActive && (
                    <ul className={`${style.subList}`}>
                      {subcategories.map((sub) => {
                        const isSubActive =
                          activeSubCategorySlug === sub?.slug;
                        return (
                          <li
                            key={sub?.id ?? sub?.slug}
                            className={`${style.subItem}`}
                          >
                            <Link
                              href={`/product-category/${category?.slug}/${sub?.slug}`}
                              className={`${style.label}`}
                              style={{ padding: 0 }}
                            >
                              <span
                                className={`${style.name}`}
                                style={{
                                  color: isSubActive ? "#239c3d" : undefined,
                                  fontWeight: isSubActive ? 600 : 400,
                                }}
                              >
                                {sub?.name}
                              </span>
                              {typeof sub?.products_count === "number" &&
                                sub.products_count > 0 && (
                                  <span className={`${style.count}`}>
                                    {String(sub.products_count).padStart(2, "0")}
                                  </span>
                                )}
                            </Link>
                          </li>
                        );
                      })}
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
