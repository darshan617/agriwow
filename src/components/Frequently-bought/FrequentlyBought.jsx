import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import styles from "./FrequentlyBought.module.css";
import { useAddToCartMutation } from "@/redux/apis/addToCartApi";
import { useToast } from "@/custom-hooks/toast/ToastProvider";

const getGalleryImageSrc = (src) =>
  typeof src === "string" ? src : src?.url || src?.src || "";

const FrequentlyBought = ({frequentlyBoughtProducts }) => {
  const { showToast } = useToast();
  const [addToCart, { isLoading }] = useAddToCartMutation();

  const bundleProducts = useMemo(() => {
    const products = Array.isArray(frequentlyBoughtProducts)
      ? frequentlyBoughtProducts
      : [];

    return products.map((product) => ({
        id: product?.product_id ?? product?.id,
        name: product?.product_name ?? product?.name ?? "",
        thumbnail: getGalleryImageSrc(
          product?.product_thumbnail ?? product?.thumbnail ?? ""),
        price: Number(product?.product_price ?? product?.price ?? 0),
        sellingPrice: Number(
          product?.sellingPrice ?? product?.selling_price ?? 0,
        ),
      }))
      .filter((product) => product.id);
  }, [frequentlyBoughtProducts]);

  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    setSelectedIds((prev) =>
      prev.filter((id) => bundleProducts.some((product) => product.id === id)),
    );
  }, [bundleProducts]);

  const selectedProducts = bundleProducts.filter((product) =>
    selectedIds.includes(product.id),
  );

  const originalTotal = selectedProducts.reduce(
    (sum, product) => sum + product.sellingPrice,
    0,
  );

  const toggleProduct = (productId) => {
    setSelectedIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const handleAddToCart = async () => {
    if (!selectedProducts.length) {
      showToast("Please select at least one product", "error");
      return;
    }

    try {
      for (const product of selectedProducts) {
        const res = await addToCart({
          body: {
            product_id: product.id,
            quantity: 1,
          },
        });

        if (!res?.data?.success && !res?.data?.status) {
          showToast(
            res?.data?.message || "Failed to add some products to cart",
            "error",
          );
          return;
        }
      }

      showToast("Products added to cart successfully", "success");
    } catch (error) {
      showToast(
        error?.data?.message || "Failed to add products to cart",
        "error",
      );
    }
  };

  if (bundleProducts.length < 2) return null;

  return (
    <section className="container">
      <div className="row">
        <div className="col-lg-6 col-md-6">
          <div className={styles.frequentlyBought}>
            <div className={styles.frequentlyBoughtCard}>
              <div className={styles.header}>
                <h2 className={styles.title}>Frequently Bought Together</h2>
                {/* <p className={styles.subtitle}>
                Get {BUNDLE_DISCOUNT_PERCENT}% discount on purchasing all these
                products together
              </p> */}
              </div>

              <div className={styles.content}>
                <ul className={styles.productList}>
                  {bundleProducts?.map((product) => {
                    const isChecked = selectedIds.includes(product?.id);
                    const hasDiscount = product?.price > product?.sellingPrice;

                    return (
                      <li key={product?.id} className={styles.productRow}>
                        <label className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={isChecked}
                            onChange={() => toggleProduct(product?.id)}
                          />
                          <span className={styles.checkboxCustom} />
                        </label>

                        <div className={styles.productImageWrap}>
                          {product?.thumbnail ? (
                            <Image
                              src={product?.thumbnail}
                              alt={product?.name}
                              width={72}
                              height={72}
                              className={styles.productImage}
                            />
                          ) : (
                            <div className={styles.productImagePlaceholder} />
                          )}
                        </div>

                        <span className={styles.productName}>{product?.name}</span>
                        <div className={styles.productPrice}>
                          {hasDiscount && (
                            <span className={styles.oldPrice}>
                              ₹ {product?.price?.toLocaleString("en-IN")}
                            </span>
                          )}
                          <span className={styles.currentPrice}>
                            ₹ {product?.sellingPrice?.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className={styles.summary}>
                  <p className={styles.totalLabel}>Total price:</p>
                  <div className={styles.totalPrices}>
                    <span className={styles.totalCurrent}>
                      ₹ {originalTotal.toLocaleString("en-IN", {})}
                    </span>
                  </div>
                  <button
                    type="button"
                    className={styles.addToCartBtn}
                    onClick={handleAddToCart}
                    disabled={isLoading || !selectedProducts.length}
                  >
                    ADD TO CART
                    <MdOutlineKeyboardArrowRight className={styles.btnIcon} />
                  </button>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrequentlyBought;
