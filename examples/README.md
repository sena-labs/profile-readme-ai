# 🎨 Theme Examples

This directory contains example outputs for each theme available in Profile README AI.

## Available Themes

| Theme | Description | Preview |
|-------|-------------|---------|
| [minimal](./minimal.md) | Clean and simple design | [View](./minimal.md) |
| [hacker](./hacker.md) | Terminal-style with ASCII art | [View](./hacker.md) |
| [creative](./creative.md) | Colorful with animations | [View](./creative.md) |
| [corporate](./corporate.md) | Professional business style | [View](./corporate.md) |
| [retro](./retro.md) | Pixel art gaming aesthetic | [View](./retro.md) |
| [neon](./neon.md) | Cyberpunk neon glow effect | [View](./neon.md) |
| [dark](./dark.md) | Sleek dark mode design | [View](./dark.md) |
| [light](./light.md) | Clean light mode design | [View](./light.md) |

## Usage

Generate a README with any theme:

```bash
# Interactive mode
prai generate

# With specific theme
prai generate -u YOUR_USERNAME -t neon

# List all themes
prai themes
```

## Custom Themes

Create your own theme:

```bash
# Generate template
prai init-theme -o my-theme.json

# Use custom theme
prai generate --theme-file my-theme.json
```

---

**Note:** These examples use placeholder data. Your generated README will use your actual GitHub profile information.
