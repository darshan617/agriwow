import React from 'react'
import Image from 'next/image'
import exclusiveDeal from '@/assets/images/deal.png'
import accurate from '@/assets/icon/accurate.png'
import quality from '@/assets/icon/high-quality.png'
import shield from '@/assets/icon/shield.png'
import dealEquipment from '@/assets/images/deal-eqip.png'

import styles from '@/components/deal/ExclusiveDeal.module.css'

const ExclusiveDeal = () => {
    return (
        <div className="container">
            <div className={`${styles.exclusiveDeal}`}>
                <div className={`${styles.exclusiveDealBanner}`}>
                    <Image src={exclusiveDeal} alt="Exclusive Deal" />
                </div>
                <div className={`${styles.exclusiveDealContent}`}>
                    <div className="row">

                        <div className="col-md-12">
                            <h2 className={`${styles.exclusiveDealTitle}`}>Power Up Productivity with <span>Exclusive Deals</span></h2>
                        </div>
                        <div className={`${styles.exclusiveDealItemWrapper} col-md-3`}>
                            <div className={`${styles.exclusiveDealItem} d-flex flex-row gap-2`}>
                                <Image src={accurate} alt="Exclusive Deal" />
                                <div>
                                    <h3 className={`${styles.exclusiveDealItemTitle}`}>Precision Results</h3>
                                    <p className={`${styles.exclusiveDealItemDescription}`}>Advanced technology for <br />
                                        better sorting and processing.</p>
                                    <button type="button" className={`${styles.bannerBtn}`}>
                                        Explore Products
                                    </button>
                                </div>

                            </div>
                        </div>
                        <div className={`${styles.exclusiveDealItemWrapper} col-md-3`}>
                            <div className={`${styles.exclusiveDealItem} d-flex flex-row gap-2`}>
                                <Image src={quality} alt="Exclusive Deal" />
                                <div>
                                    <h3 className={`${styles.exclusiveDealItemTitle}`}>Strong Build Quality</h3>
                                    <p className={`${styles.exclusiveDealItemDescription}`}>Rugged machines made <br />
                                        for long-term performance.</p>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.exclusiveDealItemWrapper} col-md-3`}>
                            <div className={`${styles.exclusiveDealItem} d-flex flex-row gap-2`}>
                                <Image src={shield} alt="Exclusive Deal" />
                                <div>
                                    <h3 className={`${styles.exclusiveDealItemTitle}`}>Trusted Service Network</h3>
                                    <p className={`${styles.exclusiveDealItemDescription}`}>Dependable support <br />
                                        whenever you need it.</p>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.exclusiveDealItemWrapper} col-md-3`}>
                            <div className={`${styles.exclusiveDealEquipment}`}>
                                <Image src={dealEquipment} alt="Exclusive Deal" />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default ExclusiveDeal