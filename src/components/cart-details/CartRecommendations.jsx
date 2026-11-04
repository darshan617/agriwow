import React from "react";
import ProductCard from "@/common-components/product-card/ProductCard";
import styles from "@/components/cart-details/cart-summery/CartSummery.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

const CartRecommendations = ({ products }) => (
  <div className={styles.mayLike}>
    <h2 className={styles.swiperTitle}>You may also like</h2>
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation={{
        prevEl: ".swiper-btn-prev",
        nextEl: ".swiper-btn-next",
      }}
      autoplay={{
        delay: 8000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        0: {
          slidesPerView: 2,
          spaceBetween: 5,
        },
        425: {
          slidesPerView: 2,
          spaceBetween: 5,
        },
        575: {
          slidesPerView: 3,
          spaceBetween: 14,
        },
        767: {
          slidesPerView: 3,
          spaceBetween: 16,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 18,
        },
        1200: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
      }}
      className="swiper-wrapper"
    >
      {products.map((item) => (
        <SwiperSlide key={item?.id}>
          <ProductCard
            image={item?.thumbnail}
            imageHover={item?.gallery?.[0]}
            discount={item?.discount}
            isBestSeller={item?.is_best_selling}
            name={item?.name}
            price={item?.selling_price}
            oldPrice={item?.price}
            reviews={item?.total_reviews}
            average_rating={item?.average_rating}
            isTrending={item?.is_trending}
            isFeatured={item?.is_featured}
            isTopRated={item?.is_top_rated}
            slug={item?.slug}
            productId={item?.id}
            isWishlist={item?.is_wishlist}
            similarProductData={item}
            quantity={item?.quantity}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default CartRecommendations;
