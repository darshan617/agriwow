import React from "react";
import styles from "./CustomPopup.module.css";
import { IoClose } from "react-icons/io5";
import { createPortal } from "react-dom";

const CustomPopup = ({ onclose = () => {}, wide = false, children }) => {
  return createPortal(
    <div className={styles.root}>
      <div className={styles.overlay} onClick={onclose}>
        <div
          className={`${styles.popup} ${wide ? styles.popupWide : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          <button
             onClick={() => {
              console.log("Close clicked");
              onclose();
            }}
            
            className={styles.closeBtn}
          >
            <IoClose size={20} color="#555" />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default CustomPopup;
