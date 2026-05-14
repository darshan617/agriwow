import React from 'react'
import Image from 'next/image'
import { IoMdStar } from 'react-icons/io'
import { MdAddShoppingCart } from 'react-icons/md'
import { FiHeart } from 'react-icons/fi'
import styles from '@/common-components/product-card/ProductCard.module.css'



const ProductCard = ({
    discount = '0% OFF',
    isBestSeller = true,
    name = '-',
    price = '0',
    oldPrice = '0',
    reviews = '0 Reviews',
    image = null,
}) => {
    return (
        <div className={styles.productCard}>

            <div className={styles.cardTags}>
                <span className={styles.discountTag}>
                    {discount}
                </span>

                {isBestSeller && (
                    <span className={styles.bestsellerTag}>
                        BESTSELLER
                    </span>
                )}
            </div>
            <div className={styles.imageWrap}>
                <Image
                    src={image}
                    alt={name}
                    width={180}
                    height={180}
                    className={styles.productImage}
                />
            </div>
            <div className={styles.ratingLine}>
                <span className={styles.ratingBadge}>
                    <IoMdStar style={{ marginRight: 2, verticalAlign: 'middle' }} />
                    4.5
                </span>
                <span className={styles.reviewText}>
                    ({reviews})
                </span>
            </div>
            <h3 className={styles.productName}>
                {name}
            </h3>
            <p className={styles.priceRow}>
                <span className={styles.currentPrice}>
                    ₹ {price}
                </span>
                <span className={styles.oldPrice}>
                    ₹ {oldPrice}
                </span>
            </p>
            <div className={styles.cardActions}>
                <button
                    type="button"
                    className={styles.addToCartBtn}
                >
                    <MdAddShoppingCart className={styles.btnIcon} />
                    Add to Cart
                </button>

                <button
                    type="button"
                    className={styles.buyNowBtn}
                >
                    Buy Now
                </button>

                <button
                    type="button"
                    className={styles.wishlistBtn}
                    aria-label="Add to wishlist"
                >
                    <FiHeart />
                </button>
            </div>

        </div>
    )
}

export default ProductCard