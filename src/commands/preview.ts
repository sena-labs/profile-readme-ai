import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { isValidUsername } from '../services/github.js';

interface PreviewOptions {
  username?: string;
}

export async function preview(options: PreviewOptions): Promise<void> {
  let username = options.username;
  
  if (!username) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'username',
        message: 'Enter GitHub username to preview:',
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

  const spinner = ora('Fetching profile README...').start();

  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/${username}/${username}/main/README.md`
    );

    if (!response.ok) {
      // Try master branch
      const masterResponse = await fetch(
        `https://raw.githubusercontent.com/${username}/${username}/master/README.md`
      );
      
      if (!masterResponse.ok) {
        spinner.fail('No profile README found');
        console.log(chalk.yellow(`\n${username} doesn't have a profile README yet.`));
        console.log(chalk.cyan('Create one with: prai generate -u ' + username));
        return;
      }

      const content = await masterResponse.text();
      spinner.succeed('README found');
      displayReadme(content);
      return;
    }

    const content = await response.text();
    spinner.succeed('README found');
    displayReadme(content);

  } catch (error) {
    spinner.fail('Failed to fetch README');
    const message = error instanceof Error ? error.message : 'Unknown error';
    const sanitizedMessage = message.replace(/[A-Z]:\\[^\s]+/gi, '[path]').replace(/\/[^\s]+\/[^\s]+/g, '[path]');
    console.error(chalk.red(`Error: ${sanitizedMessage}`));
  }
}

function displayReadme(content: string): void {
  console.log(chalk.bold('\n📄 Current Profile README:\n'));
  console.log(chalk.gray('─'.repeat(60)));
  
  const lines = content.split('\n');
  lines.forEach((line, index) => {
    if (index < 50) {
      // Basic markdown highlighting
      if (line.startsWith('# ')) {
        console.log(chalk.bold.cyan(line));
      } else if (line.startsWith('## ')) {
        console.log(chalk.bold.blue(line));
      } else if (line.startsWith('### ')) {
        console.log(chalk.bold.magenta(line));
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        console.log(chalk.yellow('  ' + line));
      } else {
        console.log(line);
      }
    }
  });

  if (lines.length > 50) {
    console.log(chalk.gray(`\n... (${lines.length - 50} more lines)`));
  }
  
  console.log(chalk.gray('─'.repeat(60)));
}
