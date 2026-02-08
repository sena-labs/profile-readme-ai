import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import fs from 'fs/promises';
import Conf from 'conf';
import { analyzeGitHubProfile } from '../services/github.js';
import { generateSocialPreviewUrl, generateOgImageUrl, generateSocialCard, getStatsCardUrls } from '../services/preview.js';

const config = new Conf({ projectName: 'profile-readme-ai' });

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
          validate: (input: string) => input.length > 0 || 'Username is required',
        },
      ]);
      username = answers.username;
    }

    // Analyze profile
    const spinner = ora('Analyzing GitHub profile...').start();
    
    const githubToken = config.get('githubToken') as string | undefined;
    const analysis = await analyzeGitHubProfile(username!, githubToken);
    spinner.succeed('Profile analyzed');

    // Generate URLs
    const previewUrl = generateOgImageUrl(analysis, { theme: options.theme });
    const statsUrls = getStatsCardUrls(username!, options.theme);
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
    console.error(chalk.red(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`));
    process.exit(1);
  }
}
