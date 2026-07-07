export const GITHUB_USERNAME = "anthonysfox";

export interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  pushed_at: string;
  fork: boolean;
  archived: boolean;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Go: "#00add8",
  Ruby: "#701516",
  PHP: "#4f5d95",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Python: "#3572a5",
  Rust: "#dea584",
  GLSL: "#5686a5",
};

export function languageColor(language: string | null): string {
  if (!language) return "#6b7280";
  return LANGUAGE_COLORS[language] ?? "#6b7280";
}

/**
 * Fetch the user's public repositories. Revalidated hourly (ISR) so new repos
 * appear on their own without a redeploy. No token needed for public data; to
 * raise rate limits add a GITHUB_TOKEN env var and the Authorization header below.
 */
export async function getRepos(): Promise<Repo[]> {
  const token = process.env.GITHUB_TOKEN;
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      console.error("GitHub API error:", res.status, await res.text());
      return [];
    }

    const repos = (await res.json()) as Repo[];
    return repos
      .filter((r) => !r.fork && !r.archived)
      .sort(
        (a, b) =>
          b.stargazers_count - a.stargazers_count ||
          new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
      );
  } catch (err) {
    console.error("Failed to fetch repos:", err);
    return [];
  }
}
