'use client'
import { ReactNode, useState } from 'react'

import Loading from '@components/ui/Loading'
import { useAuthData } from '@lib/hooks/useAuthData'
import { PartList } from '@lib/HTTP/API/part'
import { QUERY_KEYS } from '@lib/HTTP/tanstack-query'
import { cn } from '@lib/utils/utils'
import { useQuery } from '@tanstack/react-query'

import FilterSelector from '@components/ui/FilterSelector'
import { Input } from '@components/ui/input'
import useModal from '@lib/hooks/useModal'
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
  capacity: string[] // 보낼때 다시 숫자로 전처리후 보내기
}

// headCount
const MAX_HEADCOUNT = 10
const numbers = Array.from({ length: MAX_HEADCOUNT - 1 }, (_, i) => String(i + 2))

const PartCardList = ({ className }: PartCardListProps): ReactNode => {
  const authData = useAuthData()
  const { openModalHandler, Modal } = useModal()

  // 상태
  const [currentTab, setCurrentTab] = useState<TabType>('전체')
  const [filters, setFilters] = useState<Partial<FilterType>>({
    mainCategory: undefined,
    track: undefined,
    capacity: undefined,
  })
  const [searchInput, setSearchInput] = useState<string>('')

  const updateFilter = (type: 'mainCategory' | 'track' | 'capacity', selectedFilters: string[]) => {
    setFilters(prev => ({ ...prev, [type]: selectedFilters }))
  }

  const currentTabSwitchHandler = (tab: TabType) => {
    if (tab === '도시락팟' || tab === '밥팟') {
      openModalHandler({
        title: '서비스 준비중입니다!',
        details: '빠른 시일내로 서비스 제공을 약속드립니다.',
        type: 'info',
      })
    }
  }

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
            onClick={() => currentTabSwitchHandler(tab)}
            className={cn(tab === currentTab ? 'font-bold text-rcBlack' : 'font-semibold text-rcGray hover:text-rcBlack', 'cursor-pointer')}
          >
            {tab}
          </li>
        ))}
      </ul>

      {/* 필터 */}
      <div className='relative mt-4 flex w-full items-center justify-start gap-4 self-start'>
        <FilterSelector placeHolder={'종류'} options={MainCategories} updateFilter={updateFilter} />
        <FilterSelector placeHolder={'과정'} options={TRACKS} updateFilter={updateFilter} />
        <FilterSelector placeHolder={'인원'} options={numbers} updateFilter={updateFilter} />

        <Input
          type='text'
          placeholder='🔍 제목으로 검색해보세요.'
          className='absolute right-0 h-full w-44 rounded-3xl py-0 text-xss shadow-none outline-none focus:outline-none focus-visible:ring-0'
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          // TODO: 검색 API
          // onKeyDown={e => {
          //   if (e.key === 'Enter' && !isComposing) {
          //     ()
          //   }
          // }}
          // onCompositionStart={() => setIsComposing(true)} // 한글 조합 시작
          // onCompositionEnd={() => setIsComposing(false)} // 한글 조합 끝
        />
      </div>

      <ul className={cn(!isPending ? 'grid gap-x-8 gap-y-10' : 'flex items-center justify-center', className)}>{contents}</ul>
      <Modal />
    </section>
  )
}

export default PartCardList
