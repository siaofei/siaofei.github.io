---
title: Github-like Callouts 用法和效果展示
# Uncomment to add a description for the post
description: 安装 remark-callout-directives 插件实现 Callouts
# Uncomment to add modified date for the post
# date: 2024-05-09
createdDate: 2024-08-21
# Uncomment to add additional tags to this post (default is others)
tags: [astro, ssg, web-dev] # Must match id in content/topics/[id].yaml
# Uncomment to pin this post
pinned: true
# Uncomment to mark this post as a draft
# draft: true
# Uncomment to mark this post as well-written
# wellWritten: true
# Uncomment to add a featured image
# featuredImage: ./path/to/image.jpg # Path to the image (relative to this post)
# Uncomment to add alt text for featured image
# featuredImageAlt: Alt text for the featured image
# Uncomment to specify this post as a blog (default is note)
# type: blog
---

:::note
Callouts，Alerts 或 Admonitions 是一种视觉元素，用来提醒用户注意某些事项或提供指导。
大致分为五类，分别是 note、tip、warn、important 和 caution。
:::

## 安装

1. 安装 [remark-directive](https://github.com/remarkjs/remark-directive) 和 [remark-callout-directives](https://github.com/Microflash/remark-callout-directives)。

```zsh
pnpm add remark-directive remark-callout-directives
```

2. 配置

```js title="astro.config.mjs" ins={1, 3, 9} ins={"定制 remarkCalloutDirectives 插件别名和图标":10-43} collapse={8-44}
import remarkCalloutDirectives from '@microflash/remark-callout-directives'
import { defineConfig } from 'astro/config'
import remarkDirective from 'remark-directive'

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [
      remarkDirective,

      [
        remarkCalloutDirectives,
        {
          aliases: {
            tip: 'commend',
            important: 'assert',
            warning: 'warn',
            caution: 'deter',
          },
          callouts: {
            note: {
              title: 'Note',
              hint: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 8h.01M12 12v4"/><circle cx="12" cy="12" r="10"/></svg>`,
            },
            commend: {
              title: 'Success',
              hint: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m8 12 2.7 2.7L16 9.3"/><circle cx="12" cy="12" r="10"/></svg>`,
            },
            warn: {
              title: 'Warning',
              hint: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 9v4m0 4h.01M8.681 4.082C9.351 2.797 10.621 2 12 2s2.649.797 3.319 2.082l6.203 11.904a4.28 4.28 0 0 1-.046 4.019C20.793 21.241 19.549 22 18.203 22H5.797c-1.346 0-2.59-.759-3.273-1.995a4.28 4.28 0 0 1-.046-4.019L8.681 4.082Z"/></svg>`,
            },
            deter: {
              title: 'Danger',
              hint: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 12s-5.6 4.6-3.6 8c1.6 2.6 5.7 2.7 7.2 0 2-3.7-3.6-8-3.6-8Z"/><path d="M13.004 2 8.5 9 6.001 6s-4.268 7.206-1.629 11.8c3.016 5.5 11.964 5.7 15.08 0C23.876 10 13.004 2 13.004 2Z"/></svg>`,
            },
            assert: {
              title: 'Info',
              hint: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12.5 7.5h.01m-.01 4v4m-7.926.685L2 21l6.136-1.949c1.307.606 2.791.949 4.364.949 5.243 0 9.5-3.809 9.5-8.5S17.743 3 12.5 3 3 6.809 3 11.5c0 1.731.579 3.341 1.574 4.685"/></svg>`,
            },
          },
        },
      ],
    ],
  },
  // Others configuration
})
```

3. 添加对应的 CSS 主题规则

```css title="callout.css" {"如果字体和图标没有对齐，调整行高。": 58-59} collapse={4-114}
/* Microflash theme */
:root {
  --callout-bg-note: hsl(0, 0%, 97%, 0.3);
  --callout-bg-commend: hsl(98, 77%, 93%, 0.3);
  --callout-bg-warn: hsl(30, 81%, 94%, 0.3);
  --callout-bg-deter: hsl(7, 74%, 95%, 0.3);
  --callout-bg-assert: hsl(221, 90%, 96%, 0.3);
  --callout-fg-note: hsl(0, 0%, 23%);
  --callout-fg-commend: hsl(106, 61%, 23%);
  --callout-fg-warn: hsl(33, 69%, 27%);
  --callout-fg-deter: hsl(356, 68%, 36%);
  --callout-fg-assert: hsl(213, 62%, 35%);
  --callout-accent-note: hsl(90, 7%, 88%);
  --callout-accent-commend: hsl(103, 76%, 78%);
  --callout-accent-warn: hsl(29, 82%, 87%);
  --callout-accent-deter: hsl(4, 73%, 91%);
  --callout-accent-assert: hsl(220, 91%, 92%);
}

@media (prefers-color-scheme: dark) {
  :root {
    --callout-bg-note: hsl(0, 0%, 13%, 0.5);
    --callout-bg-commend: hsl(108, 78%, 7%, 0.5);
    --callout-bg-warn: hsl(32, 86%, 9%, 0.5);
    --callout-bg-deter: hsl(358, 82%, 13%, 0.5);
    --callout-bg-assert: hsl(214, 77%, 12%, 0.5);
    --callout-fg-note: hsl(0, 0%, 74%);
    --callout-fg-commend: hsl(105, 51%, 51%);
    --callout-fg-warn: hsl(32, 69%, 59%);
    --callout-fg-deter: hsl(3, 77%, 74%);
    --callout-fg-assert: hsl(217, 91%, 73%);
    --callout-accent-note: hsl(0, 0%, 22%);
    --callout-accent-commend: hsl(106, 70%, 13%);
    --callout-accent-warn: hsl(33, 77%, 15%);
    --callout-accent-deter: hsl(356, 73%, 22%);
    --callout-accent-assert: hsl(214, 68%, 21%);
  }
}

.callout {
  --calloutBgColor: var(--callout-bg-color, var(--callout-bg-note));
  --calloutColor: var(--callout-fg-color, var(--callout-fg-note));
  --calloutBorderColor: var(--callout-accent, var(--callout-accent-note));
  --calloutBorderThickness: 5px;
  --calloutBorderRadius: 16px;
  --calloutContentPadding: 1ch;

  background-color: var(--calloutBgColor);
  border: var(--calloutBorderThickness) solid var(--calloutBorderColor);
  border-radius: var(--calloutBorderRadius);
}

.callout-indicator {
  display: flex;
  color: var(--calloutColor);
  background-color: var(--calloutBorderColor);
  padding: 0 0.5ch var(--calloutBorderThickness);

  line-height: 1.2;
  font-weight: 500;
}

.callout-hint > svg {
  margin-right: 0.5rem;
  display: inline-block;
  vertical-align: text-bottom;
  fill: none;
  stroke: currentColor;
  stroke-width: 2px;
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
}

.callout-content {
  padding: var(--calloutContentPadding);
  border-image: radial-gradient(#0000 71%, var(--calloutBorderColor) 72%) 49.9% /
    calc(var(--calloutBorderRadius) - (var(--calloutContentPadding) / 2));
}

.callout-content:first-child,
.callout-content:only-child {
  margin-block-start: 0;
}

.callout-content:last-child,
.callout-content:only-child {
  margin-block-end: 0;
}

.callout-commend {
  --callout-bg-color: var(--callout-bg-commend);
  --callout-fg-color: var(--callout-fg-commend);
  --callout-accent: var(--callout-accent-commend);
}

.callout-warn {
  --callout-bg-color: var(--callout-bg-warn);
  --callout-fg-color: var(--callout-fg-warn);
  --callout-accent: var(--callout-accent-warn);
}

.callout-deter {
  --callout-bg-color: var(--callout-bg-deter);
  --callout-fg-color: var(--callout-fg-deter);
  --callout-accent: var(--callout-accent-deter);
}

.callout-assert {
  --callout-bg-color: var(--callout-bg-assert);
  --callout-fg-color: var(--callout-fg-assert);
  --callout-accent: var(--callout-accent-assert);
}
```

4. 导入到全局 CSS 文件

```css title="base.css" ins={1}
@import 'callout.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Others rules */
```

## 效果展示

:::note
Highlights information that users should take into account, even when skimming.

突出显示用户应该考虑的信息，即使是在快速浏览。
:::

:::warn
Critical content demanding immediate user attention due to potential risks.

由于潜在风险，需要用户立即关注的关键内容。
:::

:::tip
Optional information to help a user be more successful.

帮助用户取得更大成功的可选信息。
:::

:::warn
Critical content demanding immediate user attention due to potential risks.

由于潜在风险，需要用户立即关注的关键内容。
:::

:::important
Crucial information necessary for users to succeed.

用户成功所需的关键信息。
:::
