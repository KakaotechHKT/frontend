import { ReactNode, RefObject, useRef } from 'react'
import { useEscClose, useOutsideClick } from 'usehooks-jihostudy'

import { AlarmDTO } from '@components/Header'
import { formatDate } from '@components/mypage/settlement/SettlementTable'
import { Button } from '@components/ui/button'
import Loading from '@components/ui/Loading'
import { AuthDataType } from '@lib/hooks/useAuthData'
import { FinishSettlementType } from '@lib/HTTP/API/mypage/settlement'
import { useMutationStore } from '@lib/HTTP/tanstack-query'
import LucideIcon from '@lib/provider/LucideIcon'
import { cn } from '@lib/utils/utils'

interface HeaderAlarmProps {
  authData: AuthDataType
  alarmStatus: boolean
  alarmToggleStatus: () => void
  AlarmData: AlarmDTO[] | undefined
  className?: string
}

const HeaderAlarm = ({ authData, alarmStatus, alarmToggleStatus, AlarmData, className }: HeaderAlarmProps): ReactNode => {
  const { accessToken } = authData

  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(ref as RefObject<HTMLElement>, alarmToggleStatus)
  useEscClose(alarmStatus, alarmToggleStatus)

  const { mutate: FinishSettlementMutate, isPending: isFinishing } = useMutationStore<FinishSettlementType>(['settlement', 'finish'])
  const completeSettlementHandler = (settlementId: number) => {
    FinishSettlementMutate(
      {
        settlementId,
        accessToken,
      },
      {
        onSuccess(data, variables, context) {
          window.location.reload()
        },
      },
    )
  }

  let contents

  if (!AlarmData) {
    contents = <Loading />
  } else {
    /** 알람이 아직 없는 경우 */
    if (AlarmData.length === 0) {
      contents = (
        <span className='mt-2 w-full rounded-md bg-rcLightGray py-3 text-center text-sm font-semibold text-rcBlack'>
          도착한 알림이 없습니다!
        </span>
      )
    } else {
      /** 알람 있는 경우 */
      contents = (
        <div className='relative mt-4 flex w-full flex-col items-start justify-start rounded-md bg-rcLightGray'>
          {AlarmData.map(alarm => {
            const {
              payStatus,
              restaurantName,
              leaderNickname,
              babpatAt,
              accountNumber,
              accountHolder,
              totalPrice,
              totalPeopleCount,
              perPrice,
            } = alarm
            return (
              <ul
                className='relative flex w-full list-inside list-disc flex-col items-start justify-start px-6 py-4'
                key={alarm.settlementId}
              >
                <li className={cn('mb-2 flex items-center justify-start gap-2')}>
                  <span className={cn(payStatus === 'PAID' ? 'text-rcBlue' : 'text-rcRed', 'text-lg font-bold')}>
                    {payStatus === 'PAID' ? '정산 완료' : '정산 전'}
                  </span>
                  <span className={cn('hidden text-xs sm:block')}>
                    ({`${restaurantName} · ${leaderNickname} · ${formatDate(babpatAt)}`})
                  </span>
                </li>
                <li className='ml-2 py-1 text-xs'>계좌번호 : {accountNumber}</li>
                <li className='ml-2 py-1 text-xs'>수령인 : {accountHolder}</li>
                <li className='ml-2 py-1 text-xs'>총 가격 : {totalPrice}</li>
                <li className='ml-2 py-1 text-xs'>참여자 : {totalPeopleCount}</li>
                <li className='ml-2 py-1 text-xs'>인당 가격 : {perPrice}</li>
                {payStatus === 'UNPAID' && (
                  <Button
                    onClick={() => completeSettlementHandler(alarm.settlementId)}
                    className='relative mt-4 w-full sm:absolute sm:bottom-4 sm:right-4 sm:w-max'
                    variant='rcKakaoYellow'
                  >
                    정산 완료하기
                  </Button>
                )}
              </ul>
            )
          })}
        </div>
      )
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        className,
        'absolute right-0 z-10 flex h-auto max-h-[420px] w-max flex-col items-start justify-start overflow-y-auto rounded-2xl bg-rcWhite px-6 py-4 shadow-rc-shadow',
      )}
    >
      <LucideIcon onClick={alarmToggleStatus} name='X' className='absolute right-4 top-4 cursor-pointer' size={16} />
      <span className='font-dohyeon text-2xl'>밥팟 알림</span>
      <span className='mt-3 text-xs text-rcDarkGray'>* 수령인 및 가격 재확인 후에 입금해주세요.</span>
      <span className='mt-2 text-xs text-rcDarkGray'>* 정산 후 &ldquo;정산 완료하기&rdquo; 버튼을 눌러주세요.</span>
      {contents}
    </div>
  )
}

export default HeaderAlarm
