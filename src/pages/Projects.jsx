import { motion } from "framer-motion";
import Page from "../components/Page.jsx";
import PageHeader from "../components/PageHeader.jsx";
import ProjectRow from "../components/ProjectRow.jsx";
import Reveal from "../components/Reveal.jsx";
import { otherProjects, projects } from "../data/profile.js";

export default function Projects() {
  return (
    <Page title="Work">
      <PageHeader
        eyebrow="Work"
        title="Selected projects"
        intro="Three AI systems written up as case studies, then the smaller builds that taught me the pieces."
      />

      <section className="section section-tight" aria-label="Case studies">
        <div className="project-rows">
          {projects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} delay={i * 0.06} />
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="more-title">
        <Reveal className="section-head">
          <p className="eyebrow">More builds</p>
          <h2 id="more-title">Smaller projects</h2>
        </Reveal>
        <ul className="build-grid">
          {otherProjects.map((item, i) => (
            <Reveal as="li" key={item.title} delay={(i % 2) * 0.08}>
              <motion.a
                className="build-card"
                href={item.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
              >
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p className="stack">
                  {item.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </p>
                <span className="build-link">
                  {item.linkLabel} <span aria-hidden="true">↗</span>
                </span>
              </motion.a>
            </Reveal>
          ))}
        </ul>
      </section>
    </Page>
  );
}
