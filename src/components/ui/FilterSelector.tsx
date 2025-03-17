'use client'
import { ReactNode, RefObject, useEffect, useRef, useState } from 'react'
import { useOutsideClick } from 'usehooks-jihostudy'

import { FilterKeyType } from '@components/main/PartCards/PartCardList'
import useToggle from '@lib/hooks/useToggle'
import LucideIcon from '@lib/provider/LucideIcon'
import { cn } from '@lib/utils/utils'
import { MainCategories, MainCategoriesType } from '@public/data/categories'
import { TrackTransformer, TrackType } from '@public/data/tracks'

import { Button } from './button'

interface FilterSelectorProps {
  placeHolder: string
  filter: MainCategoriesType[] | TrackType[] | string[] | undefined
  type: FilterKeyType
  updateFilter: (type: FilterKeyType, selectedFilters: string[]) => void
  className?: string
}

// headCount
const MAX_HEADCOUNT = 10
const numbers = Array.from({ length: MAX_HEADCOUNT - 1 }, (_, i) => String(i + 2))

const FilterSelector = ({ placeHolder, filter, type, updateFilter, className }: FilterSelectorProps): ReactNode => {
  const { status, toggleStatus } = useToggle(false)
  // 상태
  const [selectedOptions, setSelectedOptions] = useState(filter)

  useEffect(() => {
    setSelectedOptions(filter)
  }, [filter])

  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(ref as RefObject<HTMLElement>, toggleStatus)

  let options: string[] | readonly string[] = []
  switch (type) {
    case 'mainCategory':
      options = MainCategories
      break
    case 'capacity':
      options = numbers
      break
  }

  let value

  if (!selectedOptions || selectedOptions.length === 0) {
    value = placeHolder
  } else if (selectedOptions.length >= 1) {
    switch (placeHolder) {
      case '종류':
        value = selectedOptions[0]
        break
      case '과정':
        value = TrackTransformer[selectedOptions[0] as TrackType]
        break

      case '인원':
        value = `${selectedOptions[0]}명`
        break
    }
    if (selectedOptions.length >= 2) {
      value += ` 외 ${selectedOptions.length - 1}`
    }
  }

  const selectOptionHandler = (option: string) => {
    setSelectedOptions(prev => {
      if (!prev) return [option] // prev가 undefined면 새로운 배열로 추가
      return prev.includes(option as never)
        ? prev.filter(item => item !== option) // 선택된 경우 제거
        : [...prev, option] // 선택되지 않은 경우 추가
    })
  }

  const resetHandler = () => {
    setSelectedOptions([])
    updateFilter(type, [])
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
    updateFilter(type as any, selectedOptions as string[])
    toggleStatus()
  }
  return (
    <>
      <div
        className={cn(
          'relative z-20 cursor-pointer rounded-md border-solid px-2 py-1 text-sm',
          selectedOptions && selectedOptions.length !== 0
            ? 'border border-rcBlack bg-rcKakaoYellow hover:bg-rcKakaoYellowHover'
            : 'border border-rcDarkGray',
        )}
      >
        <div className='flex h-full w-full items-center justify-center gap-2' onClick={toggleStatus}>
          {value} <LucideIcon name={!status ? 'ChevronDown' : 'ChevronUp'} />
        </div>
        {status && (
          <div
            ref={ref}
            className={cn(
              'absolute left-0 top-[150%] z-10 flex w-56 flex-col items-center justify-start rounded-md bg-rcWhite shadow-rc-shadow',
              className,
            )}
          >
            <ul className='flex h-36 w-full flex-col items-center justify-start overflow-y-auto px-4 py-2 text-sm'>
              {options.map(option => {
                const isSelected = selectedOptions && selectedOptions.includes(option as never)
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
                    className='flex w-full cursor-pointer items-center justify-start gap-2 pb-3 font-semibold'
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
