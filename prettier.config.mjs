/**
 * Format you source code to consistent style.
 *
 * Native support: JavaScript, TypeScript, CSS, HTML, JSON, Markdown, YAML etc.
 *
 * Pluggin support: Astro
 *
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
export default {
  semi: false,
  singleQuote: true,
  printWidth: 100,
  experimentalTernaries: true,
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-astro',
    'prettier-plugin-tailwindcss', // Must last
  ],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
  importOrder: [
    '',
    '<TYPES>^(node:)',
    '<TYPES>',
    '<TYPES>^@/(.*)$', // for @/types
    '<TYPES>^[.]',
    '',
    '<BUILTIN_MODULES>', // Node.js built-in modules
    '^(astro:)', // Astro built-in modules
    '<THIRD_PARTY_MODULES>',
    '^(@utils|@data)(/.*)$', // local modules
    '^@/(.*)$', // consts
    '',
    '^(@components|@layouts)(/.*)$',
    '^[./]',
  ],
}
