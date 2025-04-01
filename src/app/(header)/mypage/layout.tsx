import { ReactNode } from 'react'

import { cn } from '@lib/utils/utils'

interface MypageLayoutProps {
  children: ReactNode
}

export const mypageLayoutStyle = `w-[90%] max-w-xl md:w-4/5 md:max-w-4xl lg:max-w-7xl`

const MypageLayout = ({ children }: MypageLayoutProps): ReactNode => {
  return (
    <main className='relative flex min-h-screen w-screen flex-col items-center justify-start bg-rcWhite'>
      <div className={cn(mypageLayoutStyle, 'font-dohyeon text-3xl')}>마이페이지</div>
      {children}
    </main>
  )
}

export default MypageLayout
