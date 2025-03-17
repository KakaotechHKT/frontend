'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import Loading from '@components/ui/Loading'
import { useAuthData } from '@lib/hooks/useAuthData'
import { usePagination } from '@lib/hooks/usePagination'
import useScrollLock from '@lib/hooks/useScrollLock'
import useToggle from '@lib/hooks/useToggle'
import { SettlementList } from '@lib/HTTP/API/mypage/settlement'
import { QUERY_KEYS } from '@lib/HTTP/tanstack-query'
import { cn } from '@lib/utils/utils'
import { TrackType } from '@public/data/tracks'
import { useQuery } from '@tanstack/react-query'

import RequestSettlementModal from './RequestSettlementModal'

interface SettlementTableProps {
  className?: string
}

type SettlementStatusType = 'BEFORE' | 'PENDING' | 'COMPLETED'
export type SettlementDTO = {
  babpatId: number
  restaurantName: string
  babpatAt: string // "2025-03-17T22:57:58.758871" 형식
  settlementStatus: SettlementStatusType
  participants: {
    nickname: string
    name: string
    track: TrackType
  }[]
}
type PaginationInfo = {
  number: number
  size: number
  totalElements: number
  totalPages: number
}

const TransformStatusType = (status: SettlementStatusType) => {
  switch (status) {
    case 'BEFORE':
      return <span className='font-semibold text-rcRed'>정산 전</span>
    case 'PENDING':
      return <span className='font-semibold text-rcBlue'>정산 중</span>
    case 'COMPLETED':
      return <span className='font-semibold text-rcBlack'>완료</span>
  }
}

export const formatDate = (dateString: string) => {
  const [fullYear, month, day] = dateString.split('T')[0].split('-')
  const shortYear = fullYear.slice(2) // 연도의 뒤 두 자리만 추출
  return `${shortYear}.${month}.${day}`
}

const SettlementTable = ({ className }: SettlementTableProps) => {
  const params = useSearchParams()
  const { accessToken, nickname } = useAuthData()
  const { status: requestModal, toggleStatus: toggleRequestModal } = useToggle()
  const { lockScroll, unLockScroll } = useScrollLock()

  /** 상태 */
  const [modalData, setModalData] = useState<SettlementDTO>()

  /** 페이지네이션 정보 */
  const pageNumber = parseInt(params.get('page') ?? '1')
  let totalPageNumber: number = 0

  const { data, isPending } = useQuery({
    queryKey: QUERY_KEYS.MYPAGE.SETTLEMENT_LIST(pageNumber),
    queryFn: ({ signal }) => SettlementList({ pageNumber, accessToken }),
    enabled: !!accessToken /** 로그인되어 있을 경우만 */,
    staleTime: 0, // 항상 최신 데이터 유지
    refetchOnMount: true, // 라우팅 후 항상 최신 데이터 가져오기
    refetchOnWindowFocus: true, // 창 포커스 변경 시 최신 데이터 가져오기
    refetchOnReconnect: true, // 네트워크 연결 복구 시 최신 데이터 가져오기
  })

  const openRequestModalHandler = (content: SettlementDTO) => {
    lockScroll()
    toggleRequestModal()
    setModalData(content)
  }
  const closeRequestModalHandler = () => {
    unLockScroll()
    toggleRequestModal()
    setModalData(undefined)
  }

  let contents

  if (isPending || !data) {
    contents = (
      <tr className='w-full py-10'>
        <td className='flex w-full items-center justify-center'>
          <Loading />
        </td>
      </tr>
    )
  } else {
    const contentList: SettlementDTO[] = data.data.content
    const paginationInfo: PaginationInfo = data.data.page
    totalPageNumber = paginationInfo.totalPages

    contents = contentList.map((content, index) => {
      const participantsCount = content.participants.length
      const participantsString = participantsCount === 1 ? '아직 신청자 없음' : `${nickname} 외 ${content.participants.length - 1}명`

      return (
        <tr key={content.babpatId} className={cn(index % 2 === 0 ? 'bg-white' : 'bg-gray-50', 'relative text-sm')}>
          <td className='w-[15%] px-4 py-6'>{TransformStatusType(content.settlementStatus)}</td>
          <td className='w-[25%] truncate px-4 py-6'>{content.restaurantName}</td>
          <td className='w-[10%] px-4 py-6'>{formatDate(content.babpatAt)}</td>
          <td className='w-auto px-4 py-6'>{participantsString}</td>
          {content.settlementStatus === 'BEFORE' && (
            <td
              onClick={() => openRequestModalHandler(content)}
              className='absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer rounded-md bg-rcKakaoYellow px-4 py-2 font-pretendard hover:bg-rcKakaoYellowHover'
            >
              정산 요청 보내기
            </td>
          )}
        </tr>
      )
    })
  }

  const { PaginationComponent } = usePagination({ currentPage: pageNumber, totalPages: totalPageNumber })

  return (
    <section className={cn(className, 'relative')}>
      <table className='w-full border-collapse'>
        {/* 테이블 헤더 */}
        <thead className='border-b-2 border-rcBlack bg-rcWhite'>
          <tr className='text-left font-bold'>
            <th className='w-[10%] px-4 py-3'>정산 현황</th>
            <th className='w-[25%] truncate px-4 py-3'>음식점</th>
            <th className='w-[10%] px-4 py-3'>날짜</th>
            <th className='w-auto px-4 py-3'>참여자</th>
          </tr>
        </thead>

        {/* 테이블 바디 */}
        <tbody>{contents}</tbody>
      </table>
      <PaginationComponent className='my-4' />

      {requestModal && (
        <RequestSettlementModal
          modalData={modalData}
          requestModal={requestModal}
          closeRequestModalHandler={closeRequestModalHandler}
          className=''
        />
      )}
    </section>
  )
}

export default SettlementTable
