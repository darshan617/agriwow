import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import { LuShieldCheck, LuSprout, LuUsers, LuMapPin } from "react-icons/lu";
import { useGetAboutUsDataQuery } from "@/redux/apis/aboutUsApi";
import aboutImage from "@/assets/images/agri-equipments.jpg";
import missionImage from "@/assets/images/contact-us.png";
import indiaImage from "@/assets/images/Across-India.png";
import styles from "@/components/about-us/AboutUsComponent.module.css";

const formatPageTitle = (title, fallback = "About Us") => {
  if (!title || typeof title !== "string") return fallback;
  const normalized = title.trim().toLowerCase();
  if (normalized === "about" || normalized === "about us") return "About Us";
  return title.charAt(0).toUpperCase() + title.slice(1);
};

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

const getStatIcon = (index) => {
  if (index === 0) return <LuShieldCheck size={40} />;
  if (index === 1) return <LuUsers size={40} />;
  return <LuSprout size={40} />;
};

const AboutUsComponent = () => {
  const { data, isLoading, isFetching, error } = useGetAboutUsDataQuery();
  const [activeTab, setActiveTab] = useState("mission");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 680px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

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
  const aboutLead = getLeadHeading(aboutUs?.content);
  const hasAboutSplit = aboutLead && aboutLead !== aboutUs?.content?.trim();

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
        <div className={`container ${styles.heroContent}`}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <ul>
              <li>
                <Link href="/" prefetch={true}>Home</Link>
              </li>
              <li className={styles.breadcrumbSep} aria-hidden="true">
                /
              </li>
              <li>About Us</li>
            </ul>
          </nav>
        </div>
      </section>

      <section className={`sectionSpace ${styles.introSection}`}>
        <div className="container">
          <div className="row align-items-center g-4 g-lg-5">
            <div className="col-lg-6 m-0">
              <div className={styles.introImageWrap}>
                <Image
                  src={aboutImage}
                  alt="Agriwow agriculture solutions"
                  fill
                  sizes="(max-width: 992px) 100vw, 50vw"
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
            <div className="col-lg-6 mt-0">
              <div className={styles.introContent}>
                <h2 className={styles.introTitle}>
                  {formatPageTitle(aboutUs?.title)}
                </h2>
                {hasAboutSplit && (
                  <h3 className={styles.introSubtitle}>{aboutLead}</h3>
                )}
                <p className={styles.introDescription}>
                  {hasAboutSplit
                    ? getRemainingContent(aboutUs?.content)
                    : aboutUs?.content}
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
                  prefetch={true}
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {storyTags.length > 0 && (
        <div className="sectionSpace">
        <section className={`${styles.statsBar}`}>
          <div className="container">
            {isMobile ? (
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={16}
                slidesPerView={1}
                className={styles.statsSwiper}
              >
                {storyTags.map((tag, index) => (
                  <SwiperSlide key={tag}>
                    <div className={styles.statItem}>
                      <span className={styles.statIcon}>
                        {getStatIcon(index)}
                      </span>
                      <h3>{tag}</h3>
                      <p>Committed to excellence</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="row g-4">
                {storyTags.map((tag, index) => (
                  <div key={tag} className="col-lg-4 col-md-4">
                    <div className={styles.statItem}>
                      <span className={styles.statIcon}>
                        {getStatIcon(index)}
                      </span>
                      <h3>{tag}</h3>
                      <p>Committed to excellence</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            </div>
          </section>
        </div>
      )}

      {ourStory?.content && (
        <section className={`sectionSpace ${styles.storySection}`}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10 col-xl-8 text-center">
                <h2 className={styles.sectionTitle}>{ourStory.title}</h2>
                <p className={`${styles.sectionText} ${styles.storyText}`}>
                  {ourStory.content}
                </p>
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
            {isMobile ? (
              <Swiper
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                  bulletActiveClass: styles.swiperBulletActive,
                }}
                spaceBetween={16}
                slidesPerView={1}
                className={styles.offerSwiper}
              >
                {offerData.items.map((item) => (
                  <SwiperSlide key={item}>
                    <div className={styles.offerCard}>
                      <LuSprout />
                      <p>{item}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
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
            )}
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
            {isMobile ? (
              <Swiper
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                  bulletActiveClass: styles.swiperBulletActive,
                }}
                spaceBetween={16}
                slidesPerView={1}
                className={styles.chooseSwiper}
              >
                {chooseItems.map((item) => (
                  <SwiperSlide key={item.title}>
                    <div className={styles.chooseCard}>
                      <h3>{item.title}</h3>
                      <p className={styles.chooseDescription}>{item.content}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className={styles.chooseGrid}>
                {chooseItems.map((item) => (
                  <div key={item.title} className={styles.chooseGridItem}>
                    <div className={styles.chooseCard}>
                      <h3>{item.title}</h3>
                      <p className={styles.chooseDescription}>{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
                  <p>{tabContent}</p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className={styles.missionImageWrap}>
                  <Image
                    src={missionImage}
                    alt="Agriwow customer support"
                    width={560}
                    height={420}
                    sizes="(max-width: 992px) 100vw, 50vw"
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
                    sizes="(max-width: 992px) 100vw, 50vw"
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
                prefetch={true}
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
