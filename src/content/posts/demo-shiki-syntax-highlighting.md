---
title: 代码语法高亮配置、用法和效果展示
# Uncomment to add a description for the post
description: Shiki
# Uncomment to add modified date for the post
date: 2024-08-21
createdDate: 2024-08-18
# Uncomment to add additional tags to this post (default is others)
tags: [astro, ssg, web-dev] # Must match id in content/topics/[id].yaml
# Uncomment to pin this post
# pinned: true
# Uncomment to mark this post as a draft
# draft: true
# Uncomment to mark this post as well-written
# wellWritten: true
# Uncomment to add a featured image
featuredImage: ./images/shiki.svg # Path to the image (relative to this post)
# Uncomment to add alt text for featured image
# featuredImageAlt: Alt text for the featured image
# Uncomment to specify this post as a blog (default is note)
# type: blog
---

:::caution{title="注意"}
下面示例效果已经失效，仅作为记录保存使用。由于 Shiki 配置复杂，语法高亮器已切换至基于 Shiki 的 [Expressive Code](https://expressive-code.com/)。Expressive Code 开箱即用，支持 Terminal Frame，显示行号等。可以查看文章 [Expressive Code 用法和效果展示](../demo-expressive-code-syntax)。
:::

## 配置 Shiki

1. Astro 内置已内置 Shiki 支持，无须配置。安装 [Shiki transformer](https://shiki.style/packages/transformers)。
2. 添加 transformer 到 Shiki。最后一个自定义 transformer 是去除额外引入的空格。

```js title="astro.config.mjs" ins={1-9, 17, 22-39} collapse={3-41}
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerRemoveLineBreak,
  transformerRemoveNotationEscape,
} from '@shikijs/transformers'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
      nesting: true,
    }),
  ],
  markdown: {
    shikiConfig: {
      transformers: [
        transformerNotationDiff(),
        transformerNotationFocus(),
        transformerNotationHighlight(),
        transformerRemoveNotationEscape(),
        transformerNotationWordHighlight(),
        transformerNotationErrorLevel(),
        transformerRemoveLineBreak(),
        {
          preprocess(code) {
            if (code.endsWith('\n')) {
              code = code.slice(0, -1)
            }

            return code
          },
        },
      ],
    },
})
```

3. 添加对应的 CSS 风格。添加了对行号的支持。

```css title="base.css" collapse={4-52}
:not(pre) > code {
  @apply rounded-md p-1;
}

pre {
  &.has-diff code {
    .line.diff.add {
      @apply bg-[#a6da95] after:float-right after:mr-2.5 after:content-['+'];
    }
    .line.diff.remove {
      @apply bg-[#f28fad] after:float-right after:mr-2.5 after:content-['-'];
    }
  }

  &.has-highlighted code {
    .line.highlighted {
      @apply bg-gray-300;
      &.error {
        @apply bg-[#d9534fBC];
      }
      &.warning {
        @apply bg-[#f4a261];
      }
    }
  }

  &.has-focused code {
    .line {
      filter: blur(0.095rem);
      &.focused {
        filter: blur(0);
      }
    }
  }

  code {
    counter-reset: step;
    counter-increment: step 0;
    & > .line {
      @apply block w-full px-3 py-0;
      &::before {
        content: counter(step);
        counter-increment: step;
        @apply mr-6 inline-block w-[1rem] text-right text-[#9d7cd8];
      }
    }

    .highlighted-word {
      @apply rounded-md border border-gray-300 bg-slate-100 p-1;
    }
  }
}
```

## Shiki transformer 用法

这里是摘抄自[官方文档](https://shiki.style/packages/transformers)的一些示例。

### 插件 `transformerNotationDiff`

````md
```ts
console.log('hewwo') // [\!code --]
console.log('hello') // [\!code ++]
console.log('goodbye')
```
````

效果如下

```ts
console.log('hewwo') // [!code --]
console.log('hello') // [!code ++]
console.log('goodbye')
```

### 插件 `transformerNotationFocus`

````md
```ts
console.log('Not focused')
console.log('Focused') // [\!code focus]
console.log('Not focused')
```
````

效果如下

```ts
console.log('Not focused')
console.log('Focused') // [!code focus]
console.log('Not focused')
```

可以在 `[!code focus]` 中添加数字指定行数，不包括最后一行。

````md
```ts
// [\!code focus:3]
console.log('Focused')
console.log('Focused')
console.log('Not focused')
```
````

效果如下

```ts
// [!code focus:3]
console.log('Focused')
console.log('Focused')
console.log('Not focused')
```

### 插件 `transformerNotationHighlight`

````md
```ts
console.log('Not highlighted')
console.log('Highlighted') // [\!code highlight]
console.log('Not highlighted')
```
````

效果如下

```ts
console.log('Not highlighted')
console.log('Highlighted') // [!code highlight]
console.log('Not highlighted')
```

可以在 `[!code highlight]` 中添加数字指定行数，不包括最后一行。

````md
```ts
// [\!code highlight:3]
console.log('Highlighted')
console.log('Highlighted')
console.log('Not highlighted')
```
````

效果如下

```ts
// [!code highlight:3]
console.log('Highlighted')
console.log('Highlighted')
console.log('Not highlighted')
```

### 插件 `transformerNotationWordHighlight`

````md
```ts
// [\!code word:Hello]
const message = 'Hello World'
console.log(message) // prints Hello World
```
````

效果如下

```ts
// [!code word:Hello]
const message = 'Hello World'
console.log(message) // prints Hello World
```

同样可以在 `[!code word]` 使用数字指定高亮的次数。

````md
```ts
// [\!code word:Hello]
const message = 'Hello World'
console.log(message) // prints Hello World
```
````

效果如下

```ts
// [!code word:Hello:1]
const message = 'Hello World'
console.log(message) // prints Hello World
```

### 插件 `transformerNotationErrorLevel`

````md
```ts
console.log('No errors or warnings')
console.error('Error') // [\!code error]
console.warn('Warning') // [\!code warning]
```
````

效果如下

```ts
console.log('No errors or warnings')
console.error('Error') // [!code error]
console.warn('Warning') // [!code warning]
```

### 插件 `transformerRenderWhitespace`

~~插件 `transformerRenderWhitespace`~~ 没有实现。

````md
```ts
function block() {
  space()
  tab()
}
```
````

效果如下

```ts
function block() {
  space()
  tab()
}
```

### 转义字符 (`transformerRemoveNotationEscape`)

代码中使用 `[\!code ...]` 去转义 `[!code ...]`。
