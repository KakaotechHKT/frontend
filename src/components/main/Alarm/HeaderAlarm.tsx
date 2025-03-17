import { ReactNode } from 'react'

import LucideIcon from '@lib/provider/LucideIcon'
import { cn } from '@lib/utils/utils'

interface HeaderAlarmProps {
  accessToken: string
  className?: string
}

const HeaderAlarm = ({ accessToken, className }: HeaderAlarmProps): ReactNode => {
  // const { data, isPending } = useQuery({
  //   queryKey: QUERY_KEYS.MYPAGE.ALARM_LIST.key,
  //   queryFn: ({ signal }) => {
  //     return SettlementAlarmList({ accessToken })
  //   },
  //   enabled: accessToken !== undefined /** 로그인되어 있을 경우만 */,
  // })
  // let contents
  // if (!data) {
  //   contents = <Loading />
  // } else {
  //   contents = <div>123</div>
  // }

  return (
    <div
      className={cn(
        className,
        'absolute right-0 flex w-max flex-col items-start justify-start rounded-2xl bg-rcWhite px-6 py-4 shadow-rc-shadow',
      )}
    >
      <LucideIcon name='X' className='absolute right-4 top-4 cursor-pointer' size={16} />
      <span className='font-dohyeon text-2xl'>밥팟 알림</span>
      <span className='mt-3 text-xs text-rcDarkGray'>* 수령인 및 가격 재확인 후에 입금해주세요.</span>
      <span className='mt-2 text-xs text-rcDarkGray'>* 정산 후 &ldquo;정산 완료하기&rdquo; 버튼을 눌러주세요.</span>
    </div>
  )
}

export default HeaderAlarm
