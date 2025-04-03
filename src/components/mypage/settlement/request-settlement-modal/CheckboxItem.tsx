import { Checkbox } from '@components/ui/checkbox'
import { cn } from '@lib/utils/utils'

import { CheckboxItemProps } from './types'

const CheckboxItem = ({ checked, onChange, label, className }: CheckboxItemProps) => (
  <label className={cn('flex items-center gap-2', className)}>
    <Checkbox checked={checked} onClick={onChange} />
    {label}
  </label>
)

export default CheckboxItem
