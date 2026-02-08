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
