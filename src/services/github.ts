import { getOctokitClient } from '../utils/clients.js';
import { withCache, getProfileCacheKey } from '../utils/cache.js';

// Username validation regex - alphanumeric and hyphens, 1-39 chars
const GITHUB_USERNAME_REGEX = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;

export function isValidUsername(username: string): boolean {
  return GITHUB_USERNAME_REGEX.test(username);
}

export function sanitizeUsername(username: string): string {
  // Remove any characters that aren't alphanumeric or hyphens
  return username.replace(/[^a-zA-Z0-9-]/g, '').slice(0, 39);
}

export interface GitHubProfile {
  username: string;
  name: string | null;
  bio: string | null;
  company: string | null;
  location: string | null;
  blog: string | null;
  twitter: string | null;
  avatarUrl: string;
  followers: number;
  following: number;
  publicRepos: number;
  createdAt: string;
}

export interface Repository {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
  topics: string[];
  isForked: boolean;
  isPrivate: boolean;
}

export interface GitHubAnalysis {
  profile: GitHubProfile;
  repositories: Repository[];
  languages: Map<string, number>;
  topLanguages: string[];
  totalStars: number;
  pinnedRepos: string[];
  privateRepoCount: number;
  includesPrivateRepos: boolean;
}

export async function analyzeGitHubProfile(username: string, token?: string): Promise<GitHubAnalysis> {
  // Validate username before making API calls
  if (!isValidUsername(username)) {
    throw new Error(`Invalid GitHub username: ${sanitizeUsername(username)}`);
  }
  
  // Use cache to avoid rate limiting
  const cacheKey = getProfileCacheKey(username);
  
  return withCache(cacheKey, async () => {
    const octokit = getOctokitClient(token);

    // Fetch user profile
    const { data: user } = await octokit.rest.users.getByUsername({ username });

    const profile: GitHubProfile = {
      username: user.login,
      name: user.name,
      bio: user.bio,
      company: user.company,
      location: user.location,
      blog: user.blog,
      twitter: user.twitter_username ?? null,
      avatarUrl: user.avatar_url,
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      createdAt: user.created_at,
    };

    // Determine if we can fetch private repos (authenticated user matches requested username)
    let includesPrivateRepos = false;
    let allRepos: any[] = [];

    if (token) {
      try {
        const { data: authUser } = await octokit.rest.users.getAuthenticated();
        if (authUser.login.toLowerCase() === username.toLowerCase()) {
          // Authenticated user matches — fetch ALL repos including private
          includesPrivateRepos = true;
          let page = 1;
          while (true) {
            const { data: pageRepos } = await octokit.rest.repos.listForAuthenticatedUser({
              visibility: 'all',
              sort: 'updated',
              per_page: 100,
              page,
            });
            allRepos.push(...pageRepos);
            if (pageRepos.length < 100) break;
            page++;
          }
        }
      } catch {
        // Token invalid or insufficient permissions — fall through to public fetch
      }
    }

    if (allRepos.length === 0) {
      // Fallback: fetch public repos only
      const { data: repos } = await octokit.rest.repos.listForUser({
        username,
        sort: 'updated',
        per_page: 100,
      });
      allRepos = repos;
    }

    const repositories: Repository[] = allRepos.map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language ?? null,
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      url: repo.html_url,
      topics: repo.topics || [],
      isForked: repo.fork,
      isPrivate: repo.private || false,
    }));

    // Analyze languages
    const languages = new Map<string, number>();
    let totalStars = 0;

    for (const repo of repositories) {
      if (!repo.isForked && repo.language) {
        languages.set(repo.language, (languages.get(repo.language) || 0) + 1);
      }
      totalStars += repo.stars;
    }

    // Sort languages by usage
    const topLanguages = [...languages.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([lang]) => lang);

    // Get pinned repos (top starred non-forked, PUBLIC only — safe for README display)
    const pinnedRepos = repositories
      .filter(r => !r.isForked && !r.isPrivate)
      .sort((a, b) => b.stars - a.stars)
      .slice(0, 6)
      .map(r => r.name);

    const privateRepoCount = repositories.filter(r => r.isPrivate).length;

    return {
      profile,
      repositories,
      languages,
      topLanguages,
      totalStars,
      pinnedRepos,
      privateRepoCount,
      includesPrivateRepos,
    };
  });
}
