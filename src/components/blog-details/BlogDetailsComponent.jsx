import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaPinterestP } from "react-icons/fa";
import { MdWatchLater } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { FaCircleCheck, FaRegUser } from "react-icons/fa6";
import { LuCalendarDays } from "react-icons/lu";
import styles from "@/components/blog-details/BlogDetailsComponemt.module.css";
import heroImage from "@/assets/blog/main-blog.png";
import contentImage from "@/assets/blog/content-blog.png";
import facebookIcon from "@/assets/icon/facebook.png";
import twitterIcon from "@/assets/icon/twitter.png";
import instagramIcon from "@/assets/icon/insta.png";
import youtubeIcon from "@/assets/icon/youtube.png";
import whatsappIcon from "@/assets/icon/whatsapp.png";
import {
  useGetBlogDetailsQuery,
  useGetRelatedBlogsQuery,
} from "@/redux/apis/blogApi";
import { useRouter } from "next/router";

const CALIBRATION_STEPS = [
  <>
    <span>Measure Spray Width:</span>
    <p>
      Hold the nozzle at your normal working height and measure the width of the
      spray pattern on the ground.
      <br />
      Example: 20 inches
    </p>
  </>,
  <>
    <span>Calculate Calibration Distance:</span>
    <p>
      Distance = 4090 ÷ Spray Width (inches)
      <br />
      Example: 20-inch width → 204 feet
    </p>
  </>,
  <>
    <span>Time Your Walk:</span>
    <ul>
      <li>Mark the distance</li>
      <li>Fill sprayer with clean water</li>
      <li>Walk at your normal pace while pumping consistently</li>
      <li>Record the time (repeat 3 times and average)</li>
    </ul>
  </>,
  <>
    <span>Collect Nozzle Output:</span>
    <ul>
      <li>Stand still and maintain the same pressure</li>
      <li>Collect spray for the same number of seconds</li>
      <li>Use a measuring cup</li>
    </ul>
  </>,
  <>
    <span>Determine Application Rate:</span>
    <p>
      The ounces collected = Gallons Per Acre (GPA)
      <br />
      Example: 20 ounces collected = 20 GPA
    </p>
  </>,
];

const KEY_BENEFITS = [
  <span>
    <b>Cost savings:</b> Avoid overuse of expensive chemicals
  </span>,
  <span>
    <b>Environmental protection:</b>Minimize runoff and groundwater
    contamination
  </span>,
  <span>
    <b>Crop safety:</b>Prevent phytotoxicity from over-application
  </span>,
];

const PRE_CALIBRATION_ITEMS = [
  <span>
    <b>Inspect the nozzle:</b> Replace if the spray pattern is uneven or streaky
  </span>,
  <span>
    <b>Clean filters:</b> Remove debris from suction and nozzle filters
  </span>,
  <span>
    <b>Check for leaks:</b>Fill with water and inspect hoses, seals, and trigger
  </span>,
  <span>
    <b>Uniformity test:</b>Spray on dry ground—look for even coverage without
    gaps or heavy edges
  </span>,
];

const ADJUSTMENT_ITEMS = [
  <span>
    <b>Walking speed:</b> Faster = lower application; slower = higher
    application
  </span>,
  <span>
    <b>Pressure:</b>More pumping = higher flow rate
  </span>,
  <span>
    <b>Nozzle size:</b>The most reliable adjustment for major corrections
  </span>,
];

const BEST_PRACTICES = [
  <span>
    <b>Maintain steady pumping:</b> Develop a rhythm (e.g., one pump every two
    steps)
  </span>,
  <span>
    <b>Avoid wind: </b>Do not spray above ~10 mph wind speed
  </span>,
  <span>
    <b>Use a constant flow valve: </b>Keeps output steady despite pressure
    variation
  </span>,
  <span>
    <b>Mix only what you need: </b>Use your GPA to calculate exact spray volume
    for your plotate application rates.
  </span>,
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
    author: "Seo Person",
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
    author: "Seo Person",
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
    author: "Seo Person",
    date: "June 10, 2023",
    category: "Agriculture",
    image: heroImage,
  },
];

const BlogDetailsComponent = () => {
  const router = useRouter();
  const { data: blogDetailsData } = useGetBlogDetailsQuery(
    { slug: router?.query?.slug },
    { skip: !router?.query?.slug },
  );
  const title = blogDetailsData?.data?.title;
  const category = blogDetailsData?.data?.category?.name;
  const author = blogDetailsData?.data?.author;
  const date = blogDetailsData?.data?.blog_date;
  const heroSrc = blogDetailsData?.data?.image;
  const { data: relatedBlogsData } = useGetRelatedBlogsQuery(
    { slug: router?.query?.slug },
    { skip: !router?.query?.slug },
  );
  const stripHtml = (html) => html?.replace(/<[^>]*>/g, "") ?? "";
  const relatedBlogs = relatedBlogsData?.data;
  return (
    <div className={styles.page}>
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
              <MdWatchLater className={styles.metaIcon} aria-hidden />5 mins
              read
            </span>
          </div>
          <div className={styles.socialShare}>
            <h2 className={styles.socialShareTitle}>Share:</h2>
            <Link href="#">
              <Image
                src={facebookIcon}
                alt="facebook"
                width={20}
                height={20}
                className={styles.socialShareIcon}
              />
            </Link>
            <Link href="#">
              <Image
                src={twitterIcon}
                alt="twitter"
                width={20}
                height={20}
                className={styles.socialShareIcon}
              />
            </Link>
            <Link href="#">
              <Image
                src={instagramIcon}
                alt="instagram"
                width={20}
                height={20}
                className={styles.socialShareIcon}
              />
            </Link>
            <Link href="#">
              <Image
                src={youtubeIcon}
                alt="youtube"
                width={20}
                height={20}
                className={styles.socialShareIcon}
              />
            </Link>
            <Link href="#">
              <Image
                src={whatsappIcon}
                alt="whatsapp"
                width={20}
                height={20}
                className={styles.socialShareIcon}
              />
            </Link>
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
          {/* <p>
              Efficiency in the field isn’t just about how hard you work—it’s
              about how smart you spray. For farmers and gardeners using a
              manual spray pump—whether a knapsack or compression sprayer—the
              difference between a thriving crop and wasted money often comes
              down to one thing: calibration.
            </p>
            <p>
              If your equipment isn’t calibrated, you’re likely under-applying
              (leading to pest resistance and poor yields) or over-applying
              (wasting costly chemicals and risking environmental damage).
            </p>

            <h2 className={styles.sectionTitle}>
              Why Calibration is Non-Negotiable
            </h2>
            <p>
              Manual sprayers are inherently inconsistent. Because pressure is
              generated by hand, flow rate varies with operator fatigue, pumping
              rhythm, and walking speed.
            </p>
            <p>
              Calibration helps you establish a reliable, repeatable application
              rate—especially when working with a manual knapsack sprayer in
              varying field conditions.
            </p>

            <h3 className={styles.subSectionTitle}>Key benefits includes:</h3>
            <ul className={styles.checkList}>
              {KEY_BENEFITS.map((item) => (
                <li key={item}>
                  <FaCircleCheck className={styles.checkIcon} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            <h2 className={styles.sectionTitle}>Pre-Calibration Checklist</h2>
            <ul className={styles.checkList}>
              <p>
                Before measuring anything, make sure your equipment is working
                properly. Faulty gear will invalidate your results, whether
                you’re using a traditional unit or a hand operated knapsack
                sprayer.{" "}
              </p>
              {PRE_CALIBRATION_ITEMS.map((item) => (
                <li key={item}>
                  <CiCircleCheck className={styles.checkIcon} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            <h2 className={styles.sectionTitle}>
              Step-by-Step Calibration: The &apos;1/128th&apos; Method
            </h2>
            <p>
              This is one of the simplest and most reliable methods. Since there
              are 128 ounces in a gallon, the ounces you collect directly equal
              gallons per acre (GPA).
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
              If your GPA doesn’t match label recommendations, adjust using
              these three factors:
            </p>
            <ul className={styles.checkList}>
              {ADJUSTMENT_ITEMS.map((item) => (
                <li key={item}>
                  <FaCircleCheck className={styles.checkIcon} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p>
              For those using a battery sprayer for agriculture, pressure tends
              to be more stable, but calibration is still essential to ensure
              accurate application rates.
            </p>

            <h2 className={styles.sectionTitle}>
              Best Practices to Reduce Waste
            </h2>
            <ul className={styles.checkList}>
              <p>
                Calibration gives you numbers—technique ensures consistency.
              </p>
              {BEST_PRACTICES.map((item) => (
                <li key={item}>
                  <FaCircleCheck className={styles.checkIcon} aria-hidden />
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
              Calibration takes about 20 minutes but can save significant money
              over a season. More importantly, it ensures your chemicals work
              effectively while protecting your crops, soil, and surrounding
              environment.
            </p>
            <p>
              Treat your sprayer with the same precision as large-scale
              equipment—and you’ll see the difference in both yield and cost
              efficiency.
            </p> */}
        </div>
        <div
          className={styles.blogContent}
          dangerouslySetInnerHTML={{
            __html: blogDetailsData?.data?.description,
          }}
        ></div>
        <div className={styles.tags}>
          <p className={styles.tagsTitle}>Tags:</p>
          {TAGS.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </article>

      <section className={styles.relatedSection}>
        <h2 className={styles.relatedTitle}>Related Articles</h2>
        <div className={styles.relatedGrid}>
          {relatedBlogs?.map((post) => (
            <article key={post?.id} className={styles.relatedCard}>
              <div className={styles.relatedMedia}>
                <Image
                  src={post?.image}
                  alt={post?.title}
                  fill
                  className={styles.relatedImage}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className={styles.relatedBody}>
                <span className={styles.relatedCategory}>
                  {post?.category?.name}
                </span>
                <h3 className={styles.relatedCardTitle}>{post?.title}</h3>
                <p className={styles.relatedExcerpt}>
                  {stripHtml(post?.short_description)}
                </p>
                <div className={styles.relatedMeta}>
                  <span className={styles.metaItem}>
                    <FaRegUser className={styles.metaIcon} aria-hidden />
                    {post?.author}
                  </span>
                  <span className={styles.metaItem}>
                    <LuCalendarDays className={styles.metaIcon} aria-hidden />
                    {post?.blog_date}
                  </span>
                </div>
                <Link
                  href={`/blog/${post?.slug}`}
                  className={styles.readMoreLink}
                >
                  Read more
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogDetailsComponent;
