import React from 'react'
import Image from 'next/image'
import exclusiveDeal from '@/assets/images/deal.png'
import accurate from '@/assets/icon/accurate.png'
import quality from '@/assets/icon/high-quality.png'
import shield from '@/assets/icon/shield.png'
import styles from '@/components/home/components/deal/ExclusiveDeal.module.css'

const ExclusiveDeal = () => {
    return (
        <section className={`${styles.ExclusiveDealSection}`}>
            <div className="container">
                <div className={`${styles.exclusiveDeal}`}>
                    <div className={`${styles.exclusiveDealBanner}`}>
                        <Image src={exclusiveDeal} alt="Exclusive Deal" fill />
                    </div>
                    <div className={`${styles.exclusiveDealContent}`}>
                        <div className={`${styles.exclusiveDealRow} row`}>
                            <div className="col-md-12">
                                <h2 className={`${styles.exclusiveDealTitle}`}>
                                    Power Up Productivity with <span>Exclusive Deals</span>
                                </h2>
                            </div>
                            <div className={`${styles.exclusiveDealItemWrapper} col-lg-3 col-md-6`}>
                                <div className={`${styles.exclusiveDealItem} d-flex flex-row gap-2`}>
                                    <Image src={accurate} alt="Accurate" />
                                    <div>
                                        <h3 className={`${styles.exclusiveDealItemTitle}`}>Precision Results</h3>
                                        <p className={`${styles.exclusiveDealItemDescription}`}>
                                            Advanced technology for <br />better sorting and processing.
                                        </p>
                                        <button type="button" className={`${styles.bannerBtn} ${styles.bannerBtnDesktop}`}>
                                            Shop Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.exclusiveDealItemWrapper} col-lg-3 col-md-6`}>
                                <div className={`${styles.exclusiveDealItem} d-flex flex-row gap-2`}>
                                    <Image src={quality} alt="Quality" />
                                    <div>
                                        <h3 className={`${styles.exclusiveDealItemTitle}`}>Strong Build Quality</h3>
                                        <p className={`${styles.exclusiveDealItemDescription}`}>
                                            Rugged machines made <br />for long-term performance.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.exclusiveDealItemWrapper} col-lg-3 col-md-6 border-0`}>
                                <div className={`${styles.exclusiveDealItem} d-flex flex-row gap-2 border-end-0`}>
                                    <Image src={shield} alt="Shield" />
                                    <div>
                                        <h3 className={`${styles.exclusiveDealItemTitle}`}>Trusted Service Network</h3>
                                        <p className={`${styles.exclusiveDealItemDescription}`}>
                                            Dependable support <br />whenever you need it.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.exclusiveDealBtnWrapper}>
                                <button type="button" className={`${styles.bannerBtn} ${styles.bannerBtnTablet}`}>
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )

}



export default ExclusiveDeal

