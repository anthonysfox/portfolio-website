"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import FoxMark from "@/components/FoxMark";

const links = [
  { href: "/#code", label: "Code" },
  { href: "/#about", label: "About" },
  { href: "/renders", label: "Renders" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="nav"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background 0.4s",
        background: scrolled ? "rgba(19,15,11,0.80)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
      }}
    >
      {/* Soft scroll-edge fade instead of a hard divider — only where the floating nav actually overlaps content */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          height: 20,
          pointerEvents: "none",
          background: "linear-gradient(to bottom, rgba(19,15,11,0.5), transparent)",
          opacity: scrolled ? 1 : 0,
          transition: "opacity 0.4s",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1220,
          margin: "0 auto",
          padding: "0 26px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 68,
        }}
      >
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            fontWeight: 600,
            fontSize: 15,
            letterSpacing: "-0.01em",
          }}
        >
          <FoxMark size={26} />
          Anthony Fox
        </a>

        {/* Desktop links */}
        <nav
          style={{
            display: "flex",
            gap: 30,
            alignItems: "center",
          }}
          className="hide-mobile"
        >
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
          <a href="/#contact" className="nav-cta">
            Get in touch
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="show-mobile"
          style={{
            background: "none",
            border: "none",
            color: "var(--cream)",
            fontSize: 14,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {open ? "close" : "menu"}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ type: "spring", bounce: 0, duration: reduce ? 0.15 : 0.35 }}
            style={{
              overflow: "hidden",
              borderTop: "1px solid var(--line-soft)",
              background: "rgba(19,15,11,0.95)",
              backdropFilter: "blur(14px)",
            }}
          >
            <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 26px" }}>
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="nav-link-mobile"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="nav-cta-mobile"
              >
                Get in touch ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }

        .nav-link {
          font-size: 14px;
          font-weight: 500;
          color: var(--cream);
          opacity: 0.75;
          letter-spacing: 0.03em;
          transition: opacity 0.25s;
        }
        .nav-link:hover,
        .nav-link:focus-visible {
          opacity: 1;
        }

        .nav-cta {
          display: inline-flex;
          background: var(--amber);
          color: var(--ink);
          padding: 8px 20px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .nav-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(239, 111, 52, 0.32);
        }
        .nav-cta:active {
          transform: scale(0.97);
          box-shadow: 0 4px 14px rgba(239, 111, 52, 0.28);
          transition-duration: 0.1s;
        }

        .nav-link-mobile {
          display: block;
          padding: 14px 0;
          border-bottom: 1px solid var(--line-soft);
          font-size: 16px;
          color: var(--muted);
          transition: color 0.2s;
        }
        .nav-link-mobile:active {
          color: var(--cream);
        }

        .nav-cta-mobile {
          display: block;
          padding: 14px 0;
          font-size: 16px;
          color: var(--amber);
          font-weight: 600;
          margin-top: 4px;
          transition: opacity 0.15s;
        }
        .nav-cta-mobile:active {
          opacity: 0.7;
        }
      `}</style>
    </header>
  );
}
