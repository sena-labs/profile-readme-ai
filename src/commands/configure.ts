import chalk from 'chalk';
import inquirer from 'inquirer';
import { getOpenAIKey, getGitHubToken, setOpenAIKey, setGitHubToken } from '../utils/config.js';

export async function configure(): Promise<void> {
  console.log(chalk.bold('\n⚙️  Configuration\n'));

  const currentGithubToken = getGitHubToken();
  const currentOpenaiKey = getOpenAIKey();

  console.log(chalk.gray('Current configuration:'));
  console.log(`  GitHub Token: ${currentGithubToken ? chalk.green('✓ Set') : chalk.yellow('✗ Not set')}`);
  console.log(`  OpenAI Key:   ${currentOpenaiKey ? chalk.green('✓ Set') : chalk.yellow('✗ Not set')}`);
  console.log();

  const answers = await inquirer.prompt([
    {
      type: 'password',
      name: 'githubToken',
      message: 'GitHub Personal Access Token (optional, for higher rate limits):',
      mask: '*',
      default: currentGithubToken ? '(keep current)' : '',
    },
    {
      type: 'password',
      name: 'openaiKey',
      message: 'OpenAI API Key (required for AI bio generation):',
      mask: '*',
      default: currentOpenaiKey ? '(keep current)' : '',
    },
  ]);

  // Save configuration
  if (answers.githubToken && answers.githubToken !== '(keep current)') {
    setGitHubToken(answers.githubToken);
    console.log(chalk.green('✓ GitHub token saved'));
  }

  if (answers.openaiKey && answers.openaiKey !== '(keep current)') {
    setOpenAIKey(answers.openaiKey);
    console.log(chalk.green('✓ OpenAI key saved'));
  }

  console.log(chalk.cyan('\n💡 Tips:'));
  console.log('  • GitHub token: https://github.com/settings/tokens (no scopes needed for public data)');
  console.log('  • OpenAI key: https://platform.openai.com/api-keys');
  console.log();
}
