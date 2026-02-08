import type { GitHubAnalysis } from './github.js';
import type { Octokit } from 'octokit';
import { getOpenAIClient, getOctokitClient, fetchWithTimeout } from '../utils/clients.js';

export type SupportedLanguage = 'en' | 'it' | 'es' | 'de' | 'fr' | 'pt' | 'zh' | 'ja' | 'ko' | 'ru';

export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: 'English',
  it: 'Italiano',
  es: 'Español',
  de: 'Deutsch',
  fr: 'Français',
  pt: 'Português',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
  ru: 'Русский',
};

interface RepoDetails {
  name: string;
  description: string | null;
  readme: string | null;
  topics: string[];
  language: string | null;
  stars: number;
}

/**
 * Fetch README content from a repository
 */
async function fetchRepoReadme(octokit: Octokit, owner: string, repo: string): Promise<string | null> {
  try {
    const { data } = await octokit.rest.repos.getReadme({
      owner,
      repo,
      mediaType: { format: 'raw' },
    });
    // Truncate to first 2000 chars to save tokens
    // Handle both string and Buffer responses from the API
    const content = typeof data === 'string' ? data : String(data);
    return content ? content.slice(0, 2000) : null;
  } catch (error) {
    // Silently return null for missing READMEs (404) or permission errors
    return null;
  }
}

/**
 * Deep analyze repositories by reading their READMEs
 */
export async function deepAnalyzeRepos(
  analysis: GitHubAnalysis,
  token?: string
): Promise<RepoDetails[]> {
  const octokit = getOctokitClient(token);
  const { profile, repositories } = analysis;
  
  // Get top repos for analysis — include private repos for better AI context
  const topRepos = repositories
    .filter(r => !r.isForked)
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 8);

  // Fetch READMEs in parallel with concurrency limit of 3
  const CONCURRENCY = 3;
  const repoDetails: RepoDetails[] = [];
  
  for (let i = 0; i < topRepos.length; i += CONCURRENCY) {
    const batch = topRepos.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(
      batch.map(async (repo) => {
        const readme = await fetchRepoReadme(octokit, profile.username, repo.name);
        return {
          name: repo.name,
          description: repo.description,
          readme,
          topics: repo.topics,
          language: repo.language,
          stars: repo.stars,
        };
      })
    );
    repoDetails.push(...batchResults);
  }

  return repoDetails;
}

/**
 * Generate an enhanced bio based on deep repo analysis
 */
export async function generateEnhancedBio(
  analysis: GitHubAnalysis,
  repoDetails: RepoDetails[],
  apiKey: string,
  language: SupportedLanguage = 'en'
): Promise<string> {
  const openai = getOpenAIClient(apiKey);

  const repoSummaries = repoDetails.map(repo => {
    let summary = `- ${repo.name}`;
    if (repo.description) summary += `: ${repo.description}`;
    if (repo.readme) summary += `\n  README excerpt: ${repo.readme.slice(0, 500)}...`;
    if (repo.topics.length) summary += `\n  Topics: ${repo.topics.join(', ')}`;
    return summary;
  }).join('\n\n');

  const prompt = `Analyze this GitHub developer's profile and repositories to create a compelling professional bio.

## Profile
- Username: ${analysis.profile.username}
- Name: ${analysis.profile.name || 'Not specified'}
- Current bio: ${analysis.profile.bio || 'None'}
- Location: ${analysis.profile.location || 'Not specified'}
- Company: ${analysis.profile.company || 'Not specified'}
- Top languages: ${analysis.topLanguages.join(', ')}
- Total stars: ${analysis.totalStars}
- Public repos: ${analysis.profile.publicRepos}
${analysis.includesPrivateRepos ? `- Private repos: ${analysis.privateRepoCount} (included in analysis)` : ''}
- Followers: ${analysis.profile.followers}

## Top Repositories (with README excerpts)
${repoSummaries}

## Task
Based on the repositories and their READMEs, generate a professional bio that:
1. Accurately reflects their actual work and expertise
2. Mentions specific projects or domains they work in
3. Sounds authentic and personal, not generic
4. Is 2-3 sentences long
5. MUST be written in ${LANGUAGE_NAMES[language]}

Return ONLY the bio text, no quotes or explanations.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 200,
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content?.trim() || '';
}

/**
 * Generate multi-language bio
 */
export async function generateMultiLanguageBio(
  analysis: GitHubAnalysis,
  apiKey: string,
  languages: SupportedLanguage[] = ['en', 'it', 'es']
): Promise<Record<SupportedLanguage, string>> {
  const openai = getOpenAIClient(apiKey);

  const prompt = `Generate a professional GitHub profile bio for this developer in multiple languages.

## Profile
- Username: ${analysis.profile.username}
- Name: ${analysis.profile.name || 'Not specified'}
- Current bio: ${analysis.profile.bio || 'None'}
- Top languages: ${analysis.topLanguages.join(', ')}
- Total stars: ${analysis.totalStars}
- Public repos: ${analysis.profile.publicRepos}
${analysis.includesPrivateRepos ? `- Private repos: ${analysis.privateRepoCount}` : ''}
- Location: ${analysis.profile.location || 'Not specified'}

Generate a 2-3 sentence professional bio in each of these languages: ${languages.map(l => LANGUAGE_NAMES[l]).join(', ')}

The bio should:
- Highlight their main expertise
- Sound professional but friendly
- NOT use clichés like "passionate developer"

Return as JSON object with language codes as keys:
{
  "en": "English bio here",
  "it": "Italian bio here",
  ...
}

Return ONLY the JSON, no markdown or explanations.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 500,
    temperature: 0.7,
  });

  try {
    const content = response.choices[0]?.message?.content?.trim() || '{}';
    // Remove potential markdown code blocks
    const jsonStr = content.replace(/```json?\n?|\n?```/g, '').trim();
    const parsed = JSON.parse(jsonStr);
    
    // Validate the response structure
    if (typeof parsed !== 'object' || parsed === null) {
      throw new Error('Invalid response format');
    }
    
    // Ensure all values are strings and filter to requested languages
    const result: Record<string, string> = {};
    for (const lang of languages) {
      if (typeof parsed[lang] === 'string' && parsed[lang].length > 0) {
        result[lang] = parsed[lang];
      } else {
        // Fallback to existing bio for missing languages
        result[lang] = analysis.profile.bio || '';
      }
    }
    return result as Record<SupportedLanguage, string>;
  } catch {
    // Return fallback with existing bio for all requested languages
    const fallback: Record<string, string> = {};
    for (const lang of languages) {
      fallback[lang] = analysis.profile.bio || '';
    }
    return fallback as Record<SupportedLanguage, string>;
  }
}

export interface ProfileSuggestion {
  category: 'bio' | 'readme' | 'repos' | 'profile' | 'engagement';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  actionable: string;
}

/**
 * Analyze existing profile and suggest improvements
 */
export async function suggestImprovements(
  analysis: GitHubAnalysis,
  existingReadme: string | null,
  apiKey: string
): Promise<ProfileSuggestion[]> {
  const openai = getOpenAIClient(apiKey);

  const prompt = `Analyze this GitHub profile and provide specific improvement suggestions.

## Profile Data
- Username: ${analysis.profile.username}
- Name: ${analysis.profile.name || 'NOT SET'}
- Bio: ${analysis.profile.bio || 'NOT SET'}
- Location: ${analysis.profile.location || 'NOT SET'}
- Company: ${analysis.profile.company || 'NOT SET'}
- Website/Blog: ${analysis.profile.blog || 'NOT SET'}
- Twitter: ${analysis.profile.twitter || 'NOT SET'}
- Public Repos: ${analysis.profile.publicRepos}
${analysis.includesPrivateRepos ? `- Private Repos: ${analysis.privateRepoCount}` : ''}
- Followers: ${analysis.profile.followers}
- Following: ${analysis.profile.following}
- Total Stars: ${analysis.totalStars}
- Top Languages: ${analysis.topLanguages.join(', ') || 'None detected'}
- Pinned/Top Repos: ${analysis.pinnedRepos.join(', ') || 'None'}

## Current Profile README
${existingReadme ? existingReadme.slice(0, 3000) : 'NO README EXISTS'}

## Task
Provide 5-7 specific, actionable suggestions to improve this GitHub profile.
Consider:
- Profile completeness (bio, location, links)
- README quality and content
- Repository presentation
- Engagement opportunities
- Personal branding

Return as JSON array:
[
  {
    "category": "bio|readme|repos|profile|engagement",
    "priority": "high|medium|low",
    "title": "Short title",
    "description": "Why this matters",
    "actionable": "Specific action to take"
  }
]

Return ONLY the JSON array, no markdown or explanations.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 1000,
    temperature: 0.7,
  });

  try {
    const content = response.choices[0]?.message?.content?.trim() || '[]';
    const jsonStr = content.replace(/```json?\n?|\n?```/g, '').trim();
    const parsed = JSON.parse(jsonStr);
    
    // Validate the response is an array
    if (!Array.isArray(parsed)) {
      return [];
    }
    
    // Validate and filter each suggestion
    const validCategories = ['bio', 'readme', 'repos', 'profile', 'engagement'];
    const validPriorities = ['high', 'medium', 'low'];
    
    return parsed.filter((item): item is ProfileSuggestion => {
      return (
        typeof item === 'object' &&
        item !== null &&
        typeof item.title === 'string' &&
        typeof item.description === 'string' &&
        typeof item.actionable === 'string' &&
        validCategories.includes(item.category) &&
        validPriorities.includes(item.priority)
      );
    });
  } catch {
    return [];
  }
}

/**
 * Fetch existing profile README
 */
export async function fetchExistingReadme(username: string): Promise<string | null> {
  const TIMEOUT = 10000; // 10 seconds timeout for README fetch
  
  try {
    // Try main branch first
    let response = await fetchWithTimeout(
      `https://raw.githubusercontent.com/${username}/${username}/main/README.md`,
      {},
      TIMEOUT
    );
    
    if (!response.ok) {
      // Try master branch
      response = await fetchWithTimeout(
        `https://raw.githubusercontent.com/${username}/${username}/master/README.md`,
        {},
        TIMEOUT
      );
    }

    if (response.ok) {
      return await response.text();
    }
    return null;
  } catch {
    // Timeout or network error - return null silently
    return null;
  }
}
