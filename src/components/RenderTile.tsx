"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Render } from "@/components/RenderModal";

/** True on touch devices (phones/tablets) — where we hand off to the native player. */
function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isTouch;
}

/**
 * Hand the full-quality clip to the device's native video player (fullscreen,
 * native controls, sound). Reuses the tile's own <video> so the call stays
 * inside the tap gesture — iOS requires `webkitEnterFullscreen`, which the old
 * `requestFullscreen` code silently failed at. Restores the muted preview on exit.
 */
function openInNativePlayer(video: HTMLVideoElement, render: Render) {
  const el = video as HTMLVideoElement & { webkitEnterFullscreen?: () => void };
  const previewSrc = `${render.src}#t=0.1`;

  el.muted = false;
  el.loop = false;
  el.src = render.full ?? render.src;

  const restore = () => {
    document.removeEventListener("fullscreenchange", onFsChange);
    el.pause();
    el.muted = true;
    el.loop = true;
    el.src = previewSrc;
    el.load();
  };
  const onFsChange = () => {
    if (!document.fullscreenElement) restore();
  };

  el.addEventListener("webkitendfullscreen", restore, { once: true }); // iOS Safari
  document.addEventListener("fullscreenchange", onFsChange); // everything else

  el.play().catch(() => {});
  if (typeof el.webkitEnterFullscreen === "function") {
    el.webkitEnterFullscreen();
  } else if (el.requestFullscreen) {
    el.requestFullscreen().catch(() => {});
  }
}

interface Props {
  render: Render;
  /** "hover" plays on hover; "autoplay" plays while in view (featured tile). */
  mode?: "hover" | "autoplay";
  hint?: string;
  /** Desktop click handler (opens the modal). Not used on touch devices. */
  onExpand: () => void;
}

export default function RenderTile({
  render,
  mode = "hover",
  hint = "▶ Play",
  onExpand,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isTouch = useIsTouch();
  const reduce = useReducedMotion();

  // Featured tile autoplays while on screen; paused otherwise to save bandwidth.
  useEffect(() => {
    if (mode !== "autoplay" || reduce) return;
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [mode, reduce]);

  const play = () => {
    videoRef.current?.play()?.catch(() => {});
  };
  const pause = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0.1; // back to the poster frame
    }
  };

  const activate = () => {
    const v = videoRef.current;
    if (isTouch && v) openInNativePlayer(v, render);
    else onExpand();
  };

  const hoverProps =
    mode === "hover"
      ? { onMouseEnter: play, onMouseLeave: pause, onFocus: play, onBlur: pause }
      : {};

  return (
    <div
      className="viewport render-frame"
      role="button"
      tabIndex={0}
      aria-label={`${isTouch ? "Play" : "Open"} ${render.filename} render`}
      onClick={activate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      }}
      {...hoverProps}
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
        {/* #t=0.1 shows a still poster frame instead of black before playback */}
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload={mode === "autoplay" ? "auto" : "metadata"}
          src={`${render.src}#t=0.1`}
        />
        <div className="card-overlay">
          <span className="play-hint">{hint}</span>
        </div>
      </div>
    </div>
  );
}
