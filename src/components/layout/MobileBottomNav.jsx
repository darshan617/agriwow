import Link from "next/link";
import { useSelector } from "react-redux";
import { FiGrid, FiHeart, FiHome, FiShoppingCart, FiUser } from "react-icons/fi";
import { useLoginPopup } from "@/custom-hooks/login-popup/LoginPopupProvider";
import styles from "@/components/layout/MobileBottomNav.module.css";

const MobileBottomNav = () => {
  const categories = useSelector((state) => state.category.categories);
  const { isLoggedIn, openLoginPopup } = useLoginPopup();
  const firstCategorySlug = categories?.[0]?.slug || "agriculture-sprayers";

  return (
    <>
      <nav className={styles.bottomNav} aria-label="Mobile navigation">
        <Link href="/" className={`${styles.navItem} ${styles.active}`}>
          <FiHome aria-hidden="true" />
          <span>Home</span>
        </Link>
        <Link
          href={`/product-category/${firstCategorySlug}`}
          className={styles.navItem}
        >
          <FiGrid aria-hidden="true" />
          <span>Categories</span>
        </Link>
        {isLoggedIn ? (
          <Link href="/my-profile" className={styles.navItem}>
            <FiUser aria-hidden="true" />
            <span>Profile</span>
          </Link>
        ) : (
          <button
            type="button"
            className={styles.navItem}
            onClick={openLoginPopup}
          >
            <FiUser aria-hidden="true" />
            <span>Profile</span>
          </button>
        )}
        <Link href="/wishlist" className={styles.navItem}>
          <FiHeart aria-hidden="true" />
          <span>Wishlist</span>
        </Link>
        <Link href="/cart" className={styles.navItem}>
          <FiShoppingCart aria-hidden="true" />
          <span>Cart</span>
        </Link>
      </nav>
      <div className={styles.bottomNavSpacer} aria-hidden="true" />
    </>
  );
};

export default MobileBottomNav;
