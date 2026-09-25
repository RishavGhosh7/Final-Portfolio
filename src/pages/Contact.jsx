import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Page from "../components/Page.jsx";
import PageHeader from "../components/PageHeader.jsx";
import Reveal from "../components/Reveal.jsx";
import { ease } from "../components/motion.js";
import { profile } from "../data/profile.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Add your name.";
  if (!values.email.trim()) errors.email = "Add your email.";
  else if (!emailPattern.test(values.email)) errors.email = "That email doesn't look right.";
  if (!values.message.trim()) errors.message = "Add a short message.";
  return errors;
}

function Field({ id, label, error, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      <AnimatePresence>
        {error ? (
          <motion.p
            id={`${id}-error`}
            className="field-error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease }}
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const update = (key) => (event) => setValues((current) => ({ ...current, [key]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    const subject = encodeURIComponent(`Portfolio message from ${values.name}`);
    const body = encodeURIComponent(`${values.message}\n\n${values.name}\n${values.email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const describe = (key) => (errors[key] ? `${key}-error` : undefined);

  return (
    <Page title="Contact">
      <PageHeader
        eyebrow="Contact"
        title="Let's talk"
        intro="Open to software engineering roles and AI product work. Write directly or use the form, which opens your email app."
      />

      <div className="contact-grid">
        <Reveal className="contact-direct">
          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <ul className="contact-list">
            <li>
              <span>Phone</span>
              <a href={profile.phoneHref}>{profile.phone}</a>
            </li>
            <li>
              <span>Based in</span>
              {profile.location}
            </li>
            <li>
              <span>Resume</span>
              <a href={profile.resume} download>
                Download PDF
              </a>
            </li>
            {profile.socials.map((social) => (
              <li key={social.label}>
                <span>{social.label}</span>
                <a href={social.href} target="_blank" rel="noreferrer">
                  {social.href.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, "")}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="form" className="contact-form" delay={0.1} onSubmit={submit} noValidate>
          <Field id="contact-name" label="Name" error={errors.name}>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={update("name")}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={describe("name")}
            />
          </Field>
          <Field id="contact-email" label="Email" error={errors.email}>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={update("email")}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describe("email")}
            />
          </Field>
          <Field id="contact-message" label="Message" error={errors.message}>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              value={values.message}
              onChange={update("message")}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={describe("message")}
            />
          </Field>
          <motion.button
            type="submit"
            className="button button-solid"
            whileTap={{ scale: 0.97 }}
          >
            Send message
          </motion.button>
        </Reveal>
      </div>
    </Page>
  );
}
