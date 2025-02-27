import CustomQueryClientProvider from '@lib/provider/QueryClientProvider'
import { ReactNode } from 'react'

interface PartLayoutProps {
  children: ReactNode
}

const PartLayout = ({ children }: PartLayoutProps): ReactNode => {
  return (
    <CustomQueryClientProvider>
      <main className='relative flex h-screen w-screen items-start justify-start bg-rcWhite'>{children}</main>
    </CustomQueryClientProvider>
  )
}

export default PartLayout
