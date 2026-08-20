import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Anthony Fox — Full-Stack Software Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public/fox-mark.png"),
    "base64",
  );
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#130f0b",
          backgroundImage:
            "radial-gradient(60% 60% at 80% 0%, rgba(239,111,52,0.35), transparent 60%), radial-gradient(50% 50% at 0% 100%, rgba(244,177,131,0.15), transparent 60%)",
        }}
      >
        <img
          src={logoSrc}
          alt=""
          width={90}
          height={90}
          style={{ marginBottom: 40 }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            color: "#f6ede1",
            letterSpacing: "-0.02em",
          }}
        >
          Anthony Fox
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            color: "#ef6f34",
            fontWeight: 600,
            marginTop: 12,
          }}
        >
          Full-Stack Software Engineer
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#a99984",
            marginTop: 24,
          }}
        >
          Building AI-powered web apps · New Jersey
        </div>
      </div>
    ),
    { ...size },
  );
}
