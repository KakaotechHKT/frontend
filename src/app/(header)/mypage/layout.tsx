import { ReactNode } from 'react'

import { cn } from '@lib/utils/utils'
import { mypageSize } from '@public/data'

interface MypageLayoutProps {
  children: ReactNode
}

/**
 * 헤더 레이아웃은 헤더와 푸터를 포함하는 레이아웃입니다.
 */
const MypageLayout = ({ children }: MypageLayoutProps): ReactNode => {
  return (
    <main className='relative flex min-h-screen w-screen flex-col items-center justify-start bg-rcWhite'>
      <div className={cn(mypageSize, 'font-dohyeon text-3xl')}>마이페이지</div>
      {children}
    </main>
  )
}

export default MypageLayout
