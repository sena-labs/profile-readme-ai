import OpenAI from 'openai';
import { Octokit } from 'octokit';

// Singleton instances cache
let openaiInstance: OpenAI | null = null;
let openaiKey: string | null = null;

let octokitInstance: Octokit | null = null;
let octokitToken: string | undefined | null = null;

/**
 * Get or create OpenAI client singleton
 * Reuses existing instance if API key hasn't changed
 */
export function getOpenAIClient(apiKey: string): OpenAI {
  if (!openaiInstance || openaiKey !== apiKey) {
    openaiInstance = new OpenAI({ apiKey });
    openaiKey = apiKey;
  }
  return openaiInstance;
}

/**
 * Get or create Octokit client singleton
 * Reuses existing instance if token hasn't changed
 */
export function getOctokitClient(token?: string): Octokit {
  if (!octokitInstance || octokitToken !== token) {
    octokitInstance = new Octokit({ auth: token });
    octokitToken = token;
  }
  return octokitInstance;
}

/**
 * Default timeout for HTTP requests (in milliseconds)
 */
export const DEFAULT_TIMEOUT = 30000; // 30 seconds

/**
 * Fetch with timeout support
 */
export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = DEFAULT_TIMEOUT
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Clear all cached client instances (useful for testing)
 */
export function clearClientCache(): void {
  openaiInstance = null;
  openaiKey = null;
  octokitInstance = null;
  octokitToken = null;
}
