import Reveal from "@/components/Reveal";
import styles from "./page.module.css";

const SECTION_PAD = "clamp(64px, 9vh, 96px) 0";

const aboutParagraphs = [
  "Hi, I'm Anthony. I'm a full-stack engineer with over six years of experience, focused on building and modernizing web apps. I've spent most of my career working on production-level systems and REST APIs that can handle real-world use. I enjoy the challenge of a tricky architectural problem as much as I love getting the details of a user experience just right. My go-to tools are React, TypeScript, Node.js, and AWS.",
  "When I'm not coding, I'm usually creating digital worlds in Blender and Unreal Engine 5. I love exploring the intersection of nature, architecture, and technology—from sunlit forest gardens to atmospheric sci-fi monoliths. This site is where my two passions meet: the logic of code and the beauty of 3D art.",
  "Outside my digital workspaces, you'll usually find me turning laps on my sim racing rig, piecing together an intricate LEGO set, or heading into the city to catch a Broadway show.",
  "Thanks for stopping by — feel free to explore the projects and renders!",
];

export default function AboutSection() {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.wrap}>
        <Reveal>
          <div className={styles.aboutContent}>
            <span className="eyebrow">About</span>
            <h2 className={styles.aboutH2}>
              A bit{" "}
              <span style={{ color: "var(--amber)", fontStyle: "italic" }}>
                about me.
              </span>
            </h2>
            {aboutParagraphs.map((para, i) => (
              <p key={i} className={styles.aboutP}>
                {para}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className={`${styles.stacks} ${styles.aboutStacks}`}>
            <div className="stack">
              <h4 className={styles.stackTitle}>Engineering</h4>
              <ul className={styles.stackList}>
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
                  <li key={s} className={styles.stackItem}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="stack">
              <h4 className={styles.stackTitle}>3D &amp; Motion</h4>
              <ul className={styles.stackList}>
                {[
                  "Blender",
                  "Unreal Engine 5",
                  "Modeling",
                  "Lighting",
                  "Shading",
                  "Animation",
                  "Compositing",
                ].map((s) => (
                  <li key={s} className={styles.stackItem}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
