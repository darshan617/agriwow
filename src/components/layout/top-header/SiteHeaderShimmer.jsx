import React from "react";
import TopHeaderShimmer from "@/components/layout/top-header/TopHeaderShimmer";
import HeaderShimmer from "@/components/layout/header/HeaderShimmer";
import styles from "@/components/layout/top-header/TopHeader.module.css";

const SiteHeaderShimmer = () => (
  <div className={styles.siteHeader}>
    <TopHeaderShimmer />
    <HeaderShimmer />
  </div>
);

export default SiteHeaderShimmer;
