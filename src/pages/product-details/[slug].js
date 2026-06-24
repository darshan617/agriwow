import ProductDetailsComponent from "@/components/product-details/ProductDetailsComponent";
import ProductDetailsShimmer from "@/components/product-details/ProductDetailsShimmer";
import { useGetProductDetailsQuery } from "@/redux/apis/productApi";
import { useRouter } from "next/router";
import React from "react";

const ProductDetails = () => {
  const router = useRouter();
  const slug = router?.query?.slug;
  const { data: productDetails, isLoading, isFetching } =
    useGetProductDetailsQuery(
      {
        slug: slug,
      },
      { skip: !slug },
    );

  const isProductsPending =
    !slug || isLoading || (isFetching && !productDetails);

  if (isProductsPending) {
    return <ProductDetailsShimmer />;
  }

  return (
    <div>
      <ProductDetailsComponent productDetails={productDetails} />
    </div>
  );
};

export default ProductDetails;
