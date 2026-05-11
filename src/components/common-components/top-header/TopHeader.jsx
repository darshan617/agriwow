import Link from 'next/link'
import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import styles from '@/components/common-components/top-header/TopHeader.module.css'


const TopHeader = () => {
    return (
            <div className="container">
                <div className={`${styles.TopHeader} row`}>
                    <div className="col-md-4">
                        <div className={`${styles.topHeaderLeft} d-flex flex-direction-row`}>
                            <ul className="d-flex gap-3">
                                <li>About</li>
                                <li>Shipping & Return</li>
                                <li>My Account</li>
                            </ul>
                        </div>

                    </div>
                    <div className="col-md-4 d-flex flex-direction-row">
                        <div className={`${styles.topHeaderCenter} d-flex flex-direction-row gap-2`} >
                           <div className={styles.topHeaderTickerWrapper}>
                             <div className={styles.topHeaderTicker}>
                               <p className="text-center m-0">Sale Up to <span>60% Off</span> on Everything*</p>
                             </div>
                           </div>
                           <button className={styles.shopNowButton}>Shop Now</button>
                      
                      
                        </div>
                    </div>
                    <div className="col-md-4 d-flex flex-direction-row gap-4">
                        <div className={`${styles.topHeaderRight}`}>
                           <h2>Need Help?</h2>
                           <Link href="tel:+91 9229297668">+91 9229297668</Link>
                        </div>

                        <div className="d-flex flex-direction-row gap-2">
                        <FaFacebookF className={styles.topHeaderRightIcon} />
                        <FaXTwitter className={styles.topHeaderRightIcon} /> 
                        <FaInstagram className={styles.topHeaderRightIcon} />

                        </div>
                    </div>
                </div>
            </div>
    )
}

export default TopHeader