import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/assets/images/logo.png'
import { BiSearch } from 'react-icons/bi'
import { FiUser, FiHeart, FiShoppingCart, FiMoreVertical } from 'react-icons/fi'
import { FaUserCircle, FaHeart, FaShoppingCart  } from "react-icons/fa";
import menu from '@/assets/icon/menu.png'

import styles from '@/components/common-components/header/Header.module.css'

const Header = () => {
    return (
        <header className={styles.headerOuter}>
            <div className="container">
                <div className={styles.headerContainer}>
                    <div className={styles.logoWrap}>
                        <Image src={logo} alt="Agriwow logo" width={170} priority />
                    </div>
                    <nav className={styles.navLinks}>
                        <Link href="#">Home</Link>
                        <Link href="#">Products</Link>
                        <Link href="#">Blogs</Link>
                        <Link href="#">Contact us</Link>
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
                        <Image src={menu} alt="menu" width={17} height={17} />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header