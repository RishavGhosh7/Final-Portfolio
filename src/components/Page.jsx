import { motion } from "framer-motion";
import { useEffect } from "react";
import { pageVariants } from "./motion.js";

export default function Page({ title, children, className = "" }) {
  useEffect(() => {
    document.title = title ? `${title} · Rishav Ghosh` : "Rishav Ghosh · Software Engineer";
  }, [title]);

  return (
    <motion.div
      className={`page wrap ${className}`}
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
