    import Image from 'next/image'
    import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
    import productImage from '@/assets/images/agriculture-sprayer.jpg'
    import ProductCard from '@/common-components/product-card/ProductCard'
    import styles from '@/common-components/products/ProductsItems.module.css'
    import { Swiper, SwiperSlide } from 'swiper/react'
    import { Navigation, Autoplay } from 'swiper/modules'

    import 'swiper/css'

    const ProductsItem = ({
        agricultureProductsData,
        variant = 'default',
        title = 'Agriculture Sprayers',
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
            <section className={sectionClassName}>
                <div className="container">
                    <div className={productsSectionClassNames}>
                        <div className="row g-3 align-items-stretch">

                            {!isEquipment && (
                                <div className="col-12">
                                    <h2 className={`${styles.productsTitle} text-center`}>
                                        {title}
                                    </h2>
                                </div>
                            )}

                            {!isEquipment && (
                                <div className={`col-lg-3 col-md-4 col-12 ${styles.promoCol}`}>
                                    <div className={styles.promoCard}>
                                        <Image
                                            src={bannerImage}
                                            alt={title}
                                            fill
                                            sizes="(max-width: 767px) 100vw, 25vw"
                                            className={styles.promoImage}
                                        />
                                    </div>
                                </div>
                            )}
                            <div
                                className={isEquipment ? 'col-12' : `col-lg-9 col-md-8 col-12 ${styles.cardsCol}`}
                            >
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
                                            1024: {
                                                slidesPerView: isEquipment ? 4 : 3,
                                            },
                                            1199: {
                                                slidesPerView: isEquipment ? 5 : 4,
                                            },
                                        }}
                                        className={styles.cardsRow}
                                    >

                                        {agricultureProductsData?.map((item) => (
                                            <SwiperSlide key={item.id}>
                                                <ProductCard
                                                    image={item?.gallery[0]}
                                                    imageHover={item?.gallery[1]}
                                                    discount={item?.discount}
                                                    isBestSeller={item?.is_best_selling}
                                                    name={item?.name}
                                                    price={item?.selling_price}
                                                    oldPrice={item?.price}
                                                    reviews={item?.total_reviews}
                                                    rating={item?.rating}
                                                />
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
                </div>
            </section>
        )
    }

    export default ProductsItem
