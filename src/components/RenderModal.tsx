"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export interface Render {
  /** Preview source (lightweight) used for tiles/hero. */
  src: string;
  /** Full-quality source for the modal. Falls back to `src` if absent. */
  full?: string;
  filename: string;
  resolution: string;
  portrait?: boolean;
}

interface Props {
  render: Render | null;
  /** Viewport-relative percentage the modal should scale in/out from — the tile that was clicked. */
  origin?: { x: number; y: number };
  onClose: () => void;
}

/** Fullscreen render viewer with native controls. Esc or backdrop click closes. */
export default function RenderModal({ render, origin, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!render) return;
    videoRef.current?.play();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [render, onClose]);

  return (
    <AnimatePresence>
      {render && (
        <motion.div
          className="modal-backdrop"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.15 : 0.25, ease: "easeOut" }}
        >
          <motion.div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ transformOrigin: origin ? `${origin.x}% ${origin.y}%` : "center" }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            transition={
              reduce
                ? { duration: 0.15 }
                : { type: "spring", bounce: 0, duration: 0.32 }
            }
          >
            <div className="vp-bar modal-bar">
              <span className="fname">
                <span className="lights">
                  <button
                    type="button"
                    className="light-close"
                    onClick={onClose}
                    aria-label="Close"
                    title="Close"
                  />
                  <i />
                  <i />
                </span>
                <span>{render.filename}</span>
              </span>
              <span style={{ fontSize: 11 }}>{render.resolution}</span>
            </div>
            <video
              ref={videoRef}
              loop
              playsInline
              controls
              src={render.full ?? render.src}
              style={{
                display: "block",
                width: "100%",
                maxHeight: render.portrait ? "80vh" : "auto",
                objectFit: "contain",
                background: "#000",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
