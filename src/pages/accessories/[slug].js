import Layout from "@/components/layout/Layout";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef } from "react";
import { useGetAccessoriesSubcategoriesQuery } from "@/redux/apis/accessoryApi";
import ProductCard from "@/common-components/product-card/ProductCard";
import ProductCardShimmer from "@/common-components/product-card/ProductCardShimmer";
import styles from "@/components/accessories/Accessories.module.css";
import Link from "next/link";
import { trackViewItemList } from "@/utils/gtm";

const SubcategoryAccessory = () => {
  const router = useRouter();
  const { slug } = router.query;
  const listTrackedKey = useRef("");
  const { data: accessoriesSubcategories, isLoading } =
    useGetAccessoriesSubcategoriesQuery(slug, { skip: !slug });

  const products = useMemo(() => {
    if (Array.isArray(accessoriesSubcategories?.data)) {
      return accessoriesSubcategories.data;
    }
    return accessoriesSubcategories?.data?.products ?? [];
  }, [accessoriesSubcategories?.data]);

  const listName =
    router.query.slug?.replace(/-/g, " ") || "Accessories";

  useEffect(() => {
    if (!Array.isArray(products) || !products.length) return;

    const trackKey = `${slug}:${products.map((p) => p?.id).join(",")}`;
    if (listTrackedKey.current === trackKey) return;
    listTrackedKey.current = trackKey;

    trackViewItemList(listName, products, slug);
  }, [products, slug, listName]);

  return (
    <Layout>
      <section className={`${styles.accessoriesListing} sectionSpace`}>
        <div className="container">
          <div className={`${styles.breadcrumb} `}>
            <div style={{ margin: "16px 0" }}>
              <ul>
                <li>
                  <Link href="/" prefetch={true}>
                    Home
                  </Link>
                </li>
                <li style={{ margin: "0 8px", color: "#6c757d" }}>/</li>
                <li>
                  <Link href="/accessories" prefetch={true}>
                    Accessories
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <h2 className={`${styles.title} text-capitalize`}>
            {router.query.slug?.replace(/-/g, " ") || "Accessories"}
          </h2>

          <div className={styles.productsGrid}>
            {isLoading &&
              Array.from({ length: 8 }).map((_, index) => (
                <ProductCardShimmer key={index} />
              ))}

            {!isLoading && products.length === 0 && (
              <p className={styles.emptyState}>No products found.</p>
            )}

            {!isLoading &&
              products.map((item, index) => (
                <ProductCard
                  key={item?.id ?? item?.slug}
                  type="productPage"
                  image={item?.thumbnail}
                  imageHover={item?.gallery?.[0]}
                  discount={item?.discount}
                  isBestSeller={item?.is_best_selling}
                  isTrending={item?.is_trending}
                  isFeatured={item?.is_featured}
                  isTopRated={item?.is_top_rated}
                  name={item?.name}
                  price={item?.selling_price}
                  oldPrice={item?.price}
                  reviews={item?.total_reviews}
                  average_rating={item?.average_rating}
                  slug={item?.slug}
                  productId={item?.id}
                  isWishlist={item?.is_wishlist}
                  quantity={item?.quantity}
                  similarProductData={item}
                  itemListName={listName}
                  itemIndex={index}
                />
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SubcategoryAccessory;
