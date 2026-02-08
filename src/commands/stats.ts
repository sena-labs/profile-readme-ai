import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { analyzeGitHubProfile, isValidUsername } from '../services/github.js';
import { getGitHubToken } from '../utils/config.js';

interface StatsOptions {
  username?: string;
  json?: boolean;
}

export async function stats(options: StatsOptions): Promise<void> {
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

    // Fetch profile
    const spinner = ora('Fetching GitHub statistics...').start();
    const githubToken = getGitHubToken();
    const analysis = await analyzeGitHubProfile(validUsername, githubToken);
    spinner.succeed('Statistics loaded');

    // JSON output mode
    if (options.json) {
      const jsonOutput = {
        username: analysis.profile.username,
        name: analysis.profile.name,
        bio: analysis.profile.bio,
        location: analysis.profile.location,
        company: analysis.profile.company,
        blog: analysis.profile.blog,
        twitter: analysis.profile.twitter,
        followers: analysis.profile.followers,
        following: analysis.profile.following,
        publicRepos: analysis.profile.publicRepos,
        privateRepos: analysis.privateRepoCount,
        includesPrivateRepos: analysis.includesPrivateRepos,
        totalStars: analysis.totalStars,
        topLanguages: analysis.topLanguages,
        pinnedRepos: analysis.pinnedRepos,
        memberSince: analysis.profile.createdAt,
      };
      console.log(JSON.stringify(jsonOutput, null, 2));
      return;
    }

    // Display statistics
    const { profile, topLanguages, totalStars, repositories, pinnedRepos } = analysis;

    console.log(chalk.bold('\n' + '═'.repeat(50)));
    console.log(chalk.bold.cyan(`\n📊 GITHUB STATISTICS: @${profile.username}\n`));
    console.log(chalk.bold('═'.repeat(50)));

    // Profile info
    console.log(chalk.bold('\n👤 Profile\n'));
    console.log(`  Name:         ${chalk.cyan(profile.name || 'Not set')}`);
    console.log(`  Bio:          ${chalk.gray(profile.bio || 'Not set')}`);
    console.log(`  Location:     ${profile.location || chalk.yellow('Not set')}`);
    console.log(`  Company:      ${profile.company || chalk.yellow('Not set')}`);
    console.log(`  Website:      ${profile.blog || chalk.yellow('Not set')}`);
    console.log(`  Twitter:      ${profile.twitter ? `@${profile.twitter}` : chalk.yellow('Not set')}`);
    console.log(`  Member since: ${chalk.gray(new Date(profile.createdAt).toLocaleDateString())}`);

    // Engagement stats
    console.log(chalk.bold('\n📈 Engagement\n'));
    console.log(`  Followers:    ${chalk.green(profile.followers)}`);
    console.log(`  Following:    ${chalk.blue(profile.following)}`);
    console.log(`  Ratio:        ${chalk.cyan((profile.followers / Math.max(profile.following, 1)).toFixed(2))}`);

    // Repository stats
    console.log(chalk.bold('\n📦 Repositories\n'));
    console.log(`  Public repos: ${chalk.green(profile.publicRepos)}`);
    if (analysis.includesPrivateRepos) {
      console.log(`  Private repos:${chalk.magenta(' ' + analysis.privateRepoCount + ' 🔒')}`);
      console.log(`  Total repos:  ${chalk.bold(repositories.length)}`);
    }
    console.log(`  Total stars:  ${chalk.yellow(totalStars + ' ⭐')}`);
    console.log(`  Avg stars:    ${chalk.gray((totalStars / Math.max(profile.publicRepos, 1)).toFixed(1))}`);
    
    const forkedRepos = repositories.filter(r => r.isForked).length;
    const originalRepos = repositories.length - forkedRepos;
    console.log(`  Original:     ${chalk.cyan(originalRepos)}`);
    console.log(`  Forked:       ${chalk.gray(forkedRepos)}`);

    // Languages (include private repos in language stats)
    console.log(chalk.bold(`\n💻 Top Languages${analysis.includesPrivateRepos ? ' (incl. private)' : ''}\n`));
    if (topLanguages.length > 0) {
      const langCounts = new Map<string, number>();
      repositories.forEach(r => {
        if (r.language && !r.isForked) {
          langCounts.set(r.language, (langCounts.get(r.language) || 0) + 1);
        }
      });
      
      topLanguages.forEach((lang, i) => {
        const count = langCounts.get(lang) || 0;
        const bar = '█'.repeat(Math.min(count * 2, 20));
        const percentage = ((count / Math.max(originalRepos, 1)) * 100).toFixed(0);
        console.log(`  ${(i + 1).toString().padStart(2)}. ${lang.padEnd(12)} ${chalk.cyan(bar)} ${chalk.gray(`${count} repos (${percentage}%)`)}`);
      });
    } else {
      console.log(chalk.gray('  No languages detected'));
    }

    // Top repos
    console.log(chalk.bold('\n⭐ Top Repositories\n'));
    const topRepos = repositories
      .filter(r => !r.isForked)
      .sort((a, b) => b.stars - a.stars)
      .slice(0, 5);

    if (topRepos.length > 0) {
      topRepos.forEach((repo, i) => {
        const stars = repo.stars > 0 ? chalk.yellow(`★${repo.stars}`) : chalk.gray('★0');
        const lang = repo.language ? chalk.cyan(`[${repo.language}]`) : '';
        const priv = repo.isPrivate ? chalk.magenta(' 🔒') : '';
        console.log(`  ${(i + 1).toString().padStart(2)}. ${chalk.bold(repo.name)} ${stars} ${lang}${priv}`);
        if (repo.description) {
          console.log(chalk.gray(`      ${repo.description.slice(0, 60)}${repo.description.length > 60 ? '...' : ''}`));
        }
      });
    } else {
      console.log(chalk.gray('  No repositories found'));
    }

    // Activity insights
    console.log(chalk.bold('\n🎯 Insights\n'));
    
    // Calculate activity score (simple heuristic)
    const activityScore = Math.min(100, Math.round(
      (profile.publicRepos * 2) +
      (totalStars * 0.5) +
      (profile.followers * 0.3)
    ));
    
    const scoreBar = '█'.repeat(Math.floor(activityScore / 5)) + '░'.repeat(20 - Math.floor(activityScore / 5));
    console.log(`  Activity:     ${chalk.cyan(scoreBar)} ${activityScore}/100`);
    
    // Profile completeness
    let completeness = 0;
    if (profile.name) completeness += 20;
    if (profile.bio) completeness += 20;
    if (profile.location) completeness += 15;
    if (profile.company) completeness += 15;
    if (profile.blog) completeness += 15;
    if (profile.twitter) completeness += 15;
    
    const completeBar = '█'.repeat(Math.floor(completeness / 5)) + '░'.repeat(20 - Math.floor(completeness / 5));
    console.log(`  Completeness: ${chalk.green(completeBar)} ${completeness}%`);

    console.log(chalk.bold('\n' + '═'.repeat(50)));
    console.log(chalk.gray(`\nProfile: https://github.com/${profile.username}`));
    console.log();

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const sanitizedMessage = message.replace(/[A-Z]:\\[^\s]+/gi, '[path]').replace(/\/[^\s]+\/[^\s]+/g, '[path]');
    console.error(chalk.red(`\nError: ${sanitizedMessage}`));
    process.exit(1);
  }
}
