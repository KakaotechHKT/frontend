'use client'

import * as React from 'react'

import { cn } from '@lib/utils/utils'

import { TimePickerInput } from './input'

interface TimePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  className?: string
}

export function TimePicker({ date, setDate, className }: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null)
  const hourRef = React.useRef<HTMLInputElement>(null)

  return (
    <div className={cn('flex items-end gap-2', className)}>
      <div className='grid w-1/2 gap-1 text-center'>
        <TimePickerInput
          className='h-8 w-full font-pretendard text-xs'
          picker='hours'
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className='grid w-1/2 gap-1 text-center'>
        <TimePickerInput
          className='h-8 w-full font-pretendard text-xs'
          picker='minutes'
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
        />
      </div>
    </div>
  )
}
