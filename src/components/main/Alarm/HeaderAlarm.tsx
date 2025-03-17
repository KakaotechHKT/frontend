import { ReactNode, RefObject, useRef } from 'react'
import { useEscClose, useOutsideClick } from 'usehooks-jihostudy'

import Loading from '@components/ui/Loading'
import { SettlementAlarmList } from '@lib/HTTP/API/mypage/settlement'
import { QUERY_KEYS } from '@lib/HTTP/tanstack-query'
import LucideIcon from '@lib/provider/LucideIcon'
import { cn } from '@lib/utils/utils'
import { useQuery } from '@tanstack/react-query'

interface HeaderAlarmProps {
  accessToken: string
  alarmStatus: boolean
  alarmToggleStatus: () => void
  className?: string
}

type PaymentStatusType = 'UNPAID' | 'PAID'

type AlarmDTO = {
  settlementId: number
  totalPrice: number
  perPrice: number
  accountNumber: string
  bankName: string
  totalPeopleCount: number
  accountHolder: string
  restaurantName: string
  leaderNickname: string
  babpatAt: string
  payStatus: PaymentStatusType
}

const HeaderAlarm = ({ accessToken, alarmStatus, alarmToggleStatus, className }: HeaderAlarmProps): ReactNode => {
  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(ref as RefObject<HTMLElement>, alarmToggleStatus)
  useEscClose(alarmStatus, alarmToggleStatus)

  const { data, isPending } = useQuery({
    queryKey: QUERY_KEYS.MYPAGE.ALARM_LIST,
    queryFn: ({ signal }) => {
      return SettlementAlarmList({ accessToken })
    },
    enabled: accessToken !== undefined /** 로그인되어 있을 경우만 */,
  })
  let contents
  if (!data) {
    contents = <Loading />
  } else {
    const alarms: AlarmDTO[] = data.data.alarms
    contents = <div>123</div>
  }

  return (
    <div
      ref={ref}
      className={cn(
        className,
        'absolute right-0 z-10 flex w-max flex-col items-start justify-start rounded-2xl bg-rcWhite px-6 py-4 shadow-rc-shadow',
      )}
    >
      <LucideIcon onClick={alarmToggleStatus} name='X' className='absolute right-4 top-4 cursor-pointer' size={16} />
      <span className='font-dohyeon text-2xl'>밥팟 알림</span>
      <span className='mt-3 text-xs text-rcDarkGray'>* 수령인 및 가격 재확인 후에 입금해주세요.</span>
      <span className='mt-2 text-xs text-rcDarkGray'>* 정산 후 &ldquo;정산 완료하기&rdquo; 버튼을 눌러주세요.</span>
    </div>
  )
}

export default HeaderAlarm
