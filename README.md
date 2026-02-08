<div align="center">

# 🚀 Profile README AI

[![npm version](https://img.shields.io/npm/v/profile-readme-ai.svg)](https://www.npmjs.com/package/profile-readme-ai)
[![npm downloads](https://img.shields.io/npm/dm/profile-readme-ai.svg)](https://www.npmjs.com/package/profile-readme-ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org)
[![GitHub stars](https://img.shields.io/github/stars/sena-labs/profile-readme-ai?style=social)](https://github.com/sena-labs/profile-readme-ai)

**Generate stunning GitHub profile READMEs with AI in seconds!**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Themes](#-themes) • [AI Features](#-ai-features)

⭐ **Star this repo if you find it useful!** ⭐

</div>

---

## 🎬 Demo

```bash
# One command to generate your profile README
npx profile-readme-ai generate
```

<details>
<summary>👀 Click to see example output (Neon theme)</summary>

![Neon Theme Example](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=header&text=Your%20Name&fontSize=40&fontColor=fff&animation=twinkling)

```javascript
const developer = {
  languages: ["TypeScript", "Python", "Go"],
  currentFocus: "Building amazing tools",
  funFact: "I mass generate at neon speed"
};
```

</details>

**See all theme examples:** [examples/](./examples/)

---

## ✨ Features

- 🔍 **Auto-analyze** your GitHub profile and repositories
- 🤖 **AI-powered** bio and tagline generation (OpenAI)
- 🎨 **8 Themes**: Minimal, Hacker, Creative, Corporate, Retro, Neon, Dark, Light
- 🎭 **Custom themes** - Create your own with JSON config
- 📊 **GitHub stats** integration (github-readme-stats)
- 🛠 **Tech stack badges** auto-detected from your repos
- 🧠 **Deep analysis** - Reads your READMEs for accurate bio
- 💡 **AI suggestions** - Get improvement tips for your profile
- 🌍 **Multi-language** - Generate bio in 10 languages
- 🖼️ **Social preview** - Generate shareable images
- 📊 **Stats command** - View detailed GitHub statistics (no AI needed)
- 🔧 **GitHub Actions** - Auto-update README on a schedule
- 🔍 **Dry-run mode** - Preview output without saving
- ⚡ **One command** to generate everything

## 📦 Installation

```bash
# Run directly with npx (no install needed)
npx profile-readme-ai generate

# Or install globally
npm install -g profile-readme-ai
```

## 🚀 Usage

### Quick Start

```bash
# Generate README interactively
npx profile-readme-ai generate

# Or with options
npx profile-readme-ai generate -u your-username -t hacker
```

### Commands

```bash
prai generate      # Generate a new profile README
prai analyze       # Deep analyze profile with AI suggestions
prai translate     # Generate bio in multiple languages
prai social        # Generate social preview images
prai stats         # Show detailed GitHub statistics (no AI required)
prai actions       # Generate GitHub Actions workflow for auto-update
prai configure     # Set up API keys (OpenAI, GitHub)
prai preview       # Preview any GitHub profile README
prai init-theme    # Create custom theme template
prai themes        # List available themes
```

### Options

```bash
-u, --username <username>    GitHub username
-t, --theme <theme>          Theme: minimal, hacker, creative, corporate,
                             retro, neon, dark, light
--theme-file <path>          Load custom theme from JSON file
-o, --output <path>          Output file (default: ./README.md)
--dry-run                    Preview output without saving to file
--no-ai                      Skip AI bio generation
--no-stats                   Skip GitHub stats cards
--json                       Output as JSON (stats command)
```

## 🎨 Themes

| Theme | Description |
|-------|-------------|
| `minimal` | Clean and simple design |
| `hacker` | Terminal-style with ASCII art |
| `creative` | Colorful with animations |
| `corporate` | Professional business style |
| `retro` | Pixel art gaming aesthetic |
| `neon` | Cyberpunk neon glow effect |
| `dark` | Sleek dark mode design |
| `light` | Clean light mode design |

### Custom Themes

Create your own theme:

```bash
prai init-theme -o my-theme.json
prai generate --theme-file my-theme.json
```

## 🧠 AI Features

### Deep Profile Analysis

Analyze any GitHub profile with AI-powered insights:

```bash
prai analyze -u username
```

This will:
- Read READMEs from top repositories
- Generate an accurate, personalized bio
- Provide improvement suggestions

### Multi-Language Bio

Generate your bio in multiple languages:

```bash
prai translate -u username
# Select from: EN, IT, ES, DE, FR, PT, ZH, JA, KO, RU
```

### Social Preview Images

Generate shareable images for social media:

```bash
prai social -u username
```

## ⚙️ Configuration

For AI-powered features, configure your API keys:

```bash
prai configure
```

- **OpenAI API Key**: Required for AI bio generation ([Get key](https://platform.openai.com/api-keys))
- **GitHub Token**: Optional, for higher rate limits ([Create token](https://github.com/settings/tokens))

## 📋 Requirements

- Node.js 18+
- GitHub account
- (Optional) OpenAI API key for AI features

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md).

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📜 License

MIT License - see [LICENSE](LICENSE) for details.

---

<div align="center">

**Made with ❤️ by [sena-labs](https://github.com/sena-labs)**

⭐ **Don't forget to star this repo!** ⭐

</div>
