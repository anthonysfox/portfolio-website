/**
 * Base URL for render videos. Defaults to the CloudFront distribution (public
 * CDN in front of a private S3 bucket). Override with NEXT_PUBLIC_MEDIA_BASE
 * — e.g. a custom domain like https://cdn.anthonyfox.dev — with no code changes.
 *
 * Must be NEXT_PUBLIC_* because the URL is used in the browser (<video src>).
 */
const BASE = (
  process.env.NEXT_PUBLIC_MEDIA_BASE ?? "https://dg1aqz50i2aol.cloudfront.net"
).replace(/\/$/, "");

/** Build a full-quality media URL from an object key (no extension needed). */
export function mediaUrl(name: string): string {
  return `${BASE}/${name}`;
}

/**
 * 720p preview clips (muted, faststart) under the CDN's `previews/` prefix, used
 * for the hero, grid tiles, and featured render. Same base and extension-less
 * object keys as the full versions — e.g. `<base>/previews/forest_garden`.
 */
export function previewUrl(name: string): string {
  return mediaUrl(`previews/${name}`);
}
