import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps): ReactNode => {
  return <main className='flex h-screen w-screen flex-col items-center justify-center bg-rcLightGray'>{children}</main>
}

export default AuthLayout
