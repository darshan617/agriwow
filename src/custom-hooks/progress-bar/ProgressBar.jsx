import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ProgressBar() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timer;

    const start = () => {
      setShow(true);
      setProgress(10);

      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + 10;
        });
      }, 200);
    };

    const complete = () => {
      clearInterval(timer);
      setProgress(100);

      setTimeout(() => {
        setShow(false);
        setProgress(0);
      }, 300);
    };

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", complete);
    router.events.on("routeChangeError", complete);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", complete);
      router.events.off("routeChangeError", complete);
      clearInterval(timer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "5px",
        width: `${progress}%`,
        background: "linear-gradient(to right, #f6c417, #8dba3b)",
        transition: "width 0.2s ease",
        zIndex: 9999,
      }}
    />
  );
}
