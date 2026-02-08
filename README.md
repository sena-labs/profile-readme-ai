<div align="center">

# 🚀 Profile README AI

[![npm version](https://img.shields.io/npm/v/profile-readme-ai.svg)](https://www.npmjs.com/package/profile-readme-ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org)

**Generate stunning GitHub profile READMEs with AI in seconds!**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Themes](#-themes) • [Contributing](#-contributing)

⭐ **Star this repo if you find it useful!** ⭐

</div>

---

## ✨ Features

- 🔍 **Auto-analyze** your GitHub profile and repositories
- 🤖 **AI-powered** bio and tagline generation (OpenAI)
- 🎨 **Multiple themes**: Minimal, Hacker, Creative, Corporate
- 📊 **GitHub stats** integration (github-readme-stats)
- 🛠 **Tech stack badges** auto-detected from your repos
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
prai configure     # Set up API keys (OpenAI, GitHub)
prai preview       # Preview any GitHub profile README
prai themes        # List available themes
```

### Options

```bash
-u, --username <username>  GitHub username
-t, --theme <theme>        Theme: minimal, hacker, creative, corporate
-o, --output <path>        Output file (default: ./README.md)
--no-ai                    Skip AI bio generation
--no-stats                 Skip GitHub stats cards
```

## 🎨 Themes

### Minimal
Clean and simple design, perfect for professionals.

### Hacker
Terminal-style with ASCII art for the tech enthusiast.

### Creative  
Colorful with animations, great for standing out.

### Corporate
Professional business style for enterprise developers.

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
