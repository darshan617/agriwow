import React from "react";
import styles from "@/components/product-category/components/ProductCategoryList/ProductCategoryList.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";

const Breadcrumb = ({ productDetails, blogDetails }) => {
  console.log(productDetails, "ss");

  const categories = useSelector((state) => state.category.categories);
  return (
    <div className="container">
      <div className={`${styles.breadcrumb} `}>
        <div style={{ margin: "16px 0" }}>
          <ul>
            <li>
              <Link href="/" prefetch={true}>
                Home
              </Link>
            </li>
            <li style={{ margin: "0 8px", color: "#6c757d" }}>/</li>
            <li>
              <Link
                href={`/product-category/${categories?.[0]?.slug}`}
                prefetch={true}
              >
                Products
              </Link>
            </li>
            <li style={{ margin: "0 8px", color: "#6c757d" }}>/</li>
            <li className={`${styles.breadcrumbItem1}`}>
              <Link
                href={`/product-category/${productDetails?.data?.category?.slug}`}
                prefetch={true}
              >
                {productDetails?.data?.category?.name}
              </Link>
            </li>
            <li style={{ margin: "0 8px", color: "#6c757d" }}>/</li>
            <li className={`${styles.breadcrumbItem1}`}>
              <Link
                href={`/product-details/${productDetails?.data?.slug}`}
                prefetch={true}
              >
                {productDetails?.data?.name}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
