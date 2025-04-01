import { ReactNode } from 'react'

interface HeaderLessLayoutProps {
  children: ReactNode
}
/**
 * 헤더리스 레이아웃 페이지의 높이는 screen 고정으로, 한 페이지 내에서 해결하는 라우트의 모임입니다.
 */
const HeaderLessLayout = ({ children }: HeaderLessLayoutProps): ReactNode => {
  return (
    <>
      <main className='relative flex h-screen w-screen items-start justify-start bg-rcWhite'>{children}</main>
    </>
  )
}

export default HeaderLessLayout
