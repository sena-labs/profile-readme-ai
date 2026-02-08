#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import boxen from 'boxen';
import { generate } from './commands/generate.js';
import { configure } from './commands/configure.js';
import { preview } from './commands/preview.js';

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
  .option('-t, --theme <theme>', 'Theme: minimal, hacker, creative, corporate', 'minimal')
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
  .command('themes')
  .description('List available themes')
  .action(() => {
    console.log(chalk.bold('\n📦 Available Themes:\n'));
    const themes = [
      { name: 'minimal', desc: 'Clean and simple design' },
      { name: 'hacker', desc: 'Terminal-style with ASCII art' },
      { name: 'creative', desc: 'Colorful with animations' },
      { name: 'corporate', desc: 'Professional business style' },
    ];
    themes.forEach(t => {
      console.log(`  ${chalk.cyan(t.name.padEnd(12))} ${chalk.gray(t.desc)}`);
    });
    console.log();
  });

program.parse();
