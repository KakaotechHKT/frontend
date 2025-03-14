import type { Metadata } from 'next'
import Script from 'next/script'

import { ResponsiveProvider } from '@lib/provider/useResponsiveProvider'
import { cn } from '@lib/utils/utils'
import { doHyeon, pretendard } from '@public/fonts/font'

import CustomQueryClientProvider from '../lib/provider/QueryClientProvider'

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
      <Script type='text/javascript' src='//developers.kakao.com/dfk/js/kakao.min.js' />
      <body className={cn(pretendard.variable, doHyeon.variable, 'justify-star relative flex flex-col items-center font-pretendard')}>
        <CustomQueryClientProvider>
          <ResponsiveProvider>{children}</ResponsiveProvider>
        </CustomQueryClientProvider>
      </body>
    </html>
  )
}
