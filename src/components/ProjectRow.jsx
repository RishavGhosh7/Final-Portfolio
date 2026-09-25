import { motion } from "framer-motion";
import { Link } from "react-router";
import { ease } from "./motion.js";
import Reveal from "./Reveal.jsx";

export default function ProjectRow({ project, delay = 0 }) {
  return (
    <Reveal as="article" className="project-row" delay={delay}>
      <Link to={`/projects/${project.slug}`} className="project-row-link">
        <motion.div className="project-row-inner" initial="rest" whileHover="hover" animate="rest">
          <p className="project-row-index">
            <span>{project.index}</span>
            <span>{project.kicker}</span>
          </p>
          <div className="project-row-body">
            <h3>{project.title}</h3>
            <p>{project.short}</p>
          </div>
          <motion.span
            className="project-row-arrow"
            aria-hidden="true"
            variants={{ rest: { x: 0, rotate: 0 }, hover: { x: 6, rotate: -45 } }}
            transition={{ duration: 0.35, ease }}
          >
            →
          </motion.span>
          <motion.span
            className="project-row-line"
            aria-hidden="true"
            variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
            transition={{ duration: 0.5, ease }}
          />
        </motion.div>
      </Link>
    </Reveal>
  );
}
