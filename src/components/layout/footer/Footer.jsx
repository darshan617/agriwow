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