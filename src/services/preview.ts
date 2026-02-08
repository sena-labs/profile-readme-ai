import type { GitHubAnalysis } from './github.js';

export interface PreviewOptions {
  theme: 'light' | 'dark';
  pattern?: 'signal' | 'plus' | 'circuit-board' | 'brick-wall' | 'floating-cogs' | 'formal-invitation';
  font?: 'inter' | 'bitter' | 'raleway' | 'rokkitt' | 'source-code-pro' | 'koho';
}

export type SocialCardStyle = 'full' | 'compact' | 'minimal';

interface ThemeConfig {
  bg: string;
  text: string;
  statsTheme: string;
  streakTheme: string;
  trophyTheme: string;
  capsuleGradient: string;
  badgeColor: string;
  badgeLabelColor: string;
  badgeStyle: string;
}

const THEMES: Record<'dark' | 'light', ThemeConfig> = {
  dark: {
    bg: '0D1117',
    text: 'ffffff',
    statsTheme: 'github_dark',
    streakTheme: 'dark',
    trophyTheme: 'darkhub',
    capsuleGradient: '0:0d1117,50:161b22,100:0d1117',
    badgeColor: '0d1117',
    badgeLabelColor: '161b22',
    badgeStyle: 'for-the-badge',
  },
  light: {
    bg: 'ffffff',
    text: '333333',
    statsTheme: 'default',
    streakTheme: 'default',
    trophyTheme: 'flat',
    capsuleGradient: '0:ffffff,50:f0f0f0,100:ffffff',
    badgeColor: 'f0f0f0',
    badgeLabelColor: 'e0e0e0',
    badgeStyle: 'for-the-badge',
  },
};

// Service URLs — using reliable mirrors since the main instances often hit rate limits
const SERVICES = {
  // Mirror of github-readme-stats (main instance often unavailable due to rate limits)
  stats: 'https://github-readme-stats-sigma-five.vercel.app',
  // Streak stats — herokuapp instance is stable
  streak: 'https://github-readme-streak-stats.herokuapp.com',
  // Trophy — using a known working mirror
  trophy: 'https://github-profile-trophy.vercel.app',
  // Activity graph
  activity: 'https://github-readme-activity-graph.vercel.app',
  // Summary cards
  summary: 'https://github-profile-summary-cards.vercel.app',
  // Capsule render
  capsule: 'https://capsule-render.vercel.app',
};

/**
 * Safely encode text for URLs
 */
function safeEncode(text: string): string {
  return encodeURIComponent(text).replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16).toUpperCase());
}

/**
 * Generate a social preview image URL using GitHub Socialify
 */
export function generateSocialPreviewUrl(analysis: GitHubAnalysis, options: PreviewOptions = { theme: 'dark' }): string {
  const { profile, topLanguages } = analysis;

  const params = new URLSearchParams({
    description: `${topLanguages.slice(0, 3).join(' \u00b7 ')} Developer`,
    font: options.font || 'source-code-pro',
    forks: '1',
    issues: '1',
    language: '1',
    name: '1',
    owner: '1',
    pattern: options.pattern || 'circuit-board',
    pulls: '1',
    stargazers: '1',
    theme: options.theme === 'dark' ? 'Dark' : 'Light',
  });

  return `https://socialify.git.ci/${profile.username}/${profile.username}/image?${params.toString()}`;
}

/**
 * Generate an OG image URL using capsule-render
 */
export function generateOgImageUrl(analysis: GitHubAnalysis, options: PreviewOptions = { theme: 'dark' }): string {
  const { profile, topLanguages } = analysis;
  const t = THEMES[options.theme];

  const params = new URLSearchParams({
    type: 'waving',
    color: t.capsuleGradient,
    height: '300',
    section: 'header',
    text: profile.name || profile.username,
    fontSize: '60',
    fontColor: t.text,
    animation: 'twinkling',
    fontAlignY: '35',
    desc: topLanguages.slice(0, 3).join(' | '),
    descAlignY: '55',
    descSize: '20',
  });

  return `${SERVICES.capsule}/api?${params.toString()}`;
}

/**
 * Get all stats card URLs with consistent theming
 */
export function getStatsCardUrls(username: string, theme: 'dark' | 'light' = 'dark'): Record<string, string> {
  const t = THEMES[theme];

  return {
    stats: `${SERVICES.stats}/api?username=${username}&show_icons=true&theme=${t.statsTheme}&hide_border=true&bg_color=${t.bg}&rank_icon=github`,
    languages: `${SERVICES.stats}/api/top-langs/?username=${username}&layout=donut-vertical&theme=${t.statsTheme}&hide_border=true&bg_color=${t.bg}&langs_count=8`,
    streak: `${SERVICES.streak}/?user=${username}&theme=${t.streakTheme}&hide_border=true&background=${t.bg}`,
    trophy: `${SERVICES.trophy}/?username=${username}&theme=${t.trophyTheme}&no-frame=true&no-bg=true&row=1&column=7`,
    activity: `${SERVICES.activity}/graph?username=${username}&theme=${theme === 'dark' ? 'github-compact' : 'minimal'}&hide_border=true&bg_color=${t.bg}&area=true`,
    summary: `${SERVICES.summary}/api/cards/profile-details?username=${username}&theme=${theme === 'dark' ? 'github_dark' : 'default'}`,
    productive: `${SERVICES.summary}/api/cards/productive-time?username=${username}&theme=${theme === 'dark' ? 'github_dark' : 'default'}&utcOffset=0`,
    commits: `${SERVICES.summary}/api/cards/stats?username=${username}&theme=${theme === 'dark' ? 'github_dark' : 'default'}`,
  };
}

/**
 * Generate a tech stack badge line
 */
function generateTechBadges(languages: string[], theme: 'dark' | 'light'): string {
  const t = THEMES[theme];
  const logoMap: Record<string, string> = {
    JavaScript: 'javascript', TypeScript: 'typescript', Python: 'python',
    Java: 'openjdk', 'C++': 'cplusplus', 'C#': 'csharp', Go: 'go',
    Rust: 'rust', Ruby: 'ruby', PHP: 'php', Swift: 'swift',
    Kotlin: 'kotlin', Dart: 'dart', Shell: 'gnubash', PowerShell: 'powershell',
    HTML: 'html5', CSS: 'css3', Vue: 'vuedotjs', Lua: 'lua',
  };

  return languages.map(lang => {
    const logo = logoMap[lang] || lang.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `![${lang}](https://img.shields.io/badge/${safeEncode(lang)}-${t.badgeColor}?style=${t.badgeStyle}&logo=${logo}&logoColor=white)`;
  }).join(' ');
}

/**
 * Generate full social card markdown — complete, ready-to-paste
 */
export function generateSocialCard(analysis: GitHubAnalysis, style: SocialCardStyle = 'full', theme: 'dark' | 'light' = 'dark'): string {
  const { profile, topLanguages, totalStars } = analysis;
  const t = THEMES[theme];
  const u = profile.username;
  const name = profile.name || profile.username;
  const urls = getStatsCardUrls(u, theme);

  if (style === 'minimal') {
    return generateMinimalCard(u, name, totalStars, profile.followers, profile.publicRepos, topLanguages, t, urls);
  }

  if (style === 'compact') {
    return generateCompactCard(u, name, totalStars, profile.followers, profile.publicRepos, topLanguages, t, urls);
  }

  return generateFullCard(u, name, profile, totalStars, topLanguages, analysis, t, urls, theme);
}

function generateMinimalCard(
  u: string, name: string, stars: number, followers: number, repos: number,
  langs: string[], t: ThemeConfig, urls: Record<string, string>
): string {
  return `<div align="center">

<a href="https://github.com/${u}">
  <img src="${urls.stats}" alt="${u}'s Stats" width="420" />
</a>

${generateStatsBadges(name, stars, followers, repos, t)}

</div>`;
}

function generateCompactCard(
  u: string, name: string, stars: number, followers: number, repos: number,
  langs: string[], t: ThemeConfig, urls: Record<string, string>
): string {
  return `<div align="center">

<!-- Header -->
<img src="${SERVICES.capsule}/api?type=waving&color=${t.capsuleGradient}&height=120&section=header&text=${safeEncode(name)}&fontColor=${t.text}&fontSize=36&animation=fadeIn&fontAlignY=50" width="100%" />

<!-- Stats -->
<a href="https://github.com/${u}">
  <img src="${urls.stats}" alt="Stats" width="49%" />
  <img src="${urls.streak}" alt="Streak" width="49%" />
</a>

<br><br>

<!-- Tech -->
${generateTechBadges(langs, t.badgeColor === '0d1117' ? 'dark' : 'light')}

<br><br>

${generateStatsBadges(name, stars, followers, repos, t)}

<!-- Footer -->
<img src="${SERVICES.capsule}/api?type=waving&color=${t.capsuleGradient}&height=80&section=footer" width="100%" />

</div>`;
}

function generateFullCard(
  u: string, name: string,
  profile: GitHubAnalysis['profile'], stars: number, langs: string[],
  analysis: GitHubAnalysis, t: ThemeConfig, urls: Record<string, string>,
  theme: 'dark' | 'light'
): string {
  const topRepos = analysis.repositories
    .filter(r => !r.isForked && !r.isPrivate)
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 3);

  const repoCards = topRepos.map(r =>
    `<a href="${r.url}"><img src="${SERVICES.stats}/api/pin/?username=${u}&repo=${safeEncode(r.name)}&theme=${t.statsTheme}&hide_border=true&bg_color=${t.bg}" alt="${r.name}" /></a>`
  ).join('\n');

  return `<div align="center">

<!-- ═══════════════════════ HEADER ═══════════════════════ -->

<img src="${SERVICES.capsule}/api?type=waving&color=${t.capsuleGradient}&height=180&section=header&text=${safeEncode(name)}&fontColor=${t.text}&fontSize=42&animation=twinkling&fontAlignY=35&desc=${safeEncode(langs.slice(0, 3).join(' \u00b7 '))}&descAlignY=55&descSize=18" width="100%" />

<!-- ═══════════════════ BADGES ═══════════════════ -->

${generateStatsBadges(name, stars, profile.followers, profile.publicRepos, t)}

<br>

${generateTechBadges(langs, theme)}

<br>

<!-- ═══════════════════ STATS ═══════════════════ -->

<img src="${urls.stats}" alt="Stats" width="49%" />
<img src="${urls.streak}" alt="Streak" width="49%" />

<br>

<img src="${urls.languages}" alt="Languages" width="30%" />
<img src="${urls.productive}" alt="Productive Time" width="49%" />

<!-- ═════════════════ TROPHIES ═════════════════ -->

<br>

<img src="${urls.trophy}" alt="Trophies" width="100%" />

<!-- ═════════════════ ACTIVITY ═════════════════ -->

<br>

<img src="${urls.activity}" alt="Activity Graph" width="100%" />

<!-- ══════════════ TOP REPOSITORIES ═════════════ -->

${repoCards ? `<br>\n\n${repoCards}` : ''}

<!-- ══════════════════ PROFILE ═════════════════ -->

<br>

<img src="${urls.summary}" alt="Profile Summary" width="100%" />

<!-- ═══════════════════ FOOTER ═══════════════════ -->

<br>

![Views](https://komarev.com/ghpvc/?username=${u}&color=${t.badgeLabelColor}&style=for-the-badge&label=PROFILE+VIEWS)

<img src="${SERVICES.capsule}/api?type=waving&color=${t.capsuleGradient}&height=120&section=footer" width="100%" />

</div>`;
}

function generateStatsBadges(
  name: string, stars: number, followers: number, repos: number, t: ThemeConfig
): string {
  return [
    `<img src="https://img.shields.io/badge/${safeEncode(name)}-${t.badgeColor}?style=${t.badgeStyle}&logo=github&logoColor=white" alt="Profile" />`,
    `<img src="https://img.shields.io/badge/Stars-${stars}-${t.badgeColor}?style=${t.badgeStyle}&logo=github&logoColor=ffd700&labelColor=${t.badgeLabelColor}" alt="Stars" />`,
    `<img src="https://img.shields.io/badge/Followers-${followers}-${t.badgeColor}?style=${t.badgeStyle}&logo=github&logoColor=58a6ff&labelColor=${t.badgeLabelColor}" alt="Followers" />`,
    `<img src="https://img.shields.io/badge/Repos-${repos}-${t.badgeColor}?style=${t.badgeStyle}&logo=github&logoColor=3fb950&labelColor=${t.badgeLabelColor}" alt="Repos" />`,
  ].join('\n');
}
