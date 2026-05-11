import React from 'react'
import Image from 'next/image'
import { FiHeart, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { MdAddShoppingCart } from 'react-icons/md'
import { IoMdStar } from 'react-icons/io'

import productImage from '@/assets/images/agriculture-sprayer.jpg'
import productOne from '@/assets/products/1.png'
import productTwo from '@/assets/products/2.png'

import styles from '@/components/common-components/products/ProductsItems.module.css'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'

import 'swiper/css'

const defaultProductList = [
    {
        id: 1,
        image: productOne,
        discount: '15% OFF',
        isBestSeller: true,
        name: 'Neptune DLX-13+ Double Motor Battery Sprayer | 12V 12Ah...',
        price: '8,343.00',
        oldPrice: '10,640.00',
        reviews: '58 Reviews',
    },
    {
        id: 2,
        image: productTwo,
        discount: '40% OFF',
        isBestSeller: false,
        name: 'Neptune NF-767 Power Sprayer | 4 Stroke 3C Petrol Engine...',
        price: '8,343.00',
        oldPrice: '14,000.00',
        reviews: '35 Reviews',
    },
    {
        id: 3,
        image: productOne,
        discount: '15% OFF',
        isBestSeller: true,
        name: 'Neptune DLX-13+ Double Motor Battery Sprayer | 12V 12Ah...',
        price: '8,343.00',
        oldPrice: '10,640.00',
        reviews: '58 Reviews',
    },
    {
        id: 4,
        image: productTwo,
        discount: '15% OFF',
        isBestSeller: false,
        name: 'Neptune NF-767 Power Sprayer | 4 Stroke 3C Petrol Engine...',
        price: '8,343.00',
        oldPrice: '10,640.00',
        reviews: '35 Reviews',
    },
    {
        id: 5,
        image: productOne,
        discount: '15% OFF',
        isBestSeller: true,
        name: 'Neptune DLX-13+ Double Motor Battery Sprayer | 12V 12Ah...',
        price: '8,343.00',
        oldPrice: '10,640.00',
        reviews: '58 Reviews',
    },
    {
        id: 6,
        image: productTwo,
        discount: '40% OFF',
        isBestSeller: false,
        name: 'Neptune NF-767 Power Sprayer | 4 Stroke 3C Petrol Engine...',
        price: '8,343.00',
        oldPrice: '14,000.00',
        reviews: '35 Reviews',
    },
]

const ProductsItem = ({
    variant = 'default',
    title = 'Agriculture Sprayers',

    products = defaultProductList,

    bannerImage = productImage,

    promoTitle = 'Power Sprayer',

    promoSubtitle = 'Performance That Grows with You',
}) => {
    const isEquipment = variant === 'equipment'

    return (
        <section className="container">
            <div className={styles.productsSection}>
                <div className="row g-3 align-items-stretch">

                    {!isEquipment && (
                        <div className="col-12">
                            <h2 className={`${styles.productsTitle} text-center`}>
                                {title}
                            </h2>
                        </div>
                    )}

                    {!isEquipment && (
                        <div className="col-md-3">
                            <div className={styles.promoCard}>
                                <Image
                                    src={bannerImage}
                                    alt={title}
                                    fill
                                    sizes="(max-width: 767px) 100vw, 25vw"
                                    className={styles.promoImage}
                                />

                                <div className={styles.promoOverlay}>
                                    <h3 className={`${styles.promoTitle} text-center`}>
                                        {promoTitle}
                                    </h3>

                                    <p className={`${styles.promoSubtitle} text-center`}>
                                        {promoSubtitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={isEquipment ? 'col-12' : 'col-md-9'}>
                        <div className={styles.swiperWrapper}>

                            <Swiper
                                modules={[Navigation, Autoplay]}
                                navigation={{
                                    prevEl: '.swiper-btn-prev',
                                    nextEl: '.swiper-btn-next',
                                }}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                                spaceBetween={16}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,
                                    },
                                    576: {
                                        slidesPerView: 2,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                    },
                                    992: {
                                        slidesPerView: isEquipment ? 5 : 4,
                                    },
                                }}
                                className={styles.cardsRow}
                            >

                                {products.map((item) => (
                                    <SwiperSlide key={item.id}>

                                        <article className={styles.productCard}>

                                            <div className={styles.cardTags}>
                                                <span className={styles.discountTag}>
                                                    {item.discount}
                                                </span>

                                                {item.isBestSeller && (
                                                    <span className={styles.bestsellerTag}>
                                                        BESTSELLER
                                                    </span>
                                                )}
                                            </div>

                                            <div className={styles.imageWrap}>
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={180}
                                                    height={180}
                                                    className={styles.productImage}
                                                />
                                            </div>

                                            <div className={styles.ratingLine}>
                                                <span className={styles.ratingBadge}>
                                                    <IoMdStar
                                                        style={{
                                                            marginRight: 2,
                                                            verticalAlign: 'middle',
                                                        }}
                                                    />
                                                    4.5
                                                </span>

                                                <span className={styles.reviewText}>
                                                    ({item.reviews})
                                                </span>
                                            </div>

                                            <h3 className={styles.productName}>
                                                {item.name}
                                            </h3>

                                            <p className={styles.priceRow}>
                                                <span className={styles.currentPrice}>
                                                    ₹ {item.price}
                                                </span>

                                                <span className={styles.oldPrice}>
                                                    ₹ {item.oldPrice}
                                                </span>
                                            </p>

                                            <div className={styles.cardActions}>

                                                <button
                                                    type="button"
                                                    className={styles.addToCartBtn}
                                                >
                                                    <MdAddShoppingCart
                                                        className={styles.btnIcon}
                                                    />

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

                                        </article>

                                    </SwiperSlide>
                                ))}

                            </Swiper>

                            {!isEquipment && (
                                <div className={styles.swiperNav}>

                                    <button
                                        className={`swiper-btn-prev ${styles.swiperNavBtn}`}
                                        aria-label="Previous"
                                    >
                                        <FiChevronLeft />
                                    </button>

                                    <button
                                        className={`swiper-btn-next ${styles.swiperNavBtn}`}
                                        aria-label="Next"
                                    >
                                        <FiChevronRight />
                                    </button>

                                </div>
                            )}

                        </div>

                        <div
                            className={
                                isEquipment
                                    ? `${styles.viewAllWrapper} ${styles.centerViewAll}`
                                    : styles.viewAllWrapper
                            }
                        >
                            <button
                                type="button"
                                className={styles.viewAllBtn}
                            >
                                View All
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    )
}

export default ProductsItem