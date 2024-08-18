import type { ImageMetadata } from 'astro'

export type ImageType = {
  sourceUrl?: string | null
  altText?: string
  sizes?: string
  width?: number
  height?: number
  imageMetadata?: ImageMetadata // for default featured images
} | null

/**
 * This Filter type is used as the parameter for the `getFilteredPosts` function,
 * allowing users to define the criteria for fetching and sorting posts.
 */
export type Filter = {
  type?: 'blog' | 'note' // Specifies the post type
  pinned?: boolean // Filters for pinned posts if true
  sort?: 'ascending' | 'descending' // Defines the sort order, default is 'descending'
  match?: 'and' | 'or'
  tags?: {
    multi_select: string[]
  }
}
