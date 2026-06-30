import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LuHouse, LuSprout } from "react-icons/lu";
import farmImage from "@/assets/images/farm-eqip.png";
import styles from "@/components/404/404.module.css";

const quickLinks = [
  { label: "Agriculture Sprayers", href: "/product-category/agriculture-sprayers" },
  { label: "Garden Tools", href: "/product-category/garden-tools" },
  { label: "Track Order", href: "/track-order" },
];

const Page404Component = () => {
  return (
    <div className="container">
      <section className={styles.page404}>
        <div className={styles.visualCol}>
          <div className={styles.codeWrap} aria-hidden="true">
            <span className={styles.codeDigit}>4</span>
            <span className={styles.codeCenter}>
              <LuSprout className={styles.sproutIcon} />
            </span>
            <span className={styles.codeDigit}>4</span>
          </div>

          <div className={styles.imageWrap}>
            <Image
              src={farmImage}
              alt="Agricultural equipment"
              width={380}
              height={300}
              className={styles.heroImage}
              priority
            />
          </div>
        </div>

        <div className={styles.contentCol}>
          <p className={styles.eyebrow}>Error 404</p>
          <h1 className={styles.title}>This field is empty</h1>
          <p className={styles.description}>
            The page you&apos;re looking for may have been moved, removed, or
            never existed. Let&apos;s get you back to growing your farm with the
            right tools.
          </p>

          <div className={styles.actions}>
            <Link href="/" className={styles.primaryBtn}>
              <LuHouse size={18} />
              Back to Home
            </Link>
            <Link href="/contact-us" className={styles.secondaryBtn}>
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page404Component;
