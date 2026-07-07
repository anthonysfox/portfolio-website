"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import RenderModal, { type Render } from "@/components/RenderModal";
import RenderTile from "@/components/RenderTile";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Props {
  renders: Render[];
}

export default function RendersGallery({ renders }: Props) {
  const [active, setActive] = useState<Render | null>(null);
  const reduce = useReducedMotion();
  const [featured, ...rest] = renders;

  return (
    <>
      {featured && (
        <motion.div
          className="featured-wrap"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduce ? 0.3 : 0.8, ease: EASE }}
        >
          <RenderTile
            render={featured}
            mode="autoplay"
            hint="⤢ Expand"
            onExpand={() => setActive(featured)}
          />
        </motion.div>
      )}

      <div className="renders-gallery">
        {rest.map((r, i) => (
          <motion.div
            key={r.src}
            className="gallery-item"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: reduce ? 0.3 : 0.7,
              ease: EASE,
              delay: reduce ? 0 : (i % 2) * 0.08,
            }}
          >
            <RenderTile render={r} onExpand={() => setActive(r)} />
          </motion.div>
        ))}
      </div>

      {/* On touch devices onExpand never fires (native player takes over), so
          `active` stays null and the modal is desktop-only by construction. */}
      {active && <RenderModal render={active} onClose={() => setActive(null)} />}

      <style>{`
        .featured-wrap {
          max-width: 1220px;
          margin: 0 auto 16px;
          padding: 0 26px;
        }
        .renders-gallery {
          max-width: 1220px;
          margin: 0 auto;
          padding: 0 26px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        @media (max-width: 540px) {
          .renders-gallery { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
