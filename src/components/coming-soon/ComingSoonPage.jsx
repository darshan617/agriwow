import React from "react";
import Image from "next/image";
import styles from "@/components/coming-soon/ComingSoonPage.module.css";
import logo from "@/assets/images/logo.png";

const whatsappHref = `https://wa.me/919229297668?text=${encodeURIComponent(
  "Hello! Please notify me when Agriwow is live.",
)}`;

const ComingSoonPage = () => {
  return (
    <main className={styles.wrapper}>
      <section className={styles.card}>
        <div className={styles.logoWrap}>
          <Image src={logo} alt="Agriwow logo" width={170} priority />
        </div>
        <p className={styles.kicker}>New Experience is Launching</p>
        <h1 className={styles.title}>Coming Soon</h1>
        <p className={styles.description}>
          We are preparing a better Agriwow platform for farmers and businesses.
          Please check back shortly.
        </p>
        <div className={styles.actions}>
          <a className={styles.primaryBtn} href="/">
            Refresh Page
          </a>
          <a
            className={styles.secondaryBtn}
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
};

export default ComingSoonPage;
