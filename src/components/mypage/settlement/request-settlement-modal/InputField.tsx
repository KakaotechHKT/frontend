import { Input } from '@components/ui/input'

import { InputFieldProps } from './types'

const InputField = ({ label, onChange, placeholder }: InputFieldProps) => (
  <>
    <span className='font-dohyeon text-xl'>{label}</span>
    <Input
      onChange={e => onChange(e.target.value)}
      type={label === '계좌번호' || label === '은행' || label === '예금주' ? 'text' : 'number'}
      placeholder={placeholder}
      className='h-9 w-full text-xs'
    />
  </>
)

export default InputField
