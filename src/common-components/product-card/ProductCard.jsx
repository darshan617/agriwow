import React, { useMemo } from "react";
import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import { MdAddShoppingCart } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import styles from "@/common-components/product-card/ProductCard.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAddToCartMutation } from "@/redux/apis/addToCartApi";
import Cookies from "js-cookie";
import {
  getWishlistItems,
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "@/redux/apis/addToWishlist";
import { useToast } from "@/custom-hooks/toast/ToastProvider";
import { useLoginPopup } from "@/custom-hooks/login-popup/LoginPopupProvider";
import {
  markBuyNowAddPending,
  useBuyProductMutation,
} from "@/redux/apis/buyProductApi";

const ProductCard = ({
  discount = "0",
  isBestSeller = true,
  name = "-",
  price = "0",
  oldPrice = "0",
  reviews = "0 Reviews",
  image = null,
  imageHover = null,
  average_rating = null,
  type = "homePage",
  isTrending = false,
  isFeatured = false,
  isTopRated = false,
  slug = null,
  productId = null,
  userId = null,
  path = null,
  isWishlist = false,
}) => {
  const router = useRouter();
  const isHomeOrProductPage = ["productPage", "homePage", "home"].includes(
    type,
  );
  const isWishlistPage =
    router.pathname === "/wishlist" || path === "/wishlist";
  const hoverImage = imageHover || image;
  const showHoverImage = Boolean(image && hoverImage && hoverImage !== image);

  const userData = Cookies?.get("userData")
    ? JSON.parse(decodeURIComponent(Cookies?.get("userData")))
    : null;

  const { data: wishlistData } = useGetWishlistQuery(userData?.id, {
    skip: !userData?.id,
  });

  const isInWishlist = useMemo(() => {
    if (!productId) return isWishlist;
    const items = getWishlistItems(wishlistData);
    return items.some(
      (item) =>
        (item?.product?.id ?? item?.product_id ?? item?.id) === productId,
    );
  }, [wishlistData, productId, isWishlist]);

  const [addToCart, { isLoading }] = useAddToCartMutation();
  const [addToWishlist, { isLoading: isWishlistLoading }] =
    useAddToWishlistMutation();
  const [removeFromWishlist, { isLoading: isRemoveWishlistLoading }] =
    useRemoveFromWishlistMutation();
  const [buyProduct, { isLoading: isBuyProductLoading }] =
    useBuyProductMutation();
  const { showToast } = useToast();
  const { openLoginPopup, getIsLoggedIn } = useLoginPopup();

  const handleAddToCart = async () => {
    try {
      const res = await addToCart({
        body: {
          user_id: userData?.id,
          product_id: productId,
          quantity: 1,
        },
      });
      if (res?.data?.success || res?.data?.status) {
        showToast(res?.data?.message, "success");
        if (router?.pathname === "/wishlist") {
          handleRemoveFromWishlist();
        }
      } else {
        showToast(res?.data?.message || "Failed to add to cart", "error");
      }
    } catch (error) {
      showToast(error?.data?.message || "Failed to add to cart", "error");
    }
  };

  const handleBuyProduct = () => {
    if (!getIsLoggedIn()) {
      openLoginPopup();
      return;
    }

    const currentUser = Cookies?.get("userData")
      ? JSON.parse(decodeURIComponent(Cookies?.get("userData")))
      : null;

    markBuyNowAddPending({
      productId,
      quantity: 1,
      userId: currentUser?.id,
    });
    router?.push({
      pathname: `/checkout`,
      query: {
        productId,
        quantity: 1,
        userId: currentUser?.id,
      },
    });
  };

  const handleAddToWishlist = async () => {
    if (!getIsLoggedIn()) {
      openLoginPopup();
      return;
    }

    const currentUser = Cookies?.get("userData")
      ? JSON.parse(decodeURIComponent(Cookies?.get("userData")))
      : null;

    const res = await addToWishlist({
      body: {
        user_id: currentUser.id,
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

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      handleRemoveFromWishlist();
    } else {
      handleAddToWishlist();
    }
  };

  const handleRemoveFromWishlist = async () => {
    if (!getIsLoggedIn()) {
      openLoginPopup();
      return;
    }

    const res = await removeFromWishlist({
      body: {
        product_id: productId,
      },
    });

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
        <div
          style={{
            display: "flex",
            gap: 4,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {isHomeOrProductPage ? (
            <>
              {isBestSeller && (
                <span className={`${styles.bestsellerTag}`}>BESTSELLER</span>
              )}
              {isTrending && (
                <span className={`${styles.bestsellerTag}`}>TRENDING</span>
              )}
              {isFeatured && (
                <span className={`${styles.bestsellerTag}`}>FEATURED</span>
              )}
              {isTopRated && (
                <span className={`${styles.bestsellerTag}`}>TOP RATED</span>
              )}
            </>
          ) : (
            <>
              {discount > 0 && (
                <span className={`${styles.discountTag}`}>{discount}% OFF</span>
              )}
              {isBestSeller && (
                <span className={`${styles.bestsellerTag}`}>BESTSELLER</span>
              )}
            </>
          )}
        </div>

        {type === "productPage" &&
          (isWishlistPage ? (
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
              className={`${styles.wishlistBtnnnnn} ${
                isInWishlist ? styles.wishlistActive : ""
              }`}
              aria-label={
                isInWishlist ? "Remove from wishlist" : "Add to wishlist"
              }
              onClick={handleWishlistToggle}
              disabled={isWishlistLoading || isRemoveWishlistLoading}
            >
              {isInWishlist ? <FaHeart /> : <FiHeart />}
            </button>
          ))}
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
        {average_rating > 0 && (
          <div className={`${styles.ratingLine}`}>
            <span className={`${styles.ratingBadge}`}>
              <IoMdStar style={{ marginRight: 2, verticalAlign: "middle" }} />
              {average_rating}
            </span>
            <span className={`${styles.reviewText}`}>({reviews})</span>
          </div>
        )}

        <h3 className={`${styles.productName}`}>{name}</h3>

        <div className={`${styles.priceRow}`}>
          <span className={`${styles.currentPrice}`}>₹ {price}</span>
          <span className={`${styles.oldPrice}`}>₹ {oldPrice}</span>
        </div>

        {isHomeOrProductPage && discount > 0 && (
          <div className={`${styles.discountRow}`}>
            <span className={`${styles.discountText}`}>{discount}% OFF</span>
            <span>Save ₹ {(oldPrice || 0) - (price || 0)}</span>
          </div>
        )}
      </Link>

      <div className={`${styles.cardActions}`}>
        <button
          type="button"
          className={`${styles.addToCartBtn}`}
          onClick={handleAddToCart}
          disabled={isLoading}
        >
          <span>
            <MdAddShoppingCart className={`${styles.btnIcon}`} />
            Add to Cart
          </span>
        </button>

        <button
          type="button"
          className={`${styles.buyNowBtn}`}
          onClick={handleBuyProduct}
          disabled={isBuyProductLoading}
        >
          <span>Buy Now</span>
        </button>

        {type !== "productPage" && (
          <button
            type="button"
            className={`${styles.wishlistBtn} ${
              isInWishlist ? styles.wishlistActive : ""
            }`}
            aria-label={
              isInWishlist ? "Remove from wishlist" : "Add to wishlist"
            }
            onClick={handleWishlistToggle}
            disabled={isWishlistLoading || isRemoveWishlistLoading}
          >
            {isInWishlist ? <FaHeart /> : <FiHeart />}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
