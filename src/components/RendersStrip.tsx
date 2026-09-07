"use client";

import { useState } from "react";
import Link from "next/link";
import RenderModal, { type Render } from "@/components/RenderModal";
import RenderTile from "@/components/RenderTile";

interface Props {
  renders: Render[];
  /** How many tiles to show before the "see all" link. */
  limit?: number;
}

export default function RendersStrip({ renders, limit = 4 }: Props) {
  const [active, setActive] = useState<{
    render: Render;
    origin: { x: number; y: number };
  } | null>(null);
  const shown = renders.slice(0, limit);

  return (
    <>
      <div className="strip-fade">
        <div className="renders-strip">
          {shown.map((r) => (
            <div key={r.src} className="strip-item">
              <RenderTile
                render={r}
                onExpand={(origin) => setActive({ render: r, origin })}
                compact
              />
            </div>
          ))}

          <Link href="/renders" className="strip-item strip-more">
            <span className="strip-more-arrow">↗</span>
            <span>See all renders</span>
          </Link>
        </div>
      </div>

      <RenderModal
        render={active?.render ?? null}
        origin={active?.origin}
        onClose={() => setActive(null)}
      />

      <style>{`
        .strip-fade {
          max-width: 1220px;
          margin: 0 auto;
          -webkit-mask-image: linear-gradient(to right, black 0%, black 92%, transparent 100%);
          mask-image: linear-gradient(to right, black 0%, black 92%, transparent 100%);
        }
        .renders-strip {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x proximity;
          scroll-padding-left: 26px;
          padding: 4px 26px 16px;
        }
        .strip-item {
          flex: 0 0 auto;
          width: 300px;
          scroll-snap-align: start;
        }
        .strip-more {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-radius: 20px;
          border: 1px dashed var(--line);
          color: var(--muted);
          font-size: 14px;
          transition: border-color 0.2s, color 0.2s;
        }
        .strip-more:hover {
          border-color: var(--amber);
          color: var(--cream);
        }
        .strip-more-arrow {
          font-size: 20px;
          color: var(--amber);
        }
      `}</style>
    </>
  );
}
