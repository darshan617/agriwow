import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/components/buying-guide/BuyingGuideDetails.module.css";
import {
  useGetBuyingGuideDetailsQuery,
  useGetBuyingGuideQuery,
} from "@/redux/apis/buyingGuideApi";

const BuyingGuideDetails = () => {
  const router = useRouter();
  const slug = router?.query?.slug;
  const { data: buyingGuideList } = useGetBuyingGuideQuery();

  const subcategoryId = (buyingGuideList?.data ?? []).find(
    (item) => item?.slug === slug,
  )?.id;

  const { data: buyingGuideDetails } = useGetBuyingGuideDetailsQuery(
    { id: subcategoryId },
    { skip: !subcategoryId },
  );

  const guide = buyingGuideDetails?.data;
  const heroImage = guide?.image;
  const relatedLinks = (buyingGuideList?.data ?? []).filter(
    (item) => item?.slug !== slug,
  );

  return (
    <section className={styles.section}>
      <div className={styles.heroBanner}>
        {heroImage ? (
          <Image
            src={heroImage}
            alt={`${guide?.name} Buying Guide`}
            fill
            className={styles.heroImage}
            sizes="100vw"
            priority
          />
        ) : (
          <div className={styles.heroPlaceholder} />
        )}
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>{guide?.name} Buying Guide</h1>
          <p className={styles.heroSubtitle}>
            Everything you need to know before choosing the right {guide?.name}
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.guideDetailsLayout}>
          {/* <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h2 className={styles.sidebarHeading}>Related Links</h2>
              <div className={styles.linkList}>
                {relatedLinks.map((link) => (
                  <Link
                    key={link?.id}
                    href={`/buying-guide/${link?.slug}`}
                    className={styles.sidebarLink}
                  >
                    {link?.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside> */}

          <div className={styles.guideDetailsContent}>
            <article className={styles.contentBlock}>
              {guide?.buying_guide ? (
                <div
                  className={styles.guideContent}
                  dangerouslySetInnerHTML={{ __html: guide?.buying_guide }}
                />
              ) : (
                <p className={styles.emptyGuide}>
                  Buying guide content is coming soon for {guide?.name}.
                </p>
              )}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyingGuideDetails;
