import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import fs from 'fs/promises';
import { analyzeGitHubProfile, isValidUsername, type GitHubAnalysis } from '../services/github.js';
import { generateBio, generateTagline } from '../services/ai.js';
import { generateReadme } from '../templates/index.js';
import { loadCustomTheme, generateCustomTheme } from '../templates/custom.js';
import { getOpenAIKey, getGitHubToken } from '../utils/config.js';
import { validateOutputPath } from '../utils/path-validation.js';

interface GenerateOptions {
  username?: string;
  theme: string;
  themeFile?: string;
  output: string;
  ai: boolean;
  stats: boolean;
  dryRun?: boolean;
}

export async function generate(options: GenerateOptions): Promise<void> {
  try {
    // Get username
    let username = options.username;
    if (!username) {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'username',
          message: 'Enter your GitHub username:',
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

    // Analyze GitHub profile
    const spinner = ora('Analyzing GitHub profile...').start();
    
    let analysis: GitHubAnalysis;
    try {
      const githubToken = getGitHubToken();
      analysis = await analyzeGitHubProfile(validUsername, githubToken);
      spinner.succeed(`Found ${analysis.profile.publicRepos} repos, ${analysis.totalStars} stars`);
    } catch (error) {
      spinner.fail('Failed to fetch GitHub profile');
      console.error(chalk.red(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`));
      console.log(chalk.yellow('Make sure the username is correct and try again.'));
      return;
    }

    // Display profile summary
    console.log(chalk.bold('\n📊 Profile Summary:'));
    console.log(`   Name: ${chalk.cyan(analysis.profile.name || 'Not set')}`);
    console.log(`   Location: ${chalk.cyan(analysis.profile.location || 'Not set')}`);
    console.log(`   Top Languages: ${chalk.green(analysis.topLanguages.join(', ') || 'None')}`);
    console.log(`   Followers: ${chalk.yellow(analysis.profile.followers)}`);
    console.log();

    // Generate AI content if enabled
    let bio = analysis.profile.bio || '';
    let tagline = '';

    if (options.ai) {
      const openaiKey = getOpenAIKey();
      
      if (openaiKey) {
        const aiSpinner = ora('Generating AI-powered bio...').start();
        try {
          [bio, tagline] = await Promise.all([
            generateBio(analysis, openaiKey),
            generateTagline(analysis, openaiKey),
          ]);
          aiSpinner.succeed('AI content generated');
        } catch (error) {
          aiSpinner.warn('AI generation failed, using default bio');
        }
      } else {
        console.log(chalk.yellow('⚠ No OpenAI API key configured. Run `prai configure` to set up AI features.'));
      }
    }

    // Select theme if not specified (skip if using custom theme file)
    let theme = options.theme;
    if ((!options.theme || options.theme === 'minimal') && !options.themeFile) {
      const themeAnswer = await inquirer.prompt([
        {
          type: 'list',
          name: 'theme',
          message: 'Select a theme:',
          choices: [
            { name: '🎯 Minimal - Clean and simple', value: 'minimal' },
            { name: '💻 Hacker - Terminal style', value: 'hacker' },
            { name: '🎨 Creative - Colorful with animations', value: 'creative' },
            { name: '👔 Corporate - Professional business', value: 'corporate' },
            { name: '🕹️  Retro - Pixel art gaming aesthetic', value: 'retro' },
            { name: '💜 Neon - Cyberpunk neon glow', value: 'neon' },
            { name: '🌑 Dark - Sleek dark mode', value: 'dark' },
            { name: '☀️  Light - Clean light mode', value: 'light' },
          ],
          default: options.theme,
        },
      ]);
      theme = themeAnswer.theme;
    }

    // Generate README
    const readmeSpinner = ora('Generating README...').start();
    let readme: string;
    if (options.themeFile) {
      const customConfig = await loadCustomTheme(options.themeFile);
      readme = generateCustomTheme(analysis, customConfig, {
        bio,
        tagline,
        includeStats: options.stats,
      });
      readmeSpinner.succeed(`README generated with custom theme: ${customConfig.name}`);
    } else {
      readme = generateReadme(analysis, {
        theme,
        bio,
        tagline,
        includeStats: options.stats,
      });
      readmeSpinner.succeed('README generated');
    }

    // Preview
    console.log(chalk.bold('\n📝 Preview (first 30 lines):\n'));
    console.log(chalk.gray('─'.repeat(60)));
    const previewLines = readme.split('\n').slice(0, 30);
    previewLines.forEach(line => console.log(chalk.gray(line)));
    if (readme.split('\n').length > 30) {
      console.log(chalk.gray('... (truncated)'));
    }
    console.log(chalk.gray('─'.repeat(60)));

    // Handle dry-run mode
    if (options.dryRun) {
      console.log(chalk.cyan('\n🔍 Dry-run mode - no file will be saved'));
      console.log(chalk.bold('\n📄 Full README output:\n'));
      console.log(chalk.gray('─'.repeat(60)));
      console.log(readme);
      console.log(chalk.gray('─'.repeat(60)));
      console.log(chalk.green('\n✓ Dry-run complete. Use without --dry-run to save.'));
      return;
    }

    // Validate output path
    const resolvedOutput = validateOutputPath(options.output, 'markdown');

    // Confirm save
    const { confirmSave } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirmSave',
        message: `Save to ${options.output}?`,
        default: true,
      },
    ]);

    if (confirmSave) {
      await fs.writeFile(resolvedOutput, readme, 'utf-8');
      console.log(chalk.green(`\n✅ README saved to ${options.output}`));
      console.log(chalk.cyan('\nNext steps:'));
      console.log(`  1. Review the generated README`);
      console.log(`  2. Create a repo with your username: https://github.com/new`);
      console.log(`  3. Copy the README.md to that repo`);
      console.log(`  4. Commit and push!`);
    } else {
      console.log(chalk.yellow('\nREADME not saved.'));
    }

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    // Sanitize error message to not expose system paths
    const sanitizedMessage = message.replace(/[A-Z]:\\[^\s]+/gi, '[path]').replace(/\/[^\s]+\/[^\s]+/g, '[path]');
    console.error(chalk.red(`Error: ${sanitizedMessage}`));
    process.exit(1);
  }
}
