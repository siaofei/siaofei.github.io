import alpinejs from '@astrojs/alpinejs'
import tailwind from '@astrojs/tailwind'
import { transformerNotationDiff } from '@shikijs/transformers'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'

import { remarkReadingTime } from './plugins/remark-reading-time.mjs'

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      themes: {
        light: 'catppuccin-latte',
        dark: 'catppuccin-mocha',
      },
      transformers: [transformerNotationDiff()],
    },
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
