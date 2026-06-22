import { createContext, useContext, useState } from "react";
import styles from "@/custom-hooks/toast/ToastProvider.module.css";
import {
  IoIosCloseCircleOutline,
  IoMdCheckmarkCircleOutline,
} from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "success") => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className={styles.toastContainer}>
        {toasts.map((toast) => (
          <div
            key={toast?.id}
            className={`${styles.toast} ${styles[toast.type]}`}
          >
            <div>
              {toast?.type === "success" && (
                <IoMdCheckmarkCircleOutline color="white" size={20} />
              )}
              {toast?.type === "error" && (
                <IoIosCloseCircleOutline color="white" size={20} />
              )}{" "}
              {toast?.type === "warning" && <IoWarningOutline size={20} />}{" "}
              <span className={styles.toastMessage}>{toast.message}</span>
            </div>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() =>
                setToasts((prev) => prev.filter((t) => t.id !== toast.id))
              }
            >
              <IoIosCloseCircleOutline color="white" size={20} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
