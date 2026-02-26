/**
 * Normalizes article.references to always return an array of { text, url } objects.
 * Handles three cases:
 *   1. undefined / null / empty  → []
 *   2. Old string format          → [{text: "line", url: ""}, ...]
 *   3. New array format           → passthrough (with url defaulting to "")
 */
export function parseReferences(raw) {
  if (!raw) return []

  if (Array.isArray(raw)) {
    return raw.map(r =>
      typeof r === 'string'
        ? { text: r, url: '' }
        : { text: r.text ?? '', url: r.url ?? '' }
    )
  }

  if (typeof raw === 'string') {
    return raw.split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .map(line => ({ text: line, url: '' }))
  }

  return []
}
