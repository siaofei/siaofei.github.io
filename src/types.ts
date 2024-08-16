import type { ImageMetadata } from 'astro'

export type ImageType = {
  sourceUrl?: string | null
  altText?: string
  sizes?: string
  width?: number
  height?: number
  imageMetadata?: ImageMetadata // for default featured images
} | null