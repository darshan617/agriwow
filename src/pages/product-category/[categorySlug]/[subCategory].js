import ProductCategoryCompnent from "@/components/product-category/ProductCategoryComponent";
import { buildCategorySeoFromProducts } from "@/utils/seo";
import React from "react";

const SubCategory = () => {
  return <ProductCategoryCompnent />;
};

export async function getServerSideProps(context) {
  const categorySlug = context.params?.categorySlug;
  const subCategory = context.params?.subCategory;

  if (!categorySlug || !subCategory) {
    return { props: {} };
  }

  const baseUrl = (process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "")
    .trim()
    .replace(/\/$/, "");

  try {
    const response = await fetch(`${baseUrl}/${categorySlug}/${subCategory}`, {
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
      subCategorySlug: subCategory,
      description:
        json?.data?.[0]?.category?.meta_description ||
        json?.data?.[0]?.subcategory?.meta_description,
      keywords:
        json?.data?.[0]?.category?.meta_keywords ||
        json?.data?.[0]?.subcategory?.meta_keywords,
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

export default SubCategory;
