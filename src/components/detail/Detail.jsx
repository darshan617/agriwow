import React from 'react'
import styles from '@/components/detail/Detail.module.css'
import Image from 'next/image'
import cardSide from '@/assets/images/card-side.png'
import delivery from '@/assets/images/delivery.png'
import paymentSecureIcon from '@/assets/images/card2.png'
import supportIcon from '@/assets/images/card3.png'
import warrantyIcon from '@/assets/images/card4.png'
const Detail = () => {
    return (
        <div>
            <div className="container">
                <div className={`${styles.detailCardWrapper}`}>
                    <div className="row">
                        <div className="col-md-3">
                            <div className={`${styles.detailCard}`}>
                                <h2>Fast <br />Delivery</h2>
                                <p>Across India</p>
                                <Image src={delivery} alt="delivery" className={`${styles.delivery}`} />
                                <Image src={cardSide} alt="map" className={`${styles.cardSide}`} />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className={`${styles.detailCard1}`}>
                                <h2>Secure <br />Payment</h2>
                                <p>100% safe checkout</p>
                                <Image src={paymentSecureIcon} alt="payment secure" className={`${styles.paymentSecureIcon}`} />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className={`${styles.detailCard2}`}>
                                <h2>Customer <br />Support</h2>
                                <p>Dedicated Assistance</p>
                                <Image src={supportIcon} alt="delivery" className={`${styles.supportIcon}`} />
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className={`${styles.detailCard3}`}>
                                <h2>Warranty</h2>
                                <p>Guaranteed Quality</p>
                                <Image src={warrantyIcon} alt="delivery" className={`${styles.warrantyIcon}`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail