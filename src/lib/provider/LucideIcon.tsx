import { icons } from 'lucide-react'
import { forwardRef, HTMLAttributes } from 'react'

import { colorSet, ColorType } from '@lib/colors/colors'
import { cn } from '@lib/utils/utils'

export interface LucideIconProps extends HTMLAttributes<HTMLOrSVGElement> {
  name: keyof typeof icons
  color?: ColorType
  size?: number
  className?: string
  fill?: ColorType
  strokeWidth?: number
}

const LucideIcon = forwardRef<HTMLDivElement, LucideIconProps>(
  ({ name, color, strokeWidth = 2, size = 16, fill, className, ...props }, ref) => {
    const LucideIcon = icons[name]

    const isClickEvent = !!props.onClick
    const pointerStyle = isClickEvent ? 'cursor-pointer' : ''

    return (
      <p ref={ref} className={cn('relative flex items-center justify-center', className)}>
        <LucideIcon
          color={color && colorSet[color]}
          size={size}
          fill={fill ? colorSet[fill] : 'transparent'}
          strokeWidth={strokeWidth}
          className={cn(pointerStyle)}
          {...props}
        />
      </p>
    )
  },
)

LucideIcon.displayName = 'LucideIcon'

export default LucideIcon
