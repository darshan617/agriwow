import React from "react";
import ProductsItem from "@/common-components/products/ProductsItem";
import bannerImage from "@/assets/images/selling.png";
import sprayerImage from "@/assets/images/selling-1.png";
import pumpImage from "@/assets/images/selling-2.png";

const BestSelling = ({
  bestSellingData,
  bannersLink,
  isHomeDataLoading = false,
  viewAllLink = "/product-category/best-selling",
}) => {
  return (
    <div className="sectionSpace">
      <ProductsItem
        sectionClassName=""
        title="Best Seller"
        bannerImage={bannerImage}
        bannersLink={bannersLink}
        viewAllLink={viewAllLink}
        agricultureProductsData={bestSellingData}
        isHomeDataLoading={isHomeDataLoading}
        variant="bestSelling"
        overlayVariant="bestSelling"
        overlayHeading={<>Product Range</>}
        overlayProducts={[
          {
            image: sprayerImage,
            align: "left",
            labelLines: [
              { icon: "leaf", text: "Agriculture" },
              { text: "Sprayers" },
            ],
          },
          {
            image: pumpImage,
            align: "right",
            labelLines: [
              { text: "Portable", icon: "drop", iconAfter: true },
              { text: "Water Pump" },
            ],
          },
        ]}
        overlayFooter="Everything You Need for Smart Farming"
      />
    </div>
  );
};

export default BestSelling;
