import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight, FaRegUser } from "react-icons/fa6";
import { LuCalendarDays } from "react-icons/lu";
import styles from "@/components/blog-listing/latest-blog/LatestBlog.module.css";
import TrendingBlog from "@/components/blog-listing/trending-blog/TrendingBlog";
import {
  useGetAllBlogCategoriesMutation,
  useGetBlogListingMutation,
} from "@/redux/apis/blogApi";
import { useRouter } from "next/router";
import LatestBlogShimmer from "./LatestBlogShimmer";
import TrendingBlogShimmer from "../trending-blog/TrendingBlogShimmer";

const BLOGS_PER_PAGE = 6;

const LatestBlog = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogListData, setBlogListData] = useState([]);
  const [categories, setCategories] = useState([{ id: "all", label: "All" }]);
  const [getAllBlogs, { isLoading: isLoadingBlogs }] =
    useGetBlogListingMutation();
  const [getAllBlogCategories] = useGetAllBlogCategoriesMutation();
  const [trendingBlogs, setTrendingBlogs] = useState([]);

  const filteredBlogs = useMemo(() => {
    const posts = Array.isArray(blogListData)
      ? blogListData
      : (blogListData?.data ?? []);
    return posts.filter((post) => {
      const matchesSearch = post.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "all" ||
        post?.category?.slug === activeCategory ||
        post?.category?.name?.toLowerCase().replace(/\s+/g, "-") ===
          activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [blogListData, searchQuery, activeCategory]);

  const featuredPost = filteredBlogs?.[0] ?? null;

  const blogsExcludingFeatured = useMemo(
    () => filteredBlogs.slice(1),
    [filteredBlogs],
  );

  const totalPages = Math.max(
    1,
    Math.ceil(blogsExcludingFeatured.length / BLOGS_PER_PAGE),
  );

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * BLOGS_PER_PAGE;
    return blogsExcludingFeatured.slice(start, start + BLOGS_PER_PAGE);
  }, [blogsExcludingFeatured, currentPage]);

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

  const fetchAllBlogsData = async () => {
    try {
      const res = await getAllBlogs({
        body: {
          slug: router?.query?.category,
        },
      });
      if (res?.data?.success || res?.data?.status) {
        setBlogListData(res?.data?.data?.blogs ?? []);
        setTrendingBlogs(res?.data?.data?.trending ?? []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBlogCategoriesData = async () => {
    try {
      const res = await getAllBlogCategories();
      if (res?.data?.success || res?.data?.status) {
        const categoriesData = Array.isArray(res?.data?.data)
          ? res?.data?.data
          : [];
        setCategories([
          { id: "all", label: "All" },
          ...categoriesData.map((allCategory) => ({
            id: allCategory?.slug,
            label: allCategory?.name,
          })),
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllBlogsData();
  }, [getAllBlogs, router?.query?.category]);

  useEffect(() => {
    fetchBlogCategoriesData();
  }, [getAllBlogCategories]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  return (
    <>
      <div className="container">
        <h2 className={`${styles.heading}`}>Blogs</h2>
        <div className={`${styles.breadcrumb}`}>
          <div style={{ margin: "16px 0" }}>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li style={{ margin: "0 8px", color: "#6c757d" }}>/</li>
              <li>
                <Link href="/">Blogs</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="row">
          <div className={`${styles.heroContent} col-lg-12`}>
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
                {categories?.map(({ id, label }) => (
                  <li key={id}>
                    <button
                      type="button"
                      className={`${styles.categoryBtn} ${
                        router?.query?.category === id
                          ? styles.categoryBtnActive
                          : ""
                      }`}
                      onClick={() => {
                        setActiveCategory(id);
                        router?.push({
                          query: { category: id },
                        });
                      }}
                      aria-pressed={activeCategory === id}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-xl-9 col-lg-8 col-md-7">
            {isLoadingBlogs ? (
              <LatestBlogShimmer />
            ) : filteredBlogs?.length === 0 ? (
              <p className={styles.emptyMessage}>
                No blogs found. Try a different search or category.
              </p>
            ) : (
              <>
                {featuredPost && (
                  <div className={styles.featuredCard}>
                    <div className={styles.featuredMedia}>
                      <Image
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        fill
                        className={styles.featuredImage}
                        sizes="(max-width: 768px) 100vw, 42vw"
                        priority
                      />
                    </div>
                    <div className={styles.featuredBody}>
                      <span className={styles.featuredCategory}>
                        {featuredPost.category?.name}
                      </span>
                      <h2 className={styles.featuredTitle}>
                        {featuredPost.title}
                      </h2>
                      <p className={styles.featuredExcerpt}>
                        {featuredPost.short_description}
                      </p>
                      <div className={styles.featuredFooter}>
                        <div className={styles.featuredMeta}>
                          <span className={styles.metaItem}>
                            <FaRegUser
                              className={styles.metaIcon}
                              aria-hidden
                            />
                            {featuredPost.author}
                          </span>
                          <span className={styles.metaItem}>
                            <LuCalendarDays
                              className={styles.metaIcon}
                              aria-hidden
                            />
                            {featuredPost.blog_date}
                          </span>
                        </div>
                        <Link
                          href={`/blog/${featuredPost.slug}`}
                          className={styles.readMoreBtn}
                        >
                          Read more
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {blogsExcludingFeatured?.length > 0 && (
                  <div className={styles.blogList}>
                    <h2 className={styles.blogListTitle}>Latest Blogs</h2>
                    <div className={styles.blogListGrid}>
                      {paginatedBlogs.map((post) => (
                        <Link
                          key={post.id}
                          href={`/blog/${post?.slug}`}
                          className={styles.blogCard}
                        >
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
                              {post.category?.name}
                            </span>
                            <h3 className={styles.blogCardTitle}>
                              {post.title}
                            </h3>
                            <p className={styles.blogCardExcerpt}>
                              {post.short_description}
                            </p>
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
                                {post.blog_date}
                              </span>
                            </div>
                            <span className={styles.blogCardReadMore}>
                              Read more
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

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

          <div className="col-xl-3 col-lg-4 col-md-5">
            {isLoadingBlogs ? (
              <TrendingBlogShimmer />
            ) : (
              <TrendingBlog trendingBlogs={trendingBlogs} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestBlog;
