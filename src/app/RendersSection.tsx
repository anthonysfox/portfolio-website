import RendersStrip from "@/components/RendersStrip";
import Reveal from "@/components/Reveal";
import { RENDERS } from "@/config/renders";
import styles from "./page.module.css";

export default function RendersSection() {
  return (
    <section id="renders" className={styles.rendersSection}>
      <div className={`${styles.wrap} ${styles.rendersHeader}`}>
        <Reveal>
          <div className="sec-head">
            <span className="eyebrow">Side project · Blender</span>
            <h2>Scenes I&apos;ve built for fun.</h2>
            <p>
              Outside of engineering, I model, light, and render these
              scenes from scratch.
            </p>
          </div>
        </Reveal>
      </div>

      <RendersStrip renders={RENDERS} limit={4} />
    </section>
  );
}
