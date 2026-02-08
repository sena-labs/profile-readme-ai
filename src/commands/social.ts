import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import fs from 'fs/promises';
import { analyzeGitHubProfile, isValidUsername } from '../services/github.js';
import { generateOgImageUrl, generateSocialCard, getStatsCardUrls, type SocialCardStyle } from '../services/preview.js';
import { getGitHubToken } from '../utils/config.js';

interface SocialOptions {
  username?: string;
  theme: 'dark' | 'light';
  style?: SocialCardStyle;
  output?: string;
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

    const validUsername = username as string;

    // Select card style
    let style: SocialCardStyle = options.style || 'full';
    if (!options.style) {
      const { selectedStyle } = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedStyle',
          message: 'Card style:',
          choices: [
            { name: 'Full    ─ Header, stats, streak, languages, trophies, activity graph, top repos, summary', value: 'full' },
            { name: 'Compact ─ Header, stats + streak side-by-side, tech badges, footer', value: 'compact' },
            { name: 'Minimal ─ Stats card + badges only', value: 'minimal' },
          ],
          default: 'full',
        },
      ]);
      style = selectedStyle;
    }

    // Analyze profile
    const spinner = ora('Analyzing GitHub profile...').start();
    const githubToken = getGitHubToken();
    const analysis = await analyzeGitHubProfile(validUsername, githubToken);
    spinner.succeed('Profile analyzed');

    // Generate URLs
    const previewUrl = generateOgImageUrl(analysis, { theme: options.theme });
    const statsUrls = getStatsCardUrls(validUsername, options.theme);

    // Display available image URLs
    console.log(chalk.bold('\n🖼️  Social Preview Images\n'));

    const urlEntries = [
      ['Header Banner', previewUrl],
      ['Stats Card', statsUrls.stats],
      ['Languages', statsUrls.languages],
      ['Streak', statsUrls.streak],
      ['Trophies', statsUrls.trophy],
      ['Activity Graph', statsUrls.activity],
      ['Profile Summary', statsUrls.summary],
      ['Productive Time', statsUrls.productive],
    ];

    for (const [label, url] of urlEntries) {
      console.log(`  ${chalk.cyan(label.padEnd(18))} ${chalk.gray(url)}`);
    }

    // Generate social card markdown
    const socialCard = generateSocialCard(analysis, style, options.theme);

    console.log(chalk.bold(`\n📄 Generated ${chalk.cyan(style)} card (${options.theme} theme)\n`));

    // Save
    const outputPath = options.output || './social-card.md';
    const { save } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'save',
        message: `Save to ${outputPath}?`,
        default: true,
      },
    ]);

    if (save) {
      await fs.writeFile(outputPath, socialCard, 'utf-8');
      console.log(chalk.green(`\n✅ Social card saved to ${outputPath}`));
    }

    console.log(chalk.bold('\n💡 Tips:'));
    console.log('  • Paste the markdown directly into your profile README');
    console.log('  • Use the header banner URL as your Twitter/LinkedIn cover');
    console.log('  • All images are served live — stats update automatically');
    console.log();

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const sanitizedMessage = message.replace(/[A-Z]:\\[^\s]+/gi, '[path]').replace(/\/[^\s]+\/[^\s]+/g, '[path]');
    console.error(chalk.red(`Error: ${sanitizedMessage}`));
    process.exit(1);
  }
}
