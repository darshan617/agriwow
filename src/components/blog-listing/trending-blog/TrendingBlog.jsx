import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import trendingIcon1 from "@/assets/icon/trend1.jpg";
import trendingIcon2 from "@/assets/icon/trend2.jpg";
import trendingIcon3 from "@/assets/icon/trend3.jpg";
import trendingIcon4 from "@/assets/icon/trend4.jpg";
import fireIcon from "@/assets/icon/fire.png";
import mailIllustration from "@/assets/icon/big-mail.png";
import styles from "@/components/blog-listing/trending-blog/trendingBlog.module.css";
import { useGetHomeDataQuery } from "@/redux/apis/homeApi";

const TRENDING_TOPICS = [
  {
    id: 1,
    title: "Sugarcane Juice Machine",
    articleCount: 12,
    image: trendingIcon1,
    href: "#",
  },
  {
    id: 2,
    title: "Sugarcane Juice Machine",
    articleCount: 12,
    image: trendingIcon2,
    href: "#",
  },
  {
    id: 3,
    title: "Sugarcane Juice Machine",
    articleCount: 12,
    image: trendingIcon3,
    href: "#",
  },
  {
    id: 4,
    title: "Sugarcane Juice Machine",
    articleCount: 12,
    image: trendingIcon4,
    href: "#",
  },
];

const TrendingBlog = ({ type = "blog", trendingBlogs }) => {
  const { data: homeData, isLoading: isHomeDataLoading } =
    useGetHomeDataQuery();
  const categoriesData = homeData?.data?.categories;
  const handleSubscribe = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {type === "blog-detail" && (
        <form
          className={styles.searchForm}
          // onSubmit={(e) => e.preventDefault()}
          role="search"
        >
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search for Blogs..."
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search blogs"
          />
          <button
            type="submit"
            className={styles.searchBtn}
            aria-label="Search"
          >
            <FaSearch />
          </button>
        </form>
      )}
      <div className={styles.sidebar}>
        <div className={styles.card} aria-label="Trending popular tags">
          <div className={styles.header}>
            <h2 className={styles.heading}>
              <span className={styles.fireIcon} aria-hidden>
                <Image src={fireIcon} alt="fire icon" width={20} height={20} />
              </span>
              Trending Blogs
            </h2>
          </div>

          <ul className={styles.list}>
            {trendingBlogs?.map((topic) => (
              <li key={topic?.id}>
                <Link href={`/blog/${topic?.slug}`} className={styles.listItem}>
                  <span className={styles.thumb}>
                    <Image
                      src={topic?.image}
                      alt={topic?.title}
                      fill
                      className={styles.thumbImage}
                      sizes="56px"
                    />
                  </span>
                  <span className={styles.itemBody}>
                    <span className={styles.itemTitle}>{topic?.title}</span>
                    <span className={styles.itemDescription}>
                      {topic?.short_description}
                    </span>
                    <span className={styles.itemDate}>{topic?.created_at}</span>
                  </span>
                  <FaChevronRight className={styles.chevron} aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={styles.newsletterCard}
          aria-label="Newsletter subscription"
        >
          <div className={styles.illustration}>
            <Image
              src={mailIllustration}
              alt=""
              width={160}
              height={120}
              className={styles.illustrationImage}
            />
          </div>

          <h2 className={styles.newsletterHeading}>
            Get Farming Tips in Your Inbox
          </h2>
          <p className={styles.subheading}>
            Join our community and never miss an update.
          </p>

          <form className={styles.form} onSubmit={handleSubscribe}>
            <label htmlFor="newsletter-email" className={styles.srOnly}>
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              placeholder="Enter your email"
              className={styles.input}
              autoComplete="email"
              required
            />
            <button type="submit" className={styles.subscribeBtn}>
              Subscribe
            </button>
          </form>

          <p className={styles.disclaimer}>
            By subscribing, you agree to our{" "}
            <Link href="#" className={styles.disclaimerLink}>
              Terms of Use
            </Link>{" "}
            &amp;{" "}
            <Link href="#" className={styles.disclaimerLink}>
              Privacy Policy
            </Link>
          </p>
        </div>
        {type === "blog-detail" && (
          <div className={styles.card}>
            <h2 className={styles.heading}>Product Categories</h2>
            <div className={styles.grid}>
              {categoriesData?.map((category) => (
                <Link
                  key={category?.slug}
                  href={`/product-category/${category?.slug}`}
                  className={styles.tag}
                >
                  {category?.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TrendingBlog;
