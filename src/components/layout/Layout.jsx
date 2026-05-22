import React from "react";
import TopHeader from "@/components/layout/top-header/TopHeader";
import TopBanner from "@/components/layout/top-banner/TopBanner";
import Footer from "@/components/layout/footer/Footer";
import styles from "@/components/layout/Layout.module.css";

const Layout = ({ children, categoriesData }) => (
  <div className={styles.page}>
    <TopHeader />
    {categoriesData?.length > 0 && (
      <TopBanner categoriesData={categoriesData} />
    )}
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
