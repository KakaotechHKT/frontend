import LucideIcon from '@lib/provider/LucideIcon'
import { cn } from '@lib/utils/utils'
import { ReactNode } from 'react'

interface LoadingProps {
  className?: string
  size?: number
}
const Loading = ({ className, size }: LoadingProps): ReactNode => {
  return <LucideIcon name='LoaderCircle' className={cn('animate-spin', className)} size={size || 16} />
}

export default Loading
