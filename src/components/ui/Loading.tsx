import { ReactNode } from 'react'

import LucideIcon from '@lib/provider/LucideIcon'
import { cn } from '@lib/utils/utils'

interface LoadingProps {
  className?: string
  size?: number
}
const Loading = ({ className, size }: LoadingProps): ReactNode => {
  return <LucideIcon name='LoaderCircle' className={cn('animate-spin', className)} size={size || 30} />
}

export default Loading
