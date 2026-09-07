import type { Metadata } from "next";
import RendersGallery from "@/components/RendersGallery";
import Reveal from "@/components/Reveal";
import ContactSection from "../ContactSection";
import Footer from "@/components/Footer";
import { RENDERS } from "@/config/renders";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Renders — Anthony Fox",
  description:
    "Blender scenes modeled, lit, and rendered from scratch — a side project outside of software engineering.",
};

export default function RendersPage() {
  return (
    <main style={{ position: "relative", zIndex: 1 }}>
      <section className={styles.rendersSection} style={{ paddingTop: 160 }}>
        <div className={`${styles.wrap} ${styles.rendersHeader}`}>
          <Reveal>
            <div className="sec-head">
              <span className="eyebrow">Side project · Blender</span>
              <h2>All the scenes.</h2>
              <p>
                Every render I&apos;ve modeled, lit, and finished so far —{" "}
                {RENDERS.length} scenes, all Cycles. Click any one to play it.
              </p>
            </div>
          </Reveal>
        </div>

        <RendersGallery renders={RENDERS} />
      </section>
      <ContactSection />
      <Footer />
    </main>
  );
}
