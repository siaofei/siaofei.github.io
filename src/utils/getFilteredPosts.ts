import type { CollectionEntry } from 'astro:content'
import type { Filter } from '@/types'

import { getCollection } from 'astro:content'

/**
 * Retrieves and optionally sorts posts based on the provided filter criteria.
 *
 * @param {Filter} filter - The criteria used to filter and sort posts.
 * @param {('note' | 'blog')} [filter.type] - The type of posts to retrieve.
 * @param {boolean} [filter.pinned] - Whether to filter for pinned posts.
 * @param {('ascending' | 'descending')} [filter.sort='descending'] - The sort order by date.
 * @param {('and' | 'or')} [filter.match='and'] - Match mode: 'and' to satisfy all conditions, 'or' for any.
 * @param {Object} [filter.tags] - The tags to filter posts by.
 * @param {string[]} [filter.tags.multi_select] - An array of tag IDs to match against post tags.
 * @param {number} [maxNumPosts] - Maximum number of posts to return. Returns all if undefined.
 * @returns {Promise<CollectionEntry<'posts'>[]>>} - A promise that resolves to an array of filtered and sorted posts.
 *
 * @example
 * // Get all blog posts, sorted by date in descending order
 * const blogPosts = await getFilteredPosts({ type: 'blog', sort: 'descending' });
 *
 * @example
 * // Get all pinned notes, sorted by date in ascending order
 * const pinnedNotes = await getFilteredPosts({ type: 'note', pinned: true, sort: 'ascending' });
 *
 * @example
 * // Get all notes without sorting, matching all conditions
 * const notes = await getFilteredPosts({ type: 'note' });
 *
 * @example
 * // Get all posts that are either notes or pinned, sorted by date in descending order
 * const posts = await getFilteredPosts({ type: 'note', pinned: true, match: 'or', sort: 'descending' });
 *
 * @example
 * // Get all posts tagged with specific tags, sorted by date in descending order
 * const taggedPosts = await getFilteredPosts({ tags: { multi_select: ['tag1', 'tag2'] }, sort: 'descending' });
 */
export async function getFilteredPosts(
  filter: Filter,
  maxNumPosts?: number,
): Promise<CollectionEntry<'posts'>[]> {
  const { type, pinned, sort = 'descending', match = 'and', tags } = filter

  const posts = await getCollection('posts', ({ data }) => {
    const conditions = [
      !type || data.type === type,
      pinned === undefined || data.pinned === pinned,
      !tags || tags.multi_select.every((tag) => data.tags.some((topic) => topic.id === tag)),
    ]

    switch (match) {
      case 'and':
        return conditions.every(Boolean)

      case 'or':
        return conditions.some(Boolean)

      default:
        throw new Error(`Invalid match value: '${match}'. It must be either 'and' or 'or'.`)
    }
  })

  posts.sort((a, b) => {
    const dateA = new Date(a.data?.date || a.data.createdDate).getTime()
    const dateB = new Date(b.data?.date || b.data.createdDate).getTime()
    return sort === 'ascending' ? dateA - dateB : dateB - dateA
  })

  return maxNumPosts ? posts.slice(0, maxNumPosts) : posts
}
