import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";

import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Image from "next/image";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa6";
import styles from "@/components/product-details/components/reviews-rating/ReviewsRating.module.css";
import {
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useReviewLikeMutation,
  useReviewDislikeMutation,
} from "@/redux/apis/reviewApi";
import { useToast } from "@/custom-hooks/toast/ToastProvider";
import {
  getIsLoggedIn,
  useLoginPopup,
} from "@/custom-hooks/login-popup/LoginPopupProvider";

const Stars = ({ count }) => (
  <div className={styles.reviewerStars}>
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < count ? styles.star : styles.starEmpty}>
        ★
      </span>
    ))}
  </div>
);

const RatingPicker = ({ rating, onChange }) => (
  <div className={styles.ratingPicker}>
    <span className={styles.ratingPickerLabel}>Your Rating</span>
    <div className={styles.starRow}>
      {Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1;
        return (
          <button
            key={starValue}
            type="button"
            className={styles.starBtn}
            onClick={() => onChange(starValue)}
            aria-label={`Rate ${starValue} out of 5`}
          >
            <span
              className={starValue <= rating ? styles.star : styles.starEmpty}
            >
              ★
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

const RatingSummary = ({ average, totalRatings, totalReviews, ratingData }) => (
  <>
    {ratingData?.total_reviews > 0 && (
      <div className={styles.ratingSummary}>
        <div className={styles.avgScore}>
          <div className={styles.avgNumber}>
            {ratingData?.average_rating}{" "}
            <span className={styles.avgNumberStar}>★</span>
          </div>
          <div className={styles.avgLabel}>
            Average Rating based on {totalRatings}
            <br />
            ratings and {totalReviews} reviews
          </div>
        </div>

        <div className={styles.ratingBars}>
          {ratingData?.rating_breakdown?.map((rating, idx) => (
            <div className={styles.barRow} key={idx}>
              <span className={styles.barLabel}>{rating?.star}</span>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{ width: `${rating?.percentage}%` }}
                />
              </div>
              <span className={styles.barPct}>{rating?.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    )}
  </>
);

const normalizeReviewMedia = (attachmentUrls = [], imageUrls = []) =>
  attachmentUrls
    .map((attachment, idx) => ({
      type: attachment?.type || "image",
      url: attachment?.url || imageUrls?.[idx] || "",
    }))
    .filter((item) => item.url);

const getAttachmentFilename = (item) =>
  item?.file || item?.url?.split("/").pop()?.split("?")[0] || "attachment";

const attachmentToFile = async (item) => {
  if (item instanceof File) return item;
  if (!item?.url) return null;

  const filename = getAttachmentFilename(item);
  const proxyUrl = `/api/review-attachment?url=${encodeURIComponent(item.url)}`;
  const response = await fetch(proxyUrl);

  if (!response.ok) return null;

  const blob = await response.blob();
  const type =
    blob.type || (item.type === "video" ? "video/mp4" : "image/jpeg");

  return new File([blob], filename, { type });
};

const resolveAttachmentFiles = async (media = []) => {
  const files = await Promise.all(media.map(attachmentToFile));
  return files.filter(Boolean);
};

const appendAttachmentsToFormData = async (formData, media = []) => {
  const files = await resolveAttachmentFiles(media);
  files.forEach((file) => {
    formData.append("attachments[]", file);
  });
  return files.length;
};

const ReviewCard = ({ review, onEdit, onDelete, onMediaClick }) => {
  const { showToast } = useToast();
  const userData = Cookies.get("userData")
    ? JSON.parse(decodeURIComponent(Cookies.get("userData")))
    : null;
  const { date, helpful = { up: 0, down: 0 }, rating } = review;
  const [reviewLike, { isLoading: isReviewLikeLoading }] =
    useReviewLikeMutation();
  const [reviewDislike, { isLoading: isReviewDislikeLoading }] =
    useReviewDislikeMutation();

  const { openLoginPopup, getIsLoggedIn } = useLoginPopup();

  const handleReviewLike = async (reviewId) => {
    try {
      const res = await reviewLike({ body: { review_id: reviewId } });
      if (res?.data?.success || res?.data?.status) {
        showToast(res?.data?.message || "Review liked successfully", "success");
      } else {
        showToast(res?.data?.message || "Failed to like review", "error");
      }
    } catch (error) {
      console.log(error, "review like error");
      showToast(error?.data?.message || "Failed to like review", "error");
    }
  };

  const handleReviewDislike = async (reviewId) => {
    try {
      const res = await reviewDislike({ body: { review_id: reviewId } });
      if (res?.data?.success || res?.data?.status) {
        showToast(
          res?.data?.message || "Review disliked successfully",
          "success",
        );
      } else {
        showToast(res?.data?.message || "Failed to dislike review", "error");
      }
    } catch (error) {
      console.log(error, "review dislike error");
    }
  };

  return (
    <div className={styles.reviewItem}>
      <div className={styles.reviewTop}>
        <div className={styles.reviewerInfo}>
          <Stars count={rating} />
          <div className={styles.reviewerMeta}>
            <span className={styles.reviewerName}>{review.user?.name}</span>
            <span className={styles.verifiedBadge}>Verified Purchase</span>
          </div>
          <div className={styles.reviewDate}>{date}</div>
          {/* <span className={styles.reviewerName}>{review?.image_urls}</span> */}
          {/* {review?.image_urls && review?.image_urls?.length > 0 && (
            <Image src={review?.image_urls} alt="review" width={25} height={25} />
          )} */}
        </div>
        <div className={styles.helpfulBtns}>
          <button
            className={styles.helpfulBtn}
            onClick={() => {
              if (getIsLoggedIn()) {
                handleReviewLike(review?.id);
              } else {
                openLoginPopup();
              }
            }}
          >
            <span className={styles.icon}>
              <FaThumbsUp />
            </span>{" "}
            {review?.like_count}
          </button>
          <button
            className={styles.helpfulBtn}
            onClick={() => {
              if (getIsLoggedIn()) {
                handleReviewDislike(review?.id);
              } else {
                openLoginPopup();
              }
            }}
          >
            <span className={styles.icon}>
              <FaThumbsDown />
            </span>{" "}
            {review?.dislike_count}
          </button>
          {review?.user_id === userData?.id && (
            <>
              <button
                className={styles.helpfulBtn}
                onClick={() => onEdit(review)}
              >
                Edit
              </button>
              <button
                className={styles.helpfulBtn}
                onClick={() => onDelete(review.id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      <div className={styles.reviewTitle}>{review?.review}</div>
      {/* <div className={styles.reviewBody}>{review?.review}</div> */}
      {/* {review?.image_urls?.length > 0 && (
        <div className={styles.reviewImages}>
          {review.image_urls.map((img, idx) => (
            <button
              key={idx}
              type="button"
              className={styles.reviewImg}
              onClick={() => onImageClick(review.image_urls, idx)}
            >
              <Image src={img} alt="review" width={100} height={100} />
            </button>
          ))}
        </div>
      )} */}
      {review?.attachment_urls?.length > 0 && (
        <div className={styles.reviewImages}>
          {review?.attachment_urls?.map((attachment, idx) => (
            <button
              key={idx}
              type="button"
              className={styles.reviewImg}
              onClick={() =>
                onMediaClick(
                  normalizeReviewMedia(
                    review.attachment_urls,
                    review.image_urls,
                  ),
                  idx,
                )
              }
              style={{ border: "1px solid #000" }}
            >
              {attachment?.type === "image" ? (
                <Image
                  src={attachment?.url}
                  alt="review"
                  width={100}
                  height={100}
                />
              ) : (
                <video
                  src={attachment?.url}
                  alt="review"
                  width={100}
                  height={100}
                  style={{ objectFit: "cover" }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const INITIAL_REVIEWS_COUNT = 3;

const ReviewsRating = ({
  productId = null,
  productName = "Neptune Mini Hose Reel",
  averageRating = 4.8,
  totalRatings = 5,
  totalReviews = 3,
  reviews = [],
  onViewMore = () => {},
  ratingData = null,
  can_review = false,
  has_purchased = false,
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [reviewsList, setReviewsList] = useState(reviews);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const touchStart = useRef(0);

  const [addReview, { isLoading: isAddReviewLoading }] = useAddReviewMutation();
  const [updateReview, { isLoading: isUpdateReviewLoading }] =
    useUpdateReviewMutation();
  const [deleteReview, { isLoading: isDeleteReviewLoading }] =
    useDeleteReviewMutation();
  const { showToast } = useToast();

  useEffect(() => {
    setReviewsList(reviews);
    setShowAllReviews(false);
  }, [reviews]);

  const visibleReviews = showAllReviews
    ? reviewsList
    : reviewsList.slice(0, INITIAL_REVIEWS_COUNT);
  const hasMoreReviews = reviewsList.length > INITIAL_REVIEWS_COUNT;

  const handleWriteReviewClick = () => {
    setEditingReview(null);
    setRating(0);
    setReviewText("");
    setSelectedMedia([]);
    setShowReviewForm(true);
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setRating(review.rating || 0);
    setReviewText(review.review || "");
    setSelectedMedia(
      (review.attachment_urls || [])
        .map((attachment, idx) => ({
          type: attachment?.type || "image",
          file: attachment?.file,
          url: attachment?.url || review.image_urls?.[idx] || "",
        }))
        .filter((item) => item.url),
    );
    setShowReviewForm(true);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!Cookies.get("userToken")) {
      showToast("Please log in to submit a review", "error");
      return;
    }

    if (!rating) {
      showToast("Please select a rating", "error");
      return;
    }

    if (!reviewText.trim()) {
      showToast("Please write your review", "error");
      return;
    }

    if (editingReview) {
      const formData = new FormData();
      formData.append("rating", rating);
      formData.append("review", reviewText);
      formData.append("id", editingReview.id);

      const uploadedCount = await appendAttachmentsToFormData(
        formData,
        selectedMedia,
      );
      if (selectedMedia.length > 0 && uploadedCount === 0) {
        showToast("Failed to prepare attachments for upload", "error");
        return;
      }

      const res = await updateReview({
        body: formData,
      });

      if (res.error) {
        showToast(
          res.error?.data?.message || "Failed to update review",
          "error",
        );
        return;
      }

      if (res?.data?.success || res?.data?.status) {
        showToast(res.data.message || "Review updated successfully", "success");
        setReviewsList((prev) =>
          prev.map((item) =>
            item.id === editingReview.id
              ? {
                  ...item,
                  rating,
                  review: reviewText,
                }
              : item,
          ),
        );
        setReviewText("");
        setRating(0);
        setSelectedMedia([]);
        setShowReviewForm(false);
        setEditingReview(null);
      } else {
        showToast(res?.data?.message || "Failed to update review", "error");
      }

      return;
    }

    if (!productId) {
      showToast("Product not found. Please refresh and try again.", "error");
      return;
    }
    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("rating", rating);
    formData.append("review", reviewText);
    await appendAttachmentsToFormData(formData, selectedMedia);
    const res = await addReview({
      body: formData,
    });

    // const res = await addReview({
    //   body: {
    //     product_id: productId,
    //     rating,
    //     review: reviewText,
    //     images: selectedMedia,
    //   },
    // });

    if (res.error) {
      showToast(res.error?.data?.message || "Failed to submit review", "error");
      return;
    }

    if (res?.data?.success || res?.data?.status) {
      showToast(res.data.message, "success");
      setReviewText("");
      setRating(0);
      setSelectedMedia([]);
      setShowReviewForm(false);
    } else {
      showToast(res?.data?.message || "Failed to submit review", "error");
    }
  };

  const goLightbox = (dir) =>
    setLightbox((l) => ({
      ...l,
      index: (l.index + dir + l.media.length) % l.media.length,
    }));

  const openLightbox = (media, index) => {
    if (!media?.length) return;
    setLightbox({
      media,
      index: Math.min(index, media.length - 1),
    });
  };

  const handleDeleteReview = async (reviewId) => {
    const res = await deleteReview({
      reviewId,
      body: { id: reviewId },
    });
    if (res?.data?.success || res?.data?.status) {
      showToast(res?.data?.message || "Review deleted successfully", "success");
      setReviewsList((prev) => prev.filter((item) => item.id !== reviewId));
    } else {
      showToast(res?.data?.message || "Failed to delete review", "error");
    }
  };

  return (
    <div className="container">
      <div className={`${styles.reviewsWrapper}`} id="review-card">
        <div className={styles.reviewsHeader}>
          <h2>Reviews &amp; Ratings</h2>
        </div>

        <div
          className={`${styles.reviewBtn} py-2 ${reviewsList.length > 0 ? styles.reviewBtnHasReviews : ""}`}
        >
          {reviewsList.length === 0 && (
            <div className={styles.reviewBtnText}>Be the first to review this product</div>
          )}
          {!showReviewForm && (
            <button
              className={styles.writeReviewBtn}
              onClick={() => {
                if (!has_purchased) {
                  showToast(
                    "You need to purchase the product to write a review",
                    "error",
                  );
                } else if (!can_review) {
                  showToast(
                    "You can't write another review for this product",
                    "error",
                  );
                } else {
                  handleWriteReviewClick();
                }
              }}
            >
              WRITE A REVIEW
            </button>
          )}
        </div>

        {/* <div className={`${styles.earnCoins} gap-1`}>
        Review with Images{" "}
        <Image src={coin} alt="coin" width={15} height={15} />
        <span>Earn Coins!</span>
      </div> */}

        <div className={styles.ratingRow}>
          <RatingSummary
            average={averageRating}
            totalRatings={totalRatings}
            totalReviews={totalReviews}
            ratingData={ratingData}
          />

          {showReviewForm && (
            <>
              <form
                className={styles.writeReviewForm}
                onSubmit={handleSubmitReview}
              >
                <div className={styles.reviewFormContent}>
                  <RatingPicker rating={rating} onChange={setRating} />
                  <textarea
                    className={styles.reviewInput}
                    placeholder="Write your review here..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={5}
                  />
                </div>

                <div
                  className={styles.uploadMediaWrapper}
                  style={{ marginTop: "16px", marginBottom: "10px" }}
                >
                  <label
                    htmlFor="review-media-upload"
                    className={styles.uploadMediaBtn}
                    style={{
                      display: "inline-block",
                      padding: "8px 18px",
                      background: "#e8f5e9",
                      color: "#157104",
                      border: "1px solid #157104",
                      borderRadius: "5px",
                      fontSize: "13px",
                      fontWeight: 500,
                      cursor: "pointer",
                      marginBottom: "7px",
                    }}
                  >
                    Upload Media
                    <input
                      type="file"
                      id="review-media-upload"
                      multiple
                      accept="image/*,video/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        setSelectedMedia((prev) => [...prev, ...files]);
                        e.target.value = "";
                      }}
                    />
                  </label>

                  {selectedMedia && selectedMedia.length > 0 && (
                    <div
                      style={{
                        display: "inline-flex",
                        flexWrap: "wrap",
                        marginLeft: 24,
                        verticalAlign: "top",
                        alignItems: "center",
                      }}
                    >
                      {selectedMedia.map((file, idx) => {
                        // const isImage = file?.type?.startsWith("image");
                        // const isVideo = file?.type?.startsWith("video");
                        // const url = URL.createObjectURL(file);
                        const isFile = file instanceof File;

                        const isImage = isFile
                          ? file.type.startsWith("image")
                          : file?.type === "image" ||
                            /\.(jpg|jpeg|png|gif|webp)$/i.test(file?.url || "");

                        const isVideo = isFile
                          ? file.type.startsWith("video")
                          : file?.type === "video" ||
                            /\.(mp4|mov|avi|webm)$/i.test(file?.url || "");
                        const url = isFile
                          ? URL.createObjectURL(file)
                          : file?.url || file;
                        return (
                          <div
                            key={idx}
                            style={{
                              margin: "0 8px 8px 0",
                              position: "relative",
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedMedia(
                                  selectedMedia.filter((_, i) => i !== idx),
                                );
                              }}
                              style={{
                                position: "absolute",
                                top: 2,
                                right: 2,
                                background: "rgba(255,255,255,0.85)",
                                border: "none",
                                borderRadius: "50%",
                                width: 22,
                                height: 22,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                              }}
                              aria-label="Remove media"
                            >
                              <span
                                style={{
                                  fontSize: 16,
                                  color: "#d32f2f",
                                  lineHeight: 1,
                                }}
                              >
                                ×
                              </span>
                            </button>
                            {isImage && (
                              <img
                                src={url}
                                alt={file.name}
                                style={{
                                  width: 80,
                                  height: 80,
                                  objectFit: "cover",
                                  borderRadius: 4,
                                  border: "1px solid #eee",
                                }}
                              />
                            )}
                            {isVideo && (
                              <video
                                src={url}
                                style={{
                                  width: 80,
                                  height: 80,
                                  objectFit: "cover",
                                  borderRadius: 4,
                                  border: "1px solid #eee",
                                }}
                                controls={false}
                                muted
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className={styles.submitReviewBtnWrapper}>
                  {editingReview && (
                    <button
                      type="button"
                      className={styles.submitReviewBtn}
                      style={{
                        marginRight: "10px",
                        background: "#ddd",
                        color: "#222",
                      }}
                      onClick={() => {
                        setShowReviewForm(false);
                        setEditingReview(null);
                        setReviewText("");
                        setRating(0);
                        setSelectedMedia([]);
                      }}
                      disabled={isAddReviewLoading || isUpdateReviewLoading}
                    >
                      CANCEL
                    </button>
                  )}

                  <button
                    type="button"
                    className={styles.submitReviewBtn}
                    style={{
                      marginRight: "10px",
                      background: "#ddd",
                      color: "#222",
                    }}
                    onClick={() => {
                      setShowReviewForm(false);
                      setEditingReview(null);
                      setReviewText("");
                      setRating(0);
                      setSelectedMedia([]);
                    }}
                    disabled={isAddReviewLoading || isUpdateReviewLoading}
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className={styles.submitReviewBtn}
                    disabled={isAddReviewLoading || isUpdateReviewLoading}
                  >
                    {isAddReviewLoading || isUpdateReviewLoading
                      ? editingReview
                        ? "UPDATING..."
                        : "SUBMITTING..."
                      : editingReview
                        ? "UPDATE"
                        : "SUBMIT"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        <div className={styles.reviewsList}>
          {visibleReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onEdit={handleEditReview}
              onDelete={handleDeleteReview}
              onMediaClick={openLightbox}
            />
          ))}
        </div>

        {lightbox && (
          <div className={styles.lightbox} onClick={() => setLightbox(null)}>
            <button
              type="button"
              className={styles.lightboxClose}
              onClick={() => setLightbox(null)}
            >
              ×
            </button>
            {lightbox.media.length > 1 && (
              <>
                <button
                  type="button"
                  className={styles.lightboxPrev}
                  onClick={(e) => {
                    e.stopPropagation();
                    goLightbox(-1);
                  }}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className={styles.lightboxNext}
                  onClick={(e) => {
                    e.stopPropagation();
                    goLightbox(1);
                  }}
                >
                  ›
                </button>
              </>
            )}
            {lightbox.media[lightbox.index]?.type === "video" ? (
              <video
                key={lightbox.media[lightbox.index].url}
                src={lightbox.media[lightbox.index].url}
                className={styles.lightboxImg}
                controls
                autoPlay
                playsInline
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <img
                src={lightbox.media[lightbox.index]?.url}
                alt="Review"
                className={styles.lightboxImg}
                onClick={(e) => e.stopPropagation()}
                onTouchStart={(e) => {
                  touchStart.current = e.touches[0].clientX;
                }}
                onTouchEnd={(e) => {
                  const diff = touchStart.current - e.changedTouches[0].clientX;
                  if (Math.abs(diff) > 50) goLightbox(diff > 0 ? 1 : -1);
                }}
              />
            )}
            {lightbox.media.length > 1 && (
              <span className={styles.lightboxCounter}>
                {lightbox.index + 1} / {lightbox.media.length}
              </span>
            )}
          </div>
        )}

        {hasMoreReviews && !showAllReviews && (
          <button
            type="button"
            className={styles.viewMore}
            onClick={() => {
              setShowAllReviews(true);
              onViewMore();
            }}
          >
            View More Reviews
            <span className={styles.arrowCircle}>
              <FaChevronRight />
            </span>
          </button>
        )}

        {hasMoreReviews && showAllReviews && (
          <button
            type="button"
            className={styles.viewMore}
            onClick={() => setShowAllReviews(false)}
          >
            View Less Reviews
            <span className={styles.arrowCircle}>
              <FaChevronLeft />
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewsRating;
