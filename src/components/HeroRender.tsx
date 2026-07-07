"use client";

import { useEffect, useRef, useState } from "react";
import RenderModal, { type Render } from "@/components/RenderModal";

/**
 * The hero's showcase render — shows a still frame at rest, plays on hover,
 * and opens the fullscreen modal on click. No perpetual looping.
 */
export default function HeroRender({
  src,
  full,
  filename,
  resolution,
  portrait,
}: Render) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const play = () => videoRef.current?.play();
  const pause = () => videoRef.current?.pause();

  const render: Render = { src, full, filename, resolution, portrait };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 540px)");
    const handleResize = () => setIsMobile(mediaQuery.matches);

    // Initial check
    handleResize();

    // Listen for changes
    mediaQuery.addEventListener("change", handleResize);

    // Cleanup
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const handleClick = () => {
    if (isMobile && videoRef.current) {
      videoRef.current.requestFullscreen().catch(() => {});
      videoRef.current.play();
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <div
        className="viewport render-frame"
        role="button"
        tabIndex={0}
        aria-label={`Open ${filename} render`}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
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
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            src={`${src}#t=0.1`}
          />
          <div className="card-overlay">
            <span className="play-hint">⤢ Expand</span>
          </div>
        </div>
      </div>

      {open && !isMobile && (
        <RenderModal render={render} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
