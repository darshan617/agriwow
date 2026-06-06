import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { FaHeart, FaUserCircle } from "react-icons/fa";
import { HiOutlineMapPin, HiOutlineBriefcase } from "react-icons/hi2";
import { PiPackageThin } from "react-icons/pi";
import { TbBox } from "react-icons/tb";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import coinIcon from "@/assets/icon/coin.png";
import styles from "@/components/wish-list/customer-info/CustomerInfo.module.css";

const MENU_ITEMS = [
  {
    href: "#",
    label: "My Address",
    icon: HiOutlineMapPin,
    matchPath: "/my-address",
  },
  {
    href: "#",
    label: "My Orders",
    icon: PiPackageThin,
    matchPath: "/my-orders",
  },
  {
    href: "/wishlist",
    label: "My Wishlist",
    icon: FaHeart,
    matchPath: "/wishlist",
  },
];

const GUEST_DISPLAY_NAME = "Guest User";

const CustomerInfo = () => {
  const router = useRouter();
  const [displayName, setDisplayName] = useState(GUEST_DISPLAY_NAME);
  const [userInitial, setUserInitial] = useState(
    GUEST_DISPLAY_NAME.charAt(0).toUpperCase(),
  );

  useEffect(() => {
    const raw = Cookies.get("userData");
    if (!raw) return;

    try {
      const userData = JSON.parse(decodeURIComponent(raw));
      const name = userData?.name || GUEST_DISPLAY_NAME;
      setDisplayName(name);
      setUserInitial(name.charAt(0).toUpperCase() || "");
    } catch {
    }
  }, []);



  const isActive = (matchPath) =>
    router.pathname === matchPath || router.asPath === matchPath;

  return (
    <div className="col-xl-3 col-md-12">
      <aside className={styles.sidebar}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li className={styles.breadcrumbSeparator} aria-hidden>
              /
            </li>
            <li className={styles.breadcrumbActive} style={{textTransform: "capitalize"}}>{router.pathname.split("/")?.pop()?.replace("-", " ")}</li>
          </ul>
        </nav>

        <div className={styles.profileCard}>
          <div className={styles.profileAvatar} aria-hidden>    
            {userInitial ? <span>{userInitial}</span> : <FaUserCircle />}
          </div>
          <div className={styles.profileMeta}>
            <p className={styles.profileLabel}>Name</p>
            <p className={styles.profileName}>{displayName}</p>
          </div>
        </div>
        <nav className={styles.navMenu} aria-label="Account navigation">
          <ul className={styles.navList}>
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.matchPath);

              return (
                <li key={item.label} className={styles.navItem}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className={styles.navIcon}>
                      <Icon size={20} />
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default CustomerInfo;
