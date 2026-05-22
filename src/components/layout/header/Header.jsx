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