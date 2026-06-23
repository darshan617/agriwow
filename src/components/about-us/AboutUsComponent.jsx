import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import {
  LuShieldCheck,
  LuHeadphones,
  LuBadgeCheck,
  LuSprout,
  LuUsers,
  LuMapPin,
} from "react-icons/lu";
import { useGetAboutUsDataQuery } from "@/redux/apis/aboutUsApi";
import heroImage from "@/assets/images/agriculture-sprayer.jpg";
import aboutImage from "@/assets/images/agri-equipments.jpg";
import missionImage from "@/assets/images/contact-us.png";
import indiaImage from "@/assets/images/Across-India - Copy.png";
import styles from "@/components/about-us/AboutUsComponent.module.css";

const CHOOSE_ICONS = [LuBadgeCheck, LuShieldCheck, LuHeadphones];

const getTags = (section) =>
  [section?.tag_1, section?.tag_2, section?.tag_3].filter(
    (tag) => tag && tag !== "-" && tag !== "null",
  );

const getLeadHeading = (content) => {
  if (!content || typeof content !== "string") return "";
  const match = content.match(/^(.+?[.!?])(\s|$)/);
  return match ? match[1].trim() : content;
};

const getRemainingContent = (content) => {
  if (!content || typeof content !== "string") return "";
  const heading = getLeadHeading(content);
  if (!heading || heading === content) return content;
  return content.slice(heading.length).trim();
};

const parseWhatWeOffer = (content) => {
  if (!Array.isArray(content)) {
    return {
      items: [],
      description: typeof content === "string" ? content : "",
    };
  }

  const items = [];
  let description = "";

  content.forEach((item) => {
    if (typeof item !== "string") return;
    const parts = item.split("\n\n");
    items.push(parts[0].trim());
    if (parts.length > 1) {
      description += (description ? "\n\n" : "") + parts.slice(1).join("\n\n");
    }
  });

  return { items, description };
};

const AboutUsShimmer = () => (
  <div className={styles.shimmerWrapper}>
    <div className={`${styles.heroShimmer} shimmerEffect`} />
    <div className="container">
      <div className={`${styles.introShimmer} shimmerEffect`} />
      <div className={`${styles.statsShimmer} shimmerEffect`} />
      <div className={`${styles.gridShimmer} shimmerEffect`} />
    </div>
  </div>
);

const AboutUsComponent = () => {
  const { data, isLoading, isFetching, error } = useGetAboutUsDataQuery();
  const [activeTab, setActiveTab] = useState("mission");

  const sections = useMemo(() => {
    if (!data?.data) return {};
    return data.data;
  }, [data]);

  const aboutUs = sections.about;
  const ourStory = sections.our_story;
  const whatWeOffer = sections.what_we_offer;
  const whyChoose = sections.why_choose_agriwow;
  const ourMission = sections.our_mission;
  const ourVision = sections.our_vision;
  const servingIndia = sections.serving_customers_across_india;
  const ctaSection = sections.join_the_future_of_smarter_farming;

  const storyTags = getTags(ourStory);
  const aboutTags = getTags(aboutUs);
  const ctaTags = getTags(ctaSection);
  const offerData = parseWhatWeOffer(whatWeOffer?.content);
  const chooseItems = Array.isArray(whyChoose?.content)
    ? whyChoose.content
    : [];

  const tabContent =
    activeTab === "mission" ? ourMission?.content : ourVision?.content;
  const tabTitle =
    activeTab === "mission" ? ourMission?.title : ourVision?.title;

  if (isLoading || isFetching) {
    return <AboutUsShimmer />;
  }

  if (error || !data?.status) {
    return (
      <div className={`container ${styles.errorState}`}>
        <p>Unable to load About Us content. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className={styles.aboutPage}>
      <section className={styles.hero}>
        <Image
          src={heroImage}
          alt="About Agriwow"
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <h1>{aboutUs?.title || "About Us"}</h1>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>About Us</span>
          </nav>
        </div>
      </section>

      <section className={`sectionSpace ${styles.introSection}`}>
        <div className="container">
          <div className="row align-items-center g-4 g-lg-5">
            <div className="col-lg-6">
              <div className={styles.introImageWrap}>
                <Image
                  src={aboutImage}
                  alt="Agriwow agriculture solutions"
                  width={640}
                  height={520}
                  className={styles.introImage}
                />
                {storyTags.length > 0 && (
                  <div className={styles.experienceBadge}>
                    <span>{storyTags[0]}</span>
                    <small>{storyTags[1] || "Agriwow"}</small>
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-6">
              <span className={styles.sectionLabel}>
                {aboutUs?.title || "About Us"}
              </span>
              <h2 className={styles.sectionTitle}>
                {getLeadHeading(aboutUs?.content) || aboutUs?.title}
              </h2>
              <p className={styles.sectionText}>
                {getRemainingContent(aboutUs?.content) || aboutUs?.content}
              </p>
              {aboutTags.length > 0 && (
                <ul className={styles.featureList}>
                  {aboutTags.map((tag) => (
                    <li key={tag}>
                      <FiCheck />
                      <span>{tag}</span>
                    </li>
                  ))}
                </ul>
              )}
              <Link
                href="/product-category/agriculture-sprayers"
                className={styles.primaryBtn}
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {storyTags.length > 0 && (
        <section className={styles.statsBar}>
          <div className="container">
            <div className="row g-4">
              {storyTags.map((tag, index) => (
                <div key={tag} className="col-md-4">
                  <div className={styles.statItem}>
                    <span className={styles.statIcon}>
                      {index === 0 ? (
                        <LuShieldCheck />
                      ) : index === 1 ? (
                        <LuUsers />
                      ) : (
                        <LuSprout />
                      )}
                    </span>
                    <h3>{tag}</h3>
                    <p>Committed to excellence</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {ourStory?.content && (
        <section className={`sectionSpace ${styles.storySection}`}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10 col-xl-8 text-center">
                <h2 className={styles.sectionTitle}>{ourStory.title}</h2>
                <p className={styles.sectionText}>{ourStory.content}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {offerData.items.length > 0 && (
        <section className={`sectionSpace ${styles.offerSection}`}>
          <div className="container">
            <div className="text-center mb-4 mb-lg-5">
              <h2 className={styles.sectionTitle}>{whatWeOffer?.title}</h2>
            </div>
            <div className="row g-3 g-md-4">
              {offerData.items.map((item) => (
                <div key={item} className="col-sm-6 col-lg-3">
                  <div className={styles.offerCard}>
                    <LuSprout />
                    <p>{item}</p>
                  </div>
                </div>
              ))}
            </div>
            {offerData.description && (
              <p className={`${styles.sectionText} ${styles.offerDescription}`}>
                {offerData.description}
              </p>
            )}
          </div>
        </section>
      )}

      {chooseItems.length > 0 && (
        <section className={`sectionSpace ${styles.chooseSection}`}>
          <div className="container">
            <div className="text-center mb-4 mb-lg-5">
              <h2 className={styles.sectionTitle}>{whyChoose?.title}</h2>
            </div>
            <div className="row g-4 justify-content-center">
              {chooseItems.map((item, index) => {
                const Icon = CHOOSE_ICONS[index % CHOOSE_ICONS.length];
                return (
                  <div key={item.title} className="col-md-6 col-lg-4">
                    <div className={styles.chooseCard}>
                      <span className={styles.chooseIcon}>
                        <Icon />
                      </span>
                      <h3>{item.title}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {(ourMission?.content || ourVision?.content) && (
        <section className={`sectionSpace ${styles.missionSection}`}>
          <div className="container">
            <div className="row align-items-center g-4 g-lg-5">
              <div className="col-lg-6">
                <span className={styles.sectionLabel}>Our Purpose</span>
                <h2 className={styles.sectionTitle}>
                  {ourMission?.title} & {ourVision?.title}
                </h2>
                <div className={styles.tabList} role="tablist">
                  {ourMission?.content && (
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === "mission"}
                      className={
                        activeTab === "mission" ? styles.tabActive : ""
                      }
                      onClick={() => setActiveTab("mission")}
                    >
                      {ourMission.title}
                    </button>
                  )}
                  {ourVision?.content && (
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === "vision"}
                      className={activeTab === "vision" ? styles.tabActive : ""}
                      onClick={() => setActiveTab("vision")}
                    >
                      {ourVision.title}
                    </button>
                  )}
                </div>
                <div className={styles.tabPanel} role="tabpanel">
                  <h3>{tabTitle}</h3>
                  <p>{tabContent}</p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className={styles.missionImageWrap}>
                  <Image
                    src={missionImage}
                    alt="Agriwow team"
                    width={620}
                    height={420}
                    className={styles.missionImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {servingIndia?.content && (
        <section className={`sectionSpace ${styles.indiaSection}`}>
          <div className="container">
            <div className="row align-items-center g-4 g-lg-5">
              <div className="col-lg-6 order-lg-2">
                <h2 className={styles.sectionTitle}>{servingIndia.title}</h2>
                <p className={styles.sectionText}>{servingIndia.content}</p>
                <div className={styles.indiaHighlight}>
                  <LuMapPin />
                  <span>Serving customers across India</span>
                </div>
              </div>
              <div className="col-lg-6 order-lg-1">
                <div className={styles.indiaImageWrap}>
                  <Image
                    src={indiaImage}
                    alt="Serving customers across India"
                    width={620}
                    height={420}
                    className={styles.indiaImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {ctaSection?.content && (
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaCard}>
              <span className={styles.ctaLabel}>{ctaSection.title}</span>
              <h2>{ctaSection.title}</h2>
              <p>{ctaSection.content}</p>
              {ctaTags.length > 0 && (
                <div className={styles.ctaTags}>
                  {ctaTags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              )}
              <Link
                href="/product-category/agriculture-sprayers"
                className={styles.ctaBtn}
              >
                Explore Products
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default AboutUsComponent;
