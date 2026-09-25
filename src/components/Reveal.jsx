import { motion } from "framer-motion";
import { ease } from "./motion.js";

export default function Reveal({ as = "div", delay = 0, y = 32, children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
