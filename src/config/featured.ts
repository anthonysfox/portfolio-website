/**
 * Hand-curated featured projects. `repo` must match a GitHub repository name so
 * live stats (stars, language, last push) get merged in automatically. Everything
 * else here is your own copy — edit freely. Reorder this array to reorder the cards.
 */
export interface FeaturedProject {
  repo: string;
  title: string;
  blurb: string;
  tags: string[];
  /** Optional live demo URL (falls back to the repo's homepage field if omitted). */
  demo?: string;
}

export const FEATURED: FeaturedProject[] = [
  {
    repo: "spotify-playlist-subscribe-v2",
    title: "PlaylistFox (Web)",
    blurb:
      "Built to solve my own problem: manually keeping Spotify playlists fresh. Set it up once and it keeps your playlists updated automatically.",
    tags: ["Next.js", "React", "TypeScript", "Spotify API", "Automation"],
  },
  {
    repo: "playlist-fox-react-native",
    title: "PlaylistFox (Mobile)",
    blurb:
      "A mobile take on the playlist tooling, built with React Native. Still in progress, but coming together nicely.",
    tags: ["React Native", "TypeScript", "In Progress"],
  },
  {
    repo: "personal_website", // Or your repo name
    title: "Personal Portfolio",
    blurb:
      "The Next.js site you're looking at now. Media is served via Cloudflare and built with TypeScript with Motion animations.",
    tags: ["Next.js", "React", "TypeScript", "Motion", "Cloudflare"],
    demo: "https://anthonyfox.dev/",
  },
];

export const FEATURED_REPO_NAMES = new Set(FEATURED.map((f) => f.repo));
