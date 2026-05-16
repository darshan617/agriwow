import React from 'react'
import Image from 'next/image'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { IoPlay } from 'react-icons/io5'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import videoThumb from '@/assets/video/video1.jpg'
import styles from '@/components/home/components/video/VideoSection.module.css'

const videoSlides = [
  {
    id: '1',
    youtubeUrl: '',
  },
  {
    id: '2',
    youtubeUrl: '',
  },
  {
    id: '3',
    youtubeUrl: '',
  },
].map((item) => ({ ...item, image: videoThumb }))

const VideoSection = () => {
    return (
        <section className={`${styles.VideoContainer} sectionSpace`}>
            <div className="container">
                <div className={`${styles.carousel}`}>
                    <Swiper
                        modules={[Navigation]}
                        slidesPerView={1}
                        spaceBetween={0}
                        loop={videoSlides.length > 1}
                        navigation={{
                            prevEl: '#videoSwiperPrev',
                            nextEl: '#videoSwiperNext',
                        }}
                        className={`${styles.swiper}`}
                    >
                        {videoSlides.map((slide) => (
                            <SwiperSlide key={slide.id} className={`${styles.slide}`}>
                                <div className={`${styles.card}`}>
                                    <Image
                                        src={slide.image}
                                        alt={slide.title || 'Video thumbnail'}
                                        fill
                                        className={`${styles.bgImage}`}
                                        sizes="(max-width: 768px) 100vw, min(1200px, 92vw)"
                                        priority={slide.id === '1'}
                                    />
                                    <div className={`${styles.scrim}`} aria-hidden="true" />
                                    <div className={`${styles.inner}`}>
                                        <h2 className={`${styles.title}`}>
                                            {slide.title || ''}
                                        </h2>
                                        <a
                                            href={slide.youtubeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`${styles.playBtn}`}
                                            aria-label={`Watch${slide.title ? ` ${slide.title}` : ''} on YouTube`}
                                        >
                                            <IoPlay className={`${styles.playIcon}`} aria-hidden="true" />
                                        </a>    
                                        <div className={`${styles.footer}`}>
                                            <span className={`${styles.footerText}`}>
                                                Watch more videos on Youtube
                                            </span>
                                            <a
                                                href="https://www.youtube.com/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`${styles.viewAll}`}
                                            >
                                                View All
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <button
                        id="videoSwiperPrev"
                        type="button"
                        className={`${styles.navBtn}`}
                        aria-label="Previous video"
                    >
                        <FiChevronLeft aria-hidden />
                    </button>
                    <button
                        id="videoSwiperNext"
                        type="button"
                        className={`${styles.navBtn} ${styles.navBtnNext}`}
                        aria-label="Next video"
                    >
                        <FiChevronRight aria-hidden />
                    </button>
                </div>
            </div>
        </section>
    )
}
 
export default VideoSection
