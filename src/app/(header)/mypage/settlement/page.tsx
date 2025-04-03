'use client'
import { ReactNode, Suspense } from 'react'

import { mypageLayoutStyle } from '@app/(header)/page'
import RouteHeader from '@components/mypage/RouteHeader'
import RouteText from '@components/mypage/RouteText'
import SettlementTable from '@components/mypage/settlement/SettlementTable'
import Loading from '@components/ui/Loading'
import { URL } from '@lib/constants/routes'
import { useAuthData } from '@lib/hooks/useAuthData'
import { cn } from '@lib/utils/utils'

interface SettlementPageProps {}

const SettlementPage = ({}: SettlementPageProps): ReactNode => {
  const { nickname } = useAuthData()

  /** TODO(Auth): 로그인 되어있지 않으면 로그인 페이지로 리다이렉트 */
  return (
    <>
      <RouteHeader route={URL.MYPAGE.SETTLEMENT.value} className='w-full border-b border-solid border-rcLightGray' />
      <RouteText content={`${nickname}님이 참여하신 밥팟의 정산현황입니다!`} className={cn(mypageLayoutStyle, 'my-6')} />
      <Suspense fallback={<Loading />}>
        <SettlementTable className={cn(mypageLayoutStyle)} />
      </Suspense>
    </>
  )
}

export default SettlementPage
