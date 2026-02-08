import fs from 'fs/promises';
import type { GitHubAnalysis } from '../services/github.js';

export interface CustomThemeConfig {
  name: string;
  headerStyle: 'banner' | 'text' | 'ascii' | 'none';
  headerColor?: string;
  headerAnimation?: 'twinkling' | 'fadeIn' | 'blink' | 'none';
  showTypingAnimation: boolean;
  typingColor?: string;
  showStats: boolean;
  statsTheme: string;
  showStreak: boolean;
  showLanguages: boolean;
  badgeStyle: 'flat' | 'flat-square' | 'for-the-badge' | 'plastic';
  badgeColor?: string;
  sections: {
    about: boolean;
    techStack: boolean;
    stats: boolean;
    connect: boolean;
  };
  customCSS?: string;
  footer?: string;
}

const defaultConfig: CustomThemeConfig = {
  name: 'Custom Theme',
  headerStyle: 'banner',
  headerColor: 'gradient',
  headerAnimation: 'twinkling',
  showTypingAnimation: true,
  typingColor: '36BCF7',
  showStats: true,
  statsTheme: 'default',
  showStreak: true,
  showLanguages: true,
  badgeStyle: 'for-the-badge',
  badgeColor: '36BCF7',
  sections: {
    about: true,
    techStack: true,
    stats: true,
    connect: true,
  },
};

export async function loadCustomTheme(filePath: string): Promise<CustomThemeConfig> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const userConfig = JSON.parse(content) as Partial<CustomThemeConfig>;
    return { ...defaultConfig, ...userConfig };
  } catch (error) {
    throw new Error(`Failed to load custom theme: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export function generateCustomTheme(analysis: GitHubAnalysis, config: CustomThemeConfig, options: { bio: string; tagline: string; includeStats: boolean }): string {
  const { profile, topLanguages, totalStars } = analysis;
  let readme = '';

  // Header
  if (config.headerStyle === 'banner') {
    readme += `<div align="center">

![Header](https://capsule-render.vercel.app/api?type=waving&color=${config.headerColor || 'gradient'}&height=200&section=header&text=${encodeURIComponent(profile.name || profile.username)}&fontSize=80&fontColor=fff${config.headerAnimation !== 'none' ? `&animation=${config.headerAnimation}` : ''}&fontAlignY=35)

`;
  } else if (config.headerStyle === 'text') {
    readme += `<div align="center">

# ${profile.name || profile.username}

`;
  } else if (config.headerStyle === 'ascii') {
    readme += `\`\`\`
╔══════════════════════════════════════════╗
║  ${(profile.name || profile.username).toUpperCase().padEnd(38)}  ║
╚══════════════════════════════════════════╝
\`\`\`

<div align="center">

`;
  }

  // Typing animation
  if (config.showTypingAnimation && options.tagline) {
    readme += `[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=${config.typingColor || '36BCF7'}&center=true&vCenter=true&width=435&lines=${encodeURIComponent(options.tagline)})](https://git.io/typing-svg)

`;
  }

  readme += `</div>

`;

  // About section
  if (config.sections.about) {
    readme += `## About Me

${options.bio || profile.bio || ''}

- 📍 ${profile.location || 'Location not specified'}
- 🏢 ${profile.company || 'Independent developer'}
- 👥 ${profile.followers} followers · ${profile.following} following
- 📦 ${profile.publicRepos} public repositories · ⭐ ${totalStars} stars

`;
  }

  // Tech Stack
  if (config.sections.techStack && topLanguages.length > 0) {
    readme += `## Tech Stack

<div align="center">

${topLanguages.map(lang => {
  const badge = lang.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `![${lang}](https://img.shields.io/badge/-${encodeURIComponent(lang)}-${config.badgeColor || '36BCF7'}?style=${config.badgeStyle}&logo=${badge}&logoColor=white)`;
}).join(' ')}

</div>

`;
  }

  // Stats
  if (config.sections.stats && options.includeStats) {
    readme += `## GitHub Stats

<div align="center">

`;
    if (config.showStats) {
      readme += `<img src="https://github-readme-stats.vercel.app/api?username=${profile.username}&show_icons=true&theme=${config.statsTheme}&hide_border=true" alt="GitHub Stats" />

`;
    }
    if (config.showStreak) {
      readme += `<img src="https://github-readme-streak-stats.herokuapp.com/?user=${profile.username}&theme=${config.statsTheme}&hide_border=true" alt="GitHub Streak" />

`;
    }
    if (config.showLanguages) {
      readme += `<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.username}&layout=compact&theme=${config.statsTheme}&hide_border=true" alt="Top Languages" />

`;
    }
    readme += `</div>

`;
  }

  // Connect
  if (config.sections.connect) {
    readme += `## Connect

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-${config.badgeColor || '181717'}?style=${config.badgeStyle}&logo=github&logoColor=white)](https://github.com/${profile.username})
${profile.twitter ? `[![Twitter](https://img.shields.io/badge/Twitter-${config.badgeColor || '1DA1F2'}?style=${config.badgeStyle}&logo=twitter&logoColor=white)](https://twitter.com/${profile.twitter})` : ''}
${profile.blog ? `[![Website](https://img.shields.io/badge/Website-${config.badgeColor || 'FF7139'}?style=${config.badgeStyle}&logo=safari&logoColor=white)](${profile.blog})` : ''}

</div>

`;
  }

  // Footer
  if (config.footer) {
    readme += `---

<div align="center">

${config.footer}

</div>
`;
  } else if (config.headerStyle === 'banner') {
    readme += `---

![Footer](https://capsule-render.vercel.app/api?type=waving&color=${config.headerColor || 'gradient'}&height=100&section=footer)
`;
  }

  return readme;
}

export function generateSampleThemeFile(): string {
  return JSON.stringify(defaultConfig, null, 2);
}
