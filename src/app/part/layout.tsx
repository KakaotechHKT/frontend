import { ReactNode } from 'react'

import CustomQueryClientProvider from '@lib/provider/QueryClientProvider'

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
