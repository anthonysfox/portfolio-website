import Reveal from "@/components/Reveal";
import HeroRender from "@/components/HeroRender";
import { HERO_RENDER } from "@/config/renders";
import styles from "./page.module.css";

export default function HeroSection() {
  return (
    <header id="top" className={styles.heroHeader}>
      <div className={`${styles.wrap} ${styles.heroWrap}`}>
        <div className={styles.heroGrid}>
          {/* Left column */}
          <div>
            <Reveal>
              <span className="eyebrow">Full-stack developer · New Jersey</span>
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
                From structured systems to{" "}
                <span style={{ color: "var(--amber)", fontStyle: "italic" }}>
                  rendered realities
                </span>
                .
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p
                style={{
                  color: "var(--muted)",
                  maxWidth: 480,
                  marginBottom: 28,
                  fontSize: "clamp(16px,1.4vw,19px)",
                }}
              >
                Full-stack developer with six years of experience shipping web
                apps. Off the clock, I&apos;m usually in Blender building small,
                glowing worlds.
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

          {/* Right column — showcase render */}
          <Reveal delay={0.2} y={32}>
            <HeroRender {...HERO_RENDER} />
          </Reveal>
        </div>
      </div>
    </header>
  );
}
