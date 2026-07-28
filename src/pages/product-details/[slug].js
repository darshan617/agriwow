import ProductDetailsComponent from "@/components/product-details/ProductDetailsComponent";
import ProductDetailsShimmer from "@/components/product-details/ProductDetailsShimmer";
import SeoHead from "@/components/seo/SeoHead";
import { useGetProductDetailsQuery } from "@/redux/apis/productApi";
import { buildProductSeo } from "@/utils/seo";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ProductDetails = () => {
  const router = useRouter();
  const slug = router?.query?.slug;
  const { data: productDetails, isLoading, isFetching, isError, error } =
    useGetProductDetailsQuery(
      {
        slug: slug,
      },
      { skip: !slug },
    );

  const isProductsPending =
    !slug || isLoading || (isFetching && !productDetails);

  const productSeo = buildProductSeo(productDetails?.data, {
    path: slug ? `/product-details/${slug}` : undefined,
  });

  useEffect(() => {
    if (!router?.isReady || isProductsPending) return;
    if (isError && error?.status === 404) {
      router.push("/404");
    }
  }, [router?.isReady, isProductsPending, isError, error, router]);

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

export async function getServerSideProps(context) {
  const slug = context.params?.slug;

  if (!slug) {
    return { props: {} };
  }

  const baseUrl = (process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "")
    .trim()
    .replace(/\/$/, "");
  const path = `/product-details/${slug}`;

  try {
    const response = await fetch(`${baseUrl}/product/${slug}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return { props: {} };
    }

    const json = await response.json();
    const seo = buildProductSeo(json?.data, { path });

    return {
      props: {
        seo: seo || null,
      },
    };
  } catch {
    return { props: {} };
  }
}

export default ProductDetails;
