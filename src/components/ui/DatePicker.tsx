'use client'

import { PartDTO } from '@app/part/page'
import { Button } from '@components/ui/button'
import { Calendar } from '@components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { cn } from '@lib/utils/utils'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

interface DatePickerProps {
  date: Date | undefined
  updatePartData: (partial: Partial<PartDTO>) => void
}

export function DatePicker({ date, updatePartData }: DatePickerProps) {
  const selectHandler = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      updatePartData({ date: selectedDate })
    }
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='secondary'
          className={cn('w-[280px] justify-center bg-rcWhite text-left shadow-none', !date && 'text-muted-foreground')}
        >
          <CalendarIcon className='mr-2 h-4 w-4 text-rcBlack' />
          {date ? (
            <span className='flex items-center justify-center'>{format(date, 'yyyy-MM-dd')}</span>
          ) : (
            <span className='flex items-center justify-center text-rcBlack'>날짜를 선택해주세요</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar mode='single' selected={date} onSelect={selectHandler} initialFocus />
      </PopoverContent>
    </Popover>
  )
}
