import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import SeoHead from "@/components/seo/SeoHead";
import { buildBuyingGuideSeo } from "@/utils/seo";
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
  const heroImage =
    guide?.buying_guide_banner ?? guide?.banner_image ?? guide?.image;
  const faqs = guide?.buying_guide_faqs ?? guide?.faqs ?? [];
  const relatedLinks = (buyingGuideList?.data ?? []).filter(
    (item) => item?.slug !== slug,
  );
  const buyingGuideSeo = buildBuyingGuideSeo(guide);

  return (
    <section className={styles.section}>
      {buyingGuideSeo ? <SeoHead {...buyingGuideSeo} /> : null}
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

            {faqs.length > 0 && (
              <article className={styles.contentBlock}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.faqTitle}>
                    Frequently Asked Questions
                  </h2>
                </div>
                <div className={styles.faqList}>
                  {faqs.map((faq, index) => (
                    <details
                      key={faq?.id ?? index}
                      className={styles.faqItem}
                    >
                      <summary className={styles.faqQuestion}>
                        {faq?.question}
                        <span className={styles.faqChevron} aria-hidden="true">
                          ›
                        </span>
                      </summary>
                      {faq?.answer ? (
                        <div
                          className={styles.faqAnswer}
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                      ) : (
                        <p className={styles.faqAnswer}>—</p>
                      )}
                    </details>
                  ))}
                </div>
              </article>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyingGuideDetails;
