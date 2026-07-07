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
 * Hand the full-quality clip to the device's native video player.
 *
 * iOS is the tricky one: it will only auto-open its fullscreen player if the
 * <video> is NOT `playsinline` when play() is called — so we drop that
 * attribute here (and restore it on exit). We also force native `controls` so
 * the clip is always stoppable, and add explicit fullscreen calls for Android.
 * Reuses the tile's own <video> so everything stays inside the tap gesture.
 */
function openInNativePlayer(video: HTMLVideoElement, render: Render) {
  const el = video as HTMLVideoElement & { webkitEnterFullscreen?: () => void };
  const previewSrc = `${render.src}#t=0.1`;

  el.muted = false;
  el.loop = false;
  el.controls = true;
  el.playsInline = false;
  el.removeAttribute("playsinline"); // iOS: lets play() open the fullscreen player
  el.src = render.full ?? render.src;
  el.load();

  const restore = () => {
    document.removeEventListener("fullscreenchange", onFsChange);
    el.pause();
    el.muted = true;
    el.loop = true;
    el.controls = false;
    el.playsInline = true;
    el.setAttribute("playsinline", "");
    el.src = previewSrc;
    el.load();
  };
  const onFsChange = () => {
    if (!document.fullscreenElement) restore();
  };

  el.addEventListener("webkitendfullscreen", restore, { once: true }); // iOS
  document.addEventListener("fullscreenchange", onFsChange); // everyone else

  // Start playback within the tap gesture. iOS auto-fullscreens via the missing
  // playsinline; Android needs an explicit requestFullscreen once it's playing.
  el.play().then(() => {
    if (document.fullscreenElement) return;
    if (typeof el.webkitEnterFullscreen === "function") el.webkitEnterFullscreen();
    else el.requestFullscreen?.().catch(() => {});
  }).catch(() => {});
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
