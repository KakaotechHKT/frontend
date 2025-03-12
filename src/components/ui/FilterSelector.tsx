'use client'
import useToggle from '@lib/hooks/useToggle'
import LucideIcon from '@lib/provider/LucideIcon'
import { cn } from '@lib/utils/utils'

import { TrackTransformer, TrackType } from '@public/data/tracks'
import { ReactNode, useState } from 'react'
import { Button } from './button'

interface FilterSelectorProps {
  placeHolder: string
  options: string[] | readonly string[]
  updateFilter: (type: 'mainCategory' | 'track' | 'capacity', selectedFilters: string[]) => void
  className?: string
}

const FilterSelector = ({ placeHolder, options, updateFilter, className }: FilterSelectorProps): ReactNode => {
  const { status, toggleStatus } = useToggle(false)
  // 상태
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const selectOptionHandler = (option: string) => {
    setSelectedOptions(
      prev =>
        prev.includes(option)
          ? prev.filter(item => item !== option) // 선택된 경우 제거
          : [...prev, option], // 선택되지 않은 경우 추가
    )
  }

  const resetHandler = () => {
    setSelectedOptions([])
    toggleStatus()
  }

  const applyHandler = () => {
    let type
    switch (placeHolder) {
      case '종류':
        type = 'mainCategory'
        break
      case '과정':
        type = 'track'
        break

      case '인원':
        type = 'capacity'
        break
    }
    updateFilter(type as any, selectedOptions)
    toggleStatus()
  }
  return (
    <>
      <div
        onClick={toggleStatus}
        className='relative flex cursor-pointer items-center justify-center gap-2 rounded-xl border-sm border-solid border-rcDarkGray px-2 py-1 text-sm'
      >
        {placeHolder} <LucideIcon name={!status ? 'ChevronDown' : 'ChevronUp'} />
        {status && (
          <div
            className={cn(
              'absolute left-0 top-[150%] z-10 flex w-56 flex-col items-center justify-start rounded-md bg-rcWhite shadow-rc-shadow',
              className,
            )}
          >
            <ul className='flex h-36 w-full flex-col items-center justify-start gap-3 overflow-y-auto px-4 py-2 text-sm'>
              {options.map(option => {
                const isSelected = selectedOptions.includes(option)
                let OptionText
                switch (placeHolder) {
                  case '종류':
                    OptionText = `${option}`
                    break
                  case '과정':
                    OptionText = `${TrackTransformer[option as TrackType]}`
                    break

                  case '인원':
                    OptionText = `${option}명`
                    break
                }
                return (
                  <li
                    onClick={() => selectOptionHandler(option)}
                    key={option}
                    className='flex w-full cursor-pointer items-center justify-start gap-2 font-semibold'
                  >
                    <LucideIcon
                      name={!isSelected ? 'Square' : 'SquareCheck'}
                      className={cn(isSelected ? 'text-rcBlack' : 'text-rcDarkGray')}
                    />
                    {OptionText}
                  </li>
                )
              })}
            </ul>

            <div className='h-[1px] w-full bg-rcGray' />

            <div className='flex w-full items-center justify-center gap-2 px-4 py-3'>
              <Button onClick={resetHandler} variant='rcLightGray' className='w-full font-pretendard text-xs font-semibold'>
                초기화
              </Button>
              <Button onClick={applyHandler} variant='rcKakaoYellow' className='w-full font-pretendard text-xs font-semibold'>
                적용
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default FilterSelector
