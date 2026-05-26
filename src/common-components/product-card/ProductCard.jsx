import React from "react";
import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import { MdAddShoppingCart } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import imageHoverImage from "@/assets/images/hover-product.png";
import styles from "@/common-components/product-card/ProductCard.module.css";
const ProductCard = ({
  discount = "0",
  isBestSeller = true,
  name = "-",
  price = "0",
  oldPrice = "0",
  reviews = "0 Reviews",
  image = null,
  imageHover = imageHoverImage,
  rating = "4.5",
  type = "homePage",
  isTrending = false,
  isFeatured = false,
  isTopRated = false,
}) => {
  const hoverImage = imageHover || image;
  const showHoverImage = Boolean(image && hoverImage && hoverImage !== image);

  return (
    <div
      className={`${styles.productCard}`}
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <div className={`${styles.cardTags}`}>
        {
          type === "productPage" ? (
            isBestSeller && (
              <span className={`${styles.bestsellerTag}`}>BESTSELLER</span>
            )
          ) && (
            isTrending && (
              <span className={`${styles.bestsellerTag}`}>TRENDING</span>
            )
          ) && (
            isFeatured && (
              <span className={`${styles.bestsellerTag}`}>FEATURED</span>
            )
          ) && (
            isTopRated && (
              <span className={`${styles.bestsellerTag}`}>TOP RATED</span>
            )
          ) : (
            <span className={`${styles.bestsellerTag  }`}>{discount}% OFF</span>
          )
        }
        {type === "productPage" ? (
          <button
            type="button"
            className={`${styles.wishlistBtn}`}
            aria-label="Add to wishlist"
          >
            <FiHeart />
          </button>
        ) : (
          isBestSeller && (
            <span className={`${styles.bestsellerTag}`}>BESTSELLER</span>
          )
        )}
      </div>

      <div className={`${styles.imageWrap}`}>
        <div className={`${styles.imageLayer} ${styles.imageLayerPrimary}`}>
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 575px) 45vw, (max-width: 1199px) 25vw, 20vw"
            className={`${styles.productImg}`}
          />
        </div>
        {showHoverImage && (
          <div className={`${styles.imageLayer} ${styles.imageLayerHover}`}>
            <Image
              src={hoverImage}
              alt={name}
              fill
              sizes="(max-width: 575px) 45vw, (max-width: 1199px) 25vw, 20vw"
              className={`${styles.productImg}`}
            />
          </div>
        )}
      </div>

      <div className={`${styles.cardInfo}`}>
        <div className={`${styles.ratingLine}`}>
          <span className={`${styles.ratingBadge}`}>
            <IoMdStar style={{ marginRight: 2, verticalAlign: "middle" }} />
            {rating}
          </span>
          <span className={`${styles.reviewText}`}>({reviews})</span>
        </div>

        <h3 className={`${styles.productName}`}>{name}</h3>

        <p className={`${styles.priceRow}`}>

          <span className={`${styles.currentPrice}`}>₹ {price}</span>
          <span className={`${styles.oldPrice}`}>₹ {oldPrice}</span>

        </p>
        {type === "productPage" && (
          <div className={`${styles.discountRow}`}>
            <span className={`${styles.discountText}`}>{discount || 0}% OFF</span>
              <span>Save ₹ {(oldPrice || 0) - (price || 0)}</span>
            </div>
        )}  
      </div>

      <div className={`${styles.cardActions}`}>
        <button type="button" className={`${styles.addToCartBtn}`}>
          <span>
            <MdAddShoppingCart className={`${styles.btnIcon}`} />
            Add to Cart
          </span>
        </button>
        <button type="button" className={`${styles.buyNowBtn}`}>
          <span>Buy Now</span>
        </button>
        {type !== "productPage" && (
          <button
            type="button"
            className={`${styles.wishlistBtn}`}
            aria-label="Add to wishlist"
          >
            <FiHeart />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
