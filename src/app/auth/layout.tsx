import { ReactNode } from 'react'

import CustomQueryClientProvider from '@lib/provider/QueryClientProvider'

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps): ReactNode => {
  return (
    <CustomQueryClientProvider>
      <main className='relative flex h-screen w-screen flex-col items-center justify-center bg-rcLightGray'>{children}</main>
    </CustomQueryClientProvider>
  )
}

export default AuthLayout
