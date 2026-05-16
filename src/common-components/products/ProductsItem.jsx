import React from 'react'
import Image from 'next/image'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import productImage from '@/assets/images/agriculture-sprayer.jpg'
import productOne from '@/assets/products/1.png'
import productTwo from '@/assets/products/2.png'
import productOneHover from '@/assets/images/hover-product.png'
import productTwoHover from '@/assets/images/hover-product-1.png'
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
        reviews: '58 Reviews',
        imageHover: productTwoHover,
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
        imageHover: productOneHover,
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
        imageHover: productTwoHover,
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
        imageHover: productOneHover,
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
        imageHover: productTwoHover,
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
        imageHover: productOneHover,
    },
]

const ProductsItem = ({
    variant = 'default',
    title = 'Agriculture Sprayers',

    products = productList,

    bannerImage = productImage,
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
                            <div className={`col-lg-3 col-md-4  col-12 ${styles.promoCol}`}>
                                <div className={styles.promoCard}>
                                    <Image
                                        src={bannerImage}
                                        alt={title}
                                        fill
                                        sizes="(max-width: 767px) 100vw, 25vw"
                                        className={`${styles.promoImage}`}
                                    />
                                </div>
                            </div>
                        )}
                        <div
                            className={isEquipment ? 'col-12' : `col-lg-9 col-md-8  col-12 ${styles.cardsCol}`}
                       
                        >
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
                                            slidesPerView: isEquipment ? 2 : 1,
                                        },
                                        425: {
                                            slidesPerView: isEquipment ? 2 : 1,
                                        },
                                        768: {
                                            slidesPerView: isEquipment ? 3 : 2,
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
                                                imageHover={item.imageHover}
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