"use client";

import { useEffect, useState } from "react";
import FoxMark from "@/components/FoxMark";

const links = [
  { href: "#code", label: "Code" },
  { href: "#renders", label: "Renders" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
        transition: "background 0.4s, border-color 0.4s",
        borderBottom: scrolled ? "1px solid var(--line-soft)" : "1px solid transparent",
        background: scrolled ? "rgba(19,15,11,0.80)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
      }}
    >
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
          href="#top"
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
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: 14,
                color: "var(--muted)",
                letterSpacing: "0.02em",
                transition: "color 0.25s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--cream)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--muted)")}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            style={{
              background: "var(--amber)",
              color: "var(--ink)",
              padding: "8px 20px",
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 600,
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(239,111,52,0.32)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "";
              (e.currentTarget as HTMLElement).style.boxShadow = "";
            }}
          >
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
      {open && (
        <div
          style={{
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
                style={{
                  display: "block",
                  padding: "14px 0",
                  borderBottom: "1px solid var(--line-soft)",
                  fontSize: 16,
                  color: "var(--muted)",
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "14px 0",
                fontSize: 16,
                color: "var(--amber)",
                fontWeight: 600,
                marginTop: 4,
              }}
            >
              Get in touch ↗
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
}
