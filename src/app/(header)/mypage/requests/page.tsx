'use client'
import { ReactNode } from 'react'

import RouteHeader from '@components/mypage/RouteHeader'
import RouteText from '@components/mypage/RouteText'
import { URL } from '@lib/constants/routes'
import { useAuthData } from '@lib/hooks/useAuthData'
import { cn } from '@lib/utils/utils'

import { mypageLayoutStyle } from '../layout'

interface RequestsPageProps {}

const RequestsPage = ({}: RequestsPageProps): ReactNode => {
  /** TODO(Auth): 로그인 되어있지 않으면 로그인 페이지로 리다이렉트 */
  const { nickname } = useAuthData()
  return (
    <>
      <RouteHeader route={URL.MYPAGE.REQUESTS.value} className='w-full border-b border-solid border-rcLightGray' />
      <RouteText content={`${nickname}님이 받은 밥팟 정산 알림입니다!`} className={cn(mypageLayoutStyle, 'my-6')} />
      <div className={cn(mypageLayoutStyle, 'mt-10 w-full items-center justify-center text-center font-dohyeon text-2xl')}>
        서비스 준비중입니다...!
      </div>
    </>
  )
}

export default RequestsPage
