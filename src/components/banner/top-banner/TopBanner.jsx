
import React from 'react'
import styles from '@/components/banner/top-banner/TopBanner.module.css'
import image1 from '@/assets/category-image/1.png'
import image2 from '@/assets/category-image/2.png'
import image3 from '@/assets/category-image/3.png'
import image4 from '@/assets/category-image/4.png'
import image5 from '@/assets/category-image/5.png'
import image6 from '@/assets/category-image/6.png'

import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

import 'swiper/css'

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
                    <SwiperSlide>
                        <div className={`${styles.categoryItem}`}>
                            <div className={`${styles.categoryImgWrapper}`}>
                                <Image
                                    src={image1}
                                    alt="image1"
                                    className={`${styles.categoryImg}`}
                                />
                            </div>
                            <p className={`${styles.categoryLabel}`}>Agriculture Sprayers</p>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className={`${styles.categoryItem}`}>
                            <div className={`${styles.categoryImgWrapper}`}>
                                <Image
                                    src={image2}
                                    alt="image2"
                                    className={`${styles.categoryImg}`}
                                />
                            </div>
                            <p className={`${styles.categoryLabel}`}>{`Farm Equipment's`}</p>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className={`${styles.categoryItem}`}>
                            <div className={`${styles.categoryImgWrapper}`}>
                                <Image
                                    src={image3}
                                    alt="image3"
                                    className={`${styles.categoryImg}`}
                                />
                            </div>
                            <p className={`${styles.categoryLabel}`}>Garden Tools</p>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className={`${styles.categoryItem}`}>
                            <div className={`${styles.categoryImgWrapper}`}>
                                <Image
                                    src={image4}
                                    alt="image4"
                                    className={`${styles.categoryImg}`}
                                />
                            </div>
                            <p className={`${styles.categoryLabel}`}>Industrial Products</p>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className={`${styles.categoryItem}`}>
                            <div className={`${styles.categoryImgWrapper}`}>
                                <Image
                                    src={image5}
                                    alt="image5"
                                    className={`${styles.categoryImg}`}
                                />
                            </div>
                            <p className={`${styles.categoryLabel}` }>Post Harvest</p>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className={`${styles.categoryItem}`}>
                            <div className={`${styles.categoryImgWrapper}`}>
                                <Image
                                    src={image6}
                                    alt="image6"
                                    className={`${styles.categoryImg}`}
                                />
                            </div>
                            <p className={`${styles.categoryLabel}`}>Fogging Machines</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={`${styles.categoryItem}`}>
                            <div className={`${styles.categoryImgWrapper}`}>
                                <Image
                                    src={image1}
                                    alt="image1"
                                    className={`${styles.categoryImg}`}
                                />
                            </div>
                            <p className={`${styles.categoryLabel}`}>Agriculture Sprayers</p>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className={`${styles.categoryItem}`}>
                            <div className={`${styles.categoryImgWrapper}`}>
                                <Image
                                    src={image2}
                                    alt="image2"
                                    className={`${styles.categoryImg}`}
                                />
                            </div>
                            <p className={`${styles.categoryLabel}`}>{`Farm Equipment's`}</p>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className={`${styles.categoryItem}`}>
                            <div className={`${styles.categoryImgWrapper}`}>
                                <Image
                                    src={image3}
                                    alt="image3"
                                    className={`${styles.categoryImg}`}
                                />
                            </div>
                            <p className={`${styles.categoryLabel}`}>Garden Tools</p>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className={`${styles.categoryItem}`}>
                            <div className={`${styles.categoryImgWrapper}`}>
                                <Image
                                    src={image4}
                                    alt="image4"
                                    className={`${styles.categoryImg}`}
                                />
                            </div>
                            <p className={`${styles.categoryLabel}`}>Industrial Products</p>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className={`${styles.categoryItem}`}>
                            <div className={`${styles.categoryImgWrapper}`}>
                                <Image
                                    src={image5}
                                    alt="image5"
                                    className={`${styles.categoryImg}`}
                                />
                            </div>
                            <p className={`${styles.categoryLabel}`}>Post Harvest</p>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className={`${styles.categoryItem}`}>
                            <div className={`${styles.categoryImgWrapper}`}>
                                <Image
                                    src={image6}
                                    alt="image6"
                                    className={`${styles.categoryImg}`}
                                />
                            </div>
                            <p className={`${styles.categoryLabel}`}>Fogging Machines</p>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

export default TopBanner