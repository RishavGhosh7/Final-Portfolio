import { Link } from "react-router";
import { profile } from "../data/profile.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div>
          <p className="footer-title">Have a role or project in mind?</p>
          <Link className="footer-cta" to="/contact">
            Get in touch <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ul className="footer-links">
          {profile.socials.map((social) => (
            <li key={social.label}>
              <a href={social.href} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="footer-meta">
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
      </div>
    </footer>
  );
}
