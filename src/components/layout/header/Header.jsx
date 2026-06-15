import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";
import { FaSearch } from "react-icons/fa";
import { FaUserCircle, FaHeart, FaShoppingCart } from "react-icons/fa";
import { IoClose, IoChevronDown } from "react-icons/io5";
import { IoMdStar } from "react-icons/io";
import { HiOutlineUserCircle, HiOutlinePower } from "react-icons/hi2";
import { PiPackageThin } from "react-icons/pi";
import { HiOutlineTrendingUp } from "react-icons/hi";
import { TbCategory2 } from "react-icons/tb";
import { MdHistory } from "react-icons/md";
import menu from "@/assets/icon/menu.png";
import TopHeaderExtras from "@/components/layout/top-header/TopHeaderExtras";
import styles from "@/components/layout/header/Header.module.css";
import {
  useGetHomeDataQuery,
  useLazySearchProductsQuery,
} from "@/redux/apis/homeApi";
import { useGetMenuProductDataQuery } from "@/redux/apis/categoryApi";
import CustomPopup from "@/components/custom-popup/CustomPopup";
import Login from "@/components/auth/login/Login";
import VerifyOtp from "@/components/auth/verify-otp/VerifyOtp";
import { useLogoutMutation } from "@/redux/apis/authApi";
import { useAuthMutation, useVerifyOtpMutation } from "@/redux/apis/authApi";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useToast } from "@/custom-hooks/toast/ToastProvider";
import {
  getWishlistItems,
  useGetWishlistQuery,
} from "@/redux/apis/addToWishlist";
import {
  getCartSessionId,
  useGetCartDataQuery,
  useMergeCartMutation,
} from "@/redux/apis/addToCartApi";

const TRENDING_SEARCHES = [
  "Fogging Machines",
  "Garden Equipment",
  "Garden Machinery",
  "Garden Tools",
  "Gardening Tools",
  "Gardening Equipment",
  "Gardening Machinery",
];

const TRENDING_VISIBLE_COUNT = 9;
const SEARCH_HISTORY_KEY = "agriwow:searchHistory";
const SEARCH_HISTORY_MAX = 6;

const USER_MENU_ITEMS = [
  { href: "/my-profile", label: "My Profile", icon: HiOutlineUserCircle },
  { href: "/my-order", label: "My Orders", icon: PiPackageThin },
];

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "#", label: "Products" },
  { href: "/blog?category=all", label: "Blogs" },
  { href: "/contact-us", label: "Contact us" },
];

const normalizePath = (path = "") => {
  const clean = path.split("?")[0].split("#")[0];
  if (clean === "/" || clean === "") return "/";
  return clean.replace(/\/$/, "");
};

const isNavLinkActive = (item, asPath) => {
  const pathname = normalizePath(asPath);

  if (item.label === "Home") {
    return pathname === "/";
  }
  if (item.label === "Products") {
    return (
      pathname.startsWith("/product-category") ||
      pathname.startsWith("/product-details")
    );
  }
  if (item.href && item.href !== "#") {
    const href = normalizePath(item.href);
    return pathname === href || pathname.startsWith(`${href}/`);
  }
  return false;
};
const renderMenuProductColumns = (
  menuProductData,
  { linkClassName, onLinkClick } = {},
) => (
  <>
    {menuProductData?.data?.AllCategory?.slice(0, 5)?.map((item) => (
      <div
        key={item?.name}
        className={`${styles.megaColumn} ${item?.name === "Top Rating" ? styles.megaColumnTopRating : ""}`}
      >
        <Link
          href={`/product-category/${item?.slug}`}
          className={`${styles.megaColumnTitle}`}
        >
          {item?.name}
        </Link>
        <ul className={`${styles.megaList}`}>
          {item?.subcategories?.map((link) => (
            <li key={link?.slug ?? link?.name}>
              <Link
                href={`/product-category/${item?.slug}/${link?.slug}`}
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
    <div className={`${styles.megaColumn}`}>
      <h2 className={`${styles.megaColumnTitle}`}>Best Seller</h2>
      <ul className={`${styles.megaList}`}>
        {menuProductData?.data?.Product?.map((prd) => (
          <li key={prd?.id ?? prd?.slug ?? prd?.name}>
            <Link
              href={prd?.slug ?? "#"}
              className={`${styles.megaProductCard}`}
              onClick={onLinkClick}
            >
              <div className={`${styles.megaProductImage}`}>
                <Image
                  src={prd.thumbnail}
                  alt={prd.name ?? prd.subcategory_name ?? "Product"}
                  width={72}
                  height={72}
                />
              </div>
              <div className={`${styles.megaProductInfo}`}>
                {prd.name && (
                  <p className={`${styles.megaProductName}`}>{prd.name}</p>
                )}
                <span className={`${styles.megaProductRating}`}>
                  <IoMdStar aria-hidden />
                  {prd.total_reviews}
                </span>
                <p className={`${styles.megaProductPrice}`}>
                  ₹ {prd.selling_price}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </>
);

const Header = ({ scrolled: scrolledFromParent }) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsExpanded, setProductsExpanded] = useState(false);
  const [scrolledLocal, setScrolledLocal] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [trendingExpanded, setTrendingExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const scrolled = scrolledFromParent ?? scrolledLocal;
  const navRef = useRef(null);
  const userMenuRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const userData = Cookies?.get("userData")
    ? JSON.parse(decodeURIComponent(Cookies?.get("userData")))
    : {};
  const { data: menuProductData } = useGetMenuProductDataQuery();
  const { data: wishlistData } = useGetWishlistQuery(userData?.id, {
    skip: !userData?.id,
  });
  const wishlistCount = useMemo(
    () => getWishlistItems(wishlistData).length,
    [wishlistData],
  );
  const { data: cartData } = useGetCartDataQuery(undefined, {
    skip: !(Cookies.get("userToken") || getCartSessionId()),
  });
  const { data: homeData } = useGetHomeDataQuery();
  const [triggerSearch, { data: searchData, isFetching: isSearching }] =
    useLazySearchProductsQuery();
  const closeMenu = () => setMenuOpen(false);
  const closeUserMenu = () => setUserMenuOpen(false);
  const closeSearch = () => {
    setSearchOpen(false);
    setMobileSearchOpen(false);
  };
  const [showPopup, setShowPopup] = useState("");
  const [phone, setPhone] = useState("");
  const [auth, { isLoading: isAuthLoading }] = useAuthMutation();
  const [verifyOtp, { isLoading: isVerifyOtpLoading }] = useVerifyOtpMutation();
  const [mergeCart] = useMergeCartMutation();
  const { showToast } = useToast();
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const isLoggedIn = Object.keys(userData).length > 0;
  const userInitial = userData?.name?.charAt(0)?.toUpperCase() ?? "";

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(SEARCH_HISTORY_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed))
          setSearchHistory(parsed.slice(0, SEARCH_HISTORY_MAX));
      }
    } catch {}
  }, []);

  const persistHistory = (next) => {
    setSearchHistory(next);
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(next));
    } catch {}
  };

  const addToHistory = (term) => {
    const trimmed = (term || "").trim();
    if (!trimmed) return;
    const filtered = searchHistory.filter(
      (item) => item.toLowerCase() !== trimmed.toLowerCase(),
    );
    const next = [trimmed, ...filtered].slice(0, SEARCH_HISTORY_MAX);
    persistHistory(next);
  };

  const clearHistory = () => persistHistory([]);

  // login ====================
  const handleLogin = async () => {
    try {
      const res = await auth({
        body: {
          phone: phone,
        },
      });
      if (res?.data?.success || res?.data?.status) {
        setShowPopup("verify-otp");
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  // otp verify ===================
  const handleVerify = async (otp) => {
    try {
      const res = await verifyOtp({
        body: {
          otp: otp,
          phone: phone,
        },
      });
      if (res?.data?.success || res?.data?.status) {
        if (res?.data?.token) {
          Cookies.set("userData", JSON.stringify(res?.data?.user));
          Cookies.set("userToken", res?.data?.token);

          const sessionId = getCartSessionId();
          if (sessionId) {
            try {
              await mergeCart({
                body: { session_id: sessionId },
              }).unwrap();
            } catch (mergeError) {
              console.error("Cart merge failed", mergeError);
            }
          }

          showToast(res?.data?.message, "success");
          setShowPopup("");
          setPhone("");
        } else {
          console.error("OTP verification failed", res?.error);
        }
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  //logout ==============
  const handleLogout = async () => {
    try {
      await logout().unwrap();
      Cookies.remove("userData");
      Cookies.remove("userToken");
      Cookies.remove("cartSessionId");
      showToast("Logged out successfully", "success");
      router?.reload();
    } catch (error) {
      console.error("Logout failed", error);
      showToast(error?.data?.message || "Failed to logout", "error");
    }
  };

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 350);
    return () => clearTimeout(handle);
  }, [searchQuery]);

  useEffect(() => {
    if (!debouncedQuery) return;
    triggerSearch(debouncedQuery);
  }, [debouncedQuery, triggerSearch]);

  useEffect(() => {
    if (!searchOpen && !mobileSearchOpen) return undefined;
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        closeSearch();
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeSearch();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [searchOpen, mobileSearchOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const onResize = () => {
      if (window.innerWidth > 992) setMobileSearchOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!searchOpen) setTrendingExpanded(false);
  }, [searchOpen]);

  const searchResults = Array.isArray(searchData?.data) ? searchData.data : [];
  const hasQuery = debouncedQuery.length > 0;
  const showSearchPanel = searchOpen;
  const showResultsView = hasQuery;
  const topCategories = useMemo(() => {
    const fromHome = homeData?.data?.categories;
    if (Array.isArray(fromHome) && fromHome.length > 0) {
      return fromHome.slice(0, 6).map((cat) => ({
        name: cat?.name,
        slug: cat?.slug,
        image: cat?.image,
      }));
    }
    const fromMenu = menuProductData?.data?.AllCategory;
    if (Array.isArray(fromMenu)) {
      return fromMenu?.slice(0, 6)?.map((cat) => ({
        name: cat?.name,
        slug: cat?.slug,
        image: cat?.image ?? cat?.thumbnail,
      }));
    }
    return [];
  }, [homeData, menuProductData]);

  const trendingToShow = trendingExpanded
    ? TRENDING_SEARCHES
    : TRENDING_SEARCHES.slice(0, TRENDING_VISIBLE_COUNT);
  const hiddenTrendingCount = TRENDING_SEARCHES.length - TRENDING_VISIBLE_COUNT;

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSearchOpen(true);
  };
  const handleSearchFocus = () => {
    setSearchOpen(true);
  };
  const handleResultClick = () => {
    addToHistory(debouncedQuery || searchQuery);
    setSearchOpen(false);
    setMobileSearchOpen(false);
    setSearchQuery("");
    setDebouncedQuery("");
  };
  const handleSearchBtnClick = (e) => {
    if (
      typeof window !== "undefined" &&
      window.innerWidth <= 992 &&
      !mobileSearchOpen
    ) {
      e.preventDefault();
      setMobileSearchOpen(true);
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  };
  const handleMobileSearchClose = () => {
    setMobileSearchOpen(false);
    setSearchOpen(false);
  };
  const handleSuggestionClick = (term) => {
    setSearchQuery(term);
    setDebouncedQuery(term.trim());
    setSearchOpen(true);
    addToHistory(term);
    searchInputRef.current?.focus();
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) return;
    addToHistory(trimmed);
    setDebouncedQuery(trimmed);
    setSearchOpen(true);
  };
  const removeHistoryItem = (term) => {
    const next = searchHistory.filter((item) => item !== term);
    persistHistory(next);
  };

  useEffect(() => {
    if (scrolledFromParent !== undefined) return undefined;
    const onScroll = () => setScrolledLocal(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrolledFromParent]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) setProductsExpanded(false);
  }, [menuOpen]);

  useEffect(() => {
    if (!userMenuOpen) return undefined;
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        closeUserMenu();
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeUserMenu();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [userMenuOpen]);

  const [countryCode, setCountryCode] = useState("+91");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const cartItems = Array.isArray(cartData?.data) ? cartData.data : [];

  return (
    <header
      className={`${styles.headerOuter} ${scrolled ? styles.scrolled : ""}`}
    >
      <div className={`container`}>
        <div className={`${styles.headerContainer}`}>
          <Link href="/" className={`${styles.logoWrap}`}>
            <Image src={logo} alt="Agriwow logo" width={800} priority />
          </Link>

          <nav className={`${styles.navLinksDesktop}`}>
            {NAV_LINKS.map((item) => {
              const isActive = isNavLinkActive(item, router.asPath);
              return item?.label === "Products" ? (
                <div key={item?.label} className={styles.navItemWithMegaMenu}>
                  <Link
                    href={item?.href || "#"}
                    className={isActive ? styles.navLinkActive : ""}
                  >
                    {item?.label}
                  </Link>
                </div>
              ) : (
                <Link
                  key={item?.label}
                  href={item?.href || "#"}
                  className={isActive ? styles.navLinkActive : ""}
                >
                  {item?.label}
                </Link>
              );
            })}
          </nav>

          <div
            className={`${styles.searchWrap} ${mobileSearchOpen ? styles.searchWrapMobileOpen : ""}`}
            ref={searchRef}
          >
            {mobileSearchOpen && (
              <button
                type="button"
                className={`${styles.mobileSearchClose}`}
                aria-label="Close search"
                onClick={handleMobileSearchClose}
              >
                <IoClose size={22} />
              </button>
            )}
            <form
              onSubmit={handleSearchSubmit}
              className={`${styles.searchForm}`}
            >
              <input
                ref={searchInputRef}
                type="text"
                className={`${styles.searchInput}`}
                placeholder="Search Product, Category, Brands..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                aria-haspopup="listbox"
                aria-expanded={showSearchPanel}
              />
              {searchQuery && (
                <button
                  type="button"
                  className={`${styles.searchClearBtn}`}
                  aria-label="Clear search"
                  onClick={() => {
                    setSearchQuery("");
                    setDebouncedQuery("");
                    searchInputRef.current?.focus();
                  }}
                >
                  <IoClose size={16} />
                </button>
              )}
              <button
                type="submit"
                className={`${styles.searchBtn}`}
                aria-label="Search"
                onClick={handleSearchBtnClick}
              >
                <FaSearch size={18} />
              </button>
            </form>

            {showSearchPanel && (
              <div className={`${styles.searchResultsPanel}`} role="listbox">
                {showResultsView ? (
                  isSearching && searchResults.length === 0 ? (
                    <div className={`${styles.searchStatus}`}>Searching…</div>
                  ) : searchResults.length === 0 ? (
                    <div className={`${styles.searchStatus}`}>
                      No products found for &ldquo;{debouncedQuery}&rdquo;
                    </div>
                  ) : (
                    <>
                      <ul className={`${styles.searchResultsList}`}>
                        {searchResults.slice(0, 6).map((product) => {
                          const categorySlug = product?.category?.slug;
                          const href =
                            categorySlug && product?.slug
                              ? `/product-details/${product.slug}`
                              : "#";
                          return (
                            <li key={product?.id ?? product?.slug}>
                              <Link
                                href={href}
                                className={`${styles.searchResultItem}`}
                                onClick={handleResultClick}
                                role="option"
                              >
                                <div className={`${styles.searchResultInfo}`}>
                                  <p className={`${styles.searchResultName}`}>
                                    {product?.name}
                                  </p>
                                </div>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                      {searchResults.length > 6 && (
                        <div className={`${styles.searchResultsFooter}`}>
                          <span>
                            Showing 6 of {searchResults.length} results
                          </span>
                        </div>
                      )}
                    </>
                  )
                ) : (
                  <div className={`${styles.suggestionsPanel}`}>
                    <section className={`${styles.suggestionSection}`}>
                      <h3 className={`${styles.suggestionTitle}`}>
                        <HiOutlineTrendingUp aria-hidden />
                        <span>Trending Searches</span>
                      </h3>
                      <div className={`${styles.trendingChips}`}>
                        {trendingToShow?.map((term) => (
                          <button
                            key={term}
                            type="button"
                            className={`${styles.trendingChip}`}
                            onClick={() => handleSuggestionClick(term)}
                          >
                            {term}
                          </button>
                        ))}
                        {hiddenTrendingCount > 0 && !trendingExpanded && (
                          <button
                            type="button"
                            className={`${styles.trendingMore}`}
                            onClick={() => setTrendingExpanded(true)}
                          >
                            {hiddenTrendingCount} more searches...
                          </button>
                        )}
                      </div>
                    </section>

                    {topCategories.length > 0 && (
                      <section className={`${styles.suggestionSection}`}>
                        <h3 className={`${styles.suggestionTitle}`}>
                          <TbCategory2 aria-hidden />
                          <span>Top Categories</span>
                        </h3>
                        <div className={`${styles.topCategoriesGrid}`}>
                          {topCategories.map((cat) => (
                            <Link
                              key={cat?.slug ?? cat?.name}
                              href={
                                cat?.slug
                                  ? `/product-category/${cat.slug}`
                                  : "#"
                              }
                              className={`${styles.topCategoryCard}`}
                              onClick={closeSearch}
                            >
                              <div className={`${styles.topCategoryImage}`}>
                                {cat?.image && (
                                  <Image
                                    src={cat.image}
                                    alt={cat?.name ?? "Category"}
                                    width={44}
                                    height={44}
                                  />
                                )}
                              </div>
                              <span className={`${styles.topCategoryName}`}>
                                {cat?.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </section>
                    )}

                    <section
                      className={`${styles.suggestionSection} ${styles.historySection}`}
                    >
                      <div className={`${styles.historyHeader}`}>
                        <h3 className={`${styles.suggestionTitle}`}>
                          <MdHistory aria-hidden />
                          <span>Search History</span>
                        </h3>
                        {searchHistory.length > 0 && (
                          <button
                            type="button"
                            className={`${styles.historyClearBtn}`}
                            onClick={clearHistory}
                          >
                            Clear All
                          </button>
                        )}
                      </div>
                      {searchHistory.length === 0 ? (
                        <p className={`${styles.historyEmpty}`}>
                          There is no search history
                        </p>
                      ) : (
                        <div className={`${styles.historyChips}`}>
                          {searchHistory.map((term) => (
                            <span
                              key={term}
                              className={`${styles.historyChip}`}
                            >
                              <button
                                type="button"
                                className={`${styles.historyChipText}`}
                                onClick={() => handleSuggestionClick(term)}
                              >
                                {term}
                              </button>
                              <button
                                type="button"
                                className={`${styles.historyChipRemove}`}
                                aria-label={`Remove ${term} from history`}
                                onClick={() => removeHistoryItem(term)}
                              >
                                <IoClose size={12} />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </section>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className={`${styles.actions}`}>
            <div className={styles.userMenuWrap} ref={userMenuRef}>
              <button
                type="button"
                className={`${styles.iconBtn} ${userMenuOpen ? `${styles.iconBtnActive}` : ""}`}
                aria-label="Account"
                aria-haspopup="menu"
                aria-expanded={userMenuOpen}
                onClick={() => {
                  isLoggedIn ? setUserMenuOpen(true) : setShowPopup("login");
                }}
              >
                {isLoggedIn ? (
                  <span
                    className={`${styles.userAvatar} ${styles.userAvatarTrigger}`}
                    aria-hidden
                  >
                    {userInitial}
                  </span>
                ) : (
                  <FaUserCircle size={21} />
                )}
              </button>

              {userMenuOpen && (
                <div className={`${styles.userDropdown}`} role="menu">
                  <div className={`${styles.userDropdownHeader}`}>
                    <div className={`${styles.userAvatar}`}>
                      <span>{userInitial}</span>
                    </div>
                    <p className={`${styles.userName}`}>{userData?.name}</p>
                  </div>

                  <ul className={`${styles.userMenuList}`}>
                    {USER_MENU_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item?.label}>
                          <Link
                            href={item?.href || "#"}
                            className={`${styles.userMenuLink}`}
                            onClick={closeUserMenu}
                            role="menuitem"
                          >
                            <span className={`${styles.userMenuIcon}`}>
                              <Icon size={20} />
                            </span>
                            <span>{item?.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  <div className={`${styles.userSignOutWrap}`}>
                    <button
                      type="button"
                      className={`${styles.userSignOutBtn}`}
                      onClick={handleLogout}
                      disabled={isLogoutLoading}
                    >
                      <HiOutlinePower size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              className={`${styles.iconBtn}`}
              aria-label="Wishlist"
            >
              <Link href="/wishlist">
                <FaHeart size={21} />
              </Link>
              {wishlistCount > 0 && (
                <span className={styles.badge}>{wishlistCount}</span>
              )}
            </button>
            <button
              type="button"
              className={`${styles.iconBtn}`}
              aria-label="Cart"
            >
              <Link href="/cart">
                <FaShoppingCart size={21} />
              </Link>
              <span className={styles.badge}>{cartItems?.length ?? 0}</span>
            </button>
            <button
              type="button"
              className={`${styles.menuToggle}`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <Image src={menu} alt="" width={17} height={17} />
            </button>
          </div>

          <div
            className={`${styles.megaDropdown}`}
            id="mega-products-menu"
            role="navigation"
            aria-label="Product categories"
          >
            <div className={`${styles.megaInner}`}>
              <div className={styles.megaGrid}>
                {renderMenuProductColumns(menuProductData)}
              </div>
              <div className={`${styles.megaViewAllWrap}`}>
                <Link href="#" className={`${styles.megaViewAllBtn}`}>
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
        className={`${styles.navDrawer} ${menuOpen ? `${styles.open}` : ""}`}
      >
        <div className={`${styles.drawerHeader}`}>
          <Image src={logo} alt="Agriwow logo" width={120} priority />
          <button
            type="button"
            className={`${styles.drawerClose}`}
            onClick={closeMenu}
            aria-label="Close"
          >
            <IoClose size={26} />
          </button>
        </div>
        <div className={`${styles.drawerLinks}`}>
          {NAV_LINKS?.map((item) => {
            const isActive = isNavLinkActive(item, router.asPath);
            return item?.label === "Products" ? (
              <div key={item?.label} className={styles.drawerNavItem}>
                <button
                  type="button"
                  className={`${styles.drawerProductsToggle} ${productsExpanded ? styles.drawerProductsToggleOpen : ""} ${isActive ? styles.navLinkActive : ""}`}
                  onClick={() => setProductsExpanded((open) => !open)}
                  aria-expanded={productsExpanded}
                  aria-controls="drawer-mega-products"
                >
                  {item?.label}
                  <IoChevronDown
                    size={18}
                    className={`${styles.drawerProductsChevron}`}
                    aria-hidden
                  />
                </button>
                <div
                  id="drawer-mega-products"
                  className={`${styles.drawerMegaDropdown}`}
                  role="navigation"
                  aria-label="Product categories"
                  hidden={!productsExpanded}
                >
                  <div className={`${styles.drawerMegaGrid}`}>
                    {renderMenuProductColumns(menuProductData, {
                      linkClassName: styles.drawerMegaLink,
                      onLinkClick: closeMenu,
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={isActive ? styles.navLinkActive : ""}
                onClick={closeMenu}
              >
                {item?.label}
              </Link>
            );
          })}
        </div>
        <div className={`${styles.drawerTopExtras}`}>
          <TopHeaderExtras variant="drawer" />
        </div>
      </aside>

      {showPopup === "login" && (
        <CustomPopup onclose={() => setShowPopup("")}>
          <Login
            handleLogin={handleLogin}
            phone={phone}
            setPhone={setPhone}
            isAuthLoading={isAuthLoading}
          />
        </CustomPopup>
      )}
      {showPopup === "verify-otp" && (
        <CustomPopup onclose={() => setShowPopup("")}>
          <VerifyOtp
            handleVerify={handleVerify}
            phone={phone}
            isLoading={isVerifyOtpLoading}
          />
        </CustomPopup>
      )}
    </header>
  );
};

export default Header;
