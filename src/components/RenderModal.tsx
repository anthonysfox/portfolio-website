"use client";

import { useEffect, useRef } from "react";

export interface Render {
  /** Preview source (lightweight) used for tiles/hero. */
  src: string;
  /** Full-quality source for the modal. Falls back to `src` if absent. */
  full?: string;
  filename: string;
  resolution: string;
  portrait?: boolean;
}

/** Fullscreen render viewer with native controls. Esc or backdrop click closes. */
export default function RenderModal({
  render,
  onClose,
}: {
  render: Render;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
      </div>
    </div>
  );
}
