import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { profile } from "../data/profile.js";

const links = [
  {
    to: "/",
    label: "Home",
    end: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 11.5 12 4.5l8 7V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" />
      </svg>
    ),
  },
  {
    to: "/projects",
    label: "Work",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="7.5" width="17" height="12" rx="2" />
        <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5" />
      </svg>
    ),
  },
  {
    to: "/about",
    label: "About",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8" r="3.25" />
        <path d="M5.5 19.5a6.5 6.5 0 0 1 13 0" />
      </svg>
    ),
  },
  {
    to: "/contact",
    label: "Contact",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
        <path d="m5.5 8 5.7 3.8a1.5 1.5 0 0 0 1.6 0L18.5 8" />
      </svg>
    ),
  },
];

const liquidSpring = { type: "spring", stiffness: 420, damping: 26, mass: 0.65 };
const scrubSpring = { type: "spring", stiffness: 520, damping: 32, mass: 0.55 };

function isActivePath(pathname, link) {
  if (link.end) return pathname === link.to;
  return pathname === link.to || pathname.startsWith(`${link.to}/`);
}

function indexFromPoint(itemRefs, clientX) {
  let nearest = 0;
  let nearestDist = Number.POSITIVE_INFINITY;

  for (let i = 0; i < itemRefs.current.length; i += 1) {
    const node = itemRefs.current[i];
    if (!node) continue;
    const box = node.getBoundingClientRect();
    if (clientX >= box.left && clientX <= box.right) return i;
    const mid = box.left + box.width / 2;
    const dist = Math.abs(clientX - mid);
    if (dist < nearestDist) {
      nearestDist = dist;
      nearest = i;
    }
  }

  return nearest;
}

function LiquidSwitcher({
  pathname,
  className,
  ariaLabel,
  showIcons = false,
  enableHover = true,
  enableScrub = false,
}) {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const trackRef = useRef(null);
  const switcherRef = useRef(null);
  const itemRefs = useRef([]);
  const scrubbingRef = useRef(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [scrubIndex, setScrubIndex] = useState(null);
  const [pressed, setPressed] = useState(false);
  const [pill, setPill] = useState({ x: 0, width: 0, ready: false });

  const activeIndex = Math.max(
    0,
    links.findIndex((link) => isActivePath(pathname, link)),
  );
  const targetIndex = scrubIndex ?? (enableHover ? (hoverIndex ?? activeIndex) : activeIndex);
  const sliding = scrubIndex !== null || (enableHover && hoverIndex !== null && hoverIndex !== activeIndex);

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
  }, [targetIndex, pathname, showIcons]);

  const beginScrub = (event) => {
    if (!enableScrub || event.pointerType === "mouse") return;
    scrubbingRef.current = true;
    setPressed(true);
    const next = indexFromPoint(itemRefs, event.clientX);
    setScrubIndex(next);
    switcherRef.current?.setPointerCapture?.(event.pointerId);
  };

  const moveScrub = (event) => {
    if (!enableScrub || !scrubbingRef.current) return;
    const next = indexFromPoint(itemRefs, event.clientX);
    setScrubIndex((current) => (current === next ? current : next));
  };

  const endScrub = (event) => {
    if (!enableScrub || !scrubbingRef.current) return;
    scrubbingRef.current = false;
    setPressed(false);
    const next = indexFromPoint(itemRefs, event.clientX);
    setScrubIndex(null);
    if (switcherRef.current?.hasPointerCapture?.(event.pointerId)) {
      switcherRef.current.releasePointerCapture(event.pointerId);
    }
    const destination = links[next];
    if (destination && !isActivePath(pathname, destination)) {
      navigate(destination.to);
    }
  };

  return (
    <nav
      className={className}
      aria-label={ariaLabel}
      ref={trackRef}
      onMouseLeave={enableHover ? () => setHoverIndex(null) : undefined}
    >
      <div
        className={`nav-switcher${enableScrub ? " nav-switcher-scrub" : ""}${pressed ? " is-pressed" : ""}`}
        ref={switcherRef}
        onPointerDown={beginScrub}
        onPointerMove={moveScrub}
        onPointerUp={endScrub}
        onPointerCancel={endScrub}
      >
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
                  scaleY: pressed ? 0.9 : sliding ? 0.94 : 1,
                  scaleX: pressed ? 1.04 : 1,
                }
              : { opacity: 0 }
          }
          transition={reduceMotion ? { duration: 0 } : pressed || scrubIndex !== null ? scrubSpring : liquidSpring}
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
              onMouseEnter={enableHover ? () => setHoverIndex(index) : undefined}
              onFocus={enableHover ? () => setHoverIndex(index) : undefined}
              onBlur={enableHover ? () => setHoverIndex(null) : undefined}
              onClick={(event) => {
                if (enableScrub && event.pointerType !== "mouse") {
                  // Navigation is handled by the scrub gesture on touch.
                  event.preventDefault();
                }
              }}
            >
              {showIcons ? <span className="nav-icon">{link.icon}</span> : null}
              <span className="nav-label">{link.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export default function Nav() {
  const { pathname } = useLocation();

  return (
    <>
      <header className="nav">
        <div className="wrap nav-inner">
          <Link className="wordmark" to="/">
            Rishav Ghosh
          </Link>

          <LayoutGroup id="desktop-nav">
            <div className="nav-desktop-wrap">
              <LiquidSwitcher
                pathname={pathname}
                className="nav-desktop"
                ariaLabel="Primary"
                enableHover
              />
              <a className="nav-resume" href={profile.resume} download>
                Resume
              </a>
            </div>
          </LayoutGroup>

          <a className="nav-resume nav-resume-mobile" href={profile.resume} download>
            Resume
          </a>
        </div>
      </header>

      <LayoutGroup id="mobile-nav">
        <div className="nav-dock">
          <LiquidSwitcher
            pathname={pathname}
            className="nav-mobile"
            ariaLabel="Primary"
            showIcons
            enableHover={false}
            enableScrub
          />
        </div>
      </LayoutGroup>
    </>
  );
}
