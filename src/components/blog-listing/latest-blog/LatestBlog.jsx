import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight, FaRegUser } from "react-icons/fa6";
import { LuCalendarDays } from "react-icons/lu";
import featuredBlogImage from "@/assets/blog/main-blog.png";
import contentBlogImage from "@/assets/blog/content-blog.png";
import styles from "@/components/blog-listing/latest-blog/LatestBlog.module.css";
import TrandingBlog from "../trending-blog/TrandingBlog";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "farming-tips", label: "Farming Tips" },
  { id: "buying-guides", label: "Buying Guides" },
  { id: "product-knowledge", label: "Product Knowledge" },
  { id: "maintenance", label: "Maintenance" },
];

const BLOGS_PER_PAGE = 6;

const FEATURED_POST = {
  category: "Agriculture",
  title:
    "Calibration Techniques for Manual Spray Pump to Avoid Chemical Wastage",
  excerpt:
    "Efficiency in the field isn't just about how hard you work—it's about how smart you spray. For farmers and gardeners using a manual spray pump—whether a knapsack or compression sprayer—the...",
  author: "Seo Person",
  date: "April 25, 2026",
  href: "#",
};

const LATEST_BLOGS = [
  {
    id: 1,
    category: "Agriculture",
    title:
      "Calibration Techniques for Manual Spray Pump to Avoid Chemical Wastage",
    excerpt:
      "Efficiency in the field isn't just about how hard you work—it's about how smart you spray. For farmers and gardeners ...",
    author: "Seo Person",
    date: "April 28, 2026",
    href: "#",
    image: contentBlogImage,
  },
  {
    id: 2,
    category: "Agriculture",
    title:
      "Calibration Techniques for Manual Spray Pump to Avoid Chemical Wastage",
    excerpt:
      "Efficiency in the field isn't just about how hard you work—it's about how smart you spray. For farmers and gardeners ...",
    author: "Seo Person",
    date: "April 28, 2026",
    href: "#",
    image: contentBlogImage,
  },
  {
    id: 3,
    category: "Agriculture",
    title:
      "Calibration Techniques for Manual Spray Pump to Avoid Chemical Wastage",
    excerpt:
      "Efficiency in the field isn't just about how hard you work—it's about how smart you spray. For farmers and gardeners ...",
    author: "Seo Person",
    date: "April 28, 2026",
    href: "#",
    image: contentBlogImage,
  },
  {
    id: 4,
    category: "Agriculture",
    title:
      "Calibration Techniques for Manual Spray Pump to Avoid Chemical Wastage",
    excerpt:
      "Efficiency in the field isn't just about how hard you work—it's about how smart you spray. For farmers and gardeners ...",
    author: "Seo Person",
    date: "April 28, 2026",
    href: "#",
    image: contentBlogImage,
  },
  {
    id: 5,
    category: "Agriculture",
    title:
      "Calibration Techniques for Manual Spray Pump to Avoid Chemical Wastage",
    excerpt:
      "Efficiency in the field isn't just about how hard you work—it's about how smart you spray. For farmers and gardeners ...",
    author: "Seo Person",
    date: "April 28, 2026",
    href: "#",
    image: contentBlogImage,
  },
  {
    id: 6,
    category: "Agriculture",
    title:
      "Calibration Techniques for Manual Spray Pump to Avoid Chemical Wastage",
    excerpt:
      "Efficiency in the field isn't just about how hard you work—it's about how smart you spray. For farmers and gardeners ...",
    author: "Seo Person",
    date: "April 28, 2026",
    href: "#",
    image: contentBlogImage,
  },
  {
    id: 7,
    category: "Agriculture",
    title:
      "Calibration Techniques for Manual Spray Pump to Avoid Chemical Wastage",
    excerpt:
      "Efficiency in the field isn't just about how hard you work—it's about how smart you spray. For farmers and gardeners ...",
    author: "Seo Person",
    date: "April 28, 2026",
    href: "#",
    image: contentBlogImage,
  },
];

const LatestBlog = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const filteredBlogs = useMemo(() => {
    return LATEST_BLOGS.filter((post) => {
      const matchesSearch = post.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "all" ||
        post.category.toLowerCase().replace(" ", "-") === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE),
  );
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * BLOGS_PER_PAGE;
    return filteredBlogs.slice(start, start + BLOGS_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  const pageItems = useMemo(() => {
    const items = [];
    if (totalPages <= 8) {
      for (let i = 1; i <= totalPages; i++) items.push(i);
      return items;
    }
    const left = Math.max(2, currentPage - 1);
    const right = Math.min(totalPages - 1, currentPage + 1);
    items.push(1);
    if (left > 2) items.push("left-ellipsis");
    for (let i = left; i <= right; i++) items.push(i);
    if (right < totalPages - 1) items.push("right-ellipsis");
    items.push(totalPages);
    return items;
  }, [currentPage, totalPages]);

  function goToPage(page) {
    const target = Math.min(Math.max(1, page), totalPages);
    if (target !== currentPage) setCurrentPage(target);
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className={`${styles.heroContent} col-lg-12`}>
            <h1 className={styles.title}>Farming Tips &amp; Buying Guides</h1>
            <p className={styles.subtitle}>
              Latest tips, buying guides &amp; farming knowledge.
            </p>
            <form
              className={styles.searchForm}
              onSubmit={(e) => e.preventDefault()}
              role="search"
            >
              <input
                type="search"
                className={styles.searchInput}
                placeholder="Search for Blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

            <div className={styles.categoryNav} aria-label="Blog categories">
              <ul className={styles.categoryList}>
                {CATEGORIES.map(({ id, label }) => (
                  <li key={id}>
                    <button
                      type="button"
                      className={`${styles.categoryBtn} ${
                        activeCategory === id ? styles.categoryBtnActive : ""
                      }`}
                      onClick={() => setActiveCategory(id)}
                      aria-pressed={activeCategory === id}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>    

          <div className="col-lg-9">
            <div className={styles.featuredCard}>
              <div className={styles.featuredMedia}>
                <Image
                  src={featuredBlogImage}
                  alt={FEATURED_POST.title}
                  fill
                  className={styles.featuredImage}
                  sizes="(max-width: 768px) 100vw, 42vw"
                  priority
                />
              </div>
              <div className={styles.featuredBody}>
                <span className={styles.featuredCategory}>
                  {FEATURED_POST.category}
                </span>
                <h2 className={styles.featuredTitle}>{FEATURED_POST.title}</h2>
                <p className={styles.featuredExcerpt}>
                  {FEATURED_POST.excerpt}
                </p>
                <div className={styles.featuredFooter}>
                  <div className={styles.featuredMeta}>
                    <span className={styles.metaItem}>
                      <FaRegUser className={styles.metaIcon} aria-hidden />
                      {FEATURED_POST.author}
                    </span>
                    <span className={styles.metaItem}>
                      <LuCalendarDays className={styles.metaIcon} aria-hidden />
                      {FEATURED_POST.date}
                    </span>
                  </div>
                  <Link
                    href={FEATURED_POST.href}
                    className={styles.readMoreBtn}
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>

            <div className={`${styles.blogList}`}>
              <h2 className={styles.blogListTitle}>Latest Blogs</h2>

              {paginatedBlogs.length === 0 ? (
                <p className={styles.emptyMessage}>
                  No blogs found. Try a different search or category.
                </p>
              ) : (
                <div className={styles.blogListGrid}>
                  {paginatedBlogs.map((post) => (
                    <div key={post.id} className={styles.blogCard}>
                      <div className={styles.blogCardMedia}>
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className={styles.blogCardImage}
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className={styles.blogCardBody}>
                        <span className={styles.blogCardCategory}>
                          {post.category}
                        </span>
                        <h3 className={styles.blogCardTitle}>{post.title}</h3>
                        <p className={styles.blogCardExcerpt}>{post.excerpt}</p>
                        <div className={styles.blogCardMeta}>
                          <span className={styles.blogCardMetaItem}>
                            <FaRegUser
                              className={styles.blogCardMetaIcon}
                              aria-hidden
                            />
                            {post.author}
                          </span>
                          <span className={styles.blogCardMetaItem}>
                            <LuCalendarDays
                              className={styles.blogCardMetaIcon}
                              aria-hidden
                            />
                            {post.date}
                          </span>
                        </div>
                        <Link
                          href={post.href}
                          className={styles.blogCardReadMore}
                        >
                          Read more
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <nav
                className={styles.paginationWrapper}
                aria-label="Blog list pagination"
              >
                <ul className={styles.pagination}>
                  <li>
                    <button
                      type="button"
                      className={styles.paginationBtn}
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={isFirstPage}
                      aria-label="Previous page"
                    >
                      <FaChevronLeft aria-hidden />
                    </button>
                  </li>

                  {pageItems.map((item, index) => {
                    if (typeof item === "string") {
                      return (
                        <li key={`${item}-${index}`}>
                          <span
                            className={styles.pageEllipsis}
                            aria-hidden="true"
                          >
                            …
                          </span>
                        </li>
                      );
                    }
                    const isActive = item === currentPage;
                    return (
                      <li key={item}>
                        <button
                          type="button"
                          className={`${styles.paginationBtn} ${
                            isActive ? styles.paginationBtnActive : ""
                          }`}
                          onClick={() => goToPage(item)}
                          aria-label={`Go to page ${item}`}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {item}
                        </button>
                      </li>
                    );
                  })}

                  <li>
                    <button
                      type="button"
                      className={styles.paginationBtn}
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={isLastPage}
                      aria-label="Next page"
                    >
                      <FaChevronRight aria-hidden />
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
          <div className="col-lg-3">
            <TrandingBlog />
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestBlog;
