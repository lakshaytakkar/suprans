/**
 * Avatar utility for generating deterministic avatars
 * Uses initials-based approach for simplicity
 */

/**
 * Generates a deterministic color based on a seed string
 */
function stringToColor(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  const colors = [
    '#4F46E5', // indigo
    '#7C3AED', // violet
    '#EC4899', // pink
    '#EF4444', // red
    '#F97316', // orange
    '#EAB308', // yellow
    '#22C55E', // green
    '#14B8A6', // teal
    '#06B6D4', // cyan
    '#3B82F6', // blue
  ]

  return colors[Math.abs(hash) % colors.length]
}

/**
 * Get initials from a name
 */
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Pure function to get avatar URL for a user ID or name (people).
 * Generates a simple SVG avatar with initials.
 * This function is deterministic and will always return the same avatar for the same seed.
 *
 * @param seed - User ID, email, or name to use as seed for avatar generation
 * @returns Data URL of the generated avatar SVG
 */
export function getAvatarForUser(seed: string): string {
  const color = stringToColor(seed)
  const initials = getInitials(seed)

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
      <rect width="128" height="128" fill="${color}" rx="64"/>
      <text x="64" y="64" font-family="Arial, sans-serif" font-size="48" font-weight="600" fill="white" text-anchor="middle" dominant-baseline="central">${initials}</text>
    </svg>
  `.trim()

  return `data:image/svg+xml;base64,${btoa(svg)}`
}

/**
 * Get avatar URL for a user by name (uses name as seed)
 */
export function getAvatarByName(name: string): string {
  return getAvatarForUser(name)
}

/**
 * Get avatar URL for a user by ID (uses ID as seed)
 */
export function getAvatarById(userId: string): string {
  return getAvatarForUser(userId)
}

/**
 * Pure function to get avatar URL for non-person entities (projects, companies, departments, etc.).
 *
 * @param seed - Entity ID or name to use as seed for avatar generation
 * @returns Data URL of the generated avatar SVG
 */
export function getAvatarForEntity(seed: string): string {
  const color = stringToColor(seed)
  const initials = getInitials(seed)

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
      <rect width="128" height="128" fill="${color}" rx="16"/>
      <text x="64" y="64" font-family="Arial, sans-serif" font-size="48" font-weight="600" fill="white" text-anchor="middle" dominant-baseline="central">${initials}</text>
    </svg>
  `.trim()

  return `data:image/svg+xml;base64,${btoa(svg)}`
}
