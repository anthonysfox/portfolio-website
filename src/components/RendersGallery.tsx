"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import RenderModal, { type Render } from "@/components/RenderModal";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Props {
  renders: Render[];
}

function GalleryCard({
  render,
  onClick,
  isMobile,
}: {
  render: Render;
  onClick: () => void;
  isMobile: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = () => videoRef.current?.play();
  const pause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0.1; // back to the poster frame
    }
  };

  const handleClick = () => {
    if (isMobile && videoRef.current) {
      videoRef.current.requestFullscreen().catch(() => {});
      videoRef.current.play();
    } else {
      onClick();
    }
  };

  return (
    <div
      className="viewport render-frame"
      role="button"
      tabIndex={0}
      aria-label={`Play ${render.filename} render`}
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
          <span>{render.filename}</span>
        </span>
        <span>{render.resolution}</span>
      </div>
      <div className="vp-media ratio-16-9">
        {/* #t=0.1 shows a still poster frame instead of black before hover */}
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          src={`${render.src}#t=0.1`}
        />
        <div className="card-overlay">
          <span className="play-hint">▶ Play</span>
        </div>
      </div>
    </div>
  );
}

/**
 * The section's hero render — wide, and autoplays on its own while it's in view
 * (paused otherwise to save cycles). Click to open the full modal.
 */
function FeaturedRender({
  render,
  onClick,
  isMobile,
}: {
  render: Render;
  onClick: () => void;
  isMobile: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);

  const handleClick = () => {
    if (isMobile && videoRef.current) {
      videoRef.current.requestFullscreen().catch(() => {});
      videoRef.current.play();
    } else {
      onClick();
    }
  };

  return (
    <div
      className="viewport render-frame"
      role="button"
      tabIndex={0}
      aria-label={`Open ${render.filename} render`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="vp-bar">
        <span className="fname">
          <span className="lights">
            <i />
            <i />
            <i />
          </span>
          <span>{render.filename}</span>
        </span>
        <span>{render.resolution}</span>
      </div>
      <div className="vp-media ratio-16-9">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          src={`${render.src}#t=0.1`}
        />
        <div className="card-overlay">
          <span className="play-hint">⤢ Expand</span>
        </div>
      </div>
    </div>
  );
}

export default function RendersGallery({ renders }: Props) {
  const [active, setActive] = useState<Render | null>(null);
  const reduce = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [featured, ...rest] = renders;

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
          <FeaturedRender
            render={featured}
            onClick={() => setActive(featured)}
            isMobile={isMobile}
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
            <GalleryCard
              render={r}
              onClick={() => setActive(r)}
              isMobile={isMobile}
            />
          </motion.div>
        ))}
      </div>

      {active && !isMobile && (
        <RenderModal render={active} onClose={() => setActive(null)} />
      )}

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
