import type BadgeSocial from '@components/widgets/BadgeSocial.astro'
import type { ComponentProps } from 'astro/types'

export type BadgeSocial = ComponentProps<typeof BadgeSocial>

const socials: BadgeSocial[] = [
  {
    title: 'Github',
    iconUrl: '/social/github.svg',
    url: 'https://github.com/siaofei',
    imgClass: 'invert',
  },
  {
    title: 'LinkedIn',
    iconUrl: '/social/linkedin.svg',
    url: 'https://www.linkedin.com/',
  },
  {
    title: 'Twitter',
    iconUrl: '/social/twitter.svg',
    url: 'https://twitter.com/',
    imgClass: 'invert',
  },
  {
    title: 'Goodreads',
    iconUrl: '/social/goodreads.svg',
    url: 'https://www.goodreads.com/user/show/19630622-thi-dinh',
  },
  {
    title: 'StackExchange',
    iconUrl: '/social/so.svg',
    url: 'https://stackexchange.com/users/1344291/anh-thi-dinh',
  },
  {
    title: '知乎',
    iconUrl: '/social/zhihu.svg',
    url: 'https://zhihu.com/',
  },
]

export default socials
