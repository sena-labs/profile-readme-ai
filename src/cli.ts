#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import boxen from 'boxen';
import { generate } from './commands/generate.js';
import { configure } from './commands/configure.js';
import { preview } from './commands/preview.js';
import { social } from './commands/social.js';
import { initTheme } from './commands/init-theme.js';
import { analyze } from './commands/analyze.js';
import { translate } from './commands/translate.js';

const program = new Command();

console.log(
  boxen(
    chalk.bold.cyan('🚀 Profile README AI') + '\n' +
    chalk.gray('Generate stunning GitHub profiles with AI'),
    {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'cyan'
    }
  )
);

program
  .name('profile-readme-ai')
  .description('AI-powered GitHub Profile README generator')
  .version('1.0.0');

program
  .command('generate')
  .alias('g')
  .description('Generate a new profile README')
  .option('-u, --username <username>', 'GitHub username')
  .option('-t, --theme <theme>', 'Theme: minimal, hacker, creative, corporate, retro, neon, dark, light', 'minimal')
  .option('--theme-file <path>', 'Load custom theme from JSON file')
  .option('-o, --output <path>', 'Output file path', './README.md')
  .option('--no-ai', 'Skip AI bio generation')
  .option('--no-stats', 'Skip GitHub stats cards')
  .action(generate);

program
  .command('configure')
  .alias('c')
  .description('Configure API keys and preferences')
  .action(configure);

program
  .command('preview')
  .alias('p')
  .description('Preview your current profile README')
  .option('-u, --username <username>', 'GitHub username')
  .action(preview);

program
  .command('analyze')
  .alias('a')
  .description('Deep analyze profile with AI: repo analysis, enhanced bio, improvement suggestions')
  .option('-u, --username <username>', 'GitHub username')
  .option('-l, --language <lang>', 'Bio language: en, it, es, de, fr, pt, zh, ja, ko, ru', 'en')
  .action(analyze);

program
  .command('translate')
  .alias('t')
  .description('Generate bio in multiple languages')
  .option('-u, --username <username>', 'GitHub username')
  .option('--languages <langs>', 'Comma-separated language codes (e.g. en,it,es)')
  .option('-o, --output <path>', 'Output file path')
  .action(translate);

program
  .command('social')
  .alias('s')
  .description('Generate social preview images and sharing cards')
  .option('-u, --username <username>', 'GitHub username')
  .option('-t, --theme <theme>', 'Color theme: dark, light', 'dark')
  .action(social);

program
  .command('init-theme')
  .description('Create a sample custom theme JSON file')
  .option('-o, --output <path>', 'Output file path', './my-theme.json')
  .action(initTheme);

program
  .command('themes')
  .description('List available themes')
  .action(() => {
    console.log(chalk.bold('\n📦 Available Themes:\n'));
    const themes = [
      { name: 'minimal', desc: 'Clean and simple design' },
      { name: 'hacker', desc: 'Terminal-style with ASCII art' },
      { name: 'creative', desc: 'Colorful with animations' },
      { name: 'corporate', desc: 'Professional business style' },
      { name: 'retro', desc: 'Pixel art gaming aesthetic' },
      { name: 'neon', desc: 'Cyberpunk neon glow effect' },
      { name: 'dark', desc: 'Sleek dark mode design' },
      { name: 'light', desc: 'Clean light mode design' },
    ];
    themes.forEach(t => {
      console.log(`  ${chalk.cyan(t.name.padEnd(12))} ${chalk.gray(t.desc)}`);
    });
    console.log();
    console.log(chalk.gray('  Use --theme-file to load a custom theme JSON'));
    console.log();
  });

program.parse();
