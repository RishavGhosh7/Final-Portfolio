import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { profile } from "../data/profile.js";
import { ease } from "./motion.js";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/projects", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const liquidSpring = { type: "spring", stiffness: 380, damping: 28, mass: 0.7 };

function isActivePath(pathname, link) {
  if (link.end) return pathname === link.to;
  return pathname === link.to || pathname.startsWith(`${link.to}/`);
}

function LiquidNav({ pathname }) {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef(null);
  const itemRefs = useRef([]);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [pill, setPill] = useState({ x: 0, width: 0, ready: false });

  const activeIndex = Math.max(
    0,
    links.findIndex((link) => isActivePath(pathname, link)),
  );
  const targetIndex = hoverIndex ?? activeIndex;

  useLayoutEffect(() => {
    const track = trackRef.current;
    const item = itemRefs.current[targetIndex];
    if (!track || !item) return undefined;

    const update = () => {
      const trackBox = track.getBoundingClientRect();
      const itemBox = item.getBoundingClientRect();
      setPill({
        x: itemBox.left - trackBox.left,
        width: itemBox.width,
        ready: true,
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [targetIndex, pathname]);

  return (
    <nav
      className="nav-desktop"
      aria-label="Primary"
      ref={trackRef}
      onMouseLeave={() => setHoverIndex(null)}
    >
      <div className="nav-switcher">
        <motion.span
          className="nav-liquid"
          aria-hidden="true"
          initial={false}
          animate={
            pill.ready
              ? {
                  x: pill.x,
                  width: pill.width,
                  opacity: 1,
                  scaleY: hoverIndex !== null && hoverIndex !== activeIndex ? 0.92 : 1,
                }
              : { opacity: 0 }
          }
          transition={reduceMotion ? { duration: 0 } : liquidSpring}
        >
          <span className="nav-liquid-shine" />
        </motion.span>

        {links.map((link, index) => {
          const lit = index === targetIndex;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={`nav-link${lit ? " nav-link-lit" : ""}`}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              onMouseEnter={() => setHoverIndex(index)}
              onFocus={() => setHoverIndex(index)}
              onBlur={() => setHoverIndex(null)}
            >
              <span className="nav-label">{link.label}</span>
            </NavLink>
          );
        })}
      </div>

      <a className="nav-resume" href={profile.resume} download>
        Resume
      </a>
    </nav>
  );
}

export default function Nav() {
  const { pathname } = useLocation();
  const [openOn, setOpenOn] = useState(null);
  const open = openOn === pathname;
  const setOpen = (value) => setOpenOn(value ? pathname : null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpenOn(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link className="wordmark" to="/">
          Rishav Ghosh
        </Link>

        <LayoutGroup>
          <LiquidNav pathname={pathname} />
        </LayoutGroup>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <motion.span
            className="bar"
            animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease }}
          />
          <motion.span
            className="bar"
            animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease }}
          />
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Mobile"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease }}
          >
            <motion.ul
              className="wrap"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
            >
              {links.map((link, i) => (
                <motion.li
                  key={link.to}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                  }}
                >
                  <NavLink to={link.to} end={link.end} className="mobile-link">
                    <span>0{i + 1}</span>
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}
              <motion.li
                className="mobile-extra"
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { duration: 0.5, ease } },
                }}
              >
                <a href={profile.resume} download>
                  Download resume
                </a>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </motion.li>
            </motion.ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
