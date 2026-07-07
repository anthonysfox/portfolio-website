import Reveal from "@/components/Reveal";
import styles from "./page.module.css";

export default function ContactSection() {
  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.wrap}>
        <Reveal>
          <span className={`eyebrow ${styles.contactEyebrow}`}>
            Get in touch
          </span>
          <h2 className={styles.contactH2}>
            Looking for my{" "}
            <span className={styles.amberItalic}>next role.</span>
          </h2>
          <p className={styles.contactP}>
            I&apos;m actively looking for full-stack engineering roles. Whether
            you&apos;re hiring or just want to connect, I&apos;d love to hear
            from you.
          </p>
          <div className={styles.contactActions}>
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
            <a
              href="https://www.linkedin.com/in/anthony-fox1/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn ghost"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://media.anthonyfox.dev/Anthony_Fox_Software_Engineer_Resume.pdf"
              target="_blank"
              className="btn ghost"
            >
              Resume ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
