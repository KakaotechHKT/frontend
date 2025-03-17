import { ReactNode } from 'react'

import { cn } from '@lib/utils/utils'

interface BackdropProps {
  className?: string
}

const Backdrop = ({ className }: BackdropProps): ReactNode => {
  return <div className={cn('fixed left-0 top-0 z-20 h-dvh w-full bg-rcBackdrop', className)} />
}

export default Backdrop
