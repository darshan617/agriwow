import React from 'react'
import styles from '@/components/home/components/detail/Detail.module.css'
import Image from 'next/image'
import delivery from '@/assets/images/Across-India.png'
import paymentSecureIcon from '@/assets/images/checkout.png'
import supportIcon from '@/assets/images/dedicated.png'
import warrantyIcon from '@/assets/images/guaranteed.png'


const Detail = () => {
    return (
        <div className="sectionSpace">
            <div className="container">
                <div className={styles.detailCardWrapper}>
                    <div className={styles.detailGrid}>
                        <div className={styles.detailCard} data-aos="zoom-in" data-aos-delay="100">
                            <Image src={delivery} alt="delivery" className={styles.delivery} />
                        </div>

                        <div className={styles.detailCard} data-aos="zoom-in" data-aos-delay="200">
                            <Image src={paymentSecureIcon} alt="payment secure" className={styles.delivery} />
                        </div>

                        <div className={styles.detailCard} data-aos="zoom-in" data-aos-delay="300">
                            <Image src={supportIcon} alt="delivery" className={styles.delivery} />
                        </div>

                        <div className={styles.detailCard} data-aos="zoom-in" data-aos-delay="400">
                            <Image src={warrantyIcon} alt="delivery" className={styles.delivery} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail
