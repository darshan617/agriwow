import React from "react";
import ProductsItem from "@/common-components/products/ProductsItem";
import industrialBanner from "@/assets/images/industrial-bd.png";
import styles from "@/components/home/components/industrial-product/IndustrialProduct.module.css";

const IndustrialProduct = ({
  industrialProductsData,
  bannersLink,
  viewAllLink = "/product-category/industrial-products",
  isHomeDataLoading,
}) => {
  return (
    <ProductsItem
      title="Industrial Products"
      bannerImage={industrialBanner}
      agricultureProductsData={industrialProductsData}
      isHomeDataLoading={isHomeDataLoading}
      overlayVariant="industrial"
      viewAllLink={viewAllLink}
      overlayHeading={
        <>
          Built for Power
          <br />
          Engineered
          <br />
          <span className={`${styles.overlayAccent}`}>for Performance</span>
        </>
      }
      bannersLink={bannersLink}
    />
  );
};
export default IndustrialProduct;
