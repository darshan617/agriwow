import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { useGetHomeDataQuery } from "@/redux/apis/homeApi";
import { useGetWishlistQuery } from "@/redux/apis/addToWishlist";
import ProductCard from "@/common-components/product-card/ProductCard";
import emptyWishlistImg from "@/assets/images/wishlist.jpg";
import categoryImg1 from "@/assets/category-image/1.png";
import categoryImg2 from "@/assets/category-image/2.png";
import categoryImg3 from "@/assets/category-image/3.png";
import categoryImg4 from "@/assets/category-image/4.png";
import categoryImg5 from "@/assets/category-image/5.png";
import categoryImg6 from "@/assets/category-image/6.png";
import styles from "@/components/wish-list/wishlist-detail/WishlistDetail.module.css";
import ProductCardShimmer from "@/common-components/product-card/ProductCardShimmer";

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

const normalizeWishlistItems = (wishlistData) => {
  const raw = wishlistData?.data;
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw?.wishlist)) return raw.wishlist;
  if (Array.isArray(raw?.products)) return raw.products;
  if (Array.isArray(raw?.items)) return raw.items;
  return [];
};

const WishlistDetail = ({
  title = "My Wishlist",
  emptyTitle = "Your Wishlist is empty!",
  emptyText = "Explore more & shortlist your favourite items. Review them anytime and add to cart",
  shopBtnText = "START SHOPPING",
  shopBtnHref = "/product-category/agriculture-sprayers",
}) => {
  const [userId, setUserId] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const raw = Cookies.get("userData");
    if (raw) {
      try {
        const userData = JSON.parse(decodeURIComponent(raw));
        setUserId(userData?.id ?? null);
      } catch {
        setUserId(null);
      }
    }
    setIsMounted(true);
  }, []);

  const { data: homeData } = useGetHomeDataQuery();

  const {
    data: wishlistData,
    isLoading,
    isFetching,
  } = useGetWishlistQuery(userId, { skip: !userId });

  const wishlistItems = useMemo(
    () => normalizeWishlistItems(wishlistData),
    [wishlistData],
  );

  const itemCount = wishlistItems.length;
  const hasItems = itemCount > 0;
  const showEmpty = isMounted && !hasItems && !isLoading && !isFetching;

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
        {title && (
          <h1 className={styles.pageTitle}>
            {title} ({itemCount} {itemLabel})
          </h1>
        )}
      </div>

      {showEmpty && (
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
            <h2 className={styles.emptyTitle}>{emptyTitle}</h2>
            <p className={styles.emptyText}>{emptyText}</p>
            <Link href={shopBtnHref} className={styles.shopBtn} prefetch={true}>
              {shopBtnText}
            </Link>
          </div>
        </div>
      )}

      {isLoading || isFetching ? (
        <div className={styles.productsSection}>
          <div className={styles.productsGrid}>
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductCardShimmer key={index} />
            ))}
          </div>
        </div>
      ) : (
        hasItems && (
          <div className={styles.productsSection}>
            <div className={styles.productsGrid}>
              {wishlistItems.map((item) => {
                const product = item?.product ?? item;
                return (
                  <ProductCard
                    key={item?.id ?? product?.id}
                    type="productPage"
                    image={product?.thumbnail}
                    imageHover={product?.gallery?.[1] ?? product?.gallery?.[0]}
                    discount={product?.discount}
                    isBestSeller={product?.is_best_selling}
                    isTrending={product?.is_trending}
                    isFeatured={product?.is_featured}
                    isTopRated={product?.is_top_rated}
                    name={product?.name}
                    price={product?.selling_price}
                    oldPrice={product?.price}
                    reviews={
                      product?.reviews?.length ?? product?.total_reviews ?? 0
                    }
                    rating={product?.rating ?? "4.5"}
                    slug={product?.slug}
                    productId={product?.id}
                    path="/wishlist"
                  />
                );
              })}
            </div>
          </div>
        )
      )}

      <div className={styles.trendingSection}>
        <h2 className={styles.trendingTitle}>Trending Categories</h2>
        <div className={styles.categoryGrid}>
          {trendingCategories.map((category) => (
            <Link
              key={category?.slug ?? category?.name}
              href={category?.slug ? `/product-category/${category.slug}` : "#"}
              className={styles.categoryCard}
              prefetch={true}
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
