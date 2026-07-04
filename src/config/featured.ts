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
    title: "Spotify Playlist Subscribe",
    blurb:
      "Built to solve my own problem: manually keeping Spotify playlists fresh. Set it up once and it keeps your playlists updated automatically.",
    tags: ["TypeScript", "Spotify API", "Automation"],
  },
  {
    repo: "playlist-fox-react-native",
    title: "Playlist Fox (Mobile)",
    blurb:
      "A mobile take on the playlist tooling, built with React Native. Still in progress, but coming together nicely.",
    tags: ["React Native", "TypeScript", "In Progress"],
  },
];

export const FEATURED_REPO_NAMES = new Set(FEATURED.map((f) => f.repo));
