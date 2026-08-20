import Reveal from "@/components/Reveal";
import TypedRole from "@/components/TypedRole";
import FoxScene from "@/components/FoxScene";
import styles from "./page.module.css";

export default function HeroSection() {
  return (
    <header id="top" className={styles.heroHeader}>
      <div className={`${styles.wrap} ${styles.heroWrap}`}>
        <div className={styles.heroGrid}>
          <div>
            <Reveal>
              <span className="eyebrow">Building AI-powered web apps</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1
                style={{
                  fontSize: "clamp(40px,7vw,92px)",
                  fontWeight: 700,
                  letterSpacing: "-0.035em",
                  lineHeight: 1.02,
                  margin: "22px 0 26px",
                }}
              >
                Full-stack software <TypedRole />
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p
                style={{
                  color: "var(--muted)",
                  maxWidth: 620,
                  marginBottom: 28,
                  fontSize: "clamp(16px,1.4vw,19px)",
                }}
              >
                Six years of experience shipping production web apps and,
                lately, AI-powered features. For fun, I mess around in
                Blender building glowing little 3D worlds.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  marginBottom: 36,
                  fontSize: 14,
                  color: "var(--muted)",
                }}
              >
                <span>
                  ◆ Based in{" "}
                  <strong style={{ color: "var(--cream)" }}>New Jersey</strong>
                </span>
                <span>
                  ◆{" "}
                  <strong style={{ color: "var(--cream)" }}>
                    Open to work
                  </strong>
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <a href="#code" className="btn primary">
                  See my projects ↗
                </a>
                <a href="#renders" className="btn ghost">
                  See the renders ↗
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} y={32}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "min(78%, 400px)",
                  aspectRatio: "1 / 1",
                  borderRadius: "50%",
                  padding: "5px",
                  background:
                    "conic-gradient(from 180deg, var(--amber), var(--amber-deep), var(--cream), var(--amber))",
                  boxShadow:
                    "0 0 40px -12px rgba(239, 111, 52, 0.4), 0 0 90px -24px rgba(193, 74, 28, 0.3)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    overflow: "hidden",
                    background:
                      "radial-gradient(circle at 50% 42%, #3a1f10 0%, var(--ink-2) 75%)",
                  }}
                >
                  <FoxScene />
                </div>
              </div>
              <span
                style={{ fontSize: 13, color: "var(--muted)", letterSpacing: "0.02em" }}
              >
                Side project — modeled in Blender · move your cursor
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </header>
  );
}
