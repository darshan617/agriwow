import React from "react";
import review1 from "@/assets/images/review1.png";
import coin from '@/assets/icon/coin.png'
import Image from "next/image";
import { FaThumbsUp, FaThumbsDown, FaChevronRight   } from "react-icons/fa6";


import styles from "@/components/product-details/components/reviews-rating/ReviewsRating.module.css";

const RATING_BARS = [
  { label: 5, pct: 80 },
  { label: 4, pct: 20 },
  { label: 3, pct: 0 },
  { label: 2, pct: 0 },
  { label: 1, pct: 0 },
];

const REVIEWS = [
  {
    id: 1,
    name: "Rohan Jain",
    date: "May 07, 2025",
    stars: 5,
    title: "Best hose reel ever.",
    body: "I bought this product and I am very happy with it. It is a very useful and good quality mini hose reel for car washing, lawn care, and household watering. The 10M heavy-duty hose is very handy, and the 7-in-1 spray nozzle gives different spray options for different uses. It's easy to use, works perfectly, and makes watering and cleaning much easier. I would definitely recommend it to anyone.",
    images: review1,
    helpful: { up: 0, down: 0 },
  },
];

const Stars = ({ count }) => (
  <div className={`${styles.reviewerStars} `}>
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < count ? styles.star : styles.starEmpty}>
        ★
      </span>
    ))}
  </div>
);

const RatingSummary = ({ average, totalRatings, totalReviews, bars }) => (
  <div className={`${styles.ratingSummary}`}>
    <div className={`${styles.avgScore} `}>
      <div className={`${styles.avgNumber}`}>
        {average} <span className={`${styles.avgNumberStar}`}>★</span>
      </div>
      <div className={`${styles.avgLabel}`}>
        Average Rating based on {totalRatings}
        <br />
        ratings and {totalReviews} reviews
      </div>
    </div>

    <div className={`${styles.ratingBars}`}>
      {bars.map(({ label, pct }) => (
        <div className={`${styles.barRow}`} key={label}>
          <span className={`${styles.barLabel}`}>{label}</span>
          <div className={`${styles.barTrack}`}>
            <div className={`${styles.barFill}`} style={{ width: `${pct}%` }} />
          </div>
          <span className={`${styles.barPct}`}>{pct}%</span>
        </div>
      ))}
    </div>
  </div>
);

const ReviewCard = ({ review }) => {
  const { name, date, stars, title, body, images, helpful } = review;

  return (
    <div className={`${styles.reviewItem}`}>
      <div className={`${styles.reviewTop}`}>
        <div className={`${styles.reviewerInfo}`}>
          <Stars count={stars} />
          <div className={`${styles.reviewerMeta}`}>
            <span className={`${styles.reviewerName}`}>{name}</span>
            <span className={`${styles.verifiedBadge}`}>
              {" "}
              Verified Purchase
            </span>
          </div>
          <div className={`${styles.reviewDate}`}>{date}</div>
        </div>

        <div className={`${styles.helpfulBtns}`}>
          <button className={`${styles.helpfulBtn}`}>
            <span className={`${styles.icon}`}><FaThumbsUp />
            </span> {helpful.up}
          </button>
          <button className={`${styles.helpfulBtn}`}>
            <span className={`${styles.icon}`}><FaThumbsDown />
            </span> {helpful.down}
          </button>
        </div>
      </div>

      <div className={`${styles.reviewTitle}`}>{title}</div>
      <div className={`${styles.reviewBody}`}>{body}</div>
      <div className={`${styles.reviewImg}`}>
        <Image src={review1} alt="discount" width={10} height={10} />
      </div>
    </div>
  );
};

const ReviewsRating = ({
  productName = "Neptune Mini Hose Reel | 10M Heavy Duty Hose | Versatile 7-in-1 Spray Nozzle with Hose Connector | Ideal for Car Wash, Lawn Care & Household Watering",
  averageRating = 4.8,
  totalRatings = 5,
  totalReviews = 3,
  ratingBars = RATING_BARS,
  reviews = REVIEWS,
  onWriteReview = () => {},
  onViewMore = () => {},
}) => {
  return (
    <div className={`${styles.reviewsWrapper} container`}>
      <div className={`${styles.reviewsHeader}`}>
        <h2>Reviews &amp; Ratings</h2>
      </div>
      <div className={`${styles.reviewBtn} d-flex justify-content-between py-2`}>
        <div className={`${styles.productName}`}>{productName}</div>
        <button className={`${styles.writeReviewBtn}`} onClick={onWriteReview}>
          WRITE A REVIEW
        </button>
      </div>
      <div className={`${styles.earnCoins} gap-1`}>
        Review with Images <Image src={coin} alt="discount" width={15} height={15} /> <span>Earn Coins!</span>
      </div>

      <RatingSummary
        average={averageRating}
        totalRatings={totalRatings}
        totalReviews={totalReviews}
        bars={ratingBars}
      />

      <div className={`${styles.reviewsList}`}>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      <a
        className={`${styles.viewMore}`}
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onViewMore();
        }}
      >
        View More Reviews
        <span className={`${styles.arrowCircle}`}><FaChevronRight /></span>
      </a>
    </div>
  );
};

export default ReviewsRating;
