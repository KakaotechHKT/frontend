import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps): ReactNode => {
  return <div className='relative flex h-screen w-screen flex-col items-center justify-center bg-rcLightGray'>{children}</div>
  // return <>{children}</>
}

export default AuthLayout
