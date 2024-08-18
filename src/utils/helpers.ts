import GithubSlugger from 'github-slugger'

/**
 * Converts a given text into a URL-friendly slug format.
 *
 * Removes illegal characters to create a valid slug, suitable for use as an anchor in URLs.
 * Note that the generated slug is not guaranteed to be unique.
 *
 * @param {string} text - The text to convert. If empty or undefined, returns `undefined`.
 * @returns {string | undefined}  The generated slug, or undefined if no text is provided.
 *
 * This function uses the GithubSlugger to generate a URL-friendly slug from the input text.
 */
export function makeSlugText(text: string): string | undefined {
  if (!text) return undefined

  const slugger = new GithubSlugger()
  return slugger.slug(text)
}

/**
 * Generates a URI based on the provided type and slug.
 *
 * @param {'tag' | 'note'} type - The type of URI to generate, either 'tag' or 'note'.
 * @param {string} [slug] - The slug to be included in the URI. If not provided, the function returns undefined.
 * @returns {(string | undefined)} - The generated URI as a string, or undefined if no slug is provided.
 *
 * The function returns:
 * - '/tag/${slug}' for 'tag' type.
 * - '/note/${slug}/' for 'note' type or any other case.
 */
export function getUri(type: 'tag' | 'note', slug?: string): string | undefined {
  if (!slug) return undefined

  switch (type) {
    case 'tag':
      return `/tags/${slug}/`

    case 'note':
      return `/note/${slug}/`

    default:
      return `/note/${slug}/`
  }
}

/**
 * Generates the URI for an icon based on the provided name and format.
 *
 * @param {string} [iconName] - The name of the icon. If it already
 * includes a file extension, it will be used as is.
 * @param {string} [pathPrefix='topics'] - The path prefix relative to the
 * website's root where the icon is located.
 * @param {string} [extension='svg'] - The file extension for the icon
 * (e.g., webp, avif, svg, png, jpeg). Ignored if `iconName` includes
 * an extension. This parameter is case-insensitive. Supported image
 * file formats include webp, avif, svg, png, jpeg, among others.
 * For a full list, refer to the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img}.
 * Note: We recommend using webp, avif, or svg formats for optimal performance and compatibility.
 * @returns {(string|undefined)} - The relative URI of the icon from the website's root,
 * or undefined if `iconName` is not provided.
 */
export function generateIconUri(
  iconName?: string,
  pathPrefix?: string,
  extension?: string,
): string | undefined {
  if (!iconName) return undefined

  /* If iconName includes a file extension, return it directly */
  if (/\.\w+$/.test(iconName)) return `/${pathPrefix ?? 'topics'}/${iconName}`

  /* Generate the URI with the provided or default format */
  return `/${pathPrefix ?? 'topics'}/${iconName}.${extension?.toLowerCase() ?? 'svg'}`
}
