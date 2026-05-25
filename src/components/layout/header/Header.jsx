import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/assets/images/logo.png'
import { BiSearch } from 'react-icons/bi'
import { FaUserCircle, FaHeart, FaShoppingCart } from 'react-icons/fa'
import { IoClose, IoChevronDown } from 'react-icons/io5'
import { IoMdStar } from 'react-icons/io'
import {HiOutlineUserCircle ,HiOutlinePower} from 'react-icons/hi2'
import { PiPackageThin } from "react-icons/pi";
import menu from '@/assets/icon/menu.png'
import TopHeaderExtras from '@/components/layout/top-header/TopHeaderExtras'
import styles from '@/components/layout/header/Header.module.css'
import { useGetMenuProductDataQuery, useLazySearchProductsQuery } from '@/redux/apis/homeApi'

const USER_MENU_ITEMS = [
    { href: '#', label: 'My Profile', icon: HiOutlineUserCircle },
    { href: '#', label: 'My Orders', icon: PiPackageThin  }
]

const USER_PROFILE = {
    name: 'Saif Shaikh',
    initial: 'S',
}

const NAV_LINKS = [
    { href: '/', label: 'Home' },
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
                <Link href={`/product-category/${item?.slug}`} className={`${styles.megaColumnTitle}`}>{item?.name}</Link>
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
                            href={prd?.slug ?? '#'}
                            className={`${styles.megaProductCard}`}
                            onClick={onLinkClick}
                        >
                            <div className={`${styles.megaProductImage}`}>
                                <Image
                                    src={prd.thumbnail}
                                    alt={prd.name ?? prd.subcategory_name ?? 'Product'}
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
                                <p className={`${styles.megaProductPrice}`}>₹ {prd.selling_price}</p>
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
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [debouncedQuery, setDebouncedQuery] = useState('')
    const [searchOpen, setSearchOpen] = useState(false)
    const scrolled = scrolledFromParent ?? scrolledLocal
    const navRef = useRef(null)
    const userMenuRef = useRef(null)
    const searchRef = useRef(null)
    const { data: menuProductData } = useGetMenuProductDataQuery()
    const [triggerSearch, { data: searchData, isFetching: isSearching }] = useLazySearchProductsQuery()
    const closeMenu = () => setMenuOpen(false)
    const closeUserMenu = () => setUserMenuOpen(false)
    const closeSearch = () => setSearchOpen(false)

    useEffect(() => {
        const handle = setTimeout(() => {
            setDebouncedQuery(searchQuery.trim())
        }, 350)
        return () => clearTimeout(handle)
    }, [searchQuery])

    useEffect(() => {
        if (!debouncedQuery) return
        triggerSearch(debouncedQuery)
    }, [debouncedQuery, triggerSearch])

    useEffect(() => {
        if (!searchOpen) return undefined
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                closeSearch()
            }
        }
        const onKeyDown = (e) => { if (e.key === 'Escape') closeSearch() }
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', onKeyDown)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [searchOpen])

    const searchResults = Array.isArray(searchData?.data) ? searchData.data : []
    const showSearchPanel = searchOpen && debouncedQuery.length > 0
    const handleSearchChange = (e) => {
        const value = e.target.value
        setSearchQuery(value)
        if (value.trim().length > 0) setSearchOpen(true)
        else setSearchOpen(false)
    }
    const handleSearchFocus = () => {
        if (searchQuery.trim().length > 0) setSearchOpen(true)
    }
    const handleResultClick = () => {
        setSearchOpen(false)
        setSearchQuery('')
        setDebouncedQuery('')
    }

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

    useEffect(() => {
        if (!userMenuOpen) return undefined
        const handleClickOutside = (e) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                closeUserMenu()
            }
        }
        const onKeyDown = (e) => { if (e.key === 'Escape') closeUserMenu() }
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', onKeyDown)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [userMenuOpen])

    return (
        <header className={`${styles.headerOuter} ${scrolled ? styles.scrolled : ''}`}>
            <div className={`container`}>
                <div className={`${styles.headerContainer}`}>
                    <Link href="/" className={`${styles.logoWrap}`}>
                        <Image src={logo} alt="Agriwow logo" width={800} priority />
                    </Link>

                    <nav className={`${styles.navLinksDesktop}`}>
                        {NAV_LINKS.map((item) => (
                            item?.label === 'Products' ? (
                                <div key={item?.label} className={styles.navItemWithMegaMenu}>
                                    <Link href={item?.href || "#"}>{item?.label}</Link>
                                </div>
                            ) : (
                                <Link key={item?.label} href={item?.href || "#"}>{item?.label}</Link>
                            )
                        ))}
                    </nav>

                    <div className={`${styles.searchWrap}`} ref={searchRef}>
                        <input
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
                                    setSearchQuery('')
                                    setDebouncedQuery('')
                                    setSearchOpen(false)
                                }}
                            >
                                <IoClose size={16} />
                            </button>
                        )}
                        <button type="button" className={`${styles.searchBtn}`} aria-label="Search">
                            <BiSearch size={17} />
                        </button>

                        {showSearchPanel && (
                            <div className={`${styles.searchResultsPanel}`} role="listbox">
                                {isSearching && searchResults.length === 0 ? (
                                    <div className={`${styles.searchStatus}`}>Searching…</div>
                                ) : searchResults.length === 0 ? (
                                    <div className={`${styles.searchStatus}`}>
                                        No products found for &ldquo;{debouncedQuery}&rdquo;
                                    </div>
                                ) : (
                                    <>
                                        <ul className={`${styles.searchResultsList}`}>
                                            {searchResults.slice(0, 6).map((product) => {
                                                const categorySlug = product?.category?.slug
                                                const href = categorySlug && product?.slug
                                                    ? `/product-category/${categorySlug}/${product.slug}`
                                                    : '#'
                                                return (
                                                    <li key={product?.id ?? product?.slug}>
                                                        <Link
                                                            href={href}
                                                            className={`${styles.searchResultItem}`}
                                                            onClick={handleResultClick}
                                                            role="option"
                                                        >
                                                            <div className={`${styles.searchResultImage}`}>
                                                                {product?.thumbnail && (
                                                                    <Image
                                                                        src={product.thumbnail}
                                                                        alt={product?.name ?? 'Product'}
                                                                        width={56}
                                                                        height={56}
                                                                    />
                                                                )}
                                                            </div>
                                                            <div className={`${styles.searchResultInfo}`}>
                                                                <p className={`${styles.searchResultName}`}>{product?.name}</p>
                                                                {product?.category?.name && (
                                                                    <span className={`${styles.searchResultCategory}`}>
                                                                        {product.category.name}
                                                                    </span>
                                                                )}
                                                                <div className={`${styles.searchResultPriceRow}`}>
                                                                    <span className={`${styles.searchResultPrice}`}>
                                                                        ₹ {product?.selling_price}
                                                                    </span>
                                                                    {product?.price && product?.price !== product?.selling_price && (
                                                                        <span className={`${styles.searchResultOldPrice}`}>
                                                                            ₹ {product.price}
                                                                        </span>
                                                                    )}
                                                                    {product?.discount ? (
                                                                        <span className={`${styles.searchResultDiscount}`}>
                                                                            {product.discount}% OFF
                                                                        </span>
                                                                    ) : null}
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                        {searchResults.length > 6 && (
                                            <div className={`${styles.searchResultsFooter}`}>
                                                <span>Showing 6 of {searchResults.length} results</span>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    <div className={`${styles.actions}`}>
                        <div className={styles.userMenuWrap} ref={userMenuRef}>
                            <button
                                type="button"
                                className={`${styles.iconBtn} ${userMenuOpen ? `${styles.iconBtnActive}` : ''}`}
                                aria-label="Account"
                                aria-haspopup="menu"
                                aria-expanded={userMenuOpen}
                                onClick={() => setUserMenuOpen((open) => !open)}
                            >
                                <FaUserCircle size={21} />
                            </button>

                            {userMenuOpen && (
                                <div className={`${styles.userDropdown}`} role="menu">
                                    <div className={`${styles.userDropdownHeader}`}>
                                        <div className={`${styles.userAvatar}`}>
                                            <span>{USER_PROFILE.initial}</span>
                                        </div>
                                        <p className={`${styles.userName}`}>{USER_PROFILE.name}</p>
                                    </div>

                                    <ul className={`${styles.userMenuList}`}>
                                        {USER_MENU_ITEMS.map((item) => {
                                            const Icon = item.icon
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
                                            )
                                        })}
                                    </ul>

                                    <div className={`${styles.userSignOutWrap}`}>
                                        <button
                                            type="button"
                                            className={`${styles.userSignOutBtn}`}
                                            onClick={closeUserMenu}
                                        >
                                            <HiOutlinePower size={18} />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

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
                className={`${styles.navDrawer} ${menuOpen ? `${styles.open}` : ''}`}
            >
                <div className={`${styles.drawerHeader}`}>
                    <Image src={logo} alt="Agriwow logo" width={120} priority />
                    <button type="button" className={`${styles.drawerClose}`} onClick={closeMenu} aria-label="Close">
                        <IoClose size={26} />
                    </button>
                </div>
                <div className={`${styles.drawerLinks}`}>
                    {NAV_LINKS?.map((item) =>
                        item?.label === 'Products' ? (
                            <div key={item?.label} className={styles.drawerNavItem}>
                                <button
                                    type="button"
                                    className={`${styles.drawerProductsToggle} ${productsExpanded ? `${styles.drawerProductsToggleOpen}` : ''}`}
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
                            <Link key={item.label} href={item.href} onClick={closeMenu}>
                                {item?.label}
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