"use client";

import React, { useEffect, useState } from "react";
import styles from "./CustomPopup.module.css";
import { IoClose } from "react-icons/io5";
import { createPortal } from "react-dom";

const CustomPopup = ({
  onclose = () => {},
  children,
  wide = false,
  closeIcon = true,
  maxWidth = "500px",
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return undefined;

    const scrollY = window.scrollY;
    const prevOverflow = document.body.style.overflow;
    const prevPosition = document.body.style.position;
    const prevTop = document.body.style.top;
    const prevWidth = document.body.style.width;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.position = prevPosition;
      document.body.style.top = prevTop;
      document.body.style.width = prevWidth;
      window.scrollTo(0, scrollY);
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <div className={styles.root}>
      <div className={styles.overlay} onClick={onclose}>
        <div
          className={`${styles.popup} ${wide ? styles.popupWide : ""} `}
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: maxWidth }}
        >
          {children}
          {closeIcon && (
            <button
              onClick={() => {
                console.log("Close clicked");
                onclose();
              }}
              className={styles.closeBtn}
            >
              <IoClose size={20} color="#555" />
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default CustomPopup;
