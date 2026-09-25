import { motion } from "framer-motion";
import { ease } from "./motion.js";
import SplitWords from "./SplitWords.jsx";

export default function PageHeader({ eyebrow, title, intro }) {
  return (
    <header className="page-header">
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease }}
      >
        {eyebrow}
      </motion.p>
      <SplitWords text={title} className="page-title" />
      {intro ? (
        <motion.p
          className="page-intro"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
        >
          {intro}
        </motion.p>
      ) : null}
    </header>
  );
}
