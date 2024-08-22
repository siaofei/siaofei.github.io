---
title: Expressive Code 用法和效果展示
# Uncomment to add a description for the post
# description: A brief description of the post
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
featuredImage: ./images/expressive-code.svg # Path to the image (relative to this post)
# Uncomment to add alt text for featured image
featuredImageAlt: Expressive code logo
# Uncomment to specify this post as a blog (default is note)
# type: blog
---

## 简单示例

<!-- prettier-ignore -->
````md title="example.md" /&#96;{3}(?:js)?/
```js
console.log('This code is syntax highlighted!')
```
````

效果如下

```js
console.log('This code is syntax highlighted!')
```

## 安装

1. 安装 Expressive Code

```zsh
pnpm astro add astro-expressive-code
```

2. 安装插件支持显示行号和代码块收缩，还有 [Catppuccin](https://catppuccin.com) 主题

```zsh
pnpm i @expressive-code/plugin-collapsible-sections
pnpm i @expressive-code/plugin-line-numbers
pnpm add @catppuccin/vscode
```

3. 配置

```js title="ec.config.mjs"
import { latte } from '@catppuccin/vscode'
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import { defineEcConfig } from 'astro-expressive-code'

export default defineEcConfig({
  // You can set configuration options here
  plugins: [pluginLineNumbers(), pluginCollapsibleSections()],
  themes: [latte],
  styleOverrides: {
    // You can also override styles
  },
})
```

## Terminal frames

当代码块的语言标识符是终端会话（Terminal Session）或脚本语言（`ansi`, `bash`, `bat`, `batch`, `cmd`, `console`, `powershell`, `ps`, `ps1`, `psd1`, `psm1`, `sh`, `shell`, `shellscript`, `shellsession`, `zsh`）时，Expressive Code 会执行额外的检查去侦测 frame 类型：

- 如果代码块的开头代码栏的 `title` 属性中包含 shell 脚本文件名或[文件名注释](#文件名注释)，或者代码以 shebang (`#!`) 开头，则认为是脚本文件而不是终端会话，如果提供了文件名，则使用代码编辑器框架呈现，否则作为纯代码块呈现。
- 其他情况，代码块将视为终端会话（terminal session）和渲染带有一个 terminal frame。

````md
```bash
echo "This terminal frame has no title"
```

```powershell title="PowerShell terminal example"
Write-Output "This one has a title!"
```
````

效果如下所示：

```bash
echo "This terminal frame has no title"
```

```powershell title="PowerShell terminal example"
Write-Output "This one has a title!"
```

### 文件名注释

如果代码块没有 `title` 属性，Expressive Code 支持自动从代码内的文件名注释中提取标题。

注释必须满足以下条件才能被识别为文件名注释：

- 它必须出现在代码块的前 4 行内。
- 它的行必须以 `//`、`<!--`、`/*` 或 `#` 开头，但不能以 `#!`。尽管不是必需的，但我们建议使用与代码块语言相匹配的注释语法。
- 它可以选择具有以冒号（：）结尾的前缀。这允许您在文件名前添加一些文本前缀：`// File name: index.js`。
- 文件名在代码块语言的上下文中似乎是有效的。例如，JavaScript 代码块中包含 CSS 文件名的注释将被忽略。

一旦找到文件名注释，就会将其从代码块的内容中删除，并且提取的文件名将用作代码块的标题。

### 指定 Frame 类型

如果要覆盖某些代码块的自动帧类型检测，可以将 `frame="..."` 属性添加到开放代码围栏中。

此属性支持的值为 `code` 、 `terminal` 、 `none` 和 `auto`。默认值为 `auto`。

````md
```sh frame="none"
echo "Look ma, no frame!"
```

```ps frame="code" title="PowerShell Profile.ps1"
# Without overriding, this would be a terminal frame
function Watch-Tail { Get-Content -Tail 20 -Wait $args }
New-Alias tail Watch-Tail
```
````

效果如下所示：

```sh frame="none"
echo "Look ma, no frame!"
```

```ps frame="code" title="PowerShell Profile.ps1"
# Without overriding, this would be a terminal frame
function Watch-Tail { Get-Content -Tail 20 -Wait $args }
New-Alias tail Watch-Tail
```

## 标记整行和行范围

- 单行：`{4}`
- 三行独立的行：`{4, 8, 12}`
- 由起点和终点定义的行范围：`{4-8}`
- 多个选择器组合：`{1, 4, 7-8}`

````md
```js {1, 4, 7-8}
// Line 1 - targeted by line number
// Line 2
// Line 3
// Line 4 - targeted by line number
// Line 5
// Line 6
// Line 7 - targeted by range "7-8"
// Line 8 - targeted by range "7-8"
```
````

效果显示如下：

```js {1, 4, 7-8}
// Line 1 - targeted by line number
// Line 2
// Line 3
// Line 4 - targeted by line number
// Line 5
// Line 6
// Line 7 - targeted by range "7-8"
// Line 8 - targeted by range "7-8"
```

#### 选择行标记类型（`mark`，`ins`，`del`）

默认情况下，所有目标行都将使用标记类型 `mark`。

````md
```js title="line-markers.js" del={2} ins={3-4} {6}
function demo() {
  console.log('this line is marked as deleted')
  // This line and the next one are marked as inserted
  console.log('this is the second inserted line')

  return 'this line uses the neutral default marker type'
}
```
````

效果显示如下：

```js title="line-markers.js" del={2} ins={3-4} {6}
function demo() {
  console.log('this line is marked as deleted')
  // This line and the next one are marked as inserted
  console.log('this is the second inserted line')

  return 'this line uses the neutral default marker type'
}
```

### 行添加标签

````md
```jsx {"1":5} del={"2":7-8} ins={"3":10-12}
// labeled-line-markers.jsx
<button
  role="button"
  {...props}
  value={value}
  className={buttonClassName}
  disabled={disabled}
  active={active}
>
  {children && !active && (typeof children === 'string' ? <span>{children}</span> : children)}
</button>
```
````

效果显示如下：

```tsx
<button
  role="button"
  {...props}
  value={value}
  className={buttonClassName}
  disabled={disabled}
  active={active}
>
  {' '}
  {children && !active && (typeof children === 'string' ? <span>{children}</span> : children)}
</button>
```

如果您想使用太长而无法放在侧面的标签，您可以将它们添加到标记线范围上方。为此，请在代码块内要显示标签的位置添加一个空行，并将该空行作为行范围的开头。

````md
```jsx {"1. Provide the value prop here:":5-6} del={"2. Remove the disabled and active states:":8-10} ins={"3. Add this to render the children inside the button:":12-15}
// labeled-line-markers.jsx
<button
  role="button"
  {...props}
  value={value}
  className={buttonClassName}
  disabled={disabled}
  active={active}
>
  {children && !active && (typeof children === 'string' ? <span>{children}</span> : children)}
</button>
```
````

效果显示如下：

```tsx
<button
  role="button"
  {...props}
  value={value}
  className={buttonClassName}
  disabled={disabled}
  active={active}
>
  {children && !active && (typeof children === 'string' ? <span>{children}</span> : children)}
</button>
```

### 使用类似 `diff` 的语法

为了 Markdown 原内容有更强的可读性， 你可以在 `+` 或 `-` 标记之后添加空格，并将未更改的行与已更改的行对齐。这个额外的空格将被自动检测并从渲染的代码块中删除：

````md
```diff
+this line will be marked as inserted
-this line will be marked as deleted
this is a regular line
```

```diff
+ this line will be marked as inserted
- this line will be marked as deleted
  this is a regular line
```
````

两种方法效果显示相同，如下：

```diff
+ this line will be marked as inserted
- this line will be marked as deleted
  this is a regular line
```

为了避免实际 `diff` 文件的意外修改（这会使它们无法使用），该插件将根据其公共元数据行自动检测 `diff` 内容。它将检测统一和上下文模式差异语法，如 `***`、`+++`、`---`、`@@`，以及默认模式位置语法（例如 `0a1`、`1,2c1,2`、`1,2d1`）：

````md
```diff
--- a/README.md
+++ b/README.md
@@ -1,3 +1,4 @@
+this is an actual diff file
-all contents will remain unmodified
 no whitespace will be removed either
```
````

效果显示如下所示：

```diff
--- a/README.md
+++ b/README.md
@@ -1,3 +1,4 @@
+this is an actual diff file
-all contents will remain unmodified
 no whitespace will be removed either
```

### 语法高亮与类似diff的语法结合使用

````md
```diff lang="js"
  function thisIsJavaScript() {
    // This entire block gets highlighted as JavaScript,
    // and we can still add diff markers to it!
-   console.log('Old code to be removed')
+   console.log('New and shiny code!')
  }
```
````

效果显示如下所示:

```diff lang="js"
  function thisIsJavaScript() {
    // This entire block gets highlighted as JavaScript,
    // and we can still add diff markers to it!
-   console.log('Old code to be removed')
+   console.log('New and shiny code!')
  }
```

## 标记行内的单个文本

### 搜索字符串

要匹配代码块行中的文本字符串，只需将其括在引号（双引号或单引号）中即可。

````md
```js "given text"
function demo() {
  // Mark any given text inside lines
  return 'Multiple matches of the given text are supported'
}
```
````

效果显示如下：

```js "given text"
function demo() {
  // Mark any given text inside lines
  return 'Multiple matches of the given text are supported'
}
```

### 正则表达式

### 选择标记类型
