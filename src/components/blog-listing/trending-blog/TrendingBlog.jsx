import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import fireIcon from "@/assets/icon/fire.png";
import mailIllustration from "@/assets/icon/big-mail.png";
import styles from "@/components/blog-listing/trending-blog/TrendingBlog.module.css";
import { useGetHomeDataQuery } from "@/redux/apis/homeApi";
import { useSubscribeEmailMutation } from "@/redux/apis/subscribeEmailApi";
import { useToast } from "@/custom-hooks/toast/ToastProvider";


const TrendingBlog = ({ type = "blog", trendingBlogs }) => {
  const { data: homeData, isLoading: isHomeDataLoading } =
    useGetHomeDataQuery();
  const categoriesData = homeData?.data?.categories;
  const [email, setEmail] = useState("");
  const [subscribeEmail, { isLoading: isSubscribeEmailLoading }] =
    useSubscribeEmailMutation();
  const { showToast } = useToast();
  const handleSubscribe = async () => {
    if (isSubscribeEmailLoading) return;
    if (!email) return showToast("Please enter your email", "error");
    try {
      const res = await subscribeEmail({ body: { email } });
      if (res?.data?.success || res?.data?.status) {
        showToast(res?.data?.message, "success");
        setEmail("");
      } else {
        showToast(res?.error?.data?.message || "Something went wrong", "error");
      }
    } catch (error) {
      console.log(error, "error");
      showToast(error?.message || "Something went wrong", "error");
    }
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className={styles.subscribeBtn} onClick={handleSubscribe} disabled={isSubscribeEmailLoading}>
              {isSubscribeEmailLoading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          <p className={styles.disclaimer}>
            By subscribing, you agree to our{" "}
            <Link href="/terms-of-use" className={styles.disclaimerLink}>
              Terms of Use
            </Link>{" "}
            &amp;{" "}
            <Link href="/privacy-policy" className={styles.disclaimerLink}>
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
