import type { Metadata } from 'next'

import { cn } from '@lib/utils/utils'
import { doHyeon, pretendard } from '@public/fonts/font'

import './globals.css'

export const metadata: Metadata = {
  title: '밥팟',
  description: '카카오테크 부트캠프 밥팟 커뮤니티',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ko'>
      <body className={cn(pretendard.variable, doHyeon.variable, 'justify-star relative flex flex-col items-center font-pretendard')}>
        {children}
      </body>
    </html>
  )
}
