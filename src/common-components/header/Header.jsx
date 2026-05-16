import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/assets/images/logo.png'
import { BiSearch } from 'react-icons/bi'
import { FaUserCircle, FaHeart, FaShoppingCart } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import menu from '@/assets/icon/menu.png'
import TopHeaderExtras from '@/common-components/top-header/TopHeaderExtras'
import styles from '@/common-components/header/Header.module.css'

const NAV_LINKS = [
    { href: '#', label: 'Home' },
    { href: '#', label: 'Products' },
    { href: '#', label: 'Blogs' },
    { href: '#', label: 'Contact us' },
]

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const navRef = useRef(null)

    const closeMenu = () => setMenuOpen(false)

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

    return (
        <header className={styles.headerOuter}>
            <div className="container">
                <div className={styles.headerContainer}>
                    <div className={styles.logoWrap}>
                        <Image src={logo} alt="Agriwow logo" width={800} priority />
                    </div>

                    <nav className={styles.navLinksDesktop}>
                        {NAV_LINKS.map((item) => (
                            <Link key={item.label} href={item.href}>{item.label}</Link>
                        ))}
                    </nav>

                    <div className={styles.searchWrap}>
                        <input
                            type="text"
                            className={styles.searchInput}
                            placeholder="Search Product, Category, Brands..."
                        />
                        <button type="button" className={styles.searchBtn} aria-label="Search">
                            <BiSearch size={17} />
                        </button>
                    </div>

                    <div className={styles.actions}>
                        <button type="button" className={styles.iconBtn} aria-label="Account">
                            <FaUserCircle size={17} />
                        </button>
                        <button type="button" className={styles.iconBtn} aria-label="Wishlist">
                            <FaHeart size={17} />
                            <span className={styles.badge}>0</span>
                        </button>
                        <button type="button" className={styles.iconBtn} aria-label="Cart">
                            <FaShoppingCart size={17} />
                            <span className={styles.badge}>0</span>
                        </button>
                        <button
                            type="button"
                            className={styles.menuToggle}
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            onClick={() => setMenuOpen((open) => !open)}
                        >
                            <Image src={menu} alt="" width={17} height={17} />
                        </button>
                    </div>
                </div>
            </div>

            {menuOpen && (
                <div className={styles.menuOverlay} onClick={closeMenu} />
            )}

            <aside
                ref={navRef}
                className={`${styles.navDrawer} ${menuOpen ? styles.open : ''}`}
            >
                <div className={styles.drawerHeader}>
                    <span className={styles.drawerTitle}>Menu</span>
                    <button type="button" className={styles.drawerClose} onClick={closeMenu} aria-label="Close">
                        <IoClose size={26} />
                    </button>
                </div>
                <div className={styles.drawerLinks}>
                    {NAV_LINKS.map((item) => (
                        <Link key={item.label} href={item.href} onClick={closeMenu}>
                            {item.label}
                        </Link>
                    ))}
                </div>
                <div className={styles.drawerTopExtras}>
                    <TopHeaderExtras variant="drawer" />
                </div>
            </aside>
        </header>
    )
}

export default Header