import React from 'react'
import Image from 'next/image'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import productImage from '@/assets/images/agriculture-sprayer.jpg'
import productOne from '@/assets/products/1.png'
import productTwo from '@/assets/products/2.png'
import ProductCard from '@/common-components/product-card/ProductCard'
import styles from '@/common-components/products/ProductsItems.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'

import 'swiper/css'

const productList = [
    {
        id: 1,
        image: productOne,
        discount: '15% OFF',
        isBestSeller: true,
        name: 'aaaa Double Motor Battery Sprayer | 12V 12Ah...',
        price: '8,343.00',
        oldPrice: '10,640.00',
        reviews: '58',
    },
    {
        id: 2,
        image: productTwo,
        discount: '40% OFF',
        isBestSeller: false,
        name: 'ddddF-767 Power Sprayer | 4 Stroke 3C Petrol Engine...',
        price: '8,343.00',
        oldPrice: '14,000.00',
        reviews: '35 Reviews',
    },
    {
        id: 3,
        image: productOne,
        discount: '15% OFF',
        isBestSeller: true,
        name: 'NeeeDouble Motor Battery Sprayer | 12V 12Ah...',
        price: '8,343.00',
        oldPrice: '10,640.00',
        reviews: '58 Reviews',
    },
    {
        id: 4,
        image: productTwo,
        discount: '15% OFF',
        isBestSeller: false,
        name: 'hhh NF-767 Power Sprayer | 4 Stroke 3C Petrol Engine...',
        price: '8,343.00',
        oldPrice: '10,640.00',
        reviews: '35 Reviews',
    },
    {
        id: 5,
        image: productOne,
        discount: '15% OFF',
        isBestSeller: true,
        name: 'wef Double Motor Battery Sprayer | 12V 12Ah...',
        price: '8,343.00',
        oldPrice: '10,640.00',
        reviews: '58 Reviews',
    },
    {
        id: 6,
        image: productTwo,
        discount: '40% OFF',
        isBestSeller: false,
        name: 'qwe -767 Power Sprayer | 4 Stroke 3C Petrol Engine...',
        price: '8,343.00',
        oldPrice: '14,000.00',
        reviews: '35 Reviews',
    },
]

const ProductsItem = ({
    variant = 'default',
    title = 'Agriculture Sprayers',

    products = productList,

    bannerImage = productImage,

    productTitle = 'Power Sprayer',

    productSubtitle = (
        <>
            Performance
            <br />
            That Grows with You
        </>
    ),

    promoExtras = null,
    productFooter = null,
    productOverlayClassName = '',
    productTitleClassName = '',
    productFooterClassName = '',
    promoExtrasClassName = '',
    productsSectionClassName = '',
    sectionClassName = 'sectionSpace',
}) => {
    const isEquipment = variant === 'equipment'

    const productsSectionClassNames = [
        styles.productsSection,
        isEquipment && styles.productsSectionEquipment,
        productsSectionClassName,
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <section className={`${sectionClassName}` || undefined}>
            <div className="container">
                <div className={`${productsSectionClassNames}`}>
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
                                <div
                                    className={`${styles.promoCard}`}
                                >
                                    <Image
                                        src={bannerImage}
                                        alt={title}
                                        fill
                                        sizes="(max-width: 767px) 100vw, 25vw"
                                        className={`${styles.promoImage}`}
                                    />

                                    <div
                                        className={`${styles.promoOverlay} ${productOverlayClassName}`}
                                    >
                                        <div
                                            role="heading"
                                            aria-level={3}
                                            className={`${styles.productTitle} text-center ${productTitleClassName}`}
                                        >
                                            {productTitle}
                                        </div>

                                        {productSubtitle && (
                                            <div className={`${styles.productSubtitle} text-center`}>
                                                {productSubtitle}
                                            </div>
                                        )}

                                        {promoExtras && (
                                            <div
                                                className={`${styles.promoExtras} ${promoExtrasClassName}`}
                                            >
                                                {promoExtras}
                                            </div>
                                        )}
                                    </div>

                                    {productFooter && (
                                        <div
                                            className={`${styles.productFooter} ${productFooterClassName}`}
                                        >
                                            {productFooter}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className={isEquipment ? 'col-12' : 'col-md-9'}>
                            <div className={`${styles.swiperWrapper}`}>

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
                                    className={`${styles.cardsRow}`}
                                >

                                    {products?.map((item) => (
                                        <SwiperSlide key={item.id}>
                                            <ProductCard 
                                                image={item.image}
                                                discount={item.discount}
                                                isBestSeller={item.isBestSeller}
                                                name={item.name}
                                                price={item.price}
                                                oldPrice={item.oldPrice}
                                                reviews={item.reviews}
                                            />
                                        </SwiperSlide>
                                    ))}

                                </Swiper>

                                {!isEquipment && (
                                    <div className={`${styles.swiperNav}`}>

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
                                        : `${styles.viewAllWrapper}`
                                }
                            >
                                <button
                                    type="button"
                                    className={`${styles.viewAllBtn}`}
                                >
                                    View All
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductsItem