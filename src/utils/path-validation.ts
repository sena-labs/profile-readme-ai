import path from 'path';

/**
 * Allowed file extensions for output files
 */
const ALLOWED_EXTENSIONS: Record<string, string[]> = {
  markdown: ['.md', '.markdown'],
  yaml: ['.yml', '.yaml'],
  json: ['.json'],
};

/**
 * Validate a URL is safe for embedding in markdown links.
 * Returns the URL if safe, or '#' if potentially dangerous.
 */
export function sanitizeUrl(url: string | null | undefined): string {
  if (!url) return '#';
  const trimmed = url.trim();
  // Only allow http:, https:, and mailto: protocols
  if (/^https?:\/\//i.test(trimmed) || /^mailto:/i.test(trimmed)) {
    return trimmed;
  }
  // Block javascript:, data:, vbscript:, and other dangerous protocols
  return '#';
}

/**
 * Validate and sanitize an output file path.
 * Returns the resolved path or throws an error if invalid.
 */
export function validateOutputPath(outputPath: string, allowedType: keyof typeof ALLOWED_EXTENSIONS = 'markdown'): string {
  // Check for null bytes (path injection)
  if (outputPath.includes('\0')) {
    throw new Error('Invalid output path: contains null bytes');
  }

  // Check for excessively long paths
  if (outputPath.length > 260) {
    throw new Error('Invalid output path: path too long');
  }

  // Resolve to absolute path
  const resolved = path.resolve(outputPath);

  // Validate file extension
  const ext = path.extname(resolved).toLowerCase();
  const allowed = ALLOWED_EXTENSIONS[allowedType];
  if (allowed && !allowed.includes(ext)) {
    throw new Error(`Invalid output file extension "${ext}". Allowed: ${allowed.join(', ')}`);
  }

  return resolved;
}
