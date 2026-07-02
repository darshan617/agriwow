import React from "react";
import TopHeader from "@/components/layout/top-header/TopHeader";
import Footer from "@/components/layout/footer/Footer";
import styles from "@/components/layout/Layout.module.css";

const Layout = ({ children }) => (
  <div className={styles.page}>
    <TopHeader />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
