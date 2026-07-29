import React from "react";
import Image from "next/image";
import styles from "@/components/accessories/Accessories.module.css";
import { useGetAccessoriesQuery } from "@/redux/apis/accessoryApi";
import router from "next/router";
import Link from "next/link";

const Accessories = () => {
  const { data: accessories, isLoading } = useGetAccessoriesQuery();
  const data = accessories?.data;
  const subcategories = Array.isArray(data)
    ? data?.flatMap((item) =>
        Array.isArray(item?.subcategories) ? item.subcategories : []
      )
    : Array.isArray(data?.subcategories)
    ? data?.subcategories
    : [];

  return (
    <section className={`${styles.accessories} mt-4`}>
      <div className="container">
        <div className="row align-items-center mb-4">
          <div className={`${styles.breadcrumb} `}>
            <div style={{ margin: "16px 0" }}>
              <ul>
                <li>
                  <Link href="/" prefetch={true}>Home</Link>
                </li>
                <li style={{ margin: "0 8px", color: "#6c757d" }}>/</li>
                <li>
                  <Link href="/accessories" prefetch={true}>Accessories</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3">
            <h2 className={styles.title}>Accessories</h2>
          </div>
        </div>

        <div className="row g-4">
          {isLoading && <p>Loading accessories...</p>}

          {!isLoading && subcategories?.length === 0 && (
            <p>No accessories found.</p>
          )}

          {subcategories?.map((subcategory) => (
            <div className="col-6 col-md-4 col-lg-2" key={subcategory?.id} onClick={() => router.push(`/accessories/${subcategory?.slug}`)}>
              <div className={styles.card} style={{ cursor: "pointer" }}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={subcategory?.image}
                    alt={subcategory?.name}
                    width={160}
                    height={160}
                    className={styles.image}
                  />
                </div>
                <p className={styles.name}>{subcategory?.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accessories;