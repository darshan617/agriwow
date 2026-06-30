import React, { useMemo, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import CustomPopup from "@/components/custom-popup/CustomPopup";
import styles from "@/components/home/components/video/VideoSection.module.css";
import { useGetHomeDataQuery } from "@/redux/apis/homeApi";

const buildYoutubeEmbedUrl = (videoId, autoplay = false) => {
  if (!videoId) return null;

  const params = new URLSearchParams({
    modestbranding: "1",
    rel: "0",
    controls: "1",
    iv_load_policy: "3",
    fs: "0",
  });

  if (autoplay) {
    params.set("autoplay", "1");
  }

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
};

const buildYoutubeThumbnailUrl = (videoId) => {
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

const getYoutubeVideoId = (url) => {
  if (!url) return null;

  const trimmed = url.trim();

  if (!trimmed.includes("/") && !trimmed.includes(".")) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return parsed.pathname.split("/").filter(Boolean)[0] ?? null;
    }

    if (
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "youtube-nocookie.com"
    ) {
      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.pathname.split("/").filter(Boolean)[1] ?? null;
      }

      if (parsed.pathname.startsWith("/shorts/")) {
        return parsed.pathname.split("/").filter(Boolean)[1] ?? null;
      }

      return parsed.searchParams.get("v");
    }
  } catch {
    return null;
  }

  return null;
};

const VideoSection = () => {
  const { data: homeData } = useGetHomeDataQuery();
  const video_banner = homeData?.data?.banners?.video_banner;
  const [activeVideo, setActiveVideo] = useState(null);

  const embedVideos = useMemo(() => {
    return (video_banner?.youtube_links ?? [])
      .filter(Boolean)
      .map((youtubeUrl) => ({
        youtubeUrl,
        videoId: getYoutubeVideoId(youtubeUrl),
      }))
      .filter((video) => video.videoId)
      .map((video) => ({
        ...video,
        embedUrl: buildYoutubeEmbedUrl(video.videoId),
        autoplayEmbedUrl: buildYoutubeEmbedUrl(video.videoId, true),
        thumbnailUrl: buildYoutubeThumbnailUrl(video.videoId),
      }));
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
                  <button
                    type="button"
                    className={styles.previewButton}
                    onClick={() => setActiveVideo(video)}
                    aria-label={`Play video ${index + 1}`}
                  >
                    <img
                      src={video.thumbnailUrl}
                      alt=""
                      className={styles.thumbnail}
                    />
                    <span className={styles.thumbnailOverlay} />
                    <span className={styles.playBtn}>
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className={styles.playIcon}
                      >
                        <path d="M8 6.5v11l9-5.5-9-5.5Z" fill="currentColor" />
                      </svg>
                    </span>
                  </button>
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

      {activeVideo && (
        <CustomPopup
          onclose={() => setActiveVideo(null)}
          wide
          maxWidth="960px"
        >
          <div className={styles.videoPopup}>
            <iframe
              src={activeVideo.autoplayEmbedUrl}
              title={video_banner?.title || "YouTube video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className={styles.videoPopupIframe}
            />
          </div>
        </CustomPopup>
      )}
    </section>
  );
};

export default VideoSection;