'use client'
import { ReactNode } from 'react'

import RouteHeader from '@components/mypage/RouteHeader'
import RouteText from '@components/mypage/RouteText'
import { URL } from '@lib/constants/routes'
import { useAuthData } from '@lib/hooks/useAuthData'
import { cn } from '@lib/utils/utils'
import { mypageSize } from '@public/data'

interface RequestsPageProps {}

const RequestsPage = ({}: RequestsPageProps): ReactNode => {
  const { nickname } = useAuthData()

  return (
    <>
      <RouteHeader route={URL.MYPAGE.REQUESTS.value} className='w-full border-b border-solid border-rcLightGray' />
      <RouteText content={`${nickname}님이 받은 밥팟 정산 알림입니다!`} className={cn(mypageSize, 'my-6')} />
      <div className={cn(mypageSize, 'mt-10 w-full items-center justify-center text-center font-dohyeon text-2xl')}>
        서비스 준비중입니다...!
      </div>
    </>
  )
}

export default RequestsPage
