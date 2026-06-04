import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetHomeDataQuery } from "@/redux/apis/homeApi";
import emptyWishlistImg from "@/assets/images/wishlist.jpg";
import categoryImg1 from "@/assets/category-image/1.png";
import categoryImg2 from "@/assets/category-image/2.png";
import categoryImg3 from "@/assets/category-image/3.png";
import categoryImg4 from "@/assets/category-image/4.png";
import categoryImg5 from "@/assets/category-image/5.png";
import categoryImg6 from "@/assets/category-image/6.png";
import styles from "@/components/wish-list/wishlist-detail/WishlistDetail.module.css";

const FALLBACK_CATEGORIES = [
  { name: "Safety", slug: "safety", image: categoryImg1 },
  { name: "Electricals", slug: "electricals", image: categoryImg2 },
  { name: "Power Tools", slug: "power-tools", image: categoryImg3 },
  { name: "Pumps & Motors", slug: "pumps-motors", image: categoryImg4 },
  {
    name: "Office Stationery & Supplies",
    slug: "office-stationery",
    image: categoryImg5,
  },
  { name: "Medical Supplies", slug: "medical-supplies", image: categoryImg6 },
];

const WishlistDetail = ({ itemCount = 0 }) => {
  const { data: homeData } = useGetHomeDataQuery();

  const trendingCategories = useMemo(() => {
    const fromApi = homeData?.data?.categories;
    if (Array.isArray(fromApi) && fromApi.length > 0) {
      return fromApi.slice(0, 6).map((cat) => ({
        name: cat?.name,
        slug: cat?.slug,
        image: cat?.image,
      }));
    }
    return FALLBACK_CATEGORIES;
  }, [homeData]);

  const itemLabel = itemCount === 1 ? "Item" : "Items";

  return (
    <section className={styles.wishlistPanel}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          My Wishlist ({itemCount} {itemLabel})
        </h1>
      </div>

      <div className={styles.emptySection}>
        <div className={styles.emptyVisual}>
          <Image
            src={emptyWishlistImg}
            alt=""
            className={styles.emptyImage}
            width={420}
            height={320}
            priority
          />
        </div>

        <div className={styles.emptyContent}>
          <h2 className={styles.emptyTitle}>Your Wishlist is empty!</h2>
          <p className={styles.emptyText}>
            Explore more &amp; shortlist your favourite items. Review them
            anytime and add to cart
          </p>
          <Link href="/" className={styles.shopBtn}>
            START SHOPPING
          </Link>
        </div>
      </div>

      <div className={styles.trendingSection}>
        <h2 className={styles.trendingTitle}>Trending Categories</h2>
        <div className={styles.categoryGrid}>
          {trendingCategories.map((category) => (
            <Link
              key={category?.slug ?? category?.name}
              href={
                category?.slug
                  ? `/product-category/${category.slug}`
                  : "#"
              }
              className={styles.categoryCard}
            >
              <div className={styles.categoryImageWrap}>
                <Image
                  src={category?.image}
                  alt={category?.name ?? "Category"}
                  width={80}
                  height={80}
                  className={styles.categoryImage}
                />
              </div>
              <span className={styles.categoryName}>{category?.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WishlistDetail;
