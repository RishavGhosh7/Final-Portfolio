import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router";
import Page from "../components/Page.jsx";
import ProjectRow from "../components/ProjectRow.jsx";
import Reveal from "../components/Reveal.jsx";
import SplitWords from "../components/SplitWords.jsx";
import { ease, riseChild, staggerParent } from "../components/motion.js";
import { education, profile, projects } from "../data/profile.js";

const masters = education[0];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const coverY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const coverOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);

  return (
    <Page>
      <section className="hero" aria-label="Introduction" ref={heroRef}>
        <div className="hero-cover">
          <motion.div className="hero-cover-frame" style={{ y: coverY, opacity: coverOpacity }}>
            <motion.img
              src="/images/rishav-cover.jpg"
              alt="Portrait of Rishav Ghosh"
              width="1024"
              height="820"
              fetchPriority="high"
              initial={{ scale: 1.12, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.6, ease }}
            />
          </motion.div>
        </div>

        <motion.p
          className="hero-kicker"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease }}
        >
          <span>{profile.location}</span>
          <span>{profile.role}</span>
        </motion.p>

        <SplitWords text={profile.name} className="hero-name" italicLast />

        <motion.div className="hero-copy" variants={staggerParent} initial="hidden" animate="show">
          <motion.p className="lead" variants={riseChild}>
            {profile.lead}
          </motion.p>
          <motion.p className="hero-degree" variants={riseChild}>
            <span className="badge">Now</span>
            {masters.credential}, {masters.school.replace(" (ECTS)", "")}, {masters.year}
          </motion.p>
          <motion.div className="hero-actions" variants={riseChild}>
            <Link className="button button-solid" to="/projects">
              View work
            </Link>
            <a className="button" href={profile.resume} download>
              Download resume
            </a>
          </motion.div>
        </motion.div>
      </section>

      <section className="section" aria-labelledby="selected-title">
        <Reveal className="section-head">
          <p className="eyebrow">Selected work</p>
          <h2 id="selected-title">Three systems, shipped end to end.</h2>
        </Reveal>
        <div className="project-rows">
          {projects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} delay={i * 0.06} />
          ))}
        </div>
        <Reveal className="section-foot">
          <Link className="text-link" to="/projects">
            All work, including smaller builds <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </section>

      <section className="section split" aria-labelledby="about-teaser">
        <Reveal>
          <p className="eyebrow">About</p>
          <h2 id="about-teaser">Java and JavaScript on the backend, LLMs where they earn their place.</h2>
        </Reveal>
        <Reveal delay={0.1} className="split-body">
          <p>
            I build with React, Node.js, and Spring Boot, and I reach for Redis, Kafka, and PostgreSQL when a system has
            to stay up. I'm studying for an MSc in Computer Science at Woolf University after a B.Tech from KIIT.
          </p>
          <Link className="text-link" to="/about">
            Skills and education <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </section>
    </Page>
  );
}
