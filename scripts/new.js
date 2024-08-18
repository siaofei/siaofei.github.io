import fs from 'node:fs'
import path from 'node:path'
import dayjs from 'dayjs'

// 获取命令行参数类型参数
const [, , type] = process.argv

switch (type) {
  case 'help':
    print_help()
    break

  case 'post':
    createdPostTemplate()
    break

  case 'tag':
    createdTopicTemplate()
    break

  case 'bookmark':
    createdBookmarkTemplate()
    break

  case 'reading':
    createdReadingTemplate()
    break

  default:
    print_help()
    break
}

function print_help() {
  console.log(`
Usage: pnpm new <type>

Available types:
  post       Create a new blog post template
  bookmark   Create a new bookmark template
  reading    Create a new reading template
  tag        Create a new tag template
  help       Print the help information

Example:
  pnpm new             # Print the help information 
  pnpm new post        # Creates a new blog post template
  pnpm new bookmark    # Creates a new bookmark template
  pnpm new reading     # Creates a new reading template
  pnpm new tag         # Creates a new tag template
  `)
}

function createdPostTemplate() {
  const targetDir = './src/content/posts/'
  const filePath = path.join(targetDir, generateTempFileName('template-', '.md'))
  const template = `---
title: The title of the post
# Uncomment to add a description for the post
# description: A brief description of the post
# Uncomment to add modified date for the post
# date: 2024-05-09
createdDate: ${getDate()}
# Uncomment to add additional tags to this post (default is others)
# tags: [linux, web-dev] # Must match id in content/topics/[id].yaml
# Uncomment to pin this post
# pinned: true
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

Write your post here.
  `
  return createdTemplateFile(filePath, template)
}

function createdTopicTemplate() {
  const targetDir = './src/content/topics/'
  const filePath = path.join(targetDir, generateTempFileName('template-', '.yaml'))
  const template = `---
name: Topic name
# Uncomment to add a long name for the topic
# longName: Optional long name
# Uncomment to add a description for the topic
# description: Optional description
# Uncomment to pin this topic
# pinned: true
# Uncomment to specify an icon for the topic (svg willomit ".svg" if using SVG)
# icon: linux # Path in /public/topics/
# Uncomment to add CSS class properties for the topic icon
# class: invert # Invert icon color
# Uncomment to specify a color for the topic icon
# color: black
  `

  return createdTemplateFile(filePath, template)
}

function createdBookmarkTemplate() {
  throw Error('There is no bookmark item yet.')
}

function createdReadingTemplate() {
  throw Error('There is no reading item yet.')
}

function getDate() {
  return dayjs().format('YYYY-MM-DD')
}

function generateTempFileName(prefix = '', suffix = '', length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return prefix + result + suffix
}

function createdTemplateFile(filePath, template) {
  if (fs.existsSync(filePath)) {
    console.error(`Error: File ${filePath} already exists.`)
    process.exit(1)
  }

  fs.mkdirSync(path.dirname(filePath), { recursive: true })

  fs.writeFileSync(filePath, template)
  console.log(`Created template at ${filePath}`)
}
