import { defineCollection, reference, z } from 'astro:content'

const postsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      tags: z.array(reference('topics')).default(['others']),
      date: z.coerce
        .date()
        .optional()
        .transform((date) => date?.toISOString()), // modified date
      createdDate: z.coerce.date().transform((date) => date.toISOString()),
      pinned: z.boolean().optional(),
      draft: z.boolean().optional(),
      wellWritten: z.boolean().optional(),
      featuredImage: image().optional(),
      featuredImageAlt: z.string().optional(),
      type: z.enum(['note', 'blog']).default('note'),
    }),
})

const topicsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    longName: z.string().optional(),
    description: z.string().optional(),
    pinned: z.boolean().optional(),
    icon: z.string().optional(),
    class: z.string().optional(),
    color: z.string().optional(),
  }),
})

export const collections = {
  posts: postsCollection,
  topics: topicsCollection,
}
