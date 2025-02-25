import { ReactNode } from 'react'

interface PartLayoutProps {
  children: ReactNode
}

const PartLayout = ({ children }: PartLayoutProps): ReactNode => {
  return <main className='relative flex h-screen w-screen items-start justify-start bg-rcWhite'>{children}</main>
}

export default PartLayout
