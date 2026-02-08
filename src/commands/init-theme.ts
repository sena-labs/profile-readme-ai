import chalk from 'chalk';
import fs from 'fs/promises';
import { generateSampleThemeFile } from '../templates/custom.js';

interface InitThemeOptions {
  output: string;
}

export async function initTheme(options: InitThemeOptions): Promise<void> {
  try {
    const sampleTheme = generateSampleThemeFile();
    await fs.writeFile(options.output, sampleTheme, 'utf-8');
    
    console.log(chalk.green(`\n✅ Sample theme created: ${options.output}\n`));
    
    console.log(chalk.bold('📝 Theme Configuration Options:\n'));
    
    console.log(chalk.cyan('headerStyle:'));
    console.log(chalk.gray('  "banner" | "text" | "ascii" | "none"'));
    console.log();

    console.log(chalk.cyan('headerColor:'));
    console.log(chalk.gray('  "gradient" | "0:FFFFFF,100:000000" | hex color'));
    console.log();

    console.log(chalk.cyan('headerAnimation:'));
    console.log(chalk.gray('  "twinkling" | "fadeIn" | "blink" | "none"'));
    console.log();

    console.log(chalk.cyan('badgeStyle:'));
    console.log(chalk.gray('  "flat" | "flat-square" | "for-the-badge" | "plastic"'));
    console.log();

    console.log(chalk.cyan('statsTheme:'));
    console.log(chalk.gray('  "default" | "dark" | "radical" | "tokyonight" | "gruvbox" | ...'));
    console.log();

    console.log(chalk.bold('🚀 Usage:'));
    console.log(chalk.gray(`  prai generate --theme-file ${options.output}`));
    console.log();

  } catch (error) {
    console.error(chalk.red(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`));
    process.exit(1);
  }
}
