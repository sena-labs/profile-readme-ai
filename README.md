<div align="center">

![Header](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=Profile%20README%20AI&fontSize=50&fontColor=fff&animation=twinkling&fontAlignY=35&desc=Generate%20stunning%20GitHub%20profiles%20with%20AI&descAlignY=55&descSize=18)

[![npm version](https://img.shields.io/npm/v/profile-readme-ai?style=for-the-badge&logo=npm&logoColor=white&color=CB3837)](https://www.npmjs.com/package/profile-readme-ai)
[![npm downloads](https://img.shields.io/npm/dm/profile-readme-ai?style=for-the-badge&logo=npm&logoColor=white&color=blue)](https://www.npmjs.com/package/profile-readme-ai)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue?style=for-the-badge&logo=apache&logoColor=white)](https://opensource.org/licenses/Apache-2.0)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)

<br>

**One command. AI-powered. 8 themes. 10 languages. Your GitHub profile, perfected.**

[Get Started](#-quick-start) · [Themes](#-themes) · [AI Features](#-ai-features) · [Commands](#-all-commands) · [Contributing](#-contributing)

</div>

<br>

## ⚡ Quick Start

```bash
# No install needed — run directly
npx profile-readme-ai generate

# Or install globally
npm install -g profile-readme-ai
prai generate
```

<br>

## 🎬 What It Does

<div align="center">

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   $ prai generate -u your-username -t neon              │
│                                                         │
│   ✔ Analyzing GitHub profile...                         │
│   ✔ Found 42 repos, 128 stars                           │
│   ✔ AI content generated                                │
│   ✔ README generated                                    │
│                                                         │
│   ✅ README saved to ./README.md                        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

</div>

Profile README AI **analyzes your GitHub profile**, detects your tech stack, and generates a polished README with your choice of theme — optionally enhanced with **AI-generated bio and tagline**.

<br>

## 🎨 Themes

<div align="center">

**8 built-in themes** — from clean minimalism to cyberpunk neon.

</div>

<table>
<tr>
<td align="center" width="25%">

**🎯 Minimal**
<br>
<sub>Clean and simple</sub>

</td>
<td align="center" width="25%">

**💻 Hacker**
<br>
<sub>Terminal-style ASCII</sub>

</td>
<td align="center" width="25%">

**🎨 Creative**
<br>
<sub>Colorful animations</sub>

</td>
<td align="center" width="25%">

**👔 Corporate**
<br>
<sub>Professional business</sub>

</td>
</tr>
<tr>
<td align="center">

**🕹️ Retro**
<br>
<sub>Pixel art gaming</sub>

</td>
<td align="center">

**💜 Neon**
<br>
<sub>Cyberpunk glow</sub>

</td>
<td align="center">

**🌑 Dark**
<br>
<sub>Sleek dark mode</sub>

</td>
<td align="center">

**☀️ Light**
<br>
<sub>Clean light mode</sub>

</td>
</tr>
</table>

<div align="center">

📁 **[See all theme examples →](./examples/)**

**Custom themes** — Create your own with JSON:

</div>

```bash
prai init-theme -o my-theme.json    # Generate template
prai generate --theme-file my-theme.json  # Use it
```

<br>

## 🧠 AI Features

<div align="center">

*Requires [OpenAI API key](https://platform.openai.com/api-keys) — run `prai configure` to set up.*

</div>

<table>
<tr>
<td width="33%">

### 🔍 Deep Analysis
```bash
prai analyze -u username
```
Reads your repo READMEs, generates an accurate bio, and provides actionable improvement suggestions.

</td>
<td width="33%">

### 🌍 Multi-Language
```bash
prai translate -u username
```
Generate your bio in **10 languages**: EN, IT, ES, DE, FR, PT, ZH, JA, KO, RU.

</td>
<td width="33%">

### 🖼️ Social Preview
```bash
prai social -u username
```
Generate shareable cards and stats images for Twitter, LinkedIn, and more.

</td>
</tr>
</table>

<br>

## 📖 All Commands

| Command | Description |
|---------|-------------|
| `prai generate` | Generate a new profile README |
| `prai analyze` | Deep analyze profile with AI suggestions |
| `prai translate` | Generate bio in multiple languages |
| `prai social` | Generate social preview images |
| `prai stats` | Show detailed GitHub statistics *(no AI)* |
| `prai actions` | Generate GitHub Actions auto-update workflow |
| `prai configure` | Set up API keys (OpenAI, GitHub) |
| `prai preview` | Preview any user's profile README |
| `prai init-theme` | Create custom theme JSON template |
| `prai themes` | List all available themes |

### Options

```bash
-u, --username <username>    GitHub username
-t, --theme <theme>          minimal | hacker | creative | corporate |
                             retro | neon | dark | light
--theme-file <path>          Custom theme JSON file
-o, --output <path>          Output file (default: ./README.md)
--dry-run                    Preview without saving
--no-ai                      Skip AI bio generation
--no-stats                   Skip GitHub stats cards
--json                       JSON output (stats command)
```

<br>

## ⚙️ Configuration

```bash
prai configure
```

| Key | Required | Purpose |
|-----|----------|---------|
| **OpenAI API Key** | For AI features | Bio generation, analysis, translation |
| **GitHub Token** | Optional | Higher API rate limits (60 → 5000 req/h) |

<div align="center">

🔑 [Get OpenAI Key](https://platform.openai.com/api-keys) · 🔑 [Create GitHub Token](https://github.com/settings/tokens)

</div>

<br>

## 📋 Requirements

- **Node.js** 18 or higher
- **GitHub** account
- **OpenAI API key** *(optional — only for AI features)*

<br>

## 🤝 Contributing

Contributions are welcome! See the [Contributing Guide](CONTRIBUTING.md) for details.

```bash
git clone https://github.com/sena-labs/profile-readme-ai.git
cd profile-readme-ai
npm install
npm run dev generate    # Run in dev mode
```

<br>

## 📜 License

Apache License 2.0 — see [LICENSE](LICENSE) for details.

---

<div align="center">

<br>

**Made with ❤️ by [sena-labs](https://github.com/sena-labs)**

[![GitHub](https://img.shields.io/badge/GitHub-sena--labs-181717?style=for-the-badge&logo=github)](https://github.com/sena-labs)
[![npm](https://img.shields.io/badge/npm-profile--readme--ai-CB3837?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/profile-readme-ai)

<sub>If this project helped you, consider giving it a ⭐</sub>

![Footer](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer)

</div>
