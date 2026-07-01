import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./BuyingGuide.module.css";
import { useGetBuyingGuideQuery } from "@/redux/apis/buyingGuideApi";


const BuyingGuide = () => {
  const { data: buyingGuide, isLoading } = useGetBuyingGuideQuery();
  console.log(buyingGuide, "buyingGuide");
  const categories = buyingGuide?.data?.map((item) => ({
    id: item?.id,
    name: item?.name,
    slug: item?.slug,
    image: item?.image_url,
    svgIconData: item?.svg_icon_data,
  }));
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <section className={styles.section}>
      <div className="container">
        <h1 className={styles.title}>Buying Guide</h1>
        <div className={styles.grid}>
          {categories?.map((category) => (
            <Link
              key={category?.id}
              href={`/buying-guide/${category?.slug}`}
              className={styles.tile}
            >
              <span className={styles.iconWrap}>
                {category?.svgIconData?.url ? (
                  <Image
                    src={category.svgIconData.url}
                    alt={category?.name}
                    width={28}
                    height={28}
                    className={styles.icon}
                  />
                ) : category?.image ? (
                  <Image
                    src={category.image}
                    alt={category?.name}
                    width={28}
                    height={28}
                    className={styles.icon}
                  />
                ) : null}
              </span>
              <span className={styles.label}>{category?.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuyingGuide;