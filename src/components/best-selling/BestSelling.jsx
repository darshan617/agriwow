import React from 'react'
import Image from 'next/image'
import ProductsItem from '../common-components/products/ProductsItem'
import bannerImage from '@/assets/images/selling.png'
import sprayerImage from '@/assets/images/selling-1.png'
import waterPumpImage from '@/assets/images/selling-2.png'
import styles from '@/components/best-selling/BestSelling.module.css'
import sproutIcon from '@/assets/icon/plant.png'
import waterDropIcon from '@/assets/icon/water.png'

const SproutIcon = () => (
  <span className={`${styles.sproutIcon}`} aria-hidden>
  <Image src={sproutIcon} alt="Sprout Icon" width={15} height={15} />
</span>
)

const WaterDropIcon = () => (
  <span className={`${styles.pumpIcon}`} aria-hidden>
    <Image src={waterDropIcon} alt="Water Drop Icon" width={15} height={15} />
  </span>
)

const BestSelling = () => {
  return (
    <ProductsItem
      sectionClassName=""
      title="Best Selling"
      promoTitle="Product Range"
      promoSubtitle={null}
      bannerImage={bannerImage}
      promoCardClassName={`${styles.promoCardProductRange}`}  
      promoImageClassName={`${styles.promoImageProductRange}`}
      promoOverlayClassName={`${styles.promoOverlayProductRange}`}
      promoTitleClassName={`${styles.promoTitleProductRange}`}
      promoExtrasClassName={`${styles.promoExtrasProductRange}`}
      promoFooterClassName={`${styles.promoFooterProductRange}`}
      promoExtras={(
        <div className={`${styles.promoBody}`}>
          <div className={`${styles.promoRow} ${styles.promoRowLeft}`}>
            <Image
              src={sprayerImage}
              alt="Agriculture Sprayers"
              width={200}
              height={200}
              className={styles.promoProductImg}
            />
            <span className={`${styles.promoLabel1}`}>
              <SproutIcon />
              <span>
                Agriculture
                <br />
                Sprayers
              </span>
            </span>
          </div>

          <div className={`${styles.promoRow} ${styles.promoRowRight}`}>
            <span className={`${styles.promoLabel2}`}>
              <span className={`${styles.pumpLine1}`}>
                Portable
                <WaterDropIcon />
              </span>
              <br />
              Water Pump
            </span>
            <Image
              src={waterPumpImage}
              alt="Portable Water Pump"
              width={130}
              height={110}
              className={`${styles.promoProductImg}`}
            />
          </div>
        </div>
      )}
      promoFooter="Everything You Need for Smart Farming"
    />
  )
}

export default BestSelling
