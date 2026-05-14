'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import benefitImage from '@/assets/images/pay-back.jpg'
import styles from '@/components/home/components/benifit/Benefit.module.css'

const Benefit = () => {
    const [isActive, setIsActive] = useState(false)

    return (
        <section className={`${styles.wrapper} `}>
            <Image
                src={benefitImage}
                alt="Digital payment benefit background"
                fill
                priority
                sizes="100vw"
                className={`${styles.bgImage}`}
            />
            <div className={styles.scrim} aria-hidden="true" />

            <div className={`${styles.inner}`}>

                <div className={`${styles.left} text-center`}>
                    <h2 className={`${styles.heading}`}>
                        Pay Online &amp;<br /><span>Save</span> More
                    </h2>
                </div>
                <div className={`${styles.right}`}>
                    <h3 className={`${styles.subheading}`}>
                        Get Instant Benefits On Digital Payments
                    </h3>

                    <div className={`${styles.pillToggle}`}>
                        <span className={`${styles.pillLeft}`}>EXTRA 5% OFF</span>
                        <span className={`${styles.pillRight}`}>At Checkout</span>
                    </div>
               

                </div>

            </div>
        </section>
    )
}

export default Benefit