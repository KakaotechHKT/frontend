'use client'
import { ReactNode } from 'react'

import Loading from '@components/ui/Loading'
import { useAuthData } from '@lib/hooks/useAuthData'
import { cn } from '@lib/utils/utils'
import { TrackType } from '@public/data/tracks'

interface SettlementTableProps {
  className?: string
}

type BabpartSettlementDTO = {
  babpatId: number
  restaurantName: string
  settlementAt: string
  settlementStatus: 'PENDING' | 'COMPLETED'
  payers: {
    nickname: string
    name: string
    track: TrackType
  }[]
}

const TABLE_TITLES = ['정산현황', '음식점', '날짜', '참여자']

const SettlementTable = ({ className }: SettlementTableProps): ReactNode => {
  const { accessToken } = useAuthData()

  // const { data, isPending } = useQuery({
  //   queryKey: QUERY_KEYS.MYPAGE.SETTLEMENT_LIST.key,
  //   queryFn: ({ signal }) => {
  //     return SettlementList({ accessToken })
  //   },
  //   enabled: accessToken !== undefined /** 로그인되어 있을 경우만 */,
  // })

  // let dummy_data = generateMockSettlements(12)
  // let contents = dummy_data.map(settlement => {
  //   const numPayers = settlement.payers.length
  //   return (
  //     <li className='grid w-full grid-cols-4 grid-rows-1 gap-20' key={settlement.babpatId}>
  //       <div className='text-center'>{settlement.settlementStatus === 'COMPLETED' ? '완료' : '미완료'}</div>
  //       <div className='text-center'>{settlement.restaurantName}</div>
  //       <div className='text-center'>{format(new Date(settlement.settlementAt), 'yy.MM.dd')}</div>
  //       <div className='text-center'>{}</div>
  //     </li>
  //   )
  // })

  let contents
  /** API 복귀되면 */
  if (!true) {
    contents = <Loading />
  } else {
    contents = <>123</>
  }

  return (
    <section className={cn(className, 'relative border-b py-3 font-semibold')}>
      <div className='flex w-full items-center justify-start gap-20'>
        {TABLE_TITLES.map(title => (
          <span key={title} className='w-max px-2 text-xl font-semibold'>
            {title}
          </span>
        ))}
      </div>
      <ul className='flex w-full flex-col items-start justify-start'>{contents}</ul>
    </section>
  )
}

export default SettlementTable
