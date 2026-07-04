"use client";

import { useRef, useState } from "react";
import RenderModal, { type Render } from "@/components/RenderModal";

/**
 * The hero's showcase render — shows a still frame at rest, plays on hover,
 * and opens the fullscreen modal on click. No perpetual looping.
 */
export default function HeroRender({ src, full, filename, resolution, portrait }: Render) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(false);

  const play = () => videoRef.current?.play();
  const pause = () => videoRef.current?.pause();

  const render: Render = { src, full, filename, resolution, portrait };

  return (
    <>
      <div
        className="viewport render-frame"
        role="button"
        tabIndex={0}
        aria-label={`Open ${filename} render`}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        onMouseEnter={play}
        onMouseLeave={pause}
        onFocus={play}
        onBlur={pause}
      >
        <div className="vp-bar">
          <span className="fname">
            <span className="lights">
              <i />
              <i />
              <i />
            </span>
            <span>{filename}</span>
          </span>
          <span>{resolution}</span>
        </div>
        <div className="vp-media ratio-16-9">
          {/* #t=0.1 shows a still poster frame without autoplaying */}
          <video ref={videoRef} muted loop playsInline preload="metadata" src={`${src}#t=0.1`} />
          <div className="card-overlay">
            <span className="play-hint">⤢ Expand</span>
          </div>
        </div>
      </div>

      {open && <RenderModal render={render} onClose={() => setOpen(false)} />}
    </>
  );
}
