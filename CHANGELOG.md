# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-08

### Added

#### Core Features
- **Generate command** (`prai generate`) - Create profile README with multiple themes
- **8 Built-in themes**: minimal, hacker, creative, corporate, retro, neon, dark, light
- **Custom themes** - Load your own theme from JSON file
- **Auto-detection** of programming languages from repositories
- **Tech stack badges** automatically generated

#### AI Features
- **AI-powered bio generation** using OpenAI GPT-4o-mini
- **Deep profile analysis** (`prai analyze`) - Reads repository READMEs for accurate bio
- **Improvement suggestions** - AI provides actionable profile enhancement tips
- **Multi-language support** (`prai translate`) - Generate bio in 10 languages:
  - English, Italian, Spanish, German, French, Portuguese
  - Chinese, Japanese, Korean, Russian

#### Social Features
- **Social preview generator** (`prai social`) - Create shareable images
- **Stats card URLs** - GitHub stats, languages, streak, trophies
- **OG image generation** for social media sharing

#### Utilities
- **Preview command** (`prai preview`) - View any user's profile README
- **Configure command** (`prai configure`) - Set up API keys
- **Init theme command** (`prai init-theme`) - Create custom theme template
- **Themes command** (`prai themes`) - List all available themes

#### Themes Detail

| Theme | Style |
|-------|-------|
| `minimal` | Clean, simple, professional |
| `hacker` | Terminal-style with ASCII art |
| `creative` | Colorful with typing animations |
| `corporate` | Business professional |
| `retro` | Pixel art gaming aesthetic |
| `neon` | Cyberpunk with neon glow |
| `dark` | Sleek dark mode |
| `light` | Clean light mode |

### Technical

- Built with TypeScript
- Uses Octokit for GitHub API
- OpenAI integration for AI features
- Commander.js for CLI
- Inquirer.js for interactive prompts
- Chalk for colored output
- Ora for spinners

---

## [Unreleased]

### Planned
- GitHub Action for auto-updating README
- More theme customization options
- WakaTime integration
- Spotify Now Playing widget
