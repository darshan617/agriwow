import Image from 'next/image'
import { LuCalendarDays } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import blogImage from '@/assets/images/insight.jpg'
import styles from '@/components/insights/InsightsBlog.module.css'

const posts = [
  {
    id: '1',
    category: 'Agriculture',
    date: 'March 27, 2026',
    author: 'SEO Person',
    title: <>
      <p className={`${styles.titleBold} mb-0`}><span>Sugarcane Juice Machine</span> में इस्तेमाल होने वाले स्टेनलेस स्टील रोलर क्यों जरूरी होते हैं</p>
    </>,
    excerpt:
      'गर्मियों में गन्ने का रस (sugarcane juice) एक लोकप्रिय और हेल्दी पेय है। लेकिन क्या आपने कभी सोचा है कि एक अच्छी sugarcane juice machine का सबसे महत्वपूर्ण हिस्सा...',
  },
  {
    id: '2',
    category: 'Agriculture',
    date: 'March 27, 2026',
    author: 'SEO Person',
    title: <>
      <p className={`${styles.titleBold} mb-0`}><span>Sugarcane Juice Machine</span> में इस्तेमाल होने वाले स्टेनलेस स्टील रोलर क्यों जरूरी होते हैं</p>
    </>,
    excerpt:
      'गर्मियों में गन्ने का रस (sugarcane juice) एक लोकप्रिय और हेल्दी पेय है। लेकिन क्या आपने कभी सोचा है कि एक अच्छी sugarcane juice machine का सबसे महत्वपूर्ण हिस्सा...',
  },
  {
    id: '3',
    category: 'Agriculture',
    date: 'March 27, 2026',
    author: 'SEO Person',
    title: <>
      <p className={`${styles.titleBold} mb-0`}><span>Sugarcane Juice Machine</span> में इस्तेमाल होने वाले स्टेनलेस स्टील रोलर क्यों जरूरी होते हैं</p>
    </>,
    excerpt:
      'गर्मियों में गन्ने का रस (sugarcane juice) एक लोकप्रिय और हेल्दी पेय है। लेकिन क्या आपने कभी सोचा है कि एक अच्छी sugarcane juice machine का सबसे महत्वपूर्ण हिस्सा...',
  },
]

const InsightsBlog = () => {
  return (
    <section className={`${styles.section}`}>
      <div className="container">
        <h2 className={`${styles.heading}`}>Farming Insights &amp; Blogs</h2>
        <div className={`${styles.grid}`}>
          {posts.map((post) => (
            <article key={post.id} className={`${styles.card}`}>
              <div className={`${styles.media}`}>
                <Image
                  src={blogImage}
                  alt={post.title}
                  fill
                  className={styles.mediaImage}
                />
                <div className={`${styles.ribbon}`} aria-hidden>
                  <p className={`${styles.ribbonText}`}>{post.overlayTitle}</p>
                </div>
              </div>
              <div className={`${styles.cardBody}`}>
                <p className={`${styles.category}`}>{post.category}</p>
                <div className={`${styles.meta}`}>
                  <span className={styles.metaItem}>
                    <LuCalendarDays className={styles.metaIcon} aria-hidden />
                    {post.date}
                  </span>
                  <span className={`${styles.metaItem}`}>
                    <FaRegUser className={`${styles.metaIcon}`} aria-hidden />
                    {post.author}
                  </span>
                </div>
                <h3 className={`${styles.cardTitle}`}>{post.title}</h3>
                <p className={`${styles.excerpt}`}>{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
        <div className={`${styles.viewAll}`}>
          <button type="button" className={`${styles.viewAllBtn}`}>View All</button>
        </div>
      </div>
    </section>
  )
}

export default InsightsBlog
