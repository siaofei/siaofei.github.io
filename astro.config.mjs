import alpinejs from '@astrojs/alpinejs'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'

import { remarkReadingTime } from './plugins/remark-reading-time.mjs'

// https://astro.build/config
export default defineConfig({
  markdown: {
    rehypePlugins: [remarkReadingTime],
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    alpinejs({
      entrypoint: '/src/entrypoint',
    }),
    icon(),
  ],
})
