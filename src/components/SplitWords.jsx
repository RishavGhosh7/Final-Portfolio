import { motion } from "framer-motion";
import { ease } from "./motion.js";

export default function SplitWords({ text, as = "h1", className, italicLast = false, delay = 0 }) {
  const Tag = motion[as];
  const words = text.split(" ");

  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span className="word-mask" aria-hidden="true" key={`${word}-${i}`}>
          <motion.span
            className="word"
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%", transition: { duration: 0.9, ease } },
            }}
          >
            {italicLast && i === words.length - 1 ? <em>{word}</em> : word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
