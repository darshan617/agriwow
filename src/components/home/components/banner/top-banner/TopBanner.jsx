import React from 'react'
import styles from '@/components/home/components/banner/top-banner/TopBanner.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const TopBanner = ({ categoriesData }) => {
    return (
        <div className="container">
            <div className={`${styles.topBannerWrapper}`}>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={5}
                    slidesPerView={4}
                    loop={true}
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    speed={1000}
                    breakpoints={{
                        375: { slidesPerView: 3 },
                        425: { slidesPerView: 4 },
                        576: { slidesPerView: 5 },
                        768: { slidesPerView: 6 },
                        992: { slidesPerView: 6 },
                    }}
                >
                    {categoriesData?.map((category, idx) => (
                        <SwiperSlide key={idx}>
                            <Link href={category?.slug}>
                                <div className={`${styles.categoryItem}`}>
                                    <div className={`${styles.categoryImgWrapper}`}>
                                        <Image
                                            src={category?.image}
                                            alt={category?.name}
                                            className={`${styles.categoryImg}`}
                                            width={100}
                                            height={100}
                                        />
                                    </div>
                                    <p className={`${styles.categoryLabel}` }>{category?.name}</p>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default TopBanner