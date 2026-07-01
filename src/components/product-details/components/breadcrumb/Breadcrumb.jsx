import React from "react";
import styles from "@/components/product-category/components/ProductCategoryList/ProductCategoryList.module.css";
import Link from "next/link";

const Breadcrumb = ({ productDetails, blogDetails }) => {
  return (
    <div className="container">
      <div className={`${styles.breadcrumb} `}>
        <div style={{ margin: "16px 0" }}>
          <ul>
            <li>
              <Link href="/" prefetch={true}>Home</Link>
            </li>
            <li style={{ margin: "0 8px", color: "#6c757d" }}>/</li>
            <li>
              <Link href="/" prefetch={true}>Products</Link>
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
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
