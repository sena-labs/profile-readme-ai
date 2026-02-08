import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import fs from 'fs/promises';
import { analyzeGitHubProfile, isValidUsername } from '../services/github.js';
import { generateOgImageUrl, generateSocialCard, getStatsCardUrls } from '../services/preview.js';
import { getGitHubToken } from '../utils/config.js';

interface SocialOptions {
  username?: string;
  theme: 'dark' | 'light';
}

export async function social(options: SocialOptions): Promise<void> {
  try {
    // Get username
    let username = options.username;
    if (!username) {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'username',
          message: 'Enter GitHub username:',
          validate: (input: string) => {
            if (!input || input.length === 0) return 'Username is required';
            if (!isValidUsername(input)) return 'Invalid GitHub username format';
            return true;
          },
        },
      ]);
      username = answers.username;
    } else if (!isValidUsername(username)) {
      console.error(chalk.red('Invalid GitHub username format'));
      return;
    }

    // At this point username is guaranteed to be a valid string
    const validUsername = username as string;

    // Analyze profile
    const spinner = ora('Analyzing GitHub profile...').start();
    
    const githubToken = getGitHubToken();
    const analysis = await analyzeGitHubProfile(validUsername, githubToken);
    spinner.succeed('Profile analyzed');

    // Generate URLs
    const previewUrl = generateOgImageUrl(analysis, { theme: options.theme });
    const statsUrls = getStatsCardUrls(validUsername, options.theme);
    const socialCard = generateSocialCard(analysis);

    console.log(chalk.bold('\n🖼️  Social Preview Images\n'));
    
    console.log(chalk.cyan('Header Banner:'));
    console.log(chalk.gray(previewUrl));
    console.log();

    console.log(chalk.cyan('Stats Card:'));
    console.log(chalk.gray(statsUrls.stats));
    console.log();

    console.log(chalk.cyan('Languages Card:'));
    console.log(chalk.gray(statsUrls.languages));
    console.log();

    console.log(chalk.cyan('Streak Card:'));
    console.log(chalk.gray(statsUrls.streak));
    console.log();

    console.log(chalk.cyan('Trophy Card:'));
    console.log(chalk.gray(statsUrls.trophy));
    console.log();

    // Ask to save social card markdown
    const { saveSocialCard } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'saveSocialCard',
        message: 'Save social sharing card markdown to file?',
        default: true,
      },
    ]);

    if (saveSocialCard) {
      const { outputPath } = await inquirer.prompt([
        {
          type: 'input',
          name: 'outputPath',
          message: 'Output file path:',
          default: './social-card.md',
        },
      ]);

      await fs.writeFile(outputPath, socialCard, 'utf-8');
      console.log(chalk.green(`\n✅ Social card saved to ${outputPath}`));
    }

    console.log(chalk.bold('\n💡 Tips:'));
    console.log('  • Right-click any URL above and "Save image as..." to download PNG');
    console.log('  • Use the header banner as your Twitter/LinkedIn cover');
    console.log('  • Add the social card to your README for sharing');
    console.log();

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    // Sanitize error message to not expose system paths
    const sanitizedMessage = message.replace(/[A-Z]:\\[^\s]+/gi, '[path]').replace(/\/[^\s]+\/[^\s]+/g, '[path]');
    console.error(chalk.red(`Error: ${sanitizedMessage}`));
    process.exit(1);
  }
}
