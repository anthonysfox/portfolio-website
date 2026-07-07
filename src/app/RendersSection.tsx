import RendersGallery from "@/components/RendersGallery";
import Reveal from "@/components/Reveal";
import { RENDERS } from "@/config/renders";
import styles from "./page.module.css";

const SECTION_PAD = "clamp(64px, 9vh, 96px) 0";

export default function RendersSection() {
  return (
    <section id="renders" className={styles.rendersSection}>
      <div className={`${styles.wrap} ${styles.rendersHeader}`}>
        <Reveal>
          <div className="sec-head">
            <span className="eyebrow">3D / Blender</span>
            <h2>Scenes I&apos;ve built in Blender.</h2>
            <p>
              Each one modeled, lit, and rendered from scratch. Click any scene
              to play it.
            </p>
          </div>
        </Reveal>
      </div>

      <RendersGallery renders={RENDERS} />
    </section>
  );
}
