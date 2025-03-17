import Link from 'next/link'
import { ReactNode } from 'react'

import { RouteType, URL } from '@lib/constants/routes'
import { cn } from '@lib/utils/utils'

interface RouteHeaderProps {
  route: RouteType
  className?: string
}

type RouteButtonType = {
  name: string
  route: RouteType
}

const ROUTE_BUTTONS: RouteButtonType[] = [
  {
    name: '내 밥팟',
    route: URL.MYPAGE.BABPART.value,
  },
  {
    name: '정산 요청하기',
    route: URL.MYPAGE.SETTLEMENT.value,
  },
  {
    name: '받은 정산 요청',
    route: URL.MYPAGE.REQUESTS.value,
  },
]

const RouteHeader = ({ route, className }: RouteHeaderProps): ReactNode => {
  const route_buttons = ROUTE_BUTTONS.map(route_button => (
    <Link
      href={route_button.route}
      className={cn(
        route === route_button.route
          ? 'border-b-2 border-solid border-rcKakaoYellow text-xl font-bold text-rcBlack'
          : 'text-lg text-rcDarkGray hover:text-rcBlack',
        'cursor-pointer pb-3 pt-6',
      )}
      key={route_button.route}
    >
      {route_button.name}
    </Link>
  ))
  return (
    <div className={cn(className, 'relative flex items-center justify-center')}>
      <div className='flex w-4/5 max-w-xl items-center justify-start gap-10 md:max-w-4xl lg:max-w-7xl'>{route_buttons}</div>
    </div>
  )
}

export default RouteHeader
