'use client'

import * as React from 'react'

import { TimePickerInput } from './input'

interface TimePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}

export function TimePicker({ date, setDate }: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null)
  const hourRef = React.useRef<HTMLInputElement>(null)

  return (
    <div className='flex items-end gap-2'>
      <div className='grid gap-1 text-center'>
        <TimePickerInput
          className='h-8 w-14 font-pretendard text-xs'
          picker='hours'
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className='grid gap-1 text-center'>
        <TimePickerInput
          className='h-8 font-pretendard text-xs'
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
