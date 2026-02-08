import type { GitHubAnalysis } from './github.js';

export interface PreviewOptions {
  theme: 'light' | 'dark';
  pattern?: 'signal' | 'plus' | 'circuit-board' | 'brick-wall' | 'floating-cogs' | 'formal-invitation';
  font?: 'inter' | 'bitter' | 'raleway' | 'rokkitt' | 'source-code-pro' | 'koho';
}

/**
 * Generate a social preview image URL using GitHub Socialify
 */
export function generateSocialPreviewUrl(analysis: GitHubAnalysis, options: PreviewOptions = { theme: 'dark' }): string {
  const { profile, topLanguages, totalStars } = analysis;
  
  // Use GitHub Socialify for generating social preview images
  const params = new URLSearchParams({
    description: `${topLanguages.slice(0, 3).join(' • ')} Developer`,
    font: options.font || 'source-code-pro',
    forks: '1',
    issues: '1',
    language: '1',
    name: '1',
    owner: '1',
    pattern: options.pattern || 'circuit-board',
    pulls: '1',
    stargazers: '1',
    theme: options.theme,
  });

  return `https://socialify.git.ci/${profile.username}/${profile.username}/image?${params.toString()}`;
}

/**
 * Generate an OG image URL using capsule-render
 */
export function generateOgImageUrl(analysis: GitHubAnalysis, options: PreviewOptions = { theme: 'dark' }): string {
  const { profile, topLanguages } = analysis;
  
  const bgColor = options.theme === 'dark' ? '0D1117' : 'ffffff';
  const textColor = options.theme === 'dark' ? 'fff' : '333';
  
  const params = new URLSearchParams({
    type: 'waving',
    color: 'gradient',
    customColorList: '6,11,20',
    height: '300',
    section: 'header',
    text: profile.name || profile.username,
    fontSize: '60',
    fontColor: textColor,
    animation: 'twinkling',
    fontAlignY: '35',
    desc: topLanguages.slice(0, 3).join(' | '),
    descAlignY: '55',
    descSize: '20',
  });

  return `https://capsule-render.vercel.app/api?${params.toString()}`;
}

/**
 * Generate markdown for social sharing card
 */
export function generateSocialCard(analysis: GitHubAnalysis): string {
  const { profile, topLanguages, totalStars } = analysis;
  
  return `<div align="center">

<!-- Social Preview Card -->
<a href="https://github.com/${profile.username}">
  <img src="https://github-readme-stats.vercel.app/api?username=${profile.username}&show_icons=true&theme=radical&hide_border=true&bg_color=0D1117" alt="${profile.username}'s GitHub Stats" />
</a>

<!-- Profile Badge -->
<img src="https://img.shields.io/badge/Profile-${encodeURIComponent(profile.name || profile.username)}-blue?style=for-the-badge&logo=github" alt="Profile Badge" />

<!-- Stats Badges -->
<img src="https://img.shields.io/badge/Stars-${totalStars}-gold?style=for-the-badge&logo=star" alt="Stars" />
<img src="https://img.shields.io/badge/Followers-${profile.followers}-blue?style=for-the-badge&logo=github" alt="Followers" />
<img src="https://img.shields.io/badge/Repos-${profile.publicRepos}-green?style=for-the-badge&logo=github" alt="Repos" />

</div>`;
}

/**
 * Generate PNG-friendly stats card URLs (can be downloaded/screenshotted)
 */
export function getStatsCardUrls(username: string, theme: 'dark' | 'light' = 'dark'): Record<string, string> {
  const statsTheme = theme === 'dark' ? 'radical' : 'default';
  const bgColor = theme === 'dark' ? '0D1117' : 'ffffff';
  
  return {
    stats: `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${statsTheme}&hide_border=true&bg_color=${bgColor}`,
    languages: `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${statsTheme}&hide_border=true&bg_color=${bgColor}`,
    streak: `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${statsTheme}&hide_border=true&background=${bgColor}`,
    trophy: `https://github-profile-trophy.vercel.app/?username=${username}&theme=${theme === 'dark' ? 'darkhub' : 'flat'}&no-frame=true&row=1&column=7`,
  };
}
