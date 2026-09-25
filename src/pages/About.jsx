import { motion } from "framer-motion";
import Page from "../components/Page.jsx";
import PageHeader from "../components/PageHeader.jsx";
import Reveal from "../components/Reveal.jsx";
import { riseChild, staggerParent } from "../components/motion.js";
import { achievements, education, leetcodeBadges, profile, skills } from "../data/profile.js";

const leetcode = profile.socials.find((social) => social.label === "LeetCode");

function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function BadgeGroup({ label, badges }) {
  return (
    <div className="badge-group">
      <h4>{label}</h4>
      <motion.ul
        className="badge-list"
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        {badges.map((badge) => (
          <motion.li key={badge.name} variants={riseChild}>
            <motion.img
              src={badge.image}
              alt=""
              width="90"
              height="100"
              loading="lazy"
              whileHover={{ rotate: -6, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            />
            <p className="badge-name">{badge.name}</p>
            <p className="badge-date">{badge.date ? formatDate(badge.date) : badge.note}</p>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

export default function About() {
  return (
    <Page title="About">
      <PageHeader
        eyebrow="About"
        title="Skills and education"
        intro="Full-stack engineer working in Java and JavaScript, currently studying for an MSc in Computer Science at Woolf University."
      />

      <section className="section section-tight" aria-labelledby="education-title">
        <Reveal className="section-head">
          <p className="eyebrow">Education</p>
          <h2 id="education-title">Degrees</h2>
        </Reveal>
        <ol className="schools">
          {education.map((item, i) => (
            <Reveal as="li" key={item.school} delay={i * 0.08} className={i === 0 ? "school-current" : undefined}>
              <p className="year">{item.year}</p>
              <div>
                <p className="credential">
                  {item.credential}
                  {item.status ? <span className="badge">{item.status}</span> : null}
                </p>
                <p className="school">
                  {item.school} · {item.place}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="section" aria-labelledby="skills-title">
        <Reveal className="section-head">
          <p className="eyebrow">Skills</p>
          <h2 id="skills-title">What I build with</h2>
        </Reveal>
        <div className="skill-groups">
          {skills.map((group, i) => (
            <Reveal key={group.label} delay={(i % 2) * 0.08} className="skill-group">
              <h3>{group.label}</h3>
              <motion.ul
                variants={staggerParent}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              >
                {group.items.map((item) => (
                  <motion.li key={item} variants={riseChild}>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="achievements-title">
        <Reveal className="section-head">
          <p className="eyebrow">Achievements</p>
          <h2 id="achievements-title">Along the way</h2>
        </Reveal>
        <ul className="achievements">
          {achievements.map((item, i) => (
            <Reveal as="li" key={item} delay={i * 0.06}>
              {item}
            </Reveal>
          ))}
        </ul>

        <Reveal as="section" className="badges" aria-labelledby="badges-title">
          <div className="badges-head">
            <h3 id="badges-title">LeetCode badges</h3>
            <a className="text-link" href={leetcode.href} target="_blank" rel="noreferrer">
              View profile <span aria-hidden="true">↗</span>
            </a>
          </div>
          <BadgeGroup label="Annual medals" badges={leetcodeBadges.annual} />
          <BadgeGroup label="Daily challenge medals" badges={leetcodeBadges.daily} />
        </Reveal>
      </section>
    </Page>
  );
}
