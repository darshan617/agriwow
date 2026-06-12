import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import review1 from "@/assets/images/review1.png";
import coin from "@/assets/icon/coin.png";
import Image from "next/image";
import { FaThumbsUp, FaThumbsDown, FaChevronRight } from "react-icons/fa6";
import styles from "@/components/product-details/components/reviews-rating/ReviewsRating.module.css";
import Link from "next/link";
import {
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} from "@/redux/apis/reviewApi";
import { useToast } from "@/custom-hooks/toast/ToastProvider";

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
);

const ReviewCard = ({ review, onEdit, onDelete }) => {
  const userData = Cookies.get("userData") ? JSON.parse(decodeURIComponent(Cookies.get("userData"))) : null;
  const { date, helpful = { up: 0, down: 0 }, rating } = review;

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
          {/* <span className={styles.reviewerName}>{review?.image}</span> */}
          {review?.image && review?.image?.length > 0 && (
            <Image src={review?.image} alt="review" width={25} height={25} />
          )}
        </div>

        <div className={styles.helpfulBtns}>
          <button className={styles.helpfulBtn}>
            <span className={styles.icon}>
              <FaThumbsUp />
            </span>{" "}
            {helpful.up}
          </button>
          <button className={styles.helpfulBtn}>
            <span className={styles.icon}>
              <FaThumbsDown />
            </span>{" "}
            {helpful.down}
          </button>
          {review?.user_id === userData?.id && (
            <>
              <button className={styles.helpfulBtn} onClick={() => onEdit(review)}>
                Edit
              </button>
              <button className={styles.helpfulBtn} onClick={() => onDelete(review.id)}>
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      <div className={styles.reviewTitle}>{review?.review}</div>
      {/* <div className={styles.reviewBody}>{review?.review}</div> */}
      {review?.review_images?.length > 0 && (
        <div className={styles.reviewImg}>
          <Image src={review1} alt="review" width={10} height={10} />
        </div>
      )}
    </div>
  );
};

const ReviewsRating = ({
  productId = null,
  productName = "Neptune Mini Hose Reel",
  averageRating = 4.8,
  totalRatings = 5,
  totalReviews = 3,
  reviews = [],
  onViewMore = () => {},
  ratingData = null,
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [reviewsList, setReviewsList] = useState(reviews);
  console.log(selectedMedia, "selectedMedia");

  const [addReview, { isLoading: isAddReviewLoading }] = useAddReviewMutation();
  const [updateReview, { isLoading: isUpdateReviewLoading }] =
    useUpdateReviewMutation();
  const [deleteReview, { isLoading: isDeleteReviewLoading }] =
    useDeleteReviewMutation();
  const { showToast } = useToast();

  useEffect(() => {
    setReviewsList(reviews);
  }, [reviews]);

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
    setSelectedMedia([]);
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
      selectedMedia.forEach((file) => {
        formData.append("images", file);
      });
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
    selectedMedia.forEach((file) => {
      formData.append("images", file); // binary file
    });
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
    <div className={`${styles.reviewsWrapper} container`}>
      <div className={styles.reviewsHeader}>
        <h2>Reviews &amp; Ratings</h2>
      </div>

      <div
        className={`${styles.reviewBtn} d-flex justify-content-between py-2`}
      >
        <div className={styles.productName}>{productName}</div>
        {!showReviewForm && (
          <button
            className={styles.writeReviewBtn}
            onClick={handleWriteReviewClick}
          >
            WRITE A REVIEW
          </button>
        )}
      </div>

      <div className={`${styles.earnCoins} gap-1`}>
        Review with Images{" "}
        <Image src={coin} alt="coin" width={15} height={15} />
        <span>Earn Coins!</span>
      </div>

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
                      setSelectedMedia(files);
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
                      const isImage = file.type.startsWith("image/");
                      const isVideo = file.type.startsWith("video/");
                      const url = URL.createObjectURL(file);
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
        {reviewsList.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onEdit={handleEditReview}
            onDelete={handleDeleteReview}
          />
        ))}
      </div>

      <Link
        className={styles.viewMore}
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onViewMore();
        }}
      >
        View More Reviews
        <span className={styles.arrowCircle}>
          <FaChevronRight />
        </span>
      </Link>
    </div>
  );
};

export default ReviewsRating;
