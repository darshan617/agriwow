import ProductDetailsComponent from "@/components/product-details/ProductDetailsComponent";
import ProductDetailsShimmer from "@/components/product-details/ProductDetailsShimmer";
import SeoHead from "@/components/seo/SeoHead";
import { useGetProductDetailsQuery } from "@/redux/apis/productApi";
import { buildProductSeo } from "@/utils/seo";
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

  const productSeo = buildProductSeo(productDetails?.data);

  if (isProductsPending) {
    return <ProductDetailsShimmer />;
  }

  return (
    <div>
      {productSeo ? <SeoHead {...productSeo} /> : null}
      <ProductDetailsComponent productDetails={productDetails} />
    </div>
  );
};

export default ProductDetails;
