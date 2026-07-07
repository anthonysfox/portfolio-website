"use client";

import { useState } from "react";
import RenderModal, { type Render } from "@/components/RenderModal";
import RenderTile from "@/components/RenderTile";

/**
 * The hero's showcase render — a still poster that plays on hover and, on click,
 * opens the modal (desktop) or the native player (touch). Behaviour lives in
 * RenderTile; this just owns the desktop modal state.
 */
export default function HeroRender({ src, full, filename, resolution, portrait }: Render) {
  const [open, setOpen] = useState(false);
  const render: Render = { src, full, filename, resolution, portrait };

  return (
    <>
      <RenderTile render={render} hint="⤢ Expand" onExpand={() => setOpen(true)} />
      {open && <RenderModal render={render} onClose={() => setOpen(false)} />}
    </>
  );
}
