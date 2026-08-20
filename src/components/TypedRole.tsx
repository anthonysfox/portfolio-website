"use client";

import { useEffect, useRef, useState } from "react";

const WORDS = ["engineer.", "builder.", "creator.", "architect."];

// Reserve enough width for the longest word so the line-wrap point never
// shifts as the word changes — avoids a layout jump mid-animation.
const RESERVED_CH = Math.max(...WORDS.map((w) => w.length)) + 1;

const TYPE_MS = 70;
const DELETE_MS = 40;
const HOLD_MS = 1800;
const PAUSE_MS = 300;

/**
 * Types out each word in WORDS, holds, deletes, then moves to the next —
 * a terminal-style prompt standing in for the static "engineer." in the hero.
 */
export default function TypedRole() {
  const [text, setText] = useState(WORDS[0]);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion.current) return;

    let wordIndex = 0;
    let charIndex = WORDS[0].length;
    let deleting = true;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = WORDS[wordIndex];

      if (deleting) {
        charIndex--;
        setText(word.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % WORDS.length;
          timeoutId = setTimeout(tick, PAUSE_MS);
          return;
        }
        timeoutId = setTimeout(tick, DELETE_MS);
      } else {
        charIndex++;
        setText(word.slice(0, charIndex));
        if (charIndex === word.length) {
          deleting = true;
          timeoutId = setTimeout(tick, HOLD_MS);
          return;
        }
        timeoutId = setTimeout(tick, TYPE_MS);
      }
    };

    // Hold the initial word (already shown fully) before the loop takes over.
    timeoutId = setTimeout(tick, HOLD_MS);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <span
      style={{
        display: "inline-block",
        minWidth: `${RESERVED_CH}ch`,
        whiteSpace: "nowrap",
        color: "var(--amber)",
        fontStyle: "italic",
      }}
    >
      <span aria-hidden="true">
        {text}
        <span
          style={{
            marginLeft: "0.03em",
            animation: "blink 1s step-end infinite",
          }}
        >
          |
        </span>
      </span>
      <span
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          whiteSpace: "nowrap",
        }}
      >
        engineer.
      </span>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}
