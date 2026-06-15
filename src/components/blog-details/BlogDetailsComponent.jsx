import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaPinterestP } from "react-icons/fa";
import { MdWatchLater } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { FaCircleCheck, FaRegUser } from "react-icons/fa6";
import { LuCalendarDays } from "react-icons/lu";
import styles from "@/components/blog-details/BlogDetailsComponemt.module.css";
import heroImage from "@/assets/blog/main-blog.png";
import contentImage from "@/assets/blog/content-blog.png";
import facebookIcon from "@/assets/icon/facebook.png";
import twitterIcon from "@/assets/icon/twitter.png";
import instagramIcon from "@/assets/icon/insta.png";
import youtubeIcon from "@/assets/icon/youtube.png";
import whatsappIcon from "@/assets/icon/whatsapp.png";
import {
  useGetBlogDetailsQuery,
  useGetRelatedBlogsQuery,
} from "@/redux/apis/blogApi";
import { useRouter } from "next/router";

const BlogDetailsComponent = () => {
  const router = useRouter();
  const { data: blogDetailsData } = useGetBlogDetailsQuery(
    { slug: router?.query?.slug },
    { skip: !router?.query?.slug },
  );
  const title = blogDetailsData?.data?.title;
  const category = blogDetailsData?.data?.category?.name;
  const author = blogDetailsData?.data?.author;
  const date = blogDetailsData?.data?.blog_date;
  const heroSrc = blogDetailsData?.data?.image;
  const { data: relatedBlogsData } = useGetRelatedBlogsQuery(
    { slug: router?.query?.slug },
    { skip: !router?.query?.slug },
  );
  const stripHtml = (html) => html?.replace(/<[^>]*>/g, "") ?? "";
  const relatedBlogs = relatedBlogsData?.data;
  const tags = blogDetailsData?.data?.tags;
  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.breadcrumbSep}>/</li>
          <li>
            <Link href="/blog">Blogs</Link>
          </li>
          <li className={styles.breadcrumbSep}>/</li>
          <li className={styles.breadcrumbCurrent}>{title}</li>
        </ul>
      </div>

      <article className={styles.article}>
        <span className={styles.categoryTag}>{category}</span>

        <h1 className={styles.title}>{title}</h1>

        <div className={styles.metaRow}>
          <div className={styles.metaLeft}>
            <span className={styles.metaItem}>
              <FaRegUser className={styles.metaIcon} aria-hidden />
              {author}
            </span>
            <span className={styles.metaItem}>
              <LuCalendarDays className={styles.metaIcon} aria-hidden />
              {date}
            </span>
            <span className={styles.metaItem}>
              <MdWatchLater className={styles.metaIcon} aria-hidden />5 mins
              read
            </span>
          </div>
          <div className={styles.socialShare}>
            <h2 className={styles.socialShareTitle}>Share:</h2>
            <Link href="#">
              <Image
                src={facebookIcon}
                alt="facebook"
                width={20}
                height={20}
                className={styles.socialShareIcon}
              />
            </Link>
            <Link href="#">
              <Image
                src={twitterIcon}
                alt="twitter"
                width={20}
                height={20}
                className={styles.socialShareIcon}
              />
            </Link>
            <Link href="#">
              <Image
                src={instagramIcon}
                alt="instagram"
                width={20}
                height={20}
                className={styles.socialShareIcon}
              />
            </Link>
            <Link href="#">
              <Image
                src={youtubeIcon}
                alt="youtube"
                width={20}
                height={20}
                className={styles.socialShareIcon}
              />
            </Link>
            <Link href="#">
              <Image
                src={whatsappIcon}
                alt="whatsapp"
                width={20}
                height={20}
                className={styles.socialShareIcon}
              />
            </Link>
          </div>
        </div>

        <div className={styles.heroMedia}>
          <Image
            src={heroSrc}
            alt={title}
            fill
            className={styles.heroImage}
            sizes="(max-width: 768px) 100vw, 900px"
            priority
          />
        </div>

        <div className={styles.content}>
          {/* <p>
              Efficiency in the field isn’t just about how hard you work—it’s
              about how smart you spray. For farmers and gardeners using a
              manual spray pump—whether a knapsack or compression sprayer—the
              difference between a thriving crop and wasted money often comes
              down to one thing: calibration.
            </p>
            <p>
              If your equipment isn’t calibrated, you’re likely under-applying
              (leading to pest resistance and poor yields) or over-applying
              (wasting costly chemicals and risking environmental damage).
            </p>

            <h2 className={styles.sectionTitle}>
              Why Calibration is Non-Negotiable
            </h2>
            <p>
              Manual sprayers are inherently inconsistent. Because pressure is
              generated by hand, flow rate varies with operator fatigue, pumping
              rhythm, and walking speed.
            </p>
            <p>
              Calibration helps you establish a reliable, repeatable application
              rate—especially when working with a manual knapsack sprayer in
              varying field conditions.
            </p>

            <h3 className={styles.subSectionTitle}>Key benefits includes:</h3>
            <ul className={styles.checkList}>
              {KEY_BENEFITS.map((item) => (
                <li key={item}>
                  <FaCircleCheck className={styles.checkIcon} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            <h2 className={styles.sectionTitle}>Pre-Calibration Checklist</h2>
            <ul className={styles.checkList}>
              <p>
                Before measuring anything, make sure your equipment is working
                properly. Faulty gear will invalidate your results, whether
                you’re using a traditional unit or a hand operated knapsack
                sprayer.{" "}
              </p>
              {PRE_CALIBRATION_ITEMS.map((item) => (
                <li key={item}>
                  <CiCircleCheck className={styles.checkIcon} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            <h2 className={styles.sectionTitle}>
              Step-by-Step Calibration: The &apos;1/128th&apos; Method
            </h2>
            <p>
              This is one of the simplest and most reliable methods. Since there
              are 128 ounces in a gallon, the ounces you collect directly equal
              gallons per acre (GPA).
            </p>
            <ol className={styles.stepList}>
              {CALIBRATION_STEPS.map((step, index) => (
                <li key={step}>
                  <span className={styles.stepNumber}>{index + 1}</span>
                  <span className={styles.stepText}>{step}</span>
                </li>
              ))}
            </ol>

            <h2 className={styles.sectionTitle}>Adjusting Your Results</h2>
            <p>
              If your GPA doesn’t match label recommendations, adjust using
              these three factors:
            </p>
            <ul className={styles.checkList}>
              {ADJUSTMENT_ITEMS.map((item) => (
                <li key={item}>
                  <FaCircleCheck className={styles.checkIcon} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p>
              For those using a battery sprayer for agriculture, pressure tends
              to be more stable, but calibration is still essential to ensure
              accurate application rates.
            </p>

            <h2 className={styles.sectionTitle}>
              Best Practices to Reduce Waste
            </h2>
            <ul className={styles.checkList}>
              <p>
                Calibration gives you numbers—technique ensures consistency.
              </p>
              {BEST_PRACTICES.map((item) => (
                <li key={item}>
                  <FaCircleCheck className={styles.checkIcon} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            <h2 className={styles.sectionTitle}>
              Smart Spraying: The Future of Efficient Farming
            </h2>
            <p>
              Modern farmers are adopting smart spraying technologies that
              integrate sensors and GPS to apply chemicals only where needed.
              While manual pumps remain popular, understanding calibration
              principles prepares you for a more sustainable future.
            </p>
            <div className={styles.inlineImages}>
              <div className={styles.inlineImageWrap}>
                <Image
                  src={contentImage}
                  alt="Farmer using backpack sprayer in field"
                  fill
                  className={styles.inlineImage}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className={styles.inlineImageWrap}>
                <Image
                  src={contentImage}
                  alt="Farmer spraying crops in green field"
                  fill
                  className={styles.inlineImage}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            <h2 className={styles.sectionTitle}>Conclusion</h2>
            <p>
              Calibration takes about 20 minutes but can save significant money
              over a season. More importantly, it ensures your chemicals work
              effectively while protecting your crops, soil, and surrounding
              environment.
            </p>
            <p>
              Treat your sprayer with the same precision as large-scale
              equipment—and you’ll see the difference in both yield and cost
              efficiency.
            </p> */}
        </div>
        <div
          className={styles.blogContent}
          dangerouslySetInnerHTML={{
            __html: blogDetailsData?.data?.description,
          }}
        ></div>
        <div className={styles.tags}>
          <p className={styles.tagsTitle}>Tags:</p>
          {tags?.length > 0 ? (
            <>
              {tags?.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </>
          ) : (
            <p className={styles.noTags}>No tags found</p>
          )}
        </div>
      </article>

      <section className={styles.relatedSection}>
        <h2 className={styles.relatedTitle}>Related Articles</h2>
        <div className={styles.relatedGrid}>
          {relatedBlogs?.length > 0 ? (
            relatedBlogs?.map((post) => (
              <article key={post?.id} className={styles.relatedCard}>
                <div className={styles.relatedMedia}>
                  <Image
                    src={post?.image}
                    alt={post?.title}
                    fill
                    className={styles.relatedImage}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className={styles.relatedBody}>
                  <span className={styles.relatedCategory}>
                    {post?.category?.name}
                  </span>
                  <h3 className={styles.relatedCardTitle}>{post?.title}</h3>
                  <p className={styles.relatedExcerpt}>
                    {stripHtml(post?.short_description)}
                  </p>
                  <div className={styles.relatedMeta}>
                    <span className={styles.metaItem}>
                      <FaRegUser className={styles.metaIcon} aria-hidden />
                      {post?.author}
                    </span>
                    <span className={styles.metaItem}>
                      <LuCalendarDays className={styles.metaIcon} aria-hidden />
                      {post?.blog_date}
                    </span>
                  </div>
                  <Link
                    href={`/blog/${post?.slug}`}
                    className={styles.readMoreLink}
                  >
                    Read more
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <p className={styles.noRelatedBlogs}>No related articles found</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogDetailsComponent;
