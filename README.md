<div align="center">

<!-- 3D Header -->
<img src="https://capsule-render.vercel.app/api?type=cylinder&color=0:0d1117,100:161b22&height=150&section=header&text=PROFILE%20README%20AI&fontColor=58a6ff&fontSize=40&animation=fadeIn&fontAlignY=55&desc=&descAlignY=80" width="100%"/>

<!-- Animated Typing -->
<br>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=500&size=22&duration=3000&pause=1000&color=58A6FF&center=true&vCenter=true&multiline=true&repeat=true&width=620&height=80&lines=%24+npx+profile-readme-ai+generate;%E2%9C%94+README.md+generated+successfully)](https://www.npmjs.com/package/profile-readme-ai)

<br>

<!-- Badges Row -->
<a href="https://www.npmjs.com/package/profile-readme-ai"><img src="https://img.shields.io/npm/v/profile-readme-ai?style=for-the-badge&logo=npm&logoColor=white&color=0d1117&labelColor=CB3837" alt="version"></a>&nbsp;
<a href="https://www.npmjs.com/package/profile-readme-ai"><img src="https://img.shields.io/npm/dm/profile-readme-ai?style=for-the-badge&logo=npm&logoColor=white&color=0d1117&labelColor=1e90ff&label=downloads" alt="downloads"></a>&nbsp;
<a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/license-Apache%202.0-0d1117?style=for-the-badge&labelColor=blue" alt="license"></a>&nbsp;
<a href="https://nodejs.org"><img src="https://img.shields.io/badge/node-≥18-0d1117?style=for-the-badge&logo=node.js&logoColor=white&labelColor=339933" alt="node"></a>

<br><br>

<!-- Tagline -->
**Analyze your repos. Detect your stack. Generate a stunning profile.**
<br>
**One command. AI-powered. 8 themes. 10 languages.**

<br>

<!-- Nav -->
<kbd>[⚡ Quick Start](#-quick-start)</kbd>&nbsp;&nbsp;<kbd>[🔄 Pipeline](#-pipeline)</kbd>&nbsp;&nbsp;<kbd>[🎨 Themes](#-themes)</kbd>&nbsp;&nbsp;<kbd>[🧠 AI](#-ai-features)</kbd>&nbsp;&nbsp;<kbd>[📖 Commands](#-commands)</kbd>&nbsp;&nbsp;<kbd>[⚙️ Config](#%EF%B8%8F-configuration)</kbd>

<br>

<!-- Socialify Card -->
<a href="https://github.com/sena-labs/profile-readme-ai">
<img src="https://socialify.git.ci/sena-labs/profile-readme-ai/image?description=1&font=JetBrains%20Mono&forks=1&issues=1&language=1&name=1&owner=1&pattern=Circuit%20Board&pulls=1&stargazers=1&theme=Dark" alt="Project Card" width="700"/>
</a>

</div>

<br>

<img src="https://capsule-render.vercel.app/api?type=rect&color=161b22&height=1" width="100%"/>

## ⚡ Quick Start

```bash
$ npx profile-readme-ai generate
```

> Zero config. Zero install. One command.

<details>
<summary>&nbsp;<code>// more install options</code></summary>
<br>

```bash
# global install
$ npm install -g profile-readme-ai

# use the short alias
$ prai generate -u your-username -t neon

# dry-run: preview without saving
$ prai generate -u your-username --dry-run

# skip AI, just use GitHub data
$ prai generate -u your-username --no-ai
```

</details>

<img src="https://capsule-render.vercel.app/api?type=rect&color=161b22&height=1" width="100%"/>

## 🔄 Pipeline

```
  input               process             enhance             output
  ─────               ───────             ───────             ──────

  GitHub API    ───▶   detect      ───▶   GPT-4o      ───▶   README.md
  ├─ profile          ├─ languages       ├─ bio              ├─ themed
  ├─ repos            ├─ frameworks      ├─ tagline          ├─ badges
  └─ stars            └─ topics          └─ suggestions      └─ stats
```

```typescript
// what happens under the hood
const analysis  = await analyzeGitHubProfile(username);   // fetch + detect
const { bio }   = await generateBio(analysis, apiKey);    // AI enhance
const readme    = generateReadme(analysis, { theme });    // render
await fs.writeFile('README.md', readme);                  // done
```

<img src="https://capsule-render.vercel.app/api?type=rect&color=161b22&height=1" width="100%"/>

## 🎨 Themes

<div align="center">

```
  8 built-in themes. Or bring your own.
```

</div>

<table>
<tr>
<td align="center" width="25%">

```
┌─────────────┐
│  ▪ ▪ ▪      │
│  ─────────  │
│  minimal    │
└─────────────┘
```
<a href="./examples/minimal.md"><kbd>&nbsp;🎯 Minimal&nbsp;</kbd></a>

</td>
<td align="center" width="25%">

```
┌─────────────┐
│  $ whoami   │
│  > hacker   │
│  $ _        │
└─────────────┘
```
<a href="./examples/hacker.md"><kbd>&nbsp;💻 Hacker&nbsp;</kbd></a>

</td>
<td align="center" width="25%">

```
┌─────────────┐
│  ✨ ★ ✨    │
│  creative   │
│  ~motion~   │
└─────────────┘
```
<a href="./examples/creative.md"><kbd>&nbsp;🎨 Creative&nbsp;</kbd></a>

</td>
<td align="center" width="25%">

```
┌─────────────┐
│  ┃ Name     │
│  ┃ Title    │
│  corporate  │
└─────────────┘
```
<a href="./examples/corporate.md"><kbd>&nbsp;👔 Corporate&nbsp;</kbd></a>

</td>
</tr>
<tr>
<td align="center">

```
┌─────────────┐
│  ░█▀▀░█▀▀  │
│  ░▀▀█░█▀▀  │
│  retro      │
└─────────────┘
```
<a href="./examples/retro.md"><kbd>&nbsp;🕹️ Retro&nbsp;</kbd></a>

</td>
<td align="center">

```
┌─────────────┐
│  ╔═══╗      │
│  ║neon║     │
│  ╚═══╝      │
└─────────────┘
```
<a href="./examples/neon.md"><kbd>&nbsp;💜 Neon&nbsp;</kbd></a>

</td>
<td align="center">

```
┌─────────────┐
│  ◼◼◼◼◼◼◼   │
│    dark     │
│  ◼◼◼◼◼◼◼   │
└─────────────┘
```
<a href="./examples/dark.md"><kbd>&nbsp;🌑 Dark&nbsp;</kbd></a>

</td>
<td align="center">

```
┌─────────────┐
│  ◻◻◻◻◻◻◻   │
│    light    │
│  ◻◻◻◻◻◻◻   │
└─────────────┘
```
<a href="./examples/light.md"><kbd>&nbsp;☀️ Light&nbsp;</kbd></a>

</td>
</tr>
</table>

<br>

<details>
<summary>&nbsp;<code>// custom themes</code></summary>
<br>

```bash
$ prai init-theme -o my-theme.json
$ prai generate --theme-file my-theme.json
```

```jsonc
// my-theme.json — full control
{
  "name": "My Theme",
  "headerStyle": "banner",       // banner | text | ascii | none
  "headerColor": "gradient",     // hex | gradient
  "headerAnimation": "twinkling",// twinkling | fadeIn | blink | none
  "badgeStyle": "for-the-badge", // flat | flat-square | for-the-badge
  "statsTheme": "tokyonight",   // github-readme-stats theme
  "sections": { "about": true, "techStack": true, "stats": true, "connect": true }
}
```

</details>

<img src="https://capsule-render.vercel.app/api?type=rect&color=161b22&height=1" width="100%"/>

## 🧠 AI Features

<div align="center">

> Powered by `gpt-4o-mini` &nbsp;·&nbsp; Run `prai configure` to set your key

</div>

<br>

<table>
<tr>
<td width="33%" valign="top">

```bash
$ prai analyze -u username
```

**🔍 Deep Analysis**
<br>Reads repo READMEs, generates an accurate bio based on your *actual work*, and provides actionable profile improvement suggestions.

</td>
<td width="33%" valign="top">

```bash
$ prai translate -u username
```

**🌍 Multi-Language**
<br>Generate your bio in **10 languages** simultaneously:

```
EN  IT  ES  DE  FR
PT  ZH  JA  KO  RU
```

</td>
<td width="33%" valign="top">

```bash
$ prai social -u username
```

**🖼️ Social Cards**
<br>Optimized preview images for Twitter, LinkedIn. Stats cards, language charts, streak counters, trophy shelves.

</td>
</tr>
</table>

<img src="https://capsule-render.vercel.app/api?type=rect&color=161b22&height=1" width="100%"/>

## 📖 Commands

```
  Command              Alias    Description                          AI
  ───────              ─────    ───────────                          ──
  prai generate         g       Generate profile README              ○
  prai analyze          a       Deep analysis + suggestions          ●
  prai translate        t       Multi-language bio                   ●
  prai social           s       Social preview cards
  prai stats                    GitHub statistics
  prai actions                  GitHub Actions workflow
  prai configure        c       Set up API keys
  prai preview          p       Preview any profile README
  prai init-theme               Scaffold custom theme
  prai themes                   List all themes

  ● requires OpenAI key     ○ optional AI enhancement
```

<details>
<summary>&nbsp;<code>// options reference</code></summary>
<br>

```
  Flag                         Description
  ────                         ───────────
  -u, --username <name>        GitHub username
  -t, --theme <name>           minimal | hacker | creative | corporate
                               retro | neon | dark | light
      --theme-file <path>      Custom theme JSON
  -o, --output <path>          Output file (default: ./README.md)
      --dry-run                Preview only, no file write
      --no-ai                  Skip AI generation
      --no-stats               Skip stats cards
      --json                   JSON output (stats)
  -l, --language <code>        Bio language (analyze)
  -s, --schedule <cron>        Cron schedule (actions)
```

</details>

<img src="https://capsule-render.vercel.app/api?type=rect&color=161b22&height=1" width="100%"/>

## ⚙️ Configuration

```bash
$ prai configure
```

```
  Key                 Status              Purpose
  ───                 ──────              ───────
  OpenAI API Key      Required for AI     Bio, analysis, translation
  GitHub Token        Optional            Rate limit: 60 → 5,000 req/h
```

<sub>🔑 [platform.openai.com/api-keys](https://platform.openai.com/api-keys) · 🔑 [github.com/settings/tokens](https://github.com/settings/tokens)</sub>

<img src="https://capsule-render.vercel.app/api?type=rect&color=161b22&height=1" width="100%"/>

## 📋 Requirements

```
  ✓  Node.js 18+
  ✓  GitHub account
  ○  OpenAI API key (optional — AI features only)
```

<img src="https://capsule-render.vercel.app/api?type=rect&color=161b22&height=1" width="100%"/>

## 🏗️ Stack

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-0d1117?style=for-the-badge&logo=typescript&logoColor=3178C6)
![Node.js](https://img.shields.io/badge/Node.js-0d1117?style=for-the-badge&logo=node.js&logoColor=339933)
![OpenAI](https://img.shields.io/badge/OpenAI-0d1117?style=for-the-badge&logo=openai&logoColor=white)
![GitHub](https://img.shields.io/badge/Octokit-0d1117?style=for-the-badge&logo=github&logoColor=white)

</div>

<img src="https://capsule-render.vercel.app/api?type=rect&color=161b22&height=1" width="100%"/>

## 🤝 Contributing

```bash
$ git clone https://github.com/sena-labs/profile-readme-ai.git
$ cd profile-readme-ai && npm install
$ npm run dev generate    # dev mode
$ npm run build           # compile
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

<img src="https://capsule-render.vercel.app/api?type=rect&color=161b22&height=1" width="100%"/>

## 📜 License

```
Apache License 2.0 — Copyright 2026 sena-labs
```

See [LICENSE](LICENSE).

---

<div align="center">

<br>

<a href="https://github.com/sena-labs"><img src="https://img.shields.io/badge/sena--labs-0d1117?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"></a>&nbsp;
<a href="https://www.npmjs.com/package/profile-readme-ai"><img src="https://img.shields.io/badge/npm-profile--readme--ai-0d1117?style=for-the-badge&logo=npm&logoColor=CB3837" alt="npm"></a>

<br><br>

<sub>Built by <a href="https://github.com/sena-labs">sena-labs</a> &nbsp;·&nbsp; If this helped you, a ⭐ means a lot</sub>

<br><br>

```
[sena-labs@github ~]$ exit
```

<br>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0d1117,50:161b22,100:0d1117&height=120&section=footer" width="100%"/>

</div>
