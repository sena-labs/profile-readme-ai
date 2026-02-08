import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { analyzeGitHubProfile, isValidUsername } from '../services/github.js';
import {
  deepAnalyzeRepos,
  generateEnhancedBio,
  suggestImprovements,
  fetchExistingReadme,
  type ProfileSuggestion,
  type SupportedLanguage,
  LANGUAGE_NAMES,
} from '../services/ai-advanced.js';
import { getOpenAIKey, getGitHubToken } from '../utils/config.js';

interface AnalyzeOptions {
  username?: string;
  language: SupportedLanguage;
}

export async function analyze(options: AnalyzeOptions): Promise<void> {
  try {
    // Check for OpenAI key
    const openaiKey = getOpenAIKey();
    if (!openaiKey) {
      console.log(chalk.red('\n❌ OpenAI API key required for AI analysis.'));
      console.log(chalk.yellow('Run: prai configure'));
      return;
    }

    // Get username
    let username = options.username;
    if (!username) {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'username',
          message: 'Enter GitHub username to analyze:',
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
    const spinner = ora('Fetching GitHub profile...').start();
    const githubToken = getGitHubToken();
    const analysis = await analyzeGitHubProfile(validUsername, githubToken);
    spinner.succeed(`Profile found: ${analysis.profile.name || username}`);

    // Deep analyze repos
    const repoSpinner = ora('Reading repository READMEs (this may take a moment)...').start();
    const repoDetails = await deepAnalyzeRepos(analysis, githubToken);
    repoSpinner.succeed(`Analyzed ${repoDetails.length} repositories`);

    // Fetch existing README
    const readmeSpinner = ora('Checking existing profile README...').start();
    const existingReadme = await fetchExistingReadme(validUsername);
    if (existingReadme) {
      readmeSpinner.succeed('Found existing profile README');
    } else {
      readmeSpinner.info('No profile README found');
    }

    // Generate enhanced bio
    const bioSpinner = ora(`Generating enhanced bio in ${LANGUAGE_NAMES[options.language]}...`).start();
    const enhancedBio = await generateEnhancedBio(analysis, repoDetails, openaiKey, options.language);
    bioSpinner.succeed('Bio generated');

    // Get suggestions
    const suggestSpinner = ora('Analyzing profile for improvements...').start();
    const suggestions = await suggestImprovements(analysis, existingReadme, openaiKey);
    suggestSpinner.succeed(`Found ${suggestions.length} suggestions`);

    // Display results
    console.log(chalk.bold('\n' + '═'.repeat(60)));
    console.log(chalk.bold.cyan('\n🔍 PROFILE ANALYSIS REPORT\n'));
    console.log(chalk.bold('═'.repeat(60)));

    // Profile summary
    console.log(chalk.bold('\n📊 Profile Summary\n'));
    console.log(`  Name:        ${chalk.cyan(analysis.profile.name || 'Not set')}`);
    console.log(`  Username:    ${chalk.gray('@' + analysis.profile.username)}`);
    console.log(`  Location:    ${analysis.profile.location || chalk.yellow('Not set')}`);
    console.log(`  Company:     ${analysis.profile.company || chalk.yellow('Not set')}`);
    console.log(`  Website:     ${analysis.profile.blog || chalk.yellow('Not set')}`);
    console.log(`  Repos:       ${chalk.green(analysis.profile.publicRepos)}`);
    console.log(`  Stars:       ${chalk.yellow(analysis.totalStars + ' ⭐')}`);
    console.log(`  Followers:   ${chalk.blue(analysis.profile.followers)}`);
    console.log(`  Languages:   ${chalk.magenta(analysis.topLanguages.join(', ') || 'None')}`);

    // Enhanced bio
    console.log(chalk.bold('\n✨ AI-Generated Bio\n'));
    console.log(chalk.gray('─'.repeat(50)));
    console.log(chalk.white(enhancedBio));
    console.log(chalk.gray('─'.repeat(50)));

    // Suggestions
    console.log(chalk.bold('\n💡 Improvement Suggestions\n'));
    
    const priorityColors = {
      high: chalk.red,
      medium: chalk.yellow,
      low: chalk.gray,
    };

    const categoryEmojis = {
      bio: '📝',
      readme: '📄',
      repos: '📦',
      profile: '👤',
      engagement: '🤝',
    };

    suggestions.forEach((suggestion, index) => {
      const priorityColor = priorityColors[suggestion.priority];
      const emoji = categoryEmojis[suggestion.category] || '💡';
      
      console.log(`${chalk.bold(`${index + 1}. ${emoji} ${suggestion.title}`)} ${priorityColor(`[${suggestion.priority.toUpperCase()}]`)}`);
      console.log(chalk.gray(`   ${suggestion.description}`));
      console.log(chalk.cyan(`   → ${suggestion.actionable}`));
      console.log();
    });

    // Ask to copy bio
    const { copyBio } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'copyBio',
        message: 'Would you like to generate a full README with this bio?',
        default: true,
      },
    ]);

    if (copyBio) {
      console.log(chalk.cyan('\nRun this command to generate your README:'));
      console.log(chalk.gray(`  prai generate -u ${validUsername} --no-ai`));
      console.log(chalk.gray('\nThen replace the bio section with the generated one above.'));
    }

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    // Sanitize error message to not expose system paths
    const sanitizedMessage = message.replace(/[A-Z]:\\[^\s]+/gi, '[path]').replace(/\/[^\s]+\/[^\s]+/g, '[path]');
    console.error(chalk.red(`\nError: ${sanitizedMessage}`));
    process.exit(1);
  }
}
