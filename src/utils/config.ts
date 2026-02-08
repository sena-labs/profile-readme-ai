import Conf from 'conf';

// Singleton config instance to avoid multiple instantiations
let configInstance: Conf | null = null;

export function getConfig(): Conf {
  if (!configInstance) {
    configInstance = new Conf({ projectName: 'profile-readme-ai' });
  }
  return configInstance;
}

// Type-safe config getters
export function getOpenAIKey(): string | undefined {
  return getConfig().get('openaiKey') as string | undefined;
}

export function getGitHubToken(): string | undefined {
  return getConfig().get('githubToken') as string | undefined;
}

export function setOpenAIKey(key: string): void {
  getConfig().set('openaiKey', key);
}

export function setGitHubToken(token: string): void {
  getConfig().set('githubToken', token);
}

export function hasOpenAIKey(): boolean {
  return getConfig().has('openaiKey');
}

export function hasGitHubToken(): boolean {
  return getConfig().has('githubToken');
}

// First run tracking
export function isFirstRun(): boolean {
  const config = getConfig();
  const hasRun = config.get('hasRun') as boolean | undefined;
  if (!hasRun) {
    config.set('hasRun', true);
    return true;
  }
  return false;
}
