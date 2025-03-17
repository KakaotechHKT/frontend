import { ReactNode } from 'react'

import Footer from '@components/Footer'
import Header from '@components/Header'
import { cn } from '@lib/utils/utils'

interface HeaderLayoutProps {
  children: ReactNode
}

/**
 * 헤더 레이아웃은 헤더와 푸터를 포함하는 레이아웃입니다.
 */
const HeaderLayout = ({ children }: HeaderLayoutProps): ReactNode => {
  const pageSize = `w-4/5 max-w-xl md:max-w-4xl lg:max-w-7xl`
  return (
    <>
      <Header className={cn('z-10 h-[12dvh] w-full max-w-xl px-8 sm:px-6 md:max-w-4xl lg:max-w-7xl lg:px-8')} />
      <main className='relative flex min-h-screen w-screen flex-col items-center justify-start bg-rcWhite'>{children}</main>
      <Footer className='z-10 h-max w-full' />
    </>
  )
}

export default HeaderLayout
