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

const SOCIAL_SHARE_LINKS = [
  {
    icon: facebookIcon,
    alt: "facebook",
    url: "https://www.facebook.com/sharer/sharer.php?u=",
  },
  {
    icon: twitterIcon,
    alt: "twitter",
    url: "https://twitter.com/intent/tweet?url=",
  },
  // {
  //   icon: instagramIcon,
  //   alt: "instagram",
  //   url: "https://www.instagram.com/sharer/sharer.php?u=",
  // },
  // {
  //   icon: youtubeIcon,
  //   alt: "youtube",
  //   url: "https://www.youtube.com/sharer/sharer.php?u=",
  // },
  {
    icon: whatsappIcon,
    alt: "whatsapp",
    url: "https://wa.me/?text=",
  },
];

const BlogDetailsComponent = ({ blogDetailsData }) => {
  const router = useRouter();

  const title = blogDetailsData?.data?.blog?.title;
  const category = blogDetailsData?.data?.blog?.category?.name;
  const author = blogDetailsData?.data?.blog?.author;
  const date = blogDetailsData?.data?.blog?.blog_date;
  const heroSrc = blogDetailsData?.data?.blog?.image;
  const { data: relatedBlogsData } = useGetRelatedBlogsQuery(
    { slug: router?.query?.slug },
    { skip: !router?.query?.slug },
  );
  const stripHtml = (html) => html?.replace(/<[^>]*>/g, "") ?? "";
  const relatedBlogs = relatedBlogsData?.data;
  const tags = blogDetailsData?.data?.blog?.tags;
  const fullUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${router.asPath}`
      : "";
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
            {SOCIAL_SHARE_LINKS?.map((item) => (
              <Link href={`${item?.url}/${fullUrl}`} target="_blank">
                <Image
                  src={item?.icon}
                  alt={item?.alt}
                  width={20}
                  height={20}
                  className={styles.socialShareIcon}
                />
              </Link>
            ))}
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

        <div
          className={styles.blogContent}
          dangerouslySetInnerHTML={{
            __html: blogDetailsData?.data?.blog?.description,
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
