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
