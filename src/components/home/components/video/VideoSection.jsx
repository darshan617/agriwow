import React, { useMemo } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import styles from "@/components/home/components/video/VideoSection.module.css";
import { useGetHomeDataQuery } from "@/redux/apis/homeApi";

const getYoutubeEmbedUrl = (url) => {
  if (!url) return null;

  const trimmed = url.trim();

  if (!trimmed.includes("/") && !trimmed.includes(".")) {
    return `https://www.youtube.com/embed/${trimmed}`;
  }

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const videoId = parsed.pathname.split("/").filter(Boolean)[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname.startsWith("/embed/")) {
        return trimmed;
      }

      if (parsed.pathname.startsWith("/shorts/")) {
        const videoId = parsed.pathname.split("/").filter(Boolean)[1];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }

      const videoId = parsed.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
  } catch {
    return null;
  }

  return null;
};

const VideoSection = () => {
  const { data: homeData } = useGetHomeDataQuery();
  const video_banner = homeData?.data?.banners?.video_banner;

  const embedVideos = useMemo(() => {
    return (video_banner?.youtube_links ?? [])
      .filter(Boolean)
      .map((youtubeUrl) => ({
        youtubeUrl,
        embedUrl: getYoutubeEmbedUrl(youtubeUrl),
      }))
      .filter((video) => video.embedUrl);
  }, [video_banner?.youtube_links]);

  if (embedVideos.length === 0) {
    return null;
  }

  return (
    <section className={`${styles.VideoContainer} sectionSpace`}>
      <div className="container">
        <div className={`${styles.carousel}`}>
          <Swiper
            modules={[Navigation]}
            slidesPerView={1}
            spaceBetween={0}
            loop={embedVideos.length > 1}
            navigation={{
              prevEl: "#videoSwiperPrev",
              nextEl: "#videoSwiperNext",
            }}
            className={`${styles.swiper}`}
          >
            {embedVideos.map((video, index) => (
              <SwiperSlide
                key={video.youtubeUrl || index}
                className={`${styles.slide}`}
              >
                <div className={`${styles.card}`}>
                  <iframe
                    src={video.embedUrl}
                    title={
                      video_banner?.title
                        ? `${video_banner.title} - video ${index + 1}`
                        : `YouTube video ${index + 1}`
                    }
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className={`${styles.iframe}`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            id="videoSwiperPrev"
            type="button"
            className={`${styles.navBtn}`}
            aria-label="Previous video"
          >
            <FiChevronLeft aria-hidden />
          </button>
          <button
            id="videoSwiperNext"
            type="button"
            className={`${styles.navBtn} ${styles.navBtnNext}`}
            aria-label="Next video"
          >
            <FiChevronRight aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
