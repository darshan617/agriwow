
import React from 'react'
import styles from '@/components/home/components/banner/top-banner/TopBanner.module.css'
import image1 from '@/assets/category-image/1.png'
import image2 from '@/assets/category-image/2.png'
import image3 from '@/assets/category-image/3.png'
import image4 from '@/assets/category-image/4.png'
import image5 from '@/assets/category-image/5.png'
import image6 from '@/assets/category-image/6.png'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const ALL_CATEGORIES = [
    {
        id: 1,
        image: image1,
        title: 'Agriculture Sprayers',
        slug: '/#',
    },
    {
        id: 2,
        image: image2,
        title: 'Farm Equipment\'s',
        slug: '/#',
    },
    {
        id: 3,
        image: image3,
        title: 'Garden Tools',
        slug: '/#',
    },
    {
        id: 4,
        image: image4,
        title: 'Industrial Products',
        slug: '/#',
    },
    {
        id: 5,
        image: image5,
        title: 'Post Harvest',
        slug: '/#',
    },
    {
        id: 6,
        image: image6,
        title: 'Fogging Machines',
        slug: '/#',
    },
    {
        id: 7,
        image: image1,
        title: 'Agriculture Sprayers',
        slug: '/#',
    },
    {
        id: 8,
        image: image2,
        title: 'Farm Equipment\'s',
        slug: '/#',
    },
    {
        id: 9,
        image: image3,
        title: 'Garden Tools',
        slug: '/#',
    },
    {
        id: 10,
        image: image4,
        title: 'Industrial Products',
        slug: '/#',
    },
]

const TopBanner = () => {
    return (
        <div className="container">
            <div className={`${styles.topBannerWrapper}`}>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={5}
                    slidesPerView={4}
                    loop={true}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                    }}
                    speed={1000}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                        },
                        576: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        992: {
                            slidesPerView: 6,
                        },
                    }}
                >
                    {ALL_CATEGORIES.map((category) => (
                        <SwiperSlide key={category.id}>
                            <Link href={category.slug}>
                            <div className={`${styles.categoryItem}`}>
                                <div className={`${styles.categoryImgWrapper}`}>
                                    <Image
                                        src={category.image}
                                        alt={category.title}
                                        className={`${styles.categoryImg}`}
                                        width={100}
                                        height={100}
                                    />
                                </div>
                                    <p className={`${styles.categoryLabel}`}>{category.title}</p>
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