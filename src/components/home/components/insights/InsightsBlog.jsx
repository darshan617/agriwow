import Image from 'next/image'
import { LuCalendarDays } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import blogImage from '@/assets/images/insight.jpg'
import styles from '@/components/home/components/insights/InsightsBlog.module.css'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useRouter } from 'next/router'
import Link from 'next/link'

const stripHtml = (html) => html?.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim() ?? ''

const formatBlogDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

const PostCard = ({ post }) => (
  <article className={`${styles.card}`}>
    <div className={`${styles.media}`}>
      <Image
        src={post?.image || blogImage}
        alt={post?.title || 'Blog post'}
        fill
        className={styles.mediaImage}
      />
    </div>
    <div className={`${styles.cardBody}`} data-aos="zoom-in" data-aos-delay="200">
      <p className={`${styles.category}`}>{post?.category}</p>
      <div className={`${styles.meta}`}>
        <span className={styles.metaItem}>
          <LuCalendarDays className={styles.metaIcon} aria-hidden />
          {formatBlogDate(post?.blog_date)}
        </span>
        <span className={`${styles.metaItem}`}>
          <FaRegUser className={`${styles.metaIcon}`} aria-hidden />
          {post?.author}
        </span>
      </div>
      <h3 className={`${styles.cardTitle}`}>{post?.title}</h3>
      <p className={`${styles.excerpt}`}>{stripHtml(post?.short_description)}</p>
    </div>
  </article>
)

const InsightsBlog = ({ insightsBlogData }) => {
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <section className={`${styles.section}`} data-aos="fade-up" data-aos-delay="100">
      <div className="container">
        <h2 className={`${styles.heading}`}>Farming Insights &amp; Blogs</h2>

        {isMobile ? (
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={20}
            breakpoints={{
              576: { slidesPerView: 2 },
              0:   { slidesPerView: 1 },
            }}
            className={styles.swiper}
          >
            {insightsBlogData?.map((post) => (
              <SwiperSlide key={post?.id}>
                <PostCard post={post} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={`${styles.grid}`}>
            {insightsBlogData?.map((post) => (
              <PostCard key={post?.id} post={post} />
            ))}
          </div>
        )}

        <div className={`${styles.viewAll}`}>
          <Link href="/blog" className={`${styles.viewAllBtn}`}>
           View All
          </Link>
        </div>
      </div>
    </section>
  )
}

export default InsightsBlog