import { getRepos } from "@/lib/github";
import { FEATURED } from "@/config/featured";
import { HERO_RENDER, RENDERS } from "@/config/renders";
import RendersGallery from "@/components/RendersGallery";
import Reveal from "@/components/Reveal";
import HeroRender from "@/components/HeroRender";

// Vertical rhythm between sections. Kept airy but not cavernous — note this is
// top AND bottom, so the gap between two sections is roughly double this.
const SECTION_PAD = "clamp(64px, 9vh, 96px) 0";
const wrap: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  maxWidth: 1220,
  margin: "0 auto",
  padding: "0 26px",
};

export default async function Home() {
  const repos = await getRepos();
  const byName = new Map(repos.map((r) => [r.name, r]));

  return (
    <main style={{ position: "relative", zIndex: 1 }}>
      {/* ===== HERO ===== */}
      <header
        id="top"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "140px 0 90px",
        }}
      >
        <div style={{ ...wrap, width: "100%" }}>
          <div className="hero-grid">
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
                  Full-stack developer with six years of experience shipping web apps. Off the
                  clock, I&apos;m usually in Blender building small, glowing worlds.
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
                  <span>◆ Based in <strong style={{ color: "var(--cream)" }}>New Jersey</strong></span>
                  <span>◆ <strong style={{ color: "var(--cream)" }}>Open to work</strong></span>
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

      {/* ===== CODE ===== */}
      <section id="code" style={{ padding: SECTION_PAD, position: "relative" }}>
        <div style={wrap}>
          <Reveal>
            <div className="sec-head" style={{ marginBottom: 56 }}>
              <span className="eyebrow">Projects</span>
              <h2>Things I&apos;ve built.</h2>
              <p>A few personal projects — including the site you&apos;re looking at.</p>
            </div>
          </Reveal>

          <div className="code-grid">
            {FEATURED.map((f, i) => {
              const live = byName.get(f.repo);
              const repoUrl = live?.html_url ?? `https://github.com/anthonysfox/${f.repo}`;
              const demoUrl = f.demo ?? live?.homepage;

              return (
                <Reveal key={f.repo} delay={i * 0.1} style={{ height: "100%" }}>
                  <div className="panel">
                    <div className="panel-bar">
                      <span className="lights">
                        <i />
                        <i />
                        <i />
                      </span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}>
                        ~/projects/{f.repo}
                      </span>
                    </div>
                    <div className="panel-body">
                      <div
                        style={{
                          fontSize: 20,
                          fontWeight: 600,
                          marginBottom: 10,
                          color: "var(--cream)",
                        }}
                      >
                        {f.title}
                      </div>
                      <p
                        style={{
                          color: "var(--muted)",
                          fontSize: 15,
                          lineHeight: 1.6,
                          marginBottom: 16,
                        }}
                      >
                        {f.blurb}
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                        {f.tags.map((t) => (
                          <span key={t} className="tag">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: 20, fontSize: 14 }}>
                        <a
                          href={repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "var(--amber)",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          Source ↗
                        </a>
                        {demoUrl && (
                          <a
                            href={demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "var(--muted)",
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            Live site ↗
                          </a>
                        )}
                      </div>
                      {live && (
                        <div
                          style={{
                            marginTop: 16,
                            paddingTop: 16,
                            borderTop: "1px solid var(--line-soft)",
                            display: "flex",
                            gap: 16,
                            fontSize: 12,
                            color: "var(--muted-2)",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {live.language && <span>{live.language}</span>}
                          <span>★ {live.stargazers_count}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== RENDERS ===== */}
      <section id="renders" style={{ padding: SECTION_PAD, position: "relative" }}>
        <div style={{ ...wrap, marginBottom: 56 }}>
          <Reveal>
            <div className="sec-head">
              <span className="eyebrow">3D / Blender</span>
              <h2>Scenes I&apos;ve built in Blender.</h2>
              <p>Each one modeled, lit, and rendered from scratch. Click any scene to play it.</p>
            </div>
          </Reveal>
        </div>

        <RendersGallery renders={RENDERS} />
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" style={{ padding: SECTION_PAD, position: "relative" }}>
        <div style={wrap}>
          <Reveal>
            <div style={{ maxWidth: 760 }}>
              <span className="eyebrow">About</span>
              <h2
                style={{
                  fontSize: "clamp(30px,4.5vw,52px)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  margin: "18px 0 26px",
                  lineHeight: 1.08,
                }}
              >
                A bit{" "}
                <span style={{ color: "var(--amber)", fontStyle: "italic" }}>about me.</span>
              </h2>
              {[
                "Hi, I'm Anthony Fox — a full-stack software engineer with over six years of experience building and modernizing enterprise web applications. My work lives mostly in production: full-stack systems and REST APIs that hold up under real use. I enjoy solving complex architectural problems just as much as sweating the details of a seamless user experience — usually with React, TypeScript, Node.js, and AWS.",
                "When I'm not writing code, I'm rendering digital worlds. Using Blender and Unreal Engine 5, I explore the intersection of nature, architecture, and technology — from tranquil, sunlit forest gardens to atmospheric sci-fi monoliths. It's where technical precision meets pure creative exploration. This site brings both passions together: the logic of code and the beauty of rendered environments.",
                "Outside my digital workspaces, you'll usually find me turning laps on my sim racing rig, piecing together an intricate LEGO set, or heading into the city to catch a Broadway show.",
                "Thanks for stopping by — feel free to explore the projects and renders!",
              ].map((para, i) => (
                <p
                  key={i}
                  style={{
                    color: "var(--muted)",
                    marginBottom: 16,
                    fontSize: "clamp(16px,1.3vw,18px)",
                    lineHeight: 1.7,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="stacks" style={{ maxWidth: 760, marginTop: 44 }}>
              <div className="stack">
                <h4
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--amber)",
                    marginBottom: 16,
                  }}
                >
                  Engineering
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {[
                    "TypeScript / JS",
                    "React · Next.js",
                    "Node.js",
                    "REST APIs",
                    "PostgreSQL · Prisma",
                    "PHP · Laravel",
                    "AWS",
                    "Tailwind CSS",
                  ].map((s) => (
                    <li
                      key={s}
                      style={{
                        color: "var(--muted)",
                        padding: "6px 0",
                        borderBottom: "1px solid var(--line-soft)",
                        fontSize: 15,
                      }}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="stack">
                <h4
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--amber)",
                    marginBottom: 16,
                  }}
                >
                  3D &amp; Motion
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {[
                    "Blender",
                    "Unreal Engine 5",
                    "Modeling",
                    "Lighting",
                    "Shading",
                    "Animation",
                    "Compositing",
                  ].map((s) => (
                    <li
                      key={s}
                      style={{
                        color: "var(--muted)",
                        padding: "6px 0",
                        borderBottom: "1px solid var(--line-soft)",
                        fontSize: 15,
                      }}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section
        id="contact"
        style={{ padding: SECTION_PAD, position: "relative", textAlign: "center" }}
      >
        <div style={wrap}>
          <Reveal>
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              Get in touch
            </span>
            <h2
              style={{
                fontSize: "clamp(36px,6vw,80px)",
                fontWeight: 700,
                letterSpacing: "-0.035em",
                margin: "20px 0 18px",
                lineHeight: 1.02,
              }}
            >
              Looking for my{" "}
              <span style={{ color: "var(--amber)", fontStyle: "italic" }}>next role.</span>
            </h2>
            <p
              style={{
                color: "var(--muted)",
                maxWidth: 520,
                margin: "0 auto 40px",
                fontSize: "clamp(16px,1.4vw,19px)",
              }}
            >
              I&apos;m actively looking for full-stack engineering roles. Whether you&apos;re hiring
              or just want to connect, I&apos;d love to hear from you.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="mailto:anthonysfox1@gmail.com" className="btn primary">
                anthonysfox1@gmail.com ↗
              </a>
              <a
                href="https://github.com/anthonysfox"
                target="_blank"
                rel="noopener noreferrer"
                className="btn ghost"
              >
                GitHub ↗
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer
        style={{
          borderTop: "1px solid var(--line-soft)",
          padding: "30px 0",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            ...wrap,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            fontSize: 13,
            color: "var(--muted-2)",
          }}
        >
          <span>© {new Date().getFullYear()} Anthony Fox</span>
          <span>Built with Next.js · Rendered in Blender</span>
        </div>
      </footer>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: center;
        }
        .code-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .stacks {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .code-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 520px) {
          .stacks {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </main>
  );
}
