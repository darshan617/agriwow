import React from "react";
import ItemDetail from "./components/item-detail/ItemDetail";
import Layout from "../layout/Layout";
import Breadcrumb from "./components/breadcrumb/Breadcrumb";
import DeliveryDetail from "./components/delivery-detail/deliveryDetails";
import SimilarProduct from "./components/similar-product/SimilarProduct";
import ReviewsRating from "./components/reviews-rating/ReviewsRating";
import Faqs from "./components/faqs/Faqs";
import Detail from "../home/components/detail/Detail";
import OrderInformation from "../product-category/components/order-information/OrderInformation";
const ProductDetailsComponent = ({ productDetails }) => {
  const similarProducts = productDetails?.data?.similar_products ?? [];
  const categorySlug = productDetails?.data?.category?.slug;

  return (
    <Layout>
      <Breadcrumb productDetails={productDetails} />
      <div className="container">
        <div className="row">
          <div className="col-lg-9 col-md-12 p-0">
            <ItemDetail productDetails={productDetails} />
          </div>
          <div className="col-lg-3  ">
            <DeliveryDetail productDetails={productDetails} />
          </div>
        </div>
      </div>
      <SimilarProduct
        similarProducts={similarProducts}
        categorySlug={categorySlug}
      />
      <ReviewsRating
        productId={productDetails?.data?.id}
        productName={productDetails?.data?.name}
        ratingData={productDetails?.data?.rating_summary}
        reviews={productDetails?.data?.reviews}
      />
      <Faqs productData={productDetails?.data} productId={productDetails?.data?.id} />
      <OrderInformation />
    </Layout>
  );
};

export default ProductDetailsComponent;
