import { ReactNode } from 'react'

import { cn } from '@lib/utils/utils'

import { mypageLayoutStyle } from '../page'

interface MypageLayoutProps {
  children: ReactNode
}

const MypageLayout = ({ children }: MypageLayoutProps): ReactNode => {
  return (
    <main className='relative flex min-h-screen w-screen flex-col items-center justify-start bg-rcWhite'>
      <div className={cn(mypageLayoutStyle, 'font-dohyeon text-3xl')}>마이페이지</div>
      {children}
    </main>
  )
}

export default MypageLayout
