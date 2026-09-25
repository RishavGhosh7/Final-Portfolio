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

const emptyForm = { name: "", email: "", message: "" };

async function sendMessage(values, honey) {
  const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
      _subject: `Portfolio message from ${values.name.trim()}`,
      _replyto: values.email.trim(),
      _template: "table",
      _captcha: "false",
      _honey: honey,
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || String(data.success) !== "true") {
    throw new Error(data.message || `Request failed with ${response.status}`);
  }
}

export default function Contact() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [honey, setHoney] = useState("");

  const update = (key) => (event) => setValues((current) => ({ ...current, [key]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus("sending");
    try {
      await sendMessage(values, honey);
      setValues(emptyForm);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const mailtoFallback = `mailto:${profile.email}?subject=${encodeURIComponent(
    `Portfolio message from ${values.name}`,
  )}&body=${encodeURIComponent(`${values.message}\n\n${values.name}\n${values.email}`)}`;

  const describe = (key) => (errors[key] ? `${key}-error` : undefined);

  return (
    <Page title="Contact">
      <PageHeader
        eyebrow="Contact"
        title="Let's talk"
        intro="Open to software engineering roles and AI product work. Email me directly or send a message with the form."
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
          <div className="form-honey" aria-hidden="true">
            <label htmlFor="contact-company">Company</label>
            <input
              id="contact-company"
              name="_honey"
              tabIndex={-1}
              autoComplete="off"
              value={honey}
              onChange={(event) => setHoney(event.target.value)}
            />
          </div>
          <motion.button
            type="submit"
            className="button button-solid"
            whileTap={{ scale: 0.97 }}
            disabled={status === "sending"}
            aria-busy={status === "sending"}
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </motion.button>
          <div className="form-status" role="status" aria-live="polite">
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.p
                  key="sent"
                  className="form-sent"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease }}
                >
                  Thanks, your message is on its way. I'll reply to the email you gave.
                </motion.p>
              ) : null}
              {status === "error" ? (
                <motion.p
                  key="error"
                  className="field-error"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease }}
                >
                  The message didn't send. Try again, or <a href={mailtoFallback}>email me directly</a>.
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </Page>
  );
}
