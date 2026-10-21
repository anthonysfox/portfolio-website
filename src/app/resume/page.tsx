import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import Footer from "@/components/Footer";
import styles from "./resume.module.css";

// Display serif is only used on this page, so it's loaded here rather than in the root layout.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

const RESUME_PDF =
  "https://media.anthonyfox.dev/Anthony_Fox_Software_Engineer_Resume.pdf";

export const metadata: Metadata = {
  title: "Resume — Anthony Fox",
  description:
    "Resume of Anthony Fox, a full-stack software engineer with 6+ years in TypeScript, React, and Node.js.",
};

export default function ResumePage() {
  return (
    <main
      className={fraunces.variable}
      style={{ position: "relative", zIndex: 1 }}
    >
      <article className={styles.sheet}>
        <header className={styles.masthead}>
          <div className={styles.mastheadTop}>
            <h1>Anthony&nbsp;Fox</h1>
            <a
              href={RESUME_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn ghost ${styles.noPrint}`}
              style={{ padding: "10px 22px", fontSize: 14 }}
            >
              Download PDF ↗
            </a>
          </div>
          <p className={styles.role}>Full-stack engineer · Emerson, NJ</p>
          <ul className={styles.contact}>
            <li>
              <a href="mailto:anthonysfox1@gmail.com">anthonysfox1@gmail.com</a>
            </li>
            <li>
              <a
                href="https://github.com/anthonysfox"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/anthonysfox
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/anthony-fox1"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/anthony-fox1
              </a>
            </li>
            <li>
              <a href="https://anthonyfox.dev">anthonyfox.dev</a>
            </li>
          </ul>
        </header>

        <p className={styles.summary}>
          Six years full-stack in TypeScript, React and Node.js. Led a rewrite
          that took two applications serving hundreds of clients from 60+ second
          load times to under 2, and built the dashboard where customers chose
          which AI-detected events on their job sites would notify them, and
          when. Built PlaylistFox end to end, including an MCP server that lets
          an AI agent search, subscribe and trigger syncs against the live app.
        </p>

        <section aria-labelledby="exp">
          <h2 id="exp">Experience</h2>

          <div className={styles.entry}>
            <div className={styles.when}>Jan 2025 &ndash; Jul 2025</div>
            <div className={styles.entryBody}>
              <h3>
                Software Engineer <span className={styles.org}>· EarthCam</span>
              </h3>
              <ul className={styles.points}>
                <li>
                  Led the modernization of two AngularJS applications serving
                  hundreds of clients and thousands of connected cameras,
                  rebuilding them in React and TypeScript and cutting initial
                  load times from 60+ seconds to under 2.
                </li>
                <li>
                  Engineered the alert configuration dashboard used across
                  hundreds of construction projects, where customers set which
                  AI-detected events to track, covering equipment and personnel
                  movement, plus time windows, notification recipients, and
                  upgrade paths into required products.
                </li>
                <li>
                  Built the client-facing interface for a partner integration
                  marketplace, surfacing third-party provider data alongside job
                  site documentation and project records.
                </li>
                <li>
                  Onboarded engineers onto the team&apos;s Laravel services and
                  ramped the wider team onto the newly migrated React and
                  TypeScript codebase.
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.entry}>
            <div className={styles.when}>Jan 2019 &ndash; Jan 2025</div>
            <div className={styles.entryBody}>
              <h3>
                Associate Software Engineer{" "}
                <span className={styles.org}>· EarthCam</span>
              </h3>
              <ul className={styles.points}>
                <li>
                  Delivered the client-facing admin interface for user and
                  access management, giving customer administrators control over
                  user provisioning and per-account permissions across their
                  projects.
                </li>
                <li>
                  Automated routine cross-department workflows with internal
                  tooling, eliminating an estimated 5 hours of recurring work
                  per week.
                </li>
                <li>
                  Overhauled the email templating and delivery system, driving a
                  70% increase in engagement across client communications within
                  three months.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="proj">
          <h2 id="proj">Projects</h2>

          <div className={styles.entry}>
            <div className={styles.when}>2025 &ndash; Present</div>
            <div className={styles.entryBody}>
              <h3>
                PlaylistFox{" "}
                <span className={styles.org}>
                  ·{" "}
                  <a
                    href="https://playlistfox.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    playlistfox.com
                  </a>
                </span>
              </h3>
              <ul className={styles.points}>
                <li>
                  Built a multi-provider playlist subscription platform (Next.js
                  15, React 19, TypeScript, Prisma/PostgreSQL, Clerk) that syncs
                  tracks from subscribed playlists on user-configured schedules,
                  with an in-app AI assistant on the Vercel AI SDK.
                </li>
                <li>
                  Shipped an MCP (Model Context Protocol) server exposing five
                  typed tools with Zod-validated schemas and constant-time
                  bearer authentication, enabling external AI assistants to
                  search, subscribe, and trigger syncs against the application.
                </li>
                <li>
                  Covered the sync engine with unit tests for scheduling and
                  dedupe rules plus integration tests against a disposable
                  PostgreSQL instance verifying constraints and cascading
                  deletes, both running in CI on every push.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="skills">
          <h2 id="skills">Technical skills</h2>
          <div className={styles.skills}>
            {SKILLS.map(([label, list]) => (
              <div key={label} className={styles.skillRow}>
                <div className={styles.skillLabel}>{label}</div>
                <div className={styles.skillList}>{list}</div>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="creds">
          <h2 id="creds">Certifications &amp; education</h2>
          <div className={styles.creds}>
            {CREDENTIALS.map(([when, name, detail]) => (
              <div key={name} className={styles.cred}>
                <div className={styles.when}>{when}</div>
                <div className={styles.credName}>
                  {name} <span>{detail}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <p className={styles.updated}>Updated October 2026</p>
      </article>

      <div className={styles.noPrint}>
        <Footer />
      </div>
    </main>
  );
}

const SKILLS = [
  ["Languages", "TypeScript, JavaScript (ES6+), PHP, Python, SQL, HTML5, CSS3"],
  [
    "Frontend",
    "React, Next.js, Redux, React Hooks, Tailwind CSS, Three.js, responsive design, performance optimization",
  ],
  [
    "Backend",
    "Node.js, Express, NestJS, Laravel, MVC, RESTful API design, authentication, scheduled background jobs",
  ],
  [
    "Data & cloud",
    "PostgreSQL, MySQL, MongoDB, Prisma, schema design, complex SQL, AWS, Docker, Linux",
  ],
  [
    "AI & practices",
    "Model Context Protocol (MCP), LLM tool calling, Vercel AI SDK, Claude Code, Git, Agile/Scrum, CI/CD, unit and integration testing",
  ],
] as const;

const CREDENTIALS = [
  ["2026", "AWS Certified Solutions Architect – Associate", "(SAA-C03)"],
  ["2026", "AWS Certified Cloud Practitioner", "(CLF-C02)"],
  [
    "2026",
    "Certified AWS Cloud Practitioner Solutions Architect",
    "· William Paterson University, NJ",
  ],
  [
    "Dec 2018",
    "BA, Computing and Informatics",
    "· Rowan University, Glassboro, NJ",
  ],
] as const;
