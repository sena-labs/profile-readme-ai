import type { GitHubAnalysis } from '../services/github.js';
import { sanitizeUrl } from '../utils/path-validation.js';

export interface TemplateOptions {
  theme: string;
  bio: string;
  tagline: string;
  includeStats: boolean;
}

// Service URLs — using reliable mirrors to avoid rate limit issues on the main instances
const SERVICES = {
  stats: 'https://github-readme-stats-sigma-five.vercel.app',
  streak: 'https://github-readme-streak-stats.herokuapp.com',
  capsule: 'https://capsule-render.vercel.app',
  trophy: 'https://github-profile-trophy-fork-two.vercel.app',
  activity: 'https://github-readme-activity-graph.vercel.app',
  summary: 'https://github-profile-summary-cards.vercel.app',
  typing: 'https://readme-typing-svg.demolab.com',
};

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

/**
 * Safely encode text for use in URLs
 */
function safeUrlEncode(text: string): string {
  return encodeURIComponent(text).replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16).toUpperCase());
}

/**
 * Sanitize text for safe inclusion in generated markdown
 */
function sanitizeText(text: string | null | undefined, maxLength = 500): string {
  if (!text) return '';
  // Remove potential markdown injection and limit length
  return text
    .replace(/[\[\]<>]/g, '')
    .slice(0, maxLength);
}

function getTechBadge(lang: string): string {
  const badge = techBadges[lang] || lang.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `![${sanitizeText(lang, 30)}](https://img.shields.io/badge/-${safeUrlEncode(lang)}-05122A?style=flat&logo=${badge})`;
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
  const u = profile.username;
  const name = profile.name || u;
  
  let readme = `<div align="center">

![Header](${SERVICES.capsule}/api?type=waving&color=0:667eea,100:764ba2&height=120&section=header&text=${safeUrlEncode(name)}&fontSize=32&fontColor=fff&animation=fadeIn&fontAlignY=38)

### ${options.tagline || `@${u}`}

${options.bio || profile.bio || ''}

`;

  // Quick info badges
  const infoBadges = [];
  if (profile.location) infoBadges.push(`![Location](https://img.shields.io/badge/📍-${safeUrlEncode(profile.location)}-lightgrey?style=flat)`);
  if (profile.company) infoBadges.push(`![Company](https://img.shields.io/badge/🏢-${safeUrlEncode(profile.company)}-lightgrey?style=flat)`);
  infoBadges.push(`![Repos](https://img.shields.io/badge/📦-${profile.publicRepos}_repos-blue?style=flat)`);
  infoBadges.push(`![Stars](https://img.shields.io/badge/⭐-${totalStars}_stars-yellow?style=flat)`);
  
  readme += infoBadges.join(' ') + '\n\n</div>\n\n';

  // Tech Stack
  if (topLanguages.length > 0) {
    readme += `## 🛠 Tech Stack\n\n<div align="center">\n\n`;
    readme += topLanguages.map(lang => `![${lang}](https://img.shields.io/badge/-${safeUrlEncode(lang)}-05122A?style=for-the-badge&logo=${techBadges[lang] || lang.toLowerCase().replace(/[^a-z0-9]/g, '')}&logoColor=white)`).join(' ') + '\n\n</div>\n\n';
  }

  // Stats
  if (options.includeStats) {
    readme += `## 📊 GitHub Stats\n\n<div align="center">\n\n`;
    readme += `<img src="${SERVICES.stats}/api?username=${u}&show_icons=true&theme=default&hide_border=true&border_radius=10" height="165" alt="Stats" />
<img src="${SERVICES.stats}/api/top-langs/?username=${u}&layout=compact&theme=default&hide_border=true&border_radius=10" height="165" alt="Languages" />\n\n`;
    readme += `<img src="${SERVICES.streak}/?user=${u}&theme=default&hide_border=true&border_radius=10" alt="Streak" />\n\n</div>\n\n`;
  }

  // Connect
  readme += `## 🤝 Connect\n\n<div align="center">\n\n`;
  readme += `[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/${u})`;
  if (profile.twitter) readme += ` [![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/${profile.twitter})`;
  if (profile.blog) readme += ` [![Website](https://img.shields.io/badge/Website-FF7139?style=for-the-badge&logo=firefox&logoColor=white)](${sanitizeUrl(profile.blog)})`;
  readme += `\n\n</div>\n\n`;

  // Footer
  readme += `---\n\n<div align="center">\n\n![Footer](${SERVICES.capsule}/api?type=waving&color=0:667eea,100:764ba2&height=80&section=footer)\n\n</div>`;

  return readme;
}

function generateHackerTheme(analysis: GitHubAnalysis, options: TemplateOptions): string {
  const { profile, topLanguages, totalStars } = analysis;
  const u = profile.username;
  
  const asciiHeader = `
██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗██████╗ 
██║  ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗
███████║███████║██║     █████╔╝ █████╗  ██████╔╝
██╔══██║██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗
██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║
╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝`;

  let readme = `<div align="center">\n\n\`\`\`\n${asciiHeader}\n\`\`\`\n\n`;
  readme += `[![Typing SVG](${SERVICES.typing}?font=Fira+Code&size=22&duration=3000&pause=1000&color=00FF00&center=true&vCenter=true&width=500&lines=${safeUrlEncode('> Initializing terminal...')};${safeUrlEncode(`> Welcome, ${profile.name || u}`)};${safeUrlEncode('> Access granted_')})](https://git.io/typing-svg)\n\n</div>\n\n`;

  readme += `## \$ whoami\n\n\`\`\`bash\ncat /etc/passwd | grep ${u}\n\`\`\`\n\n`;
  readme += `\`\`\`yaml\n# ~/.config/developer.yml\nuser:\n  name: "${profile.name || u}"\n  handle: "@${u}"\n  location: "${profile.location || '/dev/null'}"\n  company: "${profile.company || 'self-employed'}"\n  bio: "${sanitizeText(options.bio || profile.bio, 100) || 'Building the future'}"\n  \nstats:\n  repos: ${profile.publicRepos}\n  stars: ${totalStars}\n  followers: ${profile.followers}\n\`\`\`\n\n`;

  readme += `## \$ ls -la ~/skills/\n\n\`\`\`bash\ntotal ${topLanguages.length}\n`;
  topLanguages.forEach((lang, i) => {
    const perms = i === 0 ? 'drwxrwxrwx' : 'drwxr-xr-x';
    const size = String(1000 - i * 100).padStart(4);
    readme += `${perms}  ${u}  ${size}  ${lang}\n`;
  });
  readme += `\`\`\`\n\n`;

  if (options.includeStats) {
    readme += `## \$ neofetch --stats\n\n<div align="center">\n\n`;
    readme += `<img src="${SERVICES.stats}/api?username=${u}&show_icons=true&theme=github_dark&hide_border=true&bg_color=0d1117&title_color=00ff00&icon_color=00ff00&text_color=c9d1d9" height="180" />\n`;
    readme += `<img src="${SERVICES.stats}/api/top-langs/?username=${u}&layout=compact&theme=github_dark&hide_border=true&bg_color=0d1117&title_color=00ff00&text_color=c9d1d9" height="180" />\n\n`;
    readme += `<img src="${SERVICES.streak}/?user=${u}&theme=dark&hide_border=true&background=0d1117&stroke=00ff00&ring=00ff00&fire=ff6600&currStreakLabel=00ff00" />\n\n`;
    readme += `<img src="${SERVICES.activity}/graph?username=${u}&theme=github-compact&hide_border=true&bg_color=0d1117&color=00ff00&line=00ff00&point=ffffff" width="95%" />\n\n</div>\n\n`;
  }

  readme += `## \$ cat ~/.ssh/socials.pub\n\n\`\`\`\n`;
  readme += `github    = git@github.com:${u}\n`;
  if (profile.twitter) readme += `twitter   = @${profile.twitter}\n`;
  if (profile.blog) readme += `website   = ${sanitizeUrl(profile.blog)}\n`;
  readme += `\`\`\`\n\n`;

  readme += `---\n\n<div align="center">\n\n\`\`\`bash\n[${u}@github ~]$ echo "Thanks for visiting!" && exit 0\n\`\`\`\n\n`;
  readme += `![Visitors](https://komarev.com/ghpvc/?username=${u}&color=00ff00&style=flat-square&label=VISITORS)\n\n</div>`;

  return readme;
}

function generateCreativeTheme(analysis: GitHubAnalysis, options: TemplateOptions): string {
  const { profile, topLanguages, totalStars, pinnedRepos } = analysis;
  const u = profile.username;
  const name = profile.name || u;
  
  let readme = `<div align="center">\n\n`;
  readme += `![Header](${SERVICES.capsule}/api?type=waving&color=0:fe8c00,50:f83600,100:fe8c00&height=200&section=header&text=${safeUrlEncode(name)}&fontSize=60&fontColor=fff&animation=twinkling&fontAlignY=35&desc=${safeUrlEncode(options.tagline || '✨ Creative Developer ✨')}&descAlignY=55&descSize=18)\n\n`;
  readme += `[![Typing SVG](${SERVICES.typing}?font=Pacifico&size=28&duration=4000&pause=1000&color=F83600&center=true&vCenter=true&width=600&lines=${safeUrlEncode('Welcome to my creative space!')};${safeUrlEncode(options.bio || profile.bio || 'Building beautiful things')};${safeUrlEncode('✨ Let\'s create together! ✨')})](https://git.io/typing-svg)\n\n`;
  
  // Animated badges row
  readme += `![Stars](https://img.shields.io/badge/⭐_Stars-${totalStars}-F83600?style=for-the-badge&labelColor=1a1a2e) `;
  readme += `![Repos](https://img.shields.io/badge/📦_Repos-${profile.publicRepos}-fe8c00?style=for-the-badge&labelColor=1a1a2e) `;
  readme += `![Followers](https://img.shields.io/badge/👥_Followers-${profile.followers}-F83600?style=for-the-badge&labelColor=1a1a2e)\n\n</div>\n\n`;

  // About section with emojis
  readme += `## ✨ About Me\n\n`;
  readme += `<img align="right" width="300" src="${SERVICES.stats}/api/top-langs/?username=${u}&layout=donut&theme=radical&hide_border=true&bg_color=1a1a2e" />\n\n`;
  readme += `- 🌍 **Location:** ${profile.location || 'Somewhere creative'}\n`;
  readme += `- 🏢 **Company:** ${profile.company || 'Freelance Creator'}\n`;
  readme += `- 🎨 **Focus:** Building beautiful & functional apps\n`;
  readme += `- 💫 **Motto:** *"Code is poetry"*\n\n`;
  readme += `<br clear="both"/>\n\n`;

  // Tech Stack with colorful badges
  readme += `## 🎨 Tech Palette\n\n<div align="center">\n\n`;
  const colors = ['F83600', 'fe8c00', 'F83600', 'fe8c00', 'F83600'];
  readme += topLanguages.map((lang, i) => `![${lang}](https://img.shields.io/badge/-${safeUrlEncode(lang)}-${colors[i % colors.length]}?style=for-the-badge&logo=${techBadges[lang] || lang.toLowerCase().replace(/[^a-z0-9]/g, '')}&logoColor=white)`).join(' ') + '\n\n</div>\n\n';

  if (options.includeStats) {
    readme += `## 📊 GitHub Stats\n\n<div align="center">\n\n`;
    readme += `<img src="${SERVICES.stats}/api?username=${u}&show_icons=true&theme=radical&hide_border=true&bg_color=1a1a2e&border_radius=15" height="180" />\n`;
    readme += `<img src="${SERVICES.streak}/?user=${u}&theme=radical&hide_border=true&background=1a1a2e&border_radius=15" height="180" />\n\n`;
    // Trophy row
    readme += `<img src="${SERVICES.trophy}/?username=${u}&theme=radical&no-frame=true&no-bg=true&row=1&column=6" width="100%" />\n\n`;
    readme += `<img src="${SERVICES.activity}/graph?username=${u}&theme=redical&hide_border=true&bg_color=1a1a2e&area=true" width="95%" />\n\n</div>\n\n`;
  }

  readme += `## 🌐 Let's Connect!\n\n<div align="center">\n\n`;
  readme += `[![GitHub](https://img.shields.io/badge/GitHub-F83600?style=for-the-badge&logo=github&logoColor=white)](https://github.com/${u})`;
  if (profile.twitter) readme += ` [![Twitter](https://img.shields.io/badge/Twitter-fe8c00?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/${profile.twitter})`;
  if (profile.blog) readme += ` [![Website](https://img.shields.io/badge/Website-F83600?style=for-the-badge&logo=safari&logoColor=white)](${sanitizeUrl(profile.blog)})`;
  readme += `\n\n</div>\n\n`;

  // Footer
  readme += `---\n\n<div align="center">\n\n`;
  readme += `![Visitors](https://komarev.com/ghpvc/?username=${u}&color=F83600&style=for-the-badge&label=VISITORS)\n\n`;
  readme += `![Footer](${SERVICES.capsule}/api?type=waving&color=0:fe8c00,50:f83600,100:fe8c00&height=100&section=footer)\n\n</div>`;

  return readme;
}

function generateCorporateTheme(analysis: GitHubAnalysis, options: TemplateOptions): string {
  const { profile, topLanguages, totalStars } = analysis;
  const u = profile.username;
  const name = profile.name || u;
  
  let readme = `<div align="center">\n\n`;
  readme += `![Header](${SERVICES.capsule}/api?type=rect&color=0:1a365d,100:2d3748&height=120&section=header&text=${safeUrlEncode(name)}&fontSize=40&fontColor=fff&fontAlignY=50)\n\n`;
  readme += `### ${options.tagline || 'Software Engineer'}\n\n`;
  readme += `*${options.bio || profile.bio || 'Delivering quality software solutions'}*\n\n`;
  
  // Professional badges
  readme += `![Experience](https://img.shields.io/badge/Repositories-${profile.publicRepos}-1a365d?style=flat-square) `;
  readme += `![Stars](https://img.shields.io/badge/Stars-${totalStars}-1a365d?style=flat-square) `;
  readme += `![Network](https://img.shields.io/badge/Followers-${profile.followers}-1a365d?style=flat-square)\n\n</div>\n\n`;
  
  readme += `---\n\n`;

  // Professional Summary in clean format
  readme += `## Professional Profile\n\n`;
  readme += `| Field | Details |\n|:------|:--------|\n`;
  readme += `| **Name** | ${name} |\n`;
  readme += `| **Location** | ${profile.location || 'Remote'} |\n`;
  readme += `| **Organization** | ${profile.company || 'Independent Consultant'} |\n`;
  readme += `| **Public Repositories** | ${profile.publicRepos} |\n`;
  readme += `| **Total Stars** | ${totalStars} |\n\n`;

  // Technical Expertise with clean badges
  readme += `## Technical Expertise\n\n<div align="center">\n\n`;
  readme += topLanguages.map(lang => `![${lang}](https://img.shields.io/badge/-${safeUrlEncode(lang)}-1a365d?style=flat-square&logo=${techBadges[lang] || lang.toLowerCase().replace(/[^a-z0-9]/g, '')}&logoColor=white)`).join(' ') + '\n\n</div>\n\n';

  if (options.includeStats) {
    readme += `## Performance Metrics\n\n<div align="center">\n\n`;
    readme += `<img src="${SERVICES.stats}/api?username=${u}&show_icons=true&theme=graywhite&hide_border=true&icon_color=1a365d&title_color=1a365d" height="170" />\n`;
    readme += `<img src="${SERVICES.stats}/api/top-langs/?username=${u}&layout=compact&theme=graywhite&hide_border=true&title_color=1a365d" height="170" />\n\n`;
    readme += `<img src="${SERVICES.summary}/api/cards/profile-details?username=${u}&theme=default" width="100%" />\n\n</div>\n\n`;
  }

  readme += `## Contact Information\n\n`;
  readme += `<div align="center">\n\n`;
  readme += `[![GitHub](https://img.shields.io/badge/GitHub-1a365d?style=for-the-badge&logo=github&logoColor=white)](https://github.com/${u})`;
  if (profile.twitter) readme += ` [![Twitter](https://img.shields.io/badge/Twitter-1a365d?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/${profile.twitter})`;
  if (profile.blog) readme += ` [![Website](https://img.shields.io/badge/Website-1a365d?style=for-the-badge&logo=safari&logoColor=white)](${sanitizeUrl(profile.blog)})`;
  readme += `\n\n</div>\n\n`;

  readme += `---\n\n<div align="center">\n\n*Open to collaborations and consulting opportunities*\n\n`;
  readme += `![Footer](${SERVICES.capsule}/api?type=rect&color=0:1a365d,100:2d3748&height=60&section=footer)\n\n</div>`;

  return readme;
}

// ==================== RETRO THEME ====================
function generateRetroTheme(analysis: GitHubAnalysis, options: TemplateOptions): string {
  const { profile, topLanguages, totalStars } = analysis;
  const u = profile.username;
  const name = profile.name || u;

  let readme = `<div align="center">\n\n`;
  readme += `![Header](${SERVICES.capsule}/api?type=waving&color=0:b8860b,50:daa520,100:ffd700&height=150&section=header&text=${safeUrlEncode('🎮 ' + name + ' 🎮')}&fontSize=40&fontColor=000&animation=fadeIn&fontAlignY=35)\n\n`;
  
  readme += `\`\`\`\n`;
  readme += `╔══════════════════════════════════════════════════╗\n`;
  readme += `║     🕹️  R E T R O   G A M E R   S T A T S  🕹️      ║\n`;
  readme += `╠══════════════════════════════════════════════════╣\n`;
  readme += `║  PLAYER   │ ${name.padEnd(35)} ║\n`;
  readme += `║  LEVEL    │ ${String(profile.publicRepos + ' REPOS').padEnd(35)} ║\n`;
  readme += `║  XP       │ ${String(totalStars + ' ★ STARS').padEnd(35)} ║\n`;
  readme += `║  GUILD    │ ${(profile.company || 'SOLO PLAYER').padEnd(35)} ║\n`;
  readme += `║  ZONE     │ ${(profile.location || 'WORLD 1-1').padEnd(35)} ║\n`;
  readme += `╚══════════════════════════════════════════════════╝\n`;
  readme += `\`\`\`\n\n</div>\n\n`;

  // Skills as progress bars
  readme += `## 🎮 SKILLS UNLOCKED\n\n\`\`\`\n`;
  topLanguages.forEach((lang, i) => {
    const level = 10 - i;
    const filled = '█'.repeat(level);
    const empty = '░'.repeat(10 - level);
    readme += `${lang.padEnd(12)} [${filled}${empty}] LVL ${level}\n`;
  });
  readme += `\`\`\`\n\n`;

  // Tech badges retro style
  readme += `<div align="center">\n\n`;
  readme += topLanguages.map(lang => `![${lang}](https://img.shields.io/badge/-${safeUrlEncode(lang)}-daa520?style=flat-square&logo=${techBadges[lang] || lang.toLowerCase().replace(/[^a-z0-9]/g, '')}&logoColor=black)`).join(' ') + '\n\n</div>\n\n';

  if (options.includeStats) {
    readme += `## 🏆 ACHIEVEMENTS\n\n<div align="center">\n\n`;
    readme += `<img src="${SERVICES.stats}/api?username=${u}&show_icons=true&theme=gruvbox&hide_border=true&bg_color=282828" height="165" />\n`;
    readme += `<img src="${SERVICES.streak}/?user=${u}&theme=gruvbox&hide_border=true&background=282828" height="165" />\n\n`;
    readme += `<img src="${SERVICES.trophy}/?username=${u}&theme=gruvbox&no-frame=true&no-bg=true&row=1&column=6" width="100%" />\n\n</div>\n\n`;
  }

  readme += `## 🔗 WARP ZONE\n\n<div align="center">\n\n`;
  readme += `[![GitHub](https://img.shields.io/badge/GITHUB-daa520?style=for-the-badge&logo=github&logoColor=black)](https://github.com/${u})`;
  if (profile.twitter) readme += ` [![Twitter](https://img.shields.io/badge/TWITTER-daa520?style=for-the-badge&logo=twitter&logoColor=black)](https://twitter.com/${profile.twitter})`;
  if (profile.blog) readme += ` [![Website](https://img.shields.io/badge/WEBSITE-daa520?style=for-the-badge&logo=safari&logoColor=black)](${sanitizeUrl(profile.blog)})`;
  readme += `\n\n</div>\n\n`;

  readme += `---\n\n<div align="center">\n\n`;
  readme += `**🎮 INSERT COIN TO CONTINUE 🎮**\n\n`;
  readme += `![Visitors](https://komarev.com/ghpvc/?username=${u}&color=daa520&style=pixel&label=VISITORS)\n\n`;
  readme += `![Footer](${SERVICES.capsule}/api?type=waving&color=0:b8860b,50:daa520,100:ffd700&height=80&section=footer)\n\n</div>`;

  return readme;
}

// ==================== NEON THEME ====================
function generateNeonTheme(analysis: GitHubAnalysis, options: TemplateOptions): string {
  const { profile, topLanguages, totalStars } = analysis;
  const u = profile.username;
  const name = profile.name || u;
  
  let readme = `<div align="center">\n\n`;
  readme += `![Header](${SERVICES.capsule}/api?type=waving&color=0:0f0c29,50:302b63,100:24243e&height=200&section=header&text=${safeUrlEncode(name)}&fontSize=70&fontColor=00f7ff&animation=twinkling&fontAlignY=35&desc=${safeUrlEncode('⚡ ' + (options.tagline || 'NEON CODER') + ' ⚡')}&descAlignY=55&descSize=20&descColor=ff00ff)\n\n`;
  
  readme += `[![Typing SVG](${SERVICES.typing}?font=Orbitron&size=24&duration=3000&pause=1000&color=00F7FF&center=true&vCenter=true&width=600&lines=${safeUrlEncode('「 WELCOME TO THE GRID 」')};${safeUrlEncode('「 ' + (options.bio || profile.bio || 'BUILDING THE FUTURE') + ' 」')};${safeUrlEncode('「 SYSTEM ONLINE 」')})](https://git.io/typing-svg)\n\n`;
  
  // Neon stat badges
  readme += `![Stars](https://img.shields.io/badge/⭐_${totalStars}-00f7ff?style=for-the-badge&labelColor=0d1117) `;
  readme += `![Repos](https://img.shields.io/badge/📦_${profile.publicRepos}-ff00ff?style=for-the-badge&labelColor=0d1117) `;
  readme += `![Followers](https://img.shields.io/badge/👥_${profile.followers}-00f7ff?style=for-the-badge&labelColor=0d1117)\n\n</div>\n\n`;

  readme += `---\n\n`;

  // Code block with neon aesthetic
  readme += `## ⚡ SYSTEM.INFO\n\n`;
  readme += `\`\`\`typescript\n`;
  readme += `interface Developer {\n`;
  readme += `  name: string;\n`;
  readme += `  location: string;\n`;
  readme += `  status: 'online' | 'coding' | 'sleeping';\n`;
  readme += `  stack: string[];\n`;
  readme += `}\n\n`;
  readme += `const ${u.replace(/-/g, '_')}: Developer = {\n`;
  readme += `  name: "${name}",\n`;
  readme += `  location: "${profile.location || 'THE GRID'}",\n`;
  readme += `  status: "coding",\n`;
  readme += `  stack: [${topLanguages.map(l => `"${l}"`).join(', ')}]\n`;
  readme += `};\n`;
  readme += `\`\`\`\n\n`;

  // Tech badges with neon glow effect colors
  readme += `## 👠 TECH ARSENAL\n\n<div align="center">\n\n`;
  const neonColors = ['00f7ff', 'ff00ff', '00f7ff', 'ff00ff', '00f7ff'];
  readme += topLanguages.map((lang, i) => `![${lang}](https://img.shields.io/badge/${safeUrlEncode(lang)}-${neonColors[i % neonColors.length]}?style=for-the-badge&logo=${techBadges[lang] || lang.toLowerCase().replace(/[^a-z0-9]/g, '')}&logoColor=0d1117)`).join(' ') + '\n\n</div>\n\n';

  if (options.includeStats) {
    readme += `## 📊 POWER LEVELS\n\n<div align="center">\n\n`;
    readme += `<img src="${SERVICES.stats}/api?username=${u}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0d1117&title_color=00f7ff&icon_color=ff00ff&text_color=ffffff" height="180" />\n`;
    readme += `<img src="${SERVICES.streak}/?user=${u}&theme=tokyonight&hide_border=true&background=0d1117&stroke=00f7ff&ring=ff00ff&fire=ff00ff&currStreakLabel=00f7ff" height="180" />\n\n`;
    readme += `<img src="${SERVICES.stats}/api/top-langs/?username=${u}&layout=donut&theme=tokyonight&hide_border=true&bg_color=0d1117&title_color=00f7ff" width="300" />\n\n`;
    readme += `<img src="${SERVICES.activity}/graph?username=${u}&theme=tokyo-night&hide_border=true&bg_color=0d1117&color=00f7ff&line=ff00ff&point=ffffff" width="95%" />\n\n`;
    readme += `<img src="${SERVICES.trophy}/?username=${u}&theme=discord&no-frame=true&no-bg=true&row=1&column=6" width="100%" />\n\n</div>\n\n`;
  }

  readme += `## 🌐 NETWORK\n\n<div align="center">\n\n`;
  readme += `[![GitHub](https://img.shields.io/badge/GITHUB-0d1117?style=for-the-badge&logo=github&logoColor=00f7ff)](https://github.com/${u})`;
  if (profile.twitter) readme += ` [![Twitter](https://img.shields.io/badge/TWITTER-0d1117?style=for-the-badge&logo=twitter&logoColor=ff00ff)](https://twitter.com/${profile.twitter})`;
  if (profile.blog) readme += ` [![Website](https://img.shields.io/badge/WEBSITE-0d1117?style=for-the-badge&logo=safari&logoColor=00f7ff)](${sanitizeUrl(profile.blog)})`;
  readme += `\n\n</div>\n\n`;

  readme += `---\n\n<div align="center">\n\n`;
  readme += `![Visitors](https://komarev.com/ghpvc/?username=${u}&color=00f7ff&style=for-the-badge&label=VISITORS)\n\n`;
  readme += `![Footer](${SERVICES.capsule}/api?type=waving&color=0:0f0c29,50:302b63,100:24243e&height=100&section=footer)\n\n</div>`;

  return readme;
}

// ==================== DARK THEME ====================
function generateDarkTheme(analysis: GitHubAnalysis, options: TemplateOptions): string {
  const { profile, topLanguages, totalStars } = analysis;
  const u = profile.username;
  const name = profile.name || u;

  let readme = `<div align="center">\n\n`;
  readme += `![Header](${SERVICES.capsule}/api?type=waving&color=0:0d1117,50:161b22,100:0d1117&height=180&section=header&text=${safeUrlEncode(name)}&fontSize=50&fontColor=c9d1d9&animation=fadeIn&fontAlignY=35&desc=${safeUrlEncode(options.tagline || '🖤 Building in the shadows')}&descAlignY=55&descSize=16&descColor=8b949e)\n\n`;
  
  readme += `*${options.bio || profile.bio || 'Crafting code in dark mode'}*\n\n`;
  
  // Subtle stat badges
  readme += `![Stars](https://img.shields.io/badge/⭐_${totalStars}-0d1117?style=flat-square&labelColor=161b22) `;
  readme += `![Repos](https://img.shields.io/badge/📦_${profile.publicRepos}-0d1117?style=flat-square&labelColor=161b22) `;
  readme += `![Followers](https://img.shields.io/badge/👥_${profile.followers}-0d1117?style=flat-square&labelColor=161b22)\n\n</div>\n\n`;
  
  readme += `---\n\n`;

  // About section
  readme += `## 🖤 About\n\n`;
  readme += `| | |\n|:--|:--|\n`;
  readme += `| 📍 **Location** | ${profile.location || 'The shadows'} |\n`;
  readme += `| 🏢 **Organization** | ${profile.company || 'Independent'} |\n`;
  readme += `| 📦 **Repositories** | ${profile.publicRepos} |\n`;
  readme += `| ⭐ **Stars** | ${totalStars} |\n\n`;

  // Tech stack
  readme += `## 🛠️ Stack\n\n<div align="center">\n\n`;
  readme += topLanguages.map(lang => `![${lang}](https://img.shields.io/badge/-${safeUrlEncode(lang)}-0d1117?style=for-the-badge&logo=${techBadges[lang] || lang.toLowerCase().replace(/[^a-z0-9]/g, '')}&logoColor=c9d1d9)`).join(' ') + '\n\n</div>\n\n';

  if (options.includeStats) {
    readme += `## 📊 Stats\n\n<div align="center">\n\n`;
    readme += `<img src="${SERVICES.stats}/api?username=${u}&show_icons=true&theme=github_dark&hide_border=true&bg_color=0d1117" height="170" />\n`;
    readme += `<img src="${SERVICES.streak}/?user=${u}&theme=github-dark-blue&hide_border=true&background=0d1117" height="170" />\n\n`;
    readme += `<img src="${SERVICES.stats}/api/top-langs/?username=${u}&layout=compact&theme=github_dark&hide_border=true&bg_color=0d1117" />\n\n`;
    readme += `<img src="${SERVICES.activity}/graph?username=${u}&theme=github-compact&hide_border=true&bg_color=0d1117&color=c9d1d9&line=58a6ff&point=ffffff" width="95%" />\n\n`;
    readme += `<img src="${SERVICES.trophy}/?username=${u}&theme=darkhub&no-frame=true&no-bg=true&row=1&column=6" width="100%" />\n\n</div>\n\n`;
  }

  readme += `## 🔗 Connect\n\n<div align="center">\n\n`;
  readme += `[![GitHub](https://img.shields.io/badge/GitHub-0d1117?style=for-the-badge&logo=github&logoColor=c9d1d9)](https://github.com/${u})`;
  if (profile.twitter) readme += ` [![Twitter](https://img.shields.io/badge/Twitter-0d1117?style=for-the-badge&logo=twitter&logoColor=1da1f2)](https://twitter.com/${profile.twitter})`;
  if (profile.blog) readme += ` [![Website](https://img.shields.io/badge/Website-0d1117?style=for-the-badge&logo=safari&logoColor=c9d1d9)](${sanitizeUrl(profile.blog)})`;
  readme += `\n\n</div>\n\n`;

  readme += `---\n\n<div align="center">\n\n`;
  readme += `![Visitors](https://komarev.com/ghpvc/?username=${u}&color=161b22&style=for-the-badge&label=VISITORS)\n\n`;
  readme += `![Footer](${SERVICES.capsule}/api?type=waving&color=0:0d1117,50:161b22,100:0d1117&height=100&section=footer)\n\n</div>`;

  return readme;
}

// ==================== LIGHT THEME ====================
function generateLightTheme(analysis: GitHubAnalysis, options: TemplateOptions): string {
  const { profile, topLanguages, totalStars } = analysis;
  const u = profile.username;
  const name = profile.name || u;

  let readme = `<div align="center">\n\n`;
  readme += `![Header](${SERVICES.capsule}/api?type=waving&color=0:e0e5ec,50:f0f5fa,100:ffffff&height=150&section=header&text=${safeUrlEncode('👋 ' + name)}&fontSize=40&fontColor=333&animation=fadeIn&fontAlignY=35)\n\n`;
  
  readme += `### ${options.tagline || 'Software Developer'}\n\n`;
  readme += `${options.bio || profile.bio || ''}\n\n`;
  
  // Social badges
  readme += `[![GitHub](https://img.shields.io/github/followers/${u}?label=Follow&style=social)](https://github.com/${u})`;
  if (profile.twitter) readme += ` [![Twitter](https://img.shields.io/twitter/follow/${profile.twitter}?style=social)](https://twitter.com/${profile.twitter})`;
  readme += `\n\n</div>\n\n`;
  
  readme += `---\n\n`;

  // About section with clean cards look
  readme += `## ✨ About Me\n\n`;
  readme += `- 📍 **Location:** ${profile.location || 'Planet Earth'}\n`;
  readme += `- 🏢 **Organization:** ${profile.company || 'Open to opportunities'}\n`;
  readme += `- 📦 **Repositories:** ${profile.publicRepos} public repos\n`;
  readme += `- ⭐ **Stars:** ${totalStars} stars earned\n`;
  readme += `- 👥 **Followers:** ${profile.followers}\n\n`;

  // Tech stack with soft colors
  readme += `## 🛠️ Technologies\n\n<div align="center">\n\n`;
  const lightColors = ['3498db', '2ecc71', '9b59b6', 'e74c3c', 'f39c12'];
  readme += topLanguages.map((lang, i) => `![${lang}](https://img.shields.io/badge/-${safeUrlEncode(lang)}-${lightColors[i % lightColors.length]}?style=for-the-badge&logo=${techBadges[lang] || lang.toLowerCase().replace(/[^a-z0-9]/g, '')}&logoColor=white)`).join(' ') + '\n\n</div>\n\n';

  if (options.includeStats) {
    readme += `## 📊 GitHub Stats\n\n<div align="center">\n\n`;
    readme += `<img src="${SERVICES.stats}/api?username=${u}&show_icons=true&theme=default&hide_border=true&bg_color=ffffff&border_radius=10" height="170" />\n`;
    readme += `<img src="${SERVICES.streak}/?user=${u}&theme=default&hide_border=true&background=ffffff&border_radius=10" height="170" />\n\n`;
    readme += `<img src="${SERVICES.stats}/api/top-langs/?username=${u}&layout=compact&theme=default&hide_border=true&bg_color=ffffff&border_radius=10" />\n\n`;
    readme += `<img src="${SERVICES.summary}/api/cards/profile-details?username=${u}&theme=default" width="100%" />\n\n</div>\n\n`;
  }

  readme += `## 📫 Get in Touch\n\n<div align="center">\n\n`;
  readme += `[![GitHub](https://img.shields.io/badge/GitHub-333?style=for-the-badge&logo=github&logoColor=white)](https://github.com/${u})`;
  if (profile.twitter) readme += ` [![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/${profile.twitter})`;
  if (profile.blog) readme += ` [![Website](https://img.shields.io/badge/Website-4CAF50?style=for-the-badge&logo=safari&logoColor=white)](${sanitizeUrl(profile.blog)})`;
  readme += `\n\n</div>\n\n`;

  readme += `---\n\n<div align="center">\n\n`;
  readme += `*Thanks for visiting!* ✨\n\n`;
  readme += `![Visitors](https://komarev.com/ghpvc/?username=${u}&color=3498db&style=for-the-badge&label=VISITORS)\n\n`;
  readme += `![Footer](${SERVICES.capsule}/api?type=waving&color=0:e0e5ec,50:f0f5fa,100:ffffff&height=80&section=footer)\n\n</div>`;

  return readme;
}
