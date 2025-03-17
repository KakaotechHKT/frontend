'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ReactNode, useState } from 'react'

import { Button } from '@components/ui/button'
import FilterSelector from '@components/ui/FilterSelector'
import { Input } from '@components/ui/input'
import Loading from '@components/ui/Loading'
import { URL } from '@lib/constants/routes'
import { AuthDataType, useAuthData } from '@lib/hooks/useAuthData'
import useModal from '@lib/hooks/useModal'
import { usePagination } from '@lib/hooks/usePagination'
import { PartList } from '@lib/HTTP/API/part'
import { QUERY_KEYS } from '@lib/HTTP/tanstack-query'
import LucideIcon from '@lib/provider/LucideIcon'
import { cn } from '@lib/utils/utils'
import { MainCategoriesType } from '@public/data/categories'
import { TrackType } from '@public/data/tracks'
import { useQuery } from '@tanstack/react-query'

import PartCard, { BabpartDTO } from './PartCard'

interface PartCardListProps {
  className?: string
}

const TABS = ['전체', '밥팟', '도시락팟'] as const
type TabType = (typeof TABS)[number]

export type FilterType = {
  mainCategory: MainCategoriesType[]
  track: TrackType[]
  capacity: string[] // 보낼때 다시 숫자로 전처리후 보내기
}
export type FilterKeyType = 'mainCategory' | 'track' | 'capacity'

/** 필터 */
const DEFAULT_FILTERS = {
  mainCategory: undefined,
  track: undefined,
  capacity: undefined,
}
const PartCardList = ({ className }: PartCardListProps): ReactNode => {
  const params = useSearchParams()

  const authData: AuthDataType = useAuthData()
  const { openModalHandler, Modal } = useModal()

  // 상태
  const [isComposing, setIsComposing] = useState<boolean>(false)
  const [currentTab, setCurrentTab] = useState<TabType>('전체')
  const [filters, setFilters] = useState<Partial<FilterType>>(DEFAULT_FILTERS)
  const [searchInput, setSearchInput] = useState<string>('')

  const pageNumber = parseInt(params.get('page') ?? '1')
  let totalPageNumber: number = 0

  const updateFilter = (type: FilterKeyType, selectedFilters: string[]) => {
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

  const resetFilters = () => {
    setFilters({ ...DEFAULT_FILTERS })
    setSearchInput('')
  }

  const { data, isPending, refetch } = useQuery({
    queryKey: QUERY_KEYS.PART.LIST(pageNumber, filters),
    queryFn: ({ signal }) => {
      return PartList({ filters, searchInput, pageNumber })
    },
    staleTime: 0, // 항상 최신 데이터 유지
    refetchOnMount: true, // 라우팅 후 항상 최신 데이터 가져오기
    refetchOnWindowFocus: true, // 창 포커스 변경 시 최신 데이터 가져오기
    refetchOnReconnect: true, // 네트워크 연결 복구 시 최신 데이터 가져오기
  })

  let contents
  if (isPending || !data) {
    contents = <Loading />
  } else {
    const { content, page } = data.data
    /** 페이지네이션 관리 */
    const { size, number, totalElements, totalPages } = page
    totalPageNumber = totalPages

    /** 검색된 데이터가 없는 경우 */
    if (content.length === 0) {
      /** 필터가 적용되지 않는 경우 */
      if (!filters.capacity && !filters.mainCategory && !filters.track) {
        contents = (
          <div className='flex w-full flex-col items-center gap-5 py-6 font-dohyeon'>
            <span className='font-dohyeon text-xl sm:text-2xl xl:text-3xl'>밥팟이 아직 없어요. 1등으로 만들어보세요!</span>
            <Button variant='rcKakaoYellow' className='relative'>
              <Link
                href={authData.accessToken ? URL.PART.INDEX.value : URL.AUTH.LOGIN.value}
                className='flex h-full w-full items-center justify-between gap-4'
              >
                <span>밥팟 만들기</span> <LucideIcon name='MoveUpRight' />
              </Link>
            </Button>
          </div>
        )
      } else {
        /** 필터가 적용된 경우 */
        contents = (
          <div className='flex w-full flex-col items-center gap-5 py-6 font-dohyeon'>
            <span className='font-dohyeon text-xl sm:text-2xl xl:text-3xl'>검색된 밥팟이 없습니다!</span>
            <Button onClick={resetFilters} variant='rcKakaoYellow' className='flex items-center justify-between gap-4'>
              <span>필터 초기화</span> <LucideIcon name='RotateCcw' />
            </Button>
          </div>
        )
      }
    } else {
      /** 요소 표시 */
      contents = (
        <ul className={cn(!isPending ? 'grid gap-x-8 gap-y-10' : 'flex items-center justify-center', className)}>
          {content.map((elm: BabpartDTO) => {
            return <PartCard key={elm.babpatInfo.id} authData={authData} babpartData={elm} />
          })}
        </ul>
      )
    }
  }

  const { PaginationComponent } = usePagination({ currentPage: pageNumber, totalPages: totalPageNumber })

  return (
    <section className='flex w-full flex-col items-center justify-start gap-1'>
      <span className='font-dohyeon text-xl sm:text-2xl xl:text-3xl'>밥팟 · 도시락팟 참여하기</span>
      <span className='text-xss text-rcDarkGray lg:text-sm'>* 밥팟에 참여하여 사람들과 함께 식사하세요!</span>
      <ul className='mt-4 flex items-center justify-start gap-4 self-start text-xl'>
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
      <div className='relative mt-4 flex w-full flex-col items-start justify-between gap-4 self-start sm:flex-row sm:items-center'>
        <div className='flex items-center justify-start gap-4'>
          <FilterSelector filter={filters.mainCategory} placeHolder={'종류'} type='mainCategory' updateFilter={updateFilter} />
          {/* <FilterSelector placeHolder={'과정'}  updateFilter={updateFilter} /> */}
          <FilterSelector filter={filters.capacity} placeHolder={'인원'} type='capacity' updateFilter={updateFilter} />
        </div>

        <Input
          type='text'
          placeholder='🔍 제목으로 검색해보세요.'
          className='h-9 w-full rounded-none border-0 border-b-[1px] border-solid border-rcKakaoYellow py-0 text-xss shadow-none outline-none focus:outline-none focus-visible:ring-0 sm:w-60'
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !isComposing) {
              console.log('reftechings')

              e.preventDefault()
              refetch()
            }
          }}
          onCompositionStart={() => setIsComposing(true)} // 한글 조합 시작
          onCompositionEnd={() => setIsComposing(false)} // 한글 조합 끝
        />
      </div>
      {contents}
      <PaginationComponent />
      <Modal />
    </section>
  )
}

export default PartCardList
