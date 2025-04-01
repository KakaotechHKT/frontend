import { ReactNode } from 'react'

import Footer from '@components/Footer'
import Header from '@components/Header'
import { cn } from '@lib/utils/utils'

import { layoutStyle } from './page'

interface HeaderLayoutProps {
  children: ReactNode
}

/**
 * 헤더 레이아웃은 (헤더 + 푸터)를 포함하는 레이아웃입니다.
 */
const HeaderLayout = ({ children }: HeaderLayoutProps): ReactNode => {
  return (
    <>
      <Header className={cn('z-10 h-[12dvh] max-w-xl', layoutStyle)} />
      {children}
      <Footer className='z-10 h-max w-full' />
    </>
  )
}

export default HeaderLayout
