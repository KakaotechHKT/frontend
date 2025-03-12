'use client'
import { ReactNode, useEffect, useState } from 'react'

import Loading from '@components/ui/Loading'
import { useAuthData } from '@lib/hooks/useAuthData'
import { PartList } from '@lib/HTTP/API/part'
import { QUERY_KEYS } from '@lib/HTTP/tanstack-query'
import { cn } from '@lib/utils/utils'
import { useQuery } from '@tanstack/react-query'

import FilterSelector from '@components/ui/FilterSelector'
import { MainCategories, MainCategoriesType } from '@public/data/categories'
import { TRACKS, TrackType } from '@public/data/tracks'
import PartCard, { BabpartDTO } from './PartCard'

interface PartCardListProps {
  className?: string
}

const TABS = ['전체', '밥팟', '도시락팟'] as const
type TabType = (typeof TABS)[number]

type FilterType = {
  mainCategory: MainCategoriesType[]
  track: TrackType[]
  capacity: number[]
}

// headCount
const MAX_HEADCOUNT = 10
const numbers = Array.from({ length: MAX_HEADCOUNT - 1 }, (_, i) => String(i + 2))

const PartCardList = ({ className }: PartCardListProps): ReactNode => {
  const authData = useAuthData()

  // 상태
  const [currentTab, setCurrentTab] = useState<TabType>('전체')
  const [filters, setFilters] = useState<Partial<FilterType>>({
    mainCategory: undefined,
    track: undefined,
    capacity: undefined,
  })
  const updateFilter = (type: 'mainCategory' | 'track' | 'capacity', selectedFilters: string[]) => {
    setFilters(prev => ({ ...prev, [type]: selectedFilters }))
  }

  useEffect(() => {
    console.log(filters)
  }, [filters])

  const { data, isPending } = useQuery({
    queryKey: QUERY_KEYS.PART.LIST,
    queryFn: ({ signal }) => {
      return PartList({})
    },
  })

  let contents
  if (isPending || !data) {
    contents = <Loading />
  } else {
    contents = data.data.babpats.map((elm: BabpartDTO) => {
      return <PartCard key={elm.babpatInfo.id} authData={authData} babpartData={elm} />
    })
  }

  return (
    <section className='flex flex-col items-center justify-start gap-1'>
      <span className='font-dohyeon text-xl sm:text-2xl xl:text-3xl'>밥팟 참여하기</span>
      <span className='text-xss text-rcDarkGray lg:text-sm'>* 밥팟에 참여하여 많은 사람들과 식사를 함께하세요!</span>
      <ul className='flex items-center justify-start gap-4 self-start text-xl'>
        {TABS.map(tab => (
          <li
            key={tab}
            className={cn(tab === currentTab ? 'font-bold text-rcBlack' : 'font-semibold text-rcGray hover:text-rcBlack', 'cursor-pointer')}
          >
            {tab}
          </li>
        ))}
      </ul>

      {/* 필터 */}
      <div className='relative mt-4 flex items-center justify-start gap-4 self-start'>
        <FilterSelector placeHolder={'종류'} options={MainCategories} updateFilter={updateFilter} />
        <FilterSelector placeHolder={'과정'} options={TRACKS} updateFilter={updateFilter} />
        <FilterSelector placeHolder={'인원'} options={numbers} updateFilter={updateFilter} />
      </div>

      <ul className={cn(!isPending ? 'grid gap-x-8 gap-y-10' : 'flex items-center justify-center', className)}>{contents}</ul>
    </section>
  )
}

export default PartCardList
