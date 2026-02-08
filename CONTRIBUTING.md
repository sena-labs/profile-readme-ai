# Contributing to Profile README AI

Thanks for your interest in contributing! 🎉

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/sena-labs/profile-readme-ai.git
cd profile-readme-ai

# Install dependencies
npm install

# Build
npm run build

# Run in development mode
npm run dev generate
```

## 📁 Project Structure

```
profile-readme-ai/
├── src/
│   ├── cli.ts              # Main CLI entry point
│   ├── commands/           # CLI commands
│   │   ├── generate.ts     # Generate README
│   │   ├── analyze.ts      # AI profile analysis
│   │   ├── translate.ts    # Multi-language bio
│   │   ├── social.ts       # Social preview images
│   │   ├── stats.ts        # GitHub statistics
│   │   ├── actions.ts      # GitHub Actions workflow generator
│   │   ├── configure.ts    # API key setup
│   │   ├── preview.ts      # Preview existing README
│   │   └── init-theme.ts   # Create custom theme
│   ├── services/
│   │   ├── github.ts       # GitHub API integration
│   │   ├── ai.ts           # Basic AI (OpenAI)
│   │   ├── ai-advanced.ts  # Deep analysis, suggestions
│   │   └── preview.ts      # Social image generation
│   ├── templates/
│   │   ├── index.ts        # Theme templates (8 built-in)
│   │   └── custom.ts       # Custom theme loader
│   └── utils/
│       ├── config.ts       # Singleton config (Conf)
│       ├── clients.ts      # Singleton API clients (OpenAI, Octokit)
│       ├── cache.ts        # In-memory GitHub API cache
│       └── version.ts      # Version info and welcome message
├── examples/               # Theme output examples
├── dist/                   # Compiled JavaScript
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Development

### Prerequisites

- Node.js 18+
- npm 9+
- TypeScript knowledge

### Commands

```bash
npm run build    # Compile TypeScript
npm run dev      # Run without compiling (uses tsx)
npm run lint     # Run ESLint
```

### Testing Locally

```bash
# Test a specific command
npm run dev generate -u octocat --no-ai -t minimal

# Test with your profile
npm run dev analyze -u YOUR_USERNAME
```

## 📝 How to Contribute

### Report Bugs

1. Check if the issue already exists
2. Open a new issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Node.js version (`node -v`)

### Suggest Features

1. Open an issue with `[FEATURE]` prefix
2. Describe the use case
3. Provide examples if possible

### Submit Code

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/my-feature
   ```
3. Make your changes
4. Test thoroughly
5. Commit with clear messages:
   ```bash
   git commit -m "feat: add new theme"
   git commit -m "fix: handle empty bio"
   ```
6. Push and open a Pull Request

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only
- `style:` Code style (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

## 🎨 Adding a New Theme

1. Open `src/templates/index.ts`
2. Add your theme function:
   ```typescript
   function generateMyTheme(analysis: GitHubAnalysis, options: TemplateOptions): string {
     // Your theme logic here
   }
   ```
3. Register in the switch statement in `generateReadme()`
4. Add to CLI theme list in `src/cli.ts`
5. Update README.md with the new theme

## 🌍 Adding a New Language

1. Open `src/services/ai-advanced.ts`
2. Add to `SupportedLanguage` type
3. Add to `LANGUAGE_NAMES` object
4. Test with `prai translate`

## 📋 Code Guidelines

- Use TypeScript strict mode
- Keep functions small and focused
- Add JSDoc comments for public functions
- Handle errors gracefully with user-friendly messages
- Use `chalk` for colored output
- Use `ora` for spinners

## 🧪 Testing

Before submitting a PR, test:

1. All existing commands still work
2. Your new feature works as expected
3. Error cases are handled
4. No TypeScript errors (`npm run build`)

## 📜 License

By contributing, you agree that your contributions will be licensed under the Apache License 2.0.

---

**Questions?** Open an issue or discussion!
