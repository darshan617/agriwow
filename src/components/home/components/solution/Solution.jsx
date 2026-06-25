import React from 'react'
import Image from 'next/image'
import trackImage from '@/assets/images/track.png'
import solutionImage from '@/assets/images/solution.png'
import styles from '@/components/home/components/solution/Solution.module.css'
import Link from 'next/link'

const Solution = () => {
    return (
        <div className="sectionSpace">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-12" data-aos="fade-right" data-aos-delay="100">
                        <div className={`${styles.leftContent}`}>
                            <div className={`${styles.imageTextWrapper}`}>
                                <Image src={trackImage} alt="track" className={`${styles.trackImageBg}`} />
                                <div className={`${styles.textOverlay}`}>
                                    <h2 className={`${styles.title}`}>Track Your Order <br />Easily</h2>
                                    <p className={`${styles.description}`}>Stay updated with real-time tracking <br />from dispatch to doorstep</p>
                                    <Link href="/my-order" className={`${styles.btn}`}>
                                        Track Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12" data-aos="fade-left" data-aos-delay="200">
                        <div className={`${styles.rightContent}`}>
                            <div className={`${styles.imageTextWrapper}`}>
                                <Image src={solutionImage} alt="solution" className={`${styles.trackImageBg}`} />
                                <div className={`${styles.textOverlay}`}>
                                    <h2 className={`${styles.title}`}>All-in-One Farming <br />Solutions</h2>
                                    <p className={`${styles.description}`}>From sprayers to industrial tools - everything <br />you need for modern farming in one place.</p>
                                    <Link href="/product-category/agriculture-sprayers" className={`${styles.btn}`}>
                                        Explore Products
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




export default Solution