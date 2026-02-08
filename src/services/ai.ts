import OpenAI from 'openai';
import type { GitHubAnalysis } from './github.js';

export async function generateBio(analysis: GitHubAnalysis, apiKey: string): Promise<string> {
  const openai = new OpenAI({ apiKey });

  const prompt = `Generate a professional and engaging GitHub profile bio for a developer with the following characteristics:

Username: ${analysis.profile.username}
Name: ${analysis.profile.name || 'Not specified'}
Current bio: ${analysis.profile.bio || 'None'}
Location: ${analysis.profile.location || 'Not specified'}
Company: ${analysis.profile.company || 'Not specified'}
Top programming languages: ${analysis.topLanguages.join(', ')}
Number of public repositories: ${analysis.profile.publicRepos}
Total stars received: ${analysis.totalStars}
Notable repositories: ${analysis.pinnedRepos.slice(0, 3).join(', ')}

Generate a 2-3 sentence bio that:
1. Highlights their main expertise based on languages used
2. Sounds professional but friendly
3. Includes a subtle call-to-action or interesting fact
4. Does NOT use clichés like "passionate developer" or "code enthusiast"

Return ONLY the bio text, no quotes or explanations.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 150,
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content?.trim() || analysis.profile.bio || '';
}

export async function generateTagline(analysis: GitHubAnalysis, apiKey: string): Promise<string> {
  const openai = new OpenAI({ apiKey });

  const prompt = `Create a short, memorable tagline (max 10 words) for a ${analysis.topLanguages[0] || 'software'} developer.
Username: ${analysis.profile.username}
Top skills: ${analysis.topLanguages.slice(0, 3).join(', ')}

Return ONLY the tagline, no quotes.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 30,
    temperature: 0.8,
  });

  return response.choices[0]?.message?.content?.trim() || `${analysis.topLanguages[0] || 'Software'} Developer`;
}
