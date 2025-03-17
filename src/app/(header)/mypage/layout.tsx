import { ReactNode } from 'react'

import { cn } from '@lib/utils/utils'

interface MypageLayoutProps {
  children: ReactNode
}

export const mypageSize = `w-[90%] max-w-xl md:w-4/5 md:max-w-4xl lg:max-w-7xl`
/**
 * 헤더 레이아웃은 헤더와 푸터를 포함하는 레이아웃입니다.
 */
const MypageLayout = ({ children }: MypageLayoutProps): ReactNode => {
  return (
    <>
      <div className={cn(mypageSize, 'font-dohyeon text-3xl')}>마이페이지</div>
      {children}
    </>
  )
}

export default MypageLayout
