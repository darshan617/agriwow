import React from "react";
import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import { MdAddShoppingCart } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import styles from "@/common-components/product-card/ProductCard.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAddToCartMutation } from "@/redux/apis/addToCartApi";
import Cookies from "js-cookie";
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "@/redux/apis/addToWishlist";
import { useToast } from "@/custom-hooks/toast/ToastProvider";
const ProductCard = ({
  discount = "0",
  isBestSeller = true,
  name = "-",
  price = "0",
  oldPrice = "0",
  reviews = "0 Reviews",
  image = null,
  imageHover = null,
  rating = "4.5",
  type = "homePage",
  isTrending = false,
  isFeatured = false,
  isTopRated = false,
  slug = null,
  productId = null,
  userId = null,
  path = null,
}) => {
  const router = useRouter();
  const isWishlistPage =
    router.pathname === "/wishlist" || path === "/wishlist";
  const hoverImage = imageHover || image;
  const showHoverImage = Boolean(image && hoverImage && hoverImage !== image);

  const userData = Cookies?.get("userData")
    ? JSON.parse(decodeURIComponent(Cookies?.get("userData")))
    : null;

  const handleBuyNow = (slug) => {
    router.push(`/product-details/${slug}`);
  };

  const [addToCart, { isLoading }] = useAddToCartMutation();
  const [addToWishlist, { isLoading: isWishlistLoading }] =
    useAddToWishlistMutation();
  const [removeFromWishlist, { isLoading: isRemoveWishlistLoading }] =
    useRemoveFromWishlistMutation();
  const { showToast } = useToast();

  const handleAddToCart = async () => {
    try {
      const res = await addToCart({
        body: {
          user_id: userData?.id,
          product_id: productId,
          quantity: 1,
        },
      });
      console.log(res, "res");
      if (res?.data?.success || res?.data?.status) {
        showToast(res?.data?.message, "success");
      }
    } catch (error) {
      console.log(error, "error");
      showToast(error?.data?.message, "error");
    }
  };

  const handleAddToWishlist = async () => {
    if (!userData?.id) {
      showToast("Please log in to add items to your wishlist", "warning");
      return;
    }

    const res = await addToWishlist({
      body: {
        user_id: userData.id,
        product_id: productId,
      },
    });

    if (res.error) {
      showToast(
        res.error?.data?.message || "Failed to add to wishlist",
        "error",
      );
      return;
    }

    if (res?.data?.success || res?.data?.status) {
      showToast(res?.data?.message || "Added to wishlist", "success");
    } else {
      showToast(res?.data?.message || "Failed to add to wishlist", "error");
    }
  };

  const handleRemoveFromWishlist = async () => {
    if (!userData?.id) {
      showToast("Please log in to manage your wishlist", "warning");
      return;
    }

    const res = await removeFromWishlist({
      body: {
        product_id: productId,
      },
    });
    console.log(res, "res");

    if (res?.data?.success || res?.data?.status) {
      showToast(res?.data?.message || "Removed from wishlist", "success");
    } else {
      showToast(
        res?.data?.message || "Failed to remove from wishlist",
        "error",
      );
    }
  };
  return (
    <div
      className={`${styles.productCard}`}
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <div className={`${styles.cardTags}`}>
        {type === "productPage" ? (
          isBestSeller && (
            <span className={`${styles.bestsellerTag}`}>BESTSELLER</span>
          ) &&
          isTrending && (
            <span className={`${styles.bestsellerTag}`}>TRENDING</span>
          ) &&
          isFeatured && (
            <span className={`${styles.bestsellerTag}`}>FEATURED</span>
          ) &&
          isTopRated && (
            <span className={`${styles.bestsellerTag}`}>TOP RATED</span>
          )
        ) : (
          <span className={`${styles.bestsellerTag}`}>{discount}% OFF</span>
        )}
        {type === "productPage" ? (
          isWishlistPage ? (
            <button
              type="button"
              className={`${styles.wishlistBtn} ${styles.removeBtn}`}
              aria-label="Remove from wishlist"
              onClick={handleRemoveFromWishlist}
              disabled={isRemoveWishlistLoading}
            >
              <RxCross2 />
            </button>
          ) : (
            <button
              type="button"
              className={`${styles.wishlistBtn}`}
              aria-label="Add to wishlist"
              onClick={handleAddToWishlist}
              disabled={isWishlistLoading}
            >
              <FiHeart />
            </button>
          )
        ) : (
          isBestSeller && (
            <span className={`${styles.bestsellerTag}`}>BESTSELLER</span>
          )
        )}
      </div>

      <Link href={`/product-details/${slug}`} className={`${styles.imageWrap}`}>
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
      </Link>

      <Link href={`/product-details/${slug}`} className={`${styles.cardInfo}`}>
        <div className={`${styles.ratingLine}`}>
          <span className={`${styles.ratingBadge}`}>
            <IoMdStar style={{ marginRight: 2, verticalAlign: "middle" }} />
            {rating}
          </span>
          <span className={`${styles.reviewText}`}>({reviews})</span>
        </div>

        <h3 className={`${styles.productName}`}>{name}</h3>

        <div className={`${styles.priceRow}`}>
          <span className={`${styles.currentPrice}`}>₹ {price}</span>
          <span className={`${styles.oldPrice}`}>₹ {oldPrice}</span>
        </div>
        {type === "productPage" && (
          <div className={`${styles.discountRow}`}>
            <span className={`${styles.discountText}`}>
              {discount || 0}% OFF
            </span>
            <span>Save ₹ {(oldPrice || 0) - (price || 0)}</span>
          </div>
        )}
      </Link>

      <div className={`${styles.cardActions}`}>
        <button
          type="button"
          className={`${styles.addToCartBtn}`}
          onClick={handleAddToCart}
        >
          <span>
            <MdAddShoppingCart className={`${styles.btnIcon}`} />
            Add to Cart
          </span>
        </button>
        <button
          type="button"
          className={`${styles.buyNowBtn}`}
          onClick={() => handleBuyNow(slug)}
        >
          <span>Buy Now</span>
        </button>
        {type !== "productPage" && (
          <button
            type="button"
            className={`${styles.wishlistBtn}`}
            aria-label="Add to wishlist"
            onClick={handleAddToWishlist}
          >
            <FiHeart />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
