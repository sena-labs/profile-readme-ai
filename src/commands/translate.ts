import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import fs from 'fs/promises';
import Conf from 'conf';
import { analyzeGitHubProfile } from '../services/github.js';
import {
  generateMultiLanguageBio,
  type SupportedLanguage,
  LANGUAGE_NAMES,
} from '../services/ai-advanced.js';

const config = new Conf({ projectName: 'profile-readme-ai' });

interface TranslateOptions {
  username?: string;
  languages?: string;
  output?: string;
}

const ALL_LANGUAGES: SupportedLanguage[] = ['en', 'it', 'es', 'de', 'fr', 'pt', 'zh', 'ja', 'ko', 'ru'];

export async function translate(options: TranslateOptions): Promise<void> {
  try {
    // Check for OpenAI key
    const openaiKey = config.get('openaiKey') as string | undefined;
    if (!openaiKey) {
      console.log(chalk.red('\n❌ OpenAI API key required for translation.'));
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
          message: 'Enter GitHub username:',
          validate: (input: string) => input.length > 0 || 'Username is required',
        },
      ]);
      username = answers.username;
    }

    // Get languages
    let selectedLanguages: SupportedLanguage[];
    if (options.languages) {
      selectedLanguages = options.languages.split(',').map(l => l.trim()) as SupportedLanguage[];
    } else {
      const langChoices = ALL_LANGUAGES.map(code => ({
        name: `${LANGUAGE_NAMES[code]} (${code})`,
        value: code,
        checked: ['en', 'it', 'es'].includes(code),
      }));

      const { languages } = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'languages',
          message: 'Select languages for bio generation:',
          choices: langChoices,
          validate: (input: string[]) => input.length > 0 || 'Select at least one language',
        },
      ]);
      selectedLanguages = languages;
    }

    // Analyze profile
    const spinner = ora('Fetching GitHub profile...').start();
    const githubToken = config.get('githubToken') as string | undefined;
    const analysis = await analyzeGitHubProfile(username!, githubToken);
    spinner.succeed(`Profile found: ${analysis.profile.name || username}`);

    // Generate multi-language bios
    const bioSpinner = ora(`Generating bios in ${selectedLanguages.length} languages...`).start();
    const bios = await generateMultiLanguageBio(analysis, openaiKey, selectedLanguages);
    bioSpinner.succeed('Bios generated');

    // Display results
    console.log(chalk.bold('\n🌍 Multi-Language Bios\n'));
    console.log(chalk.gray('─'.repeat(60)));

    for (const [langCode, bio] of Object.entries(bios)) {
      const langName = LANGUAGE_NAMES[langCode as SupportedLanguage] || langCode;
      console.log(chalk.bold.cyan(`\n${langName} (${langCode}):`));
      console.log(chalk.white(bio));
    }
    
    console.log(chalk.gray('\n' + '─'.repeat(60)));

    // Generate markdown snippet
    const markdownSnippet = generateMultiLangMarkdown(bios);
    
    console.log(chalk.bold('\n📝 Markdown Snippet (collapsible sections):\n'));
    console.log(chalk.gray(markdownSnippet.slice(0, 500) + '...'));

    // Save option
    const { save } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'save',
        message: 'Save markdown snippet to file?',
        default: true,
      },
    ]);

    if (save) {
      const outputPath = options.output || './multilang-bio.md';
      await fs.writeFile(outputPath, markdownSnippet, 'utf-8');
      console.log(chalk.green(`\n✅ Saved to ${outputPath}`));
    }

    // Also save JSON
    const { saveJson } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'saveJson',
        message: 'Save bios as JSON file?',
        default: false,
      },
    ]);

    if (saveJson) {
      const jsonPath = './bios.json';
      await fs.writeFile(jsonPath, JSON.stringify(bios, null, 2), 'utf-8');
      console.log(chalk.green(`✅ Saved to ${jsonPath}`));
    }

  } catch (error) {
    console.error(chalk.red(`\nError: ${error instanceof Error ? error.message : 'Unknown error'}`));
    process.exit(1);
  }
}

function generateMultiLangMarkdown(bios: Record<string, string>): string {
  const entries = Object.entries(bios);
  
  // First language is the main one (no collapse)
  const [firstLang, firstBio] = entries[0];
  const firstLangName = LANGUAGE_NAMES[firstLang as SupportedLanguage] || firstLang;
  
  let markdown = `## 👋 About Me

${firstBio}

`;

  // Other languages in collapsible sections
  if (entries.length > 1) {
    markdown += `### 🌍 Other Languages

`;
    
    for (let i = 1; i < entries.length; i++) {
      const [langCode, bio] = entries[i];
      const langName = LANGUAGE_NAMES[langCode as SupportedLanguage] || langCode;
      
      markdown += `<details>
<summary>${langName}</summary>

${bio}

</details>

`;
    }
  }

  return markdown;
}
