# Playground videos

Drop your Blender / 3D rendered videos here, then reference them from
`src/config/playground.ts`.

## How to add a render

1. Export from Blender as **MP4 (H.264)**. Keep them web-sized — aim for a few MB
   each. A quick compress with ffmpeg helps:

   ```bash
   ffmpeg -i input.mov -vcodec libx264 -crf 24 -preset slow -movflags +faststart -an reel-01.mp4
   ```

   (`-an` drops audio since the gallery plays muted; `+faststart` lets it start
   playing before fully downloaded.)

2. Optionally also export a smaller `.webm` for modern browsers.

3. Add an entry to `EXPERIMENTS` in `src/config/playground.ts`:

   ```ts
   {
     id: "reel-01",
     title: "Crystal Bloom",
     description: "Procedural growth study, Cycles.",
     src: "/videos/reel-01.mp4",
     aspect: "video", // "square" | "video" | "portrait"
     tags: ["Blender", "Cycles"],
   }
   ```

Tiles with no matching file show a "render pending" placeholder, so the gallery
always looks intentional.

> This folder is committed so the path exists; the video files themselves can get
> large — consider Git LFS or hosting big files elsewhere if they balloon.
