<div align="center">

![Header](https://capsule-render.vercel.app/api?type=waving&color=0:0d1117,50:161b22,100:0d1117&height=220&section=header&text=Profile%20README%20AI&fontSize=42&fontColor=58a6ff&animation=fadeIn&fontAlignY=32&desc=AI-powered%20GitHub%20Profile%20README%20Generator&descAlignY=52&descSize=16&descColor=8b949e)

<br>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=18&pause=3000&color=58A6FF&center=true&vCenter=true&width=500&lines=npx+profile-readme-ai+generate)](https://www.npmjs.com/package/profile-readme-ai)

<br>

<a href="https://www.npmjs.com/package/profile-readme-ai"><img src="https://img.shields.io/npm/v/profile-readme-ai?style=flat-square&logo=npm&logoColor=white&label=version&color=CB3837" alt="npm version"></a>
<a href="https://www.npmjs.com/package/profile-readme-ai"><img src="https://img.shields.io/npm/dm/profile-readme-ai?style=flat-square&logo=npm&logoColor=white&label=downloads&color=1e90ff" alt="downloads"></a>
<a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/license-Apache%202.0-blue?style=flat-square" alt="license"></a>
<a href="https://nodejs.org"><img src="https://img.shields.io/badge/node-≥18-339933?style=flat-square&logo=node.js&logoColor=white" alt="node"></a>
<a href="https://github.com/sena-labs/profile-readme-ai/stargazers"><img src="https://img.shields.io/github/stars/sena-labs/profile-readme-ai?style=flat-square&color=f0c040&label=stars" alt="stars"></a>

<br><br>

**Analyze your repos. Generate a stunning profile. One command.**

<br>

[Quick Start](#-quick-start) · [How It Works](#-how-it-works) · [Themes](#-themes) · [AI Features](#-ai-features) · [Commands](#-commands) · [Docs](#-configuration)

</div>

<br>

<img src="https://user-images.githubusercontent.com/0/0.png" width="100%" height="1" alt="">

## ⚡ Quick Start

```bash
npx profile-readme-ai generate
```

That's it. No install, no config. Just run and follow the prompts.

<details>
<summary><b>💡 More install options</b></summary>
<br>

```bash
# Install globally for repeated use
npm install -g profile-readme-ai

# Then use the short alias
prai generate -u your-username -t neon
```

</details>

<img src="https://user-images.githubusercontent.com/0/0.png" width="100%" height="1" alt="">

## 🔄 How It Works

<div align="center">

```
   ┌──────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐
   │  GitHub   │ ───▶ │ Analyze  │ ───▶ │   AI     │ ───▶ │  Output  │
   │  Profile  │      │ Repos &  │      │ Generate │      │  README  │
   │  + Repos  │      │ Stack    │      │ Bio      │      │  .md     │
   └──────────┘      └──────────┘      └──────────┘      └──────────┘
       fetch            detect            enhance           save
```

</div>

<table>
<tr>
<td>

**1.** Fetches your GitHub profile and top repositories via API
<br>**2.** Detects languages, frameworks, and tech stack automatically
<br>**3.** Generates personalized bio and tagline with AI *(optional)*
<br>**4.** Renders a themed, badge-rich README ready to deploy

</td>
</tr>
</table>

<img src="https://user-images.githubusercontent.com/0/0.png" width="100%" height="1" alt="">

## 🎨 Themes

<div align="center">

**8 built-in themes.** Pick your style or create your own.

</div>

<br>

<table>
<tr>
<td align="center" width="25%">
<img src="https://capsule-render.vercel.app/api?type=rect&color=f6f8fa&height=3" width="100%">
<br>
<b>🎯 Minimal</b>
<br>
<sub>Clean · Professional · Simple</sub>
<br>
<a href="./examples/minimal.md"><sub>Preview →</sub></a>
</td>
<td align="center" width="25%">
<img src="https://capsule-render.vercel.app/api?type=rect&color=0d1117&height=3" width="100%">
<br>
<b>💻 Hacker</b>
<br>
<sub>Terminal · ASCII · Matrix</sub>
<br>
<a href="./examples/hacker.md"><sub>Preview →</sub></a>
</td>
<td align="center" width="25%">
<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=24&height=3" width="100%">
<br>
<b>🎨 Creative</b>
<br>
<sub>Colorful · Animated · Bold</sub>
<br>
<a href="./examples/creative.md"><sub>Preview →</sub></a>
</td>
<td align="center" width="25%">
<img src="https://capsule-render.vercel.app/api?type=rect&color=334155&height=3" width="100%">
<br>
<b>👔 Corporate</b>
<br>
<sub>Business · Formal · Crisp</sub>
<br>
<a href="./examples/corporate.md"><sub>Preview →</sub></a>
</td>
</tr>
<tr>
<td align="center">
<img src="https://capsule-render.vercel.app/api?type=rect&color=f97316&height=3" width="100%">
<br>
<b>🕹️ Retro</b>
<br>
<sub>Pixel · Gaming · Arcade</sub>
<br>
<a href="./examples/retro.md"><sub>Preview →</sub></a>
</td>
<td align="center">
<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3" width="100%">
<br>
<b>💜 Neon</b>
<br>
<sub>Cyberpunk · Glow · Electric</sub>
<br>
<a href="./examples/neon.md"><sub>Preview →</sub></a>
</td>
<td align="center">
<img src="https://capsule-render.vercel.app/api?type=rect&color=161b22&height=3" width="100%">
<br>
<b>🌑 Dark</b>
<br>
<sub>Sleek · Shadow · Noir</sub>
<br>
<a href="./examples/dark.md"><sub>Preview →</sub></a>
</td>
<td align="center">
<img src="https://capsule-render.vercel.app/api?type=rect&color=ffffff&height=3" width="100%">
<br>
<b>☀️ Light</b>
<br>
<sub>Airy · Bright · Minimal</sub>
<br>
<a href="./examples/light.md"><sub>Preview →</sub></a>
</td>
</tr>
</table>

<br>

<details>
<summary><b>🎭 Custom Themes</b></summary>
<br>

Build your own theme from a JSON config:

```bash
prai init-theme -o my-theme.json    # Scaffold template
# Edit my-theme.json to customize colors, layout, badges, stats...
prai generate --theme-file my-theme.json
```

Full control over: header style, colors, animations, badge style, stats theme, section visibility, and footer.

</details>

<img src="https://user-images.githubusercontent.com/0/0.png" width="100%" height="1" alt="">

## 🧠 AI Features

<div align="center">

<sub>Powered by OpenAI GPT-4o-mini · Run <code>prai configure</code> to set your API key</sub>

</div>

<br>

<table>
<tr>
<td width="33%" valign="top">

#### 🔍 Deep Analysis
```bash
prai analyze -u username
```

Reads repository READMEs, analyzes your actual work, generates an **accurate personalized bio**, and provides **actionable improvement tips** for your profile.

</td>
<td width="33%" valign="top">

#### 🌍 Multi-Language Bio
```bash
prai translate -u username
```

Generate your bio in **10 languages** simultaneously with collapsible markdown sections:

`EN` `IT` `ES` `DE` `FR` `PT` `ZH` `JA` `KO` `RU`

</td>
<td width="33%" valign="top">

#### 🖼️ Social Cards
```bash
prai social -u username
```

Generate optimized preview images for **Twitter, LinkedIn**, and other platforms. Includes stats cards, language charts, streak counters, and trophy shelves.

</td>
</tr>
</table>

<img src="https://user-images.githubusercontent.com/0/0.png" width="100%" height="1" alt="">

## 📖 Commands

| Command | Alias | Description | AI |
|:--------|:------|:------------|:--:|
| `prai generate` | `g` | Generate a new profile README | ○ |
| `prai analyze` | `a` | Deep profile analysis with suggestions | ● |
| `prai translate` | `t` | Multi-language bio generation | ● |
| `prai social` | `s` | Social preview images & cards | |
| `prai stats` | | Detailed GitHub statistics | |
| `prai actions` | | GitHub Actions auto-update workflow | |
| `prai configure` | `c` | Set up API keys | |
| `prai preview` | `p` | Preview any user's profile README | |
| `prai init-theme` | | Create custom theme template | |
| `prai themes` | | List all themes | |

<sub>● = requires OpenAI key · ○ = optional AI enhancement</sub>

<br>

<details>
<summary><b>⚙️ CLI Options Reference</b></summary>
<br>

```
-u, --username <username>    GitHub username
-t, --theme <theme>          minimal | hacker | creative | corporate
                             retro | neon | dark | light
    --theme-file <path>      Custom theme JSON file
-o, --output <path>          Output file (default: ./README.md)
    --dry-run                Preview without saving
    --no-ai                  Skip AI bio generation
    --no-stats               Skip GitHub stats cards
    --json                   JSON output (stats command only)
-l, --language <lang>        Bio language (analyze command)
-s, --schedule <cron>        Cron schedule (actions command)
```

</details>

<img src="https://user-images.githubusercontent.com/0/0.png" width="100%" height="1" alt="">

## ⚙️ Configuration

```bash
prai configure
```

| Key | Status | Purpose |
|:----|:-------|:--------|
| **OpenAI API Key** | Required for AI | Bio generation, deep analysis, translation |
| **GitHub Token** | Optional | Increases rate limit from 60 to 5,000 req/h |

<sub>🔑 [Get OpenAI Key](https://platform.openai.com/api-keys) · 🔑 [Create GitHub Token](https://github.com/settings/tokens) (no scopes needed for public data)</sub>

<img src="https://user-images.githubusercontent.com/0/0.png" width="100%" height="1" alt="">

## 📋 Requirements

| | Requirement | Notes |
|:--|:-----------|:------|
| ![Node](https://img.shields.io/badge/-339933?style=flat-square&logo=node.js&logoColor=white) | **Node.js 18+** | Runtime |
| ![GitHub](https://img.shields.io/badge/-181717?style=flat-square&logo=github&logoColor=white) | **GitHub account** | Profile to analyze |
| ![OpenAI](https://img.shields.io/badge/-412991?style=flat-square&logo=openai&logoColor=white) | **OpenAI API key** | *Optional — AI features only* |

<img src="https://user-images.githubusercontent.com/0/0.png" width="100%" height="1" alt="">

## 🏗️ Built With

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat-square&logo=openai&logoColor=white)
![Commander.js](https://img.shields.io/badge/Commander.js-red?style=flat-square)
![Octokit](https://img.shields.io/badge/Octokit-181717?style=flat-square&logo=github&logoColor=white)
![Inquirer](https://img.shields.io/badge/Inquirer-1a1a1a?style=flat-square)
![Chalk](https://img.shields.io/badge/Chalk-f0db4f?style=flat-square)

</div>

<img src="https://user-images.githubusercontent.com/0/0.png" width="100%" height="1" alt="">

## 🤝 Contributing

Contributions, issues and feature requests are welcome.
<br>See the [Contributing Guide](CONTRIBUTING.md) for development setup and guidelines.

```bash
git clone https://github.com/sena-labs/profile-readme-ai.git
cd profile-readme-ai && npm install
npm run dev generate    # Development mode
npm run build           # Compile TypeScript
```

<img src="https://user-images.githubusercontent.com/0/0.png" width="100%" height="1" alt="">

## 📜 License

Apache License 2.0 — see [LICENSE](LICENSE).

<br>

---

<div align="center">

<br>

<a href="https://github.com/sena-labs">
  <img src="https://img.shields.io/badge/sena--labs-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
</a>
<a href="https://www.npmjs.com/package/profile-readme-ai">
  <img src="https://img.shields.io/badge/profile--readme--ai-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm">
</a>

<br><br>

<sub>Built by <a href="https://github.com/sena-labs">sena-labs</a> · If this helped you, a ⭐ means a lot</sub>

<br>

![Footer](https://capsule-render.vercel.app/api?type=waving&color=0:0d1117,50:161b22,100:0d1117&height=120&section=footer)

</div>
