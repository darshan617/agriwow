import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import styles from "./FrequentlyBought.module.css";
import { useAddToCartMutation } from "@/redux/apis/addToCartApi";
import { useToast } from "@/custom-hooks/toast/ToastProvider";
import Link from "next/link";

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
        slug: product?.product_slug ?? product?.slug ?? "",
        thumbnail: getGalleryImageSrc(
          product?.product_thumbnail ?? product?.thumbnail ?? ""),
        price: Number(product?.product_price ?? product?.price ?? 0),
        sellingPrice: Number(
          product?.sellingPrice ?? product?.selling_price ?? 0,
        ),
        quantity: Number(product?.quantity ?? 0),
      }))
      .filter((product) => product.id);
  }, [frequentlyBoughtProducts]);

  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    setSelectedIds((prev) =>
      prev.filter((id) =>
        bundleProducts.some(
          (product) => product.id === id && product.quantity > 0,
        ),
      ),
    );
  }, [bundleProducts]);

  const selectedProducts = bundleProducts.filter(
    (product) => selectedIds.includes(product.id) && product.quantity > 0,
  );

  const originalTotal = selectedProducts.reduce(
    (sum, product) => sum + product.sellingPrice,
    0,
  );

  const toggleProduct = (productId) => {
    const product = bundleProducts.find((item) => item.id === productId);
    if (!product || product.quantity <= 0) return;

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

  if (bundleProducts.length <= 1) return null;

  return (
    <section className="container">
      <div className="row">
        <div className="col-12">
          <div className={styles.frequentlyBought}>
            <div className={styles.frequentlyBoughtCard}>
              <div className={styles.header}>
                <h2 className={styles.title}>Related Accessories</h2>
              </div>

              <div className={styles.content}>
                {bundleProducts?.map((product, index) => {
                  const isChecked = selectedIds.includes(product?.id);
                  const hasDiscount = product?.price > product?.sellingPrice;
                  const isOutOfStock = product?.quantity <= 0;

                  return (
                    <React.Fragment key={product?.id}>
                      <div className={styles.productRow}>
                        <div className={styles.productImageWrap}>
                          <label
                            className={`${styles.checkboxLabel}${
                              isOutOfStock ? ` ${styles.checkboxDisabled}` : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              className={styles.checkbox}
                              checked={isChecked && !isOutOfStock}
                              disabled={isOutOfStock}
                              onChange={() => toggleProduct(product?.id)}
                            />
                            <span className={styles.checkboxCustom} />
                          </label>

                          {product?.thumbnail ?  (
                            <Link href={`/product-details/${product?.slug}`}>
                            <Image
                              src={product?.thumbnail}
                              alt={product?.name}
                              width={140}
                                height={140}
                                className={styles.productImage}
                              />
                            </Link>
                          ) : (
                            <div className={styles.productImagePlaceholder} />
                          )}
                        </div>
                          <Link href={`/product-details/${product?.slug}`}>
                        <span className={styles.productName}>
                          {product?.name}
                        </span>
                        </Link>

                        <div className={styles.productPrice}>
                          {hasDiscount && (
                            <span className={styles.oldPrice}>
                              ₹ {product?.price?.toLocaleString("en-IN")}
                            </span>
                          )}
                          <span className={styles.currentPrice}>
                            ₹ {product?.sellingPrice?.toLocaleString("en-IN")}
                          </span>
                          {isOutOfStock && (
                            <p className={styles.outOfStock}>Out of stock</p>
                          )}
                        </div>
                      </div>

                      {index < bundleProducts.length - 1 && (
                        <span className={styles.plusSeparator} aria-hidden="true">
                          +
                        </span>
                      )}
                    </React.Fragment>
                  );
                })}

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