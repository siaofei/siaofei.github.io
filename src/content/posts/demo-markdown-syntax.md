---
title: Markdown 用法和效果展示
date: 2024-08-20
createdDate: 2024-08-17
---

## 标题

```md
## 二级标题

### 三级标题

#### 四级标题

##### 五级标题
```

效果如下

![title](./images/markdown-title-preview.png)

## 文本格式化

| 格式                 | 语法               | 例子                                  | 效果                                |
| -------------------- | ------------------ | ------------------------------------- | ----------------------------------- |
| 加粗                 | `** **` 或 `__ __` | `这是**加粗**文本`                    | 这是**加粗**文本                    |
| 斜体                 | `* *` 或 `_ _`     | `这是*斜体*文本`                      | 这是*斜体*文本                      |
| 删除[^strikethrough] | `~~ ~~`            | 这是~~删除~~文本                      | 这是~~删除~~文本                    |
| 下标                 | `<sub> </sub>`     | `This is a <sub>subscript</sub> text` | This is a <sub>subscript</sub> text |
| 上标                 | `<sup> </sup>`     | `This is a <sup>subscript</sup> text` | This is a <sup>subscript</sup> text |
| 标记                 | `<mark> </mark>`   | `这是<mark>高亮</mark>文本`           | 这是<mark>高亮</mark>文本           |

[^strikethrough]: GFM 特性“删除文本”，由插件 [remark-gfm](https://github.com/remarkjs/remark-gfm)支持。

## 引用

> 这是一个引用。

### 代码引用

命令 `git status` 显示当前工作目录下跟踪文件的情况。

下面是一个代码块示例。

````
Some basic Git commands are:
```
git status
git add
git commit
```
````

## 列表

### 无序列表

无序列表可以字符 `-` 或 `+` 或 `*`。

```md
- 中国
- 美国
- 法国
```

效果如下

- 中国
- 美国
- 法国

### 有序列表

```md
1. 中国
2. 美国
3. 法国
```

1. 中国
2. 美国
3. 法国

## 链接

### 自动生成链接[^gfm-autolink]

https://pages.github.com/

[^gfm-autolink]: GFM 特性 autolink literals，由插件 [remark-gfm](https://github.com/remarkjs/remark-gfm)支持。

### 网址链接

```md
语法参考 [GitHub Pages](https://pages.github.com/)。
```

语法参考 [GitHub Pages](https://pages.github.com/)。

### 文章标题链接

```md
点击返回到文章的[标题](#标题)。
```

点击返回到文章的[标题](#标题)。

## 段落

这是一行随机文本。十二天将，又称为天乙十二天将、天乙十二天官、十二将，天乙（天一）是贵神，其前后有十一个作为辅佐的天官，用于六壬式，也是阴阳师安倍晴明所使用的“十二将”式神。

空一行开启另一段。十二天将，又称为天乙十二天将、天乙十二天官、十二将，天乙（天一）是贵神，其前后有十一个作为辅佐的天官，用于六壬式，也是阴阳师安倍晴明所使用的“十二将”式神。

## 任务列表[^gfm-todo]

[^gfm-todo]: GFM 特性 Tasklist，由插件 [remark-gfm](https://github.com/remarkjs/remark-gfm)支持。

- [ ] 计划去做的任务
- [x] 已完成的任务
