import ProductCategoryCompnent from "@/components/product-category/ProductCategoryComponent";
import { buildCategorySeoFromProducts } from "@/utils/seo";
import React from "react";

const ProductCategory = () => {
  return <ProductCategoryCompnent />;
};

export async function getServerSideProps(context) {
  const categorySlug = context.params?.categorySlug;

  if (!categorySlug) {
    return { props: {} };
  }

  const baseUrl = (process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "")
    .trim()
    .replace(/\/$/, "");

  try {
    const response = await fetch(`${baseUrl}/${categorySlug}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return { props: {} };
    }

    const json = await response.json();
    const seo = buildCategorySeoFromProducts(json?.data, {
      categorySlug,
    });

    return {
      props: {
        seo: seo || null,
      },
    };
  } catch {
    return { props: {} };
  }
}

export default ProductCategory;
