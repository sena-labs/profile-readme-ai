import type { GitHubAnalysis } from '../services/github.js';

export interface TemplateOptions {
  theme: string;
  bio: string;
  tagline: string;
  includeStats: boolean;
}

const techBadges: Record<string, string> = {
  JavaScript: 'javascript',
  TypeScript: 'typescript',
  Python: 'python',
  Java: 'java',
  'C++': 'cplusplus',
  'C#': 'csharp',
  Go: 'go',
  Rust: 'rust',
  Ruby: 'ruby',
  PHP: 'php',
  Swift: 'swift',
  Kotlin: 'kotlin',
  Dart: 'dart',
  Scala: 'scala',
  Shell: 'gnubash',
  PowerShell: 'powershell',
  HTML: 'html5',
  CSS: 'css3',
  Vue: 'vuedotjs',
  React: 'react',
  Angular: 'angular',
  Svelte: 'svelte',
};

function getTechBadge(lang: string): string {
  const badge = techBadges[lang] || lang.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `![${lang}](https://img.shields.io/badge/-${encodeURIComponent(lang)}-05122A?style=flat&logo=${badge})`;
}

export function generateReadme(analysis: GitHubAnalysis, options: TemplateOptions): string {
  switch (options.theme) {
    case 'hacker':
      return generateHackerTheme(analysis, options);
    case 'creative':
      return generateCreativeTheme(analysis, options);
    case 'corporate':
      return generateCorporateTheme(analysis, options);
    case 'retro':
      return generateRetroTheme(analysis, options);
    case 'neon':
      return generateNeonTheme(analysis, options);
    case 'dark':
      return generateDarkTheme(analysis, options);
    case 'light':
      return generateLightTheme(analysis, options);
    case 'minimal':
    default:
      return generateMinimalTheme(analysis, options);
  }
}

function generateMinimalTheme(analysis: GitHubAnalysis, options: TemplateOptions): string {
  const { profile, topLanguages, totalStars, pinnedRepos } = analysis;
  
  let readme = `# Hi there 👋 I'm ${profile.name || profile.username}

${options.bio || profile.bio || ''}

`;

  if (profile.location || profile.company) {
    readme += `📍 ${profile.location || ''} ${profile.company ? `@ ${profile.company}` : ''}\n\n`;
  }

  // Tech Stack
  if (topLanguages.length > 0) {
    readme += `## 🛠 Tech Stack\n\n`;
    readme += topLanguages.map(lang => getTechBadge(lang)).join(' ') + '\n\n';
  }

  // Stats
  if (options.includeStats) {
    readme += `## 📊 GitHub Stats\n\n`;
    readme += `<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${profile.username}&show_icons=true&theme=default&hide_border=true" alt="GitHub Stats" />
</p>\n\n`;
    readme += `<p align="center">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.username}&layout=compact&theme=default&hide_border=true" alt="Top Languages" />
</p>\n\n`;
  }

  // Connect
  readme += `## 🤝 Connect\n\n`;
  readme += `[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github)](https://github.com/${profile.username})`;
  
  if (profile.twitter) {
    readme += ` [![Twitter](https://img.shields.io/badge/-Twitter-1DA1F2?style=flat&logo=twitter&logoColor=white)](https://twitter.com/${profile.twitter})`;
  }
  if (profile.blog) {
    readme += ` [![Website](https://img.shields.io/badge/-Website-000000?style=flat&logo=safari&logoColor=white)](${profile.blog})`;
  }

  readme += `\n\n---\n\n`;
  readme += `⭐ From [${profile.username}](https://github.com/${profile.username})`;

  return readme;
}

function generateHackerTheme(analysis: GitHubAnalysis, options: TemplateOptions): string {
  const { profile, topLanguages } = analysis;
  
  let readme = `\`\`\`
 _____  _____  _____  _____  _____  __     _____
|  _  || __  ||     ||   __||     ||  |   |   __|
|   __||    -||  |  ||   __||_|_|_||  |__ |   __|
|__|   |__|__||_____||__|   |_____|_____|_|_____|

\`\`\`

## > whoami

\`\`\`bash
$ cat /etc/profile/${profile.username}
\`\`\`

\`\`\`yaml
name: "${profile.name || profile.username}"
location: "${profile.location || 'Earth'}"
role: "${options.tagline || 'Developer'}"
bio: "${options.bio || profile.bio || 'Building stuff'}"
\`\`\`

## > ls skills/

\`\`\`bash
${topLanguages.map(lang => `drwxr-xr-x  ${lang}`).join('\n')}
\`\`\`

`;

  if (options.includeStats) {
    readme += `## > git log --oneline

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${profile.username}&show_icons=true&theme=dark&hide_border=true&bg_color=0d1117" alt="Stats" />
</p>

<p align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${profile.username}&theme=dark&hide_border=true&background=0d1117" alt="Streak" />
</p>

`;
  }

  readme += `## > cat contact.txt

\`\`\`
github   :: https://github.com/${profile.username}
${profile.twitter ? `twitter  :: https://twitter.com/${profile.twitter}` : ''}
${profile.blog ? `website  :: ${profile.blog}` : ''}
\`\`\`

---

\`\`\`
[${profile.username}@github ~]$ exit
\`\`\`
`;

  return readme;
}

function generateCreativeTheme(analysis: GitHubAnalysis, options: TemplateOptions): string {
  const { profile, topLanguages } = analysis;
  
  let readme = `<div align="center">

# ✨ ${profile.name || profile.username} ✨

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=F75C7E&center=true&vCenter=true&width=435&lines=${encodeURIComponent(options.tagline || 'Welcome to my profile!')})](https://git.io/typing-svg)

${options.bio || profile.bio || ''}

</div>

---

## 🚀 About Me

- 📍 Based in **${profile.location || 'Planet Earth'}**
- 💼 ${profile.company ? `Working at **${profile.company}**` : 'Open to opportunities'}
- 🌱 Always learning and growing

## 🎨 Tech Stack

<div align="center">

${topLanguages.map(lang => getTechBadge(lang)).join(' ')}

</div>

`;

  if (options.includeStats) {
    readme += `## 📈 Stats

<div align="center">

<img src="https://github-readme-stats.vercel.app/api?username=${profile.username}&show_icons=true&theme=radical&hide_border=true" alt="GitHub Stats" />

<img src="https://github-readme-streak-stats.herokuapp.com/?user=${profile.username}&theme=radical&hide_border=true" alt="GitHub Streak" />

</div>

`;
  }

  readme += `## 🌐 Let's Connect!

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/${profile.username})
${profile.twitter ? `[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/${profile.twitter})` : ''}
${profile.blog ? `[![Website](https://img.shields.io/badge/Website-FF7139?style=for-the-badge&logo=firefox&logoColor=white)](${profile.blog})` : ''}

</div>

---

<div align="center">

### 💜 Thanks for visiting!

![Profile Views](https://komarev.com/ghpvc/?username=${profile.username}&color=blueviolet&style=flat-square)

</div>
`;

  return readme;
}

function generateCorporateTheme(analysis: GitHubAnalysis, options: TemplateOptions): string {
  const { profile, topLanguages, totalStars } = analysis;
  
  let readme = `# ${profile.name || profile.username}

**${options.tagline || 'Software Developer'}**

${options.bio || profile.bio || ''}

---

## Professional Summary

| | |
|---|---|
| 📍 Location | ${profile.location || 'Not specified'} |
| 🏢 Company | ${profile.company || 'Independent'} |
| 📂 Repositories | ${profile.publicRepos} |
| ⭐ Total Stars | ${totalStars} |
| 👥 Followers | ${profile.followers} |

## Technical Expertise

${topLanguages.map(lang => `- ${lang}`).join('\n')}

`;

  if (options.includeStats) {
    readme += `## GitHub Analytics

<p>
  <img src="https://github-readme-stats.vercel.app/api?username=${profile.username}&show_icons=true&theme=graywhite&hide_border=true" alt="GitHub Statistics" />
</p>

`;
  }

  readme += `## Contact

- **GitHub**: [github.com/${profile.username}](https://github.com/${profile.username})
${profile.twitter ? `- **Twitter**: [@${profile.twitter}](https://twitter.com/${profile.twitter})` : ''}
${profile.blog ? `- **Website**: [${profile.blog}](${profile.blog})` : ''}

---

*Open to collaborations and opportunities.*
`;

  return readme;
}

// ==================== RETRO THEME ====================
function generateRetroTheme(analysis: GitHubAnalysis, options: TemplateOptions): string {
  const { profile, topLanguages, totalStars } = analysis;
  
  const pixelArt = `
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░█░█░█▀▀░█░░░█░░░█▀█░░░█░█░█▀█░█▀▄░█░░░█▀▄░█░░░█▀▀░░░░░░░░
░░█▀█░█▀▀░█░░░█░░░█░█░░░█▄█░█░█░█▀▄░█░░░█░█░▀░░░▀▀█░░░░░░░░
░░▀░▀░▀▀▀░▀▀▀░▀▀▀░▀▀▀░░░▀░▀░▀▀▀░▀░▀░▀▀▀░▀▀░░▀░░░▀▀▀░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
`;

  let readme = `\`\`\`
${pixelArt}
\`\`\`

<div align="center">

## 🕹️ PLAYER STATS 🕹️

\`\`\`
╔════════════════════════════════════════╗
║  PLAYER: ${(profile.name || profile.username).padEnd(28)} ║
║  LEVEL:  ${String(profile.publicRepos).padEnd(28)} ║
║  XP:     ${String(totalStars + ' ⭐').padEnd(28)} ║
║  GUILD:  ${(profile.company || 'Solo').padEnd(28)} ║
║  ZONE:   ${(profile.location || 'Unknown').padEnd(28)} ║
╚════════════════════════════════════════╝
\`\`\`

</div>

## 🎮 SKILLS UNLOCKED

\`\`\`
`;

  topLanguages.forEach((lang, i) => {
    const bar = '█'.repeat(Math.min(10 - i * 2, 10));
    readme += `[${lang.padEnd(12)}] ${bar}\n`;
  });

  readme += `\`\`\`

`;

  if (options.includeStats) {
    readme += `## 📊 ACHIEVEMENTS

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${profile.username}&show_icons=true&theme=gruvbox&hide_border=true" alt="Stats" />
</p>

`;
  }

  readme += `## 🔗 LINKS

\`\`\`
> github.com/${profile.username}
${profile.twitter ? `> twitter.com/${profile.twitter}` : ''}
${profile.blog ? `> ${profile.blog}` : ''}
\`\`\`

---

<div align="center">

**INSERT COIN TO CONTINUE...**

![Visitors](https://komarev.com/ghpvc/?username=${profile.username}&color=orange&style=pixel)

</div>
`;

  return readme;
}

// ==================== NEON THEME ====================
function generateNeonTheme(analysis: GitHubAnalysis, options: TemplateOptions): string {
  const { profile, topLanguages } = analysis;
  
  let readme = `<div align="center">

![Header](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=${encodeURIComponent(profile.name || profile.username)}&fontSize=80&fontColor=fff&animation=twinkling&fontAlignY=35)

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Orbitron&size=25&pause=1000&color=00F7FF&center=true&vCenter=true&width=600&lines=${encodeURIComponent(options.tagline || 'Welcome to my neon world!')})](https://git.io/typing-svg)

</div>

---

<img align="right" width="400" src="https://github-readme-stats.vercel.app/api?username=${profile.username}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0D1117" />

## ⚡ ABOUT ME

\`\`\`javascript
const ${profile.username} = {
  location: "${profile.location || 'Cyberspace'}",
  company: "${profile.company || 'Independent'}",
  languages: [${topLanguages.map(l => `"${l}"`).join(', ')}],
  currentFocus: "Building the future",
  funFact: "I code in neon lights"
};
\`\`\`

<br clear="both">

## 💠 TECH ARSENAL

<div align="center">

${topLanguages.map(lang => `![${lang}](https://img.shields.io/badge/${encodeURIComponent(lang)}-00F7FF?style=for-the-badge&logo=${techBadges[lang] || lang.toLowerCase()}&logoColor=black)`).join(' ')}

</div>

`;

  if (options.includeStats) {
    readme += `## 📈 POWER LEVELS

<div align="center">

<img src="https://github-readme-streak-stats.herokuapp.com/?user=${profile.username}&theme=tokyonight&hide_border=true&background=0D1117" alt="Streak" />

<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.username}&layout=compact&theme=tokyonight&hide_border=true&bg_color=0D1117" alt="Languages" />

</div>

`;
  }

  readme += `## 🌐 CONNECT

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-0D1117?style=for-the-badge&logo=github&logoColor=00F7FF)](https://github.com/${profile.username})
${profile.twitter ? `[![Twitter](https://img.shields.io/badge/Twitter-0D1117?style=for-the-badge&logo=twitter&logoColor=00F7FF)](https://twitter.com/${profile.twitter})` : ''}
${profile.blog ? `[![Website](https://img.shields.io/badge/Website-0D1117?style=for-the-badge&logo=safari&logoColor=00F7FF)](${profile.blog})` : ''}

</div>

---

![Footer](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer)
`;

  return readme;
}

// ==================== DARK THEME ====================
function generateDarkTheme(analysis: GitHubAnalysis, options: TemplateOptions): string {
  const { profile, topLanguages, totalStars } = analysis;
  
  let readme = `<div align="center">

# ${profile.name || profile.username}

![Dark Banner](https://capsule-render.vercel.app/api?type=rect&color=0D1117&height=1)

*${options.bio || profile.bio || 'Building in the shadows'}*

![GitHub followers](https://img.shields.io/github/followers/${profile.username}?style=flat&color=181717&labelColor=0D1117)
![GitHub stars](https://img.shields.io/github/stars/${profile.username}?style=flat&color=181717&labelColor=0D1117&affiliations=OWNER)

</div>

---

### 🖤 About

| | |
|:--|:--|
| 📍 | ${profile.location || 'Unknown'} |
| 🏢 | ${profile.company || 'Independent'} |
| 📦 | ${profile.publicRepos} repositories |
| ⭐ | ${totalStars} total stars |

### 🛠️ Stack

${topLanguages.map(lang => `![${lang}](https://img.shields.io/badge/-${encodeURIComponent(lang)}-0D1117?style=flat-square&logo=${techBadges[lang] || lang.toLowerCase()}&logoColor=white)`).join(' ')}

`;

  if (options.includeStats) {
    readme += `### 📊 Stats

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${profile.username}&show_icons=true&theme=dark&hide_border=true&bg_color=0D1117&title_color=ffffff&text_color=9f9f9f&icon_color=ffffff" width="49%" />
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${profile.username}&theme=dark&hide_border=true&background=0D1117&stroke=ffffff&ring=ffffff&fire=ffffff&currStreakLabel=ffffff" width="49%" />
</p>

`;
  }

  readme += `### 🔗 Links

[![GitHub](https://img.shields.io/badge/-${profile.username}-181717?style=flat-square&logo=github)](https://github.com/${profile.username})
${profile.twitter ? `[![Twitter](https://img.shields.io/badge/-@${profile.twitter}-181717?style=flat-square&logo=twitter)](https://twitter.com/${profile.twitter})` : ''}
${profile.blog ? `[![Website](https://img.shields.io/badge/-Website-181717?style=flat-square&logo=safari)](${profile.blog})` : ''}

---

<div align="center">

![Views](https://komarev.com/ghpvc/?username=${profile.username}&color=181717&style=flat-square&label=Profile+Views)

</div>
`;

  return readme;
}

// ==================== LIGHT THEME ====================
function generateLightTheme(analysis: GitHubAnalysis, options: TemplateOptions): string {
  const { profile, topLanguages, totalStars } = analysis;
  
  let readme = `<div align="center">

# 👋 Hello, I'm ${profile.name || profile.username}!

${options.bio || profile.bio || ''}

[![GitHub](https://img.shields.io/badge/GitHub-Follow-blue?style=social&logo=github)](https://github.com/${profile.username})
${profile.twitter ? `[![Twitter](https://img.shields.io/twitter/follow/${profile.twitter}?style=social)](https://twitter.com/${profile.twitter})` : ''}

</div>

---

## 🌟 About Me

- 📍 **Location:** ${profile.location || 'Somewhere on Earth'}
- 🏢 **Company:** ${profile.company || 'Open to opportunities'}
- 📚 **Repositories:** ${profile.publicRepos}
- ⭐ **Stars Earned:** ${totalStars}

## 🛠️ Technologies

<p align="center">

${topLanguages.map(lang => `<img src="https://img.shields.io/badge/-${encodeURIComponent(lang)}-f0f0f0?style=for-the-badge&logo=${techBadges[lang] || lang.toLowerCase()}&logoColor=333" />`).join('\n')}

</p>

`;

  if (options.includeStats) {
    readme += `## 📈 GitHub Stats

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${profile.username}&show_icons=true&theme=default&hide_border=true&bg_color=ffffff" alt="GitHub Stats" />
</p>

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.username}&layout=compact&theme=default&hide_border=true&bg_color=ffffff" alt="Top Languages" />
</p>

`;
  }

  readme += `## 📫 Get in Touch

<p align="center">

[![Email](https://img.shields.io/badge/Email-Contact-blue?style=flat-square&logo=gmail)](mailto:)
[![GitHub](https://img.shields.io/badge/GitHub-Profile-black?style=flat-square&logo=github)](https://github.com/${profile.username})
${profile.blog ? `[![Website](https://img.shields.io/badge/Website-Visit-green?style=flat-square&logo=safari)](${profile.blog})` : ''}

</p>

---

<div align="center">

*Thanks for stopping by!* 😊

![Visitors](https://komarev.com/ghpvc/?username=${profile.username}&color=blue&style=flat-square)

</div>
`;

  return readme;
}
