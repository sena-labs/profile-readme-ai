<div align="center">

```
  ██████╗ ██████╗  ██████╗ ███████╗██╗██╗     ███████╗
  ██╔══██╗██╔══██╗██╔═══██╗██╔════╝██║██║     ██╔════╝
  ██████╔╝██████╔╝██║   ██║█████╗  ██║██║     █████╗
  ██╔═══╝ ██╔══██╗██║   ██║██╔══╝  ██║██║     ██╔══╝
  ██║     ██║  ██║╚██████╔╝██║     ██║███████╗███████╗
  ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚══════╝
          ██████╗ ███████╗ █████╗ ██████╗ ███╗   ███╗███████╗
          ██╔══██╗██╔════╝██╔══██╗██╔══██╗████╗ ████║██╔════╝
          ██████╔╝█████╗  ███████║██║  ██║██╔████╔██║█████╗
          ██╔══██╗██╔══╝  ██╔══██╗██║  ██║██║╚██╔╝██║██╔══╝
          ██║  ██║███████╗██║  ██║██████╔╝██║ ╚═╝ ██║███████╗
          ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚══════╝
                         █████╗ ██╗
                        ██╔══██╗██║
                        ███████║██║
                        ██╔══██║██║
                        ██║  ██║██║
                        ╚═╝  ╚═╝╚═╝
```

<br>

<a href="https://www.npmjs.com/package/profile-readme-ai"><img src="https://img.shields.io/npm/v/profile-readme-ai?style=flat-square&logo=npm&logoColor=white&label=version&color=CB3837" alt="npm"></a>
<a href="https://www.npmjs.com/package/profile-readme-ai"><img src="https://img.shields.io/npm/dm/profile-readme-ai?style=flat-square&logo=npm&logoColor=white&label=downloads&color=1e90ff" alt="downloads"></a>
<a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/license-Apache%202.0-blue?style=flat-square" alt="license"></a>
<a href="https://nodejs.org"><img src="https://img.shields.io/badge/node-≥18-339933?style=flat-square&logo=node.js&logoColor=white" alt="node"></a>
<a href="https://github.com/sena-labs/profile-readme-ai/stargazers"><img src="https://img.shields.io/github/stars/sena-labs/profile-readme-ai?style=flat-square&color=f0c040&label=stars" alt="stars"></a>

<br>

`analyze repos` · `detect stack` · `generate bio` · `render README`

<br>

[Quick Start](#-quick-start) · [Pipeline](#-pipeline) · [Themes](#-themes) · [AI](#-ai-features) · [Commands](#-commands) · [Config](#%EF%B8%8F-configuration)

</div>

<br>

## ⚡ Quick Start

```bash
$ npx profile-readme-ai generate
```

> Zero config. Zero install. One command.

<details>
<summary><code>// more options</code></summary>
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

---

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

---

## 🎨 Themes

```
  8 built-in themes. Or bring your own.
```

<table>
<tr>
<td align="center" width="25%">

```
┌─────────────┐
│  ▪ ▪ ▪      │
│  ─────────  │
│  minimal    │
│             │
└─────────────┘
```
<sub><b>🎯 Minimal</b></sub>
<br>
<a href="./examples/minimal.md"><sub><code>preview</code></sub></a>

</td>
<td align="center" width="25%">

```
┌─────────────┐
│  $ whoami   │
│  > hacker   │
│  $ ls       │
│             │
└─────────────┘
```
<sub><b>💻 Hacker</b></sub>
<br>
<a href="./examples/hacker.md"><sub><code>preview</code></sub></a>

</td>
<td align="center" width="25%">

```
┌─────────────┐
│  ✨ ★ ✨    │
│  creative   │
│  ~animate~  │
│             │
└─────────────┘
```
<sub><b>🎨 Creative</b></sub>
<br>
<a href="./examples/creative.md"><sub><code>preview</code></sub></a>

</td>
<td align="center" width="25%">

```
┌─────────────┐
│  ┃ Name     │
│  ┃ Role     │
│  corporate  │
│             │
└─────────────┘
```
<sub><b>👔 Corporate</b></sub>
<br>
<a href="./examples/corporate.md"><sub><code>preview</code></sub></a>

</td>
</tr>
<tr>
<td align="center">

```
┌─────────────┐
│  ░█▀▀░█▀▀  │
│  ░▀▀█░█▀▀  │
│  retro      │
│             │
└─────────────┘
```
<sub><b>🕹️ Retro</b></sub>
<br>
<a href="./examples/retro.md"><sub><code>preview</code></sub></a>

</td>
<td align="center">

```
┌─────────────┐
│  ╔═══╗      │
│  ║neon║     │
│  ╚═══╝      │
│             │
└─────────────┘
```
<sub><b>💜 Neon</b></sub>
<br>
<a href="./examples/neon.md"><sub><code>preview</code></sub></a>

</td>
<td align="center">

```
┌─────────────┐
│  ◼◼◼◼◼◼◼   │
│    dark     │
│  ◼◼◼◼◼◼◼   │
│             │
└─────────────┘
```
<sub><b>🌑 Dark</b></sub>
<br>
<a href="./examples/dark.md"><sub><code>preview</code></sub></a>

</td>
<td align="center">

```
┌─────────────┐
│  ◻◻◻◻◻◻◻   │
│    light    │
│  ◻◻◻◻◻◻◻   │
│             │
└─────────────┘
```
<sub><b>☀️ Light</b></sub>
<br>
<a href="./examples/light.md"><sub><code>preview</code></sub></a>

</td>
</tr>
</table>

<details>
<summary><code>// custom themes</code></summary>
<br>

```bash
$ prai init-theme -o my-theme.json
$ prai generate --theme-file my-theme.json
```

```jsonc
// my-theme.json
{
  "name": "My Theme",
  "headerStyle": "banner",       // banner | text | ascii | none
  "headerColor": "gradient",     // hex | gradient
  "headerAnimation": "twinkling",// twinkling | fadeIn | blink | none
  "badgeStyle": "for-the-badge", // flat | flat-square | for-the-badge
  "statsTheme": "tokyonight",   // github-readme-stats theme
  "sections": {
    "about": true,
    "techStack": true,
    "stats": true,
    "connect": true
  }
}
```

</details>

---

## 🧠 AI Features

> Powered by `gpt-4o-mini` · Run `prai configure` to set your key

<table>
<tr>
<td width="33%" valign="top">

```bash
$ prai analyze -u username
```

**Deep Analysis** — Reads repo READMEs, generates an accurate bio based on your *actual work*, provides actionable profile improvement suggestions.

</td>
<td width="33%" valign="top">

```bash
$ prai translate -u username
```

**Multi-Language** — Generate your bio in **10 languages** simultaneously:

```
EN  IT  ES  DE  FR
PT  ZH  JA  KO  RU
```

</td>
<td width="33%" valign="top">

```bash
$ prai social -u username
```

**Social Cards** — Optimized preview images for Twitter, LinkedIn. Stats cards, language charts, streak counters, trophy shelves.

</td>
</tr>
</table>

---

## 📖 Commands

```
  Command            Alias    Description                          AI
  ───────            ─────    ───────────                          ──
  prai generate       g       Generate profile README              ○
  prai analyze        a       Deep analysis + suggestions          ●
  prai translate      t       Multi-language bio                   ●
  prai social         s       Social preview cards
  prai stats                  GitHub statistics
  prai actions                GitHub Actions workflow
  prai configure      c       Set up API keys
  prai preview        p       Preview any profile README
  prai init-theme             Scaffold custom theme
  prai themes                 List all themes

  ● = requires OpenAI key    ○ = optional AI
```

<details>
<summary><code>// options reference</code></summary>
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

---

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

---

## 📋 Requirements

```
  ✓  Node.js 18+
  ✓  GitHub account
  ○  OpenAI API key (optional — AI features only)
```

---

## 🏗️ Stack

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat-square&logo=openai&logoColor=white)
![Octokit](https://img.shields.io/badge/Octokit-181717?style=flat-square&logo=github&logoColor=white)
![Commander](https://img.shields.io/badge/Commander-red?style=flat-square)
![Inquirer](https://img.shields.io/badge/Inquirer-1a1a1a?style=flat-square)
![Chalk](https://img.shields.io/badge/Chalk-f0db4f?style=flat-square)

</div>

---

## 🤝 Contributing

```bash
$ git clone https://github.com/sena-labs/profile-readme-ai.git
$ cd profile-readme-ai && npm install
$ npm run dev generate    # dev mode
$ npm run build           # compile
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📜 License

```
Apache License 2.0
Copyright 2026 sena-labs
```

See [LICENSE](LICENSE).

---

<div align="center">

<br>

<a href="https://github.com/sena-labs"><img src="https://img.shields.io/badge/sena--labs-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub"></a>
<a href="https://www.npmjs.com/package/profile-readme-ai"><img src="https://img.shields.io/badge/npm-profile--readme--ai-CB3837?style=flat-square&logo=npm&logoColor=white" alt="npm"></a>

<br>

<sub>Built by <a href="https://github.com/sena-labs">sena-labs</a> · star ⭐ if useful</sub>

<br>

```
[sena-labs@github ~]$ exit
```

</div>
