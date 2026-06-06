import React from "react";
import styles from "@/components/product-category/components/breadcrumb/Breadcrumb.module.css";
import Link from "next/link";

const Breadcrumb = ({ productDetails }) => {
  const categorySlug = "category-slug";
  const categoryName = "Category Name";
  const subCategory = "sub-category";
  const subCategoryName = "Sub Category Name";
  return (
    <div className="container">
      {/* <h2 className={`${styles.title}`}>Garden & Lawn Care</h2> */}
      <div className={`${styles.breadcrumb} `}>
        <div style={{ margin: "16px 0" }}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li style={{ margin: "0 8px", color: "#6c757d" }}>/</li>
            <li>
              <Link href="/">Products</Link>
            </li>
            <li style={{ margin: "0 8px", color: "#6c757d" }}>/</li>
            <li className={`${styles.breadcrumbItem1}`}>
              <Link href={`/product-category/${productDetails?.data?.category?.slug}`}>
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
