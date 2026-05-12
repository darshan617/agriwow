import React from 'react'
import Image from 'next/image'
import { GiSprout } from 'react-icons/gi'
import { IoWater } from 'react-icons/io5'

import sprayerImg from '@/assets/products/1.png'
import pumpImg from '@/assets/products/2.png'

import styles from '@/components/product-range/ProductRangeSection.module.css'

const ProductRangeSection = () => {
  return (
    <section className={styles.section} aria-labelledby="product-range-heading">
      <div className={styles.inner}>
        <h2 id="product-range-heading" className={styles.mainTitle}>
          Product Range
        </h2>

        <div className={styles.row}>
          <div className={styles.visual}>
            <Image
              src={sprayerImg}
              alt="Agriculture sprayer equipment"
              width={360}
              height={360}
              className={styles.img}
              sizes="(max-width: 767px) 90vw, 40vw"
              priority
            />
          </div>
          <div className={styles.labelWrap}>
            <div className={styles.labelBar}>
              <span className={styles.iconPlant} aria-hidden>
                <GiSprout />
              </span>
              <p className={styles.labelText}>Agriculture Sprayers</p>
            </div>
          </div>
        </div>

        <div className={`${styles.row} ${styles.rowReverse}`}>
          <div className={styles.labelWrap}>
            <div className={styles.labelBar}>
              <span className={styles.iconWater} aria-hidden>
                <IoWater />
              </span>
              <p className={styles.labelText}>Portable Water Pump</p>
            </div>
          </div>
          <div className={styles.visual}>
            <Image
              src={pumpImg}
              alt="Portable gasoline water pump"
              width={360}
              height={360}
              className={styles.img}
              sizes="(max-width: 767px) 90vw, 40vw"
            />
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <p className={styles.footerText}>
          Everything You Need for Smart Farming
        </p>
      </div>
    </section>
  )
}

export default ProductRangeSection
