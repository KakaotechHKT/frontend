import { Do_Hyeon } from 'next/font/google'
import localFont from 'next/font/local'

export const doHyeon = Do_Hyeon({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dohyeon',
})

export const pretendard = localFont({
  src: [
    {
      path: 'subset-PretendardVariable-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
})
