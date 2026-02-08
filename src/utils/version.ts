import chalk from 'chalk';
import boxen from 'boxen';
import Conf from 'conf';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const config = new Conf({ projectName: 'profile-readme-ai' });

// Get package version
function getPackageVersion(): string {
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const pkgPath = path.resolve(__dirname, '../../package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    return pkg.version || '1.0.0';
  } catch {
    return '1.0.0';
  }
}

export const VERSION = getPackageVersion();

export function showDetailedVersion(): void {
  const hasOpenAI = config.has('openaiKey');
  const hasGitHub = config.has('githubToken');

  const info = `
${chalk.bold.cyan('Profile README AI')} ${chalk.gray(`v${VERSION}`)}

${chalk.bold('Configuration:')}
  OpenAI API Key: ${hasOpenAI ? chalk.green('✓ Configured') : chalk.yellow('✗ Not set')}
  GitHub Token:   ${hasGitHub ? chalk.green('✓ Configured') : chalk.yellow('✗ Not set (optional)')}

${chalk.bold('Themes:')} 8 built-in + custom JSON support
${chalk.bold('Languages:')} EN, IT, ES, DE, FR, PT, ZH, JA, KO, RU

${chalk.gray('Repository: https://github.com/sena-labs/profile-readme-ai')}
${chalk.gray('npm:        https://www.npmjs.com/package/profile-readme-ai')}
`;

  console.log(info);
}

export function checkFirstRun(): boolean {
  const hasRun = config.get('hasRun') as boolean | undefined;
  if (!hasRun) {
    config.set('hasRun', true);
    return true;
  }
  return false;
}

export function showWelcomeMessage(): void {
  const message = boxen(
    chalk.bold.cyan('👋 Welcome to Profile README AI!\n\n') +
    chalk.white('Generate stunning GitHub profile READMEs with AI.\n\n') +
    chalk.bold('Quick Start:\n') +
    chalk.gray('  prai generate        ') + chalk.white('Create your README\n') +
    chalk.gray('  prai configure       ') + chalk.white('Set up API keys\n') +
    chalk.gray('  prai themes          ') + chalk.white('See available themes\n\n') +
    chalk.bold('AI Features ') + chalk.yellow('(requires OpenAI key)') + chalk.bold(':\n') +
    chalk.gray('  prai analyze         ') + chalk.white('Deep profile analysis\n') +
    chalk.gray('  prai translate       ') + chalk.white('Multi-language bio\n\n') +
    chalk.gray('Run ') + chalk.cyan('prai --help') + chalk.gray(' for all commands.'),
    {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'cyan',
    }
  );

  console.log(message);
}
