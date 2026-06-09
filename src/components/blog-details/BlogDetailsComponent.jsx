import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaPinterestP, FaRegCommentDots } from "react-icons/fa";
import { FaCheck, FaRegUser, FaXTwitter } from "react-icons/fa6";
import { LuCalendarDays } from "react-icons/lu";
import styles from "@/components/blog-details/BlogDetailsComponemt.module.css";
import heroImage from "@/assets/blog/main-blog.png";
import contentImage from "@/assets/blog/content-blog.png";

const CALIBRATION_STEPS = [
  "Measure Spray Width",
  "Calculate Calibration Distance",
  "Time Your Walk",
  "Collect Nozzle Output",
  "Determine Application Rate",
];

const KEY_BENEFITS = [
  "Cost savings",
  "Environmental protection",
  "Crop safety",
];

const PRE_CALIBRATION_ITEMS = [
  "Inspect the nozzle",
  "Clean filters",
  "Check for leaks",
  "Uniformity test",
];

const ADJUSTMENT_ITEMS = [
  "If the rate is too high, walk faster or reduce pressure.",
  "If the rate is too low, walk slower or increase pressure.",
  "If adjustments fail, change the nozzle size.",
];

const BEST_PRACTICES = [
  "Calibrate at the start of every season.",
  "Recalibrate when changing chemicals or nozzles.",
  "Keep a calibration log for each field.",
  "Train all operators on proper technique.",
];

const TAGS = [
  "Sprayers",
  "Brush Cutters",
  "Garden Tools",
  "Power Weeders",
  "Fogging Machines",
];

const RELATED_ARTICLES = [
  {
    id: 1,
    slug: "calibration-techniques-manual-spray-pump",
    title:
      "Calibration Techniques for Manual Spray Pump to Avoid Chemical Wastage",
    excerpt:
      "Learn how to calibrate your manual spray pump to reduce chemical wastage and protect your crops effectively.",
    author: "Agriwow Team",
    date: "June 10, 2023",
    category: "Agriculture",
    image: heroImage,
  },
  {
    id: 2,
    slug: "calibration-techniques-manual-spray-pump-2",
    title:
      "Calibration Techniques for Manual Spray Pump to Avoid Chemical Wastage",
    excerpt:
      "Learn how to calibrate your manual spray pump to reduce chemical wastage and protect your crops effectively.",
    author: "Agriwow Team",
    date: "June 10, 2023",
    category: "Agriculture",
    image: heroImage,
  },
  {
    id: 3,
    slug: "calibration-techniques-manual-spray-pump-3",
    title:
      "Calibration Techniques for Manual Spray Pump to Avoid Chemical Wastage",
    excerpt:
      "Learn how to calibrate your manual spray pump to reduce chemical wastage and protect your crops effectively.",
    author: "Agriwow Team",
    date: "June 10, 2023",
    category: "Agriculture",
    image: heroImage,
  },
];

const BlogDetailsComponent = ({ blogDetails }) => {
  const title =
    blogDetails?.data?.title ||
    "Calibration Techniques for Manual Spray Pump to Avoid Chemical Wastage";
  const category = blogDetails?.data?.category?.name || "Agriculture";
  const author = blogDetails?.data?.author || "Agriwow Team";
  const date = blogDetails?.data?.blog_date || "June 10, 2023";
  const heroSrc = blogDetails?.data?.image || heroImage;
  const commentCount = blogDetails?.data?.comment_count ?? 0;

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.breadcrumb}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li className={styles.breadcrumbSep}>/</li>
            <li>
              <Link href="/blog">Blogs</Link>
            </li>
            <li className={styles.breadcrumbSep}>/</li>
            <li className={styles.breadcrumbCurrent}>{title}</li>
          </ul>
        </div>

        <article className={styles.article}>
          <span className={styles.categoryTag}>{category}</span>

          <h1 className={styles.title}>{title}</h1>

          <div className={styles.metaRow}>
            <div className={styles.metaLeft}>
              <span className={styles.metaItem}>
                <FaRegUser className={styles.metaIcon} aria-hidden />
                {author}
              </span>
              <span className={styles.metaItem}>
                <LuCalendarDays className={styles.metaIcon} aria-hidden />
                {date}
              </span>
              <span className={styles.metaItem}>
                <FaRegCommentDots className={styles.metaIcon} aria-hidden />
                {commentCount} Comments
              </span>
            </div>
            <div className={styles.socialShare}>
              <button type="button" className={styles.socialBtn} aria-label="Share on Facebook">
                <FaFacebookF />
              </button>
              <button type="button" className={styles.socialBtn} aria-label="Share on X">
                <FaXTwitter />
              </button>
              <button type="button" className={styles.socialBtn} aria-label="Share on Pinterest">
                <FaPinterestP />
              </button>
            </div>
          </div>

          <div className={styles.heroMedia}>
            <Image
              src={heroSrc}
              alt={title}
              fill
              className={styles.heroImage}
              sizes="(max-width: 768px) 100vw, 900px"
              priority
            />
          </div>

          <div className={styles.content}>
            <p>
              Manual spray pumps are essential tools for small and medium-scale
              farmers. However, without proper calibration, they can lead to
              significant chemical wastage, increased costs, and potential crop
              damage. Calibration ensures that the right amount of pesticide or
              fertilizer is applied uniformly across your field.
            </p>
            <p>
              In this guide, we will walk you through proven calibration
              techniques that help you maximize efficiency while minimizing
              environmental impact.
            </p>

            <h2 className={styles.sectionTitle}>Why Calibration is Non-Negotiable</h2>
            <p>
              Calibration is the process of determining the output of your spray
              pump under specific conditions. It accounts for walking speed,
              nozzle type, pressure, and spray width. Without it, you are
              essentially guessing how much chemical you are applying.
            </p>
            <p>
              Over-application wastes money and can harm crops, while
              under-application leaves pests and weeds untreated. Both scenarios
              hurt your bottom line and the environment.
            </p>

            <h3 className={styles.subSectionTitle}>Key benefits includes</h3>
            <ul className={styles.checkList}>
              {KEY_BENEFITS.map((item) => (
                <li key={item}>
                  <FaCheck className={styles.checkIcon} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            <h2 className={styles.sectionTitle}>Pre-Calibration Checklist</h2>
            <p>Before you begin, ensure your equipment is in optimal condition:</p>
            <ul className={styles.checkList}>
              {PRE_CALIBRATION_ITEMS.map((item) => (
                <li key={item}>
                  <FaCheck className={styles.checkIcon} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            <h2 className={styles.sectionTitle}>
              Step-by-Step Calibration: The &apos;1/128th&apos; Method
            </h2>
            <p>
              This widely used method helps you determine your application rate
              in gallons per acre (GPA):
            </p>
            <ol className={styles.stepList}>
              {CALIBRATION_STEPS.map((step, index) => (
                <li key={step}>
                  <span className={styles.stepNumber}>{index + 1}</span>
                  <span className={styles.stepText}>{step}</span>
                </li>
              ))}
            </ol>

            <h2 className={styles.sectionTitle}>Adjusting Your Results</h2>
            <p>
              Once you have your application rate, compare it to the label
              recommendation. If it does not match:
            </p>
            <ul className={styles.bulletList}>
              {ADJUSTMENT_ITEMS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2 className={styles.sectionTitle}>Best Practices to Reduce Waste</h2>
            <ul className={styles.checkList}>
              {BEST_PRACTICES.map((item) => (
                <li key={item}>
                  <FaCheck className={styles.checkIcon} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            <h2 className={styles.sectionTitle}>
              Smart Spraying: The Future of Efficient Farming
            </h2>
            <p>
              Modern farmers are adopting smart spraying technologies that
              integrate sensors and GPS to apply chemicals only where needed.
              While manual pumps remain popular, understanding calibration
              principles prepares you for a more sustainable future.
            </p>
            <div className={styles.inlineImages}>
              <div className={styles.inlineImageWrap}>
                <Image
                  src={contentImage}
                  alt="Farmer using backpack sprayer in field"
                  fill
                  className={styles.inlineImage}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className={styles.inlineImageWrap}>
                <Image
                  src={contentImage}
                  alt="Farmer spraying crops in green field"
                  fill
                  className={styles.inlineImage}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            <h2 className={styles.sectionTitle}>Conclusion</h2>
            <p>
              Calibrating your manual spray pump is a simple yet powerful way to
              save money, protect your crops, and reduce environmental harm. By
              following the steps outlined above, you can ensure every spray
              application is precise and effective.
            </p>
            <p>
              Make calibration a regular part of your farming routine, and you
              will see the benefits in both yield and sustainability.
            </p>

            <div className={styles.tags}>
              {TAGS.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        <section className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>Related Articles</h2>
          <div className={styles.relatedGrid}>
            {RELATED_ARTICLES.map((post) => (
              <article key={post.id} className={styles.relatedCard}>
                <div className={styles.relatedMedia}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className={styles.relatedImage}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className={styles.relatedBody}>
                  <span className={styles.relatedCategory}>{post.category}</span>
                  <h3 className={styles.relatedCardTitle}>{post.title}</h3>
                  <p className={styles.relatedExcerpt}>{post.excerpt}</p>
                  <div className={styles.relatedMeta}>
                    <span className={styles.metaItem}>
                      <FaRegUser className={styles.metaIcon} aria-hidden />
                      {post.author}
                    </span>
                    <span className={styles.metaItem}>
                      <LuCalendarDays className={styles.metaIcon} aria-hidden />
                      {post.date}
                    </span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className={styles.readMoreLink}>
                    Read more
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogDetailsComponent;
