import { ReactNode } from 'react'

import { cn } from '@lib/utils/utils'

interface RouteTextProps {
  content: string
  className?: string
}

const RouteText = ({ content, className }: RouteTextProps): ReactNode => {
  return <div className={cn('border-l-2 border-solid border-rcBlack pl-4 text-sm sm:text-base', className)}>{content}</div>
}

export default RouteText
