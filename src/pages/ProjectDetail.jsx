import { motion } from "framer-motion";
import { Link, useParams } from "react-router";
import Page from "../components/Page.jsx";
import Reveal from "../components/Reveal.jsx";
import SplitWords from "../components/SplitWords.jsx";
import { ease, riseChild, staggerParent } from "../components/motion.js";
import { projects } from "../data/profile.js";
import NotFound from "./NotFound.jsx";

export default function ProjectDetail() {
  const { slug } = useParams();
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return <NotFound />;

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <Page title={project.title}>
      <header className="page-header">
        <motion.div
          className="detail-top"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease }}
        >
          <Link className="text-link back-link" to="/projects">
            <span aria-hidden="true">←</span> All work
          </Link>
          <p className="eyebrow">
            {project.index} · {project.kicker}
          </p>
        </motion.div>
        <SplitWords text={project.title} className="page-title" />
        <motion.p
          className="page-intro"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
        >
          {project.summary}
        </motion.p>
        <motion.div
          className="detail-links"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.4 }}
        >
          {project.links.map((link, i) => (
            <a
              key={link.href}
              className={i === 0 ? "button button-solid" : "button"}
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </motion.div>
      </header>

      {project.metrics ? (
        <motion.dl className="metrics" variants={staggerParent} initial="hidden" animate="show">
          {project.metrics.map((metric) => (
            <motion.div key={metric.label} variants={riseChild}>
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
            </motion.div>
          ))}
        </motion.dl>
      ) : null}

      <section className="detail-sections" aria-label="Case study">
        {project.sections.map((item, i) => (
          <Reveal as="article" className="detail-section" key={item.heading}>
            <p className="detail-num">0{i + 1}</p>
            <div>
              <h2>{item.heading}</h2>
              <p>{item.body}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <Reveal as="section" className="detail-stack" aria-label="Stack">
        <p className="eyebrow">Stack</p>
        <p className="stack">
          {project.stack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </p>
      </Reveal>

      <Reveal as="nav" className="next-project" aria-label="Next project">
        <Link to={`/projects/${next.slug}`}>
          <span className="eyebrow">Next project</span>
          <span className="next-title">
            {next.title} <span aria-hidden="true">→</span>
          </span>
        </Link>
      </Reveal>
    </Page>
  );
}
