'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ReactNode, RefObject, useRef } from 'react'
import { useEscClose, useOutsideClick } from 'usehooks-jihostudy'

import { RouteType, URL } from '@lib/constants/routes'
import { useResponsiveStore } from '@lib/context/responsiveStore'
import { AuthDataType, useAuthData } from '@lib/hooks/useAuthData'
import useToggle from '@lib/hooks/useToggle'
import { LogoutType } from '@lib/HTTP/API/auth'
import { useMutationStore } from '@lib/HTTP/tanstack-query'
import LucideIcon from '@lib/provider/LucideIcon'
import { cn } from '@lib/utils/utils'
import { TrackTransformer, TrackType } from '@public/data/tracks'
import BabPulImage from '@public/images/babpul.svg'
import LogoImage from '@public/images/logo.svg'

import { KAKAO_CHANNEL_LINK } from './Footer'
import HeaderAlarm from './main/Alarm/HeaderAlarm'
import { Button } from './ui/button'

interface HeaderProps {
  className?: string
}

const Header = ({ className }: HeaderProps): ReactNode => {
  const { tn, sm, md, lg, xl, xll } = useResponsiveStore()
  const authData: AuthDataType = useAuthData()
  const { status: navbarStatus, toggleStatus: navbarToggleStatus } = useToggle()
  const { status: alarmStatus, toggleStatus: alarmToggleStatus } = useToggle(true)

  const isAuthenticated = authData.id !== 0

  let navContent
  if (tn || sm) {
    navContent = (
      <MobileNavBar
        authData={authData}
        navbarStatus={navbarStatus}
        navbarToggleStatus={navbarToggleStatus}
        alarmStatus={alarmStatus}
        alarmToggleStatus={alarmToggleStatus}
        isAuthenticated={isAuthenticated}
      />
    )
  } else {
    navContent = (
      <DesktopNavBar
        authData={authData}
        navbarStatus={navbarStatus}
        navbarToggleStatus={navbarToggleStatus}
        alarmStatus={alarmStatus}
        alarmToggleStatus={alarmToggleStatus}
        isAuthenticated={isAuthenticated}
      />
    )
  }

  return (
    <header className={cn(className, 'relative mx-auto flex items-center justify-between backdrop-blur-sm')}>
      <Link href={URL.MAIN.INDEX.value} className='flex h-full w-max max-w-xs items-center justify-start gap-6 font-dohyeon text-2xl'>
        <Image alt='밥팟 로고' src={LogoImage} />
        밥팟
      </Link>

      {navContent}
    </header>
  )
}

export default Header

interface MobileNavBarProps {
  authData: AuthDataType
  navbarStatus: boolean
  navbarToggleStatus: () => void
  alarmStatus: boolean
  alarmToggleStatus: () => void
  isAuthenticated: boolean
  className?: string
}

const MobileNavBar = ({
  authData,
  navbarStatus,
  navbarToggleStatus,
  alarmStatus,
  alarmToggleStatus,
  isAuthenticated,
  className,
}: MobileNavBarProps): ReactNode => {
  const { accessToken } = authData
  return (
    <nav className={cn('font-normal', className)}>
      <ul className='flex items-center justify-evenly gap-6 text-sm'>
        <li className='relative cursor-pointer'>
          <LucideIcon name='Bell' size={20} onClick={alarmToggleStatus} />
          {alarmStatus && <HeaderAlarm accessToken={accessToken} alarmStatus={alarmStatus} alarmToggleStatus={alarmToggleStatus} />}
        </li>
        <li className='relative cursor-pointer'>
          <LucideIcon name='AlignJustify' size={20} onClick={navbarToggleStatus} />
          {navbarStatus && (
            <MenuBar
              isAuthenticated={isAuthenticated}
              navbarStatus={navbarStatus}
              navbarToggleStatus={navbarToggleStatus}
              isDesktop={true}
            />
          )}
        </li>
      </ul>
    </nav>
  )
}

interface MenuBarProps {
  isAuthenticated: boolean
  navbarStatus: boolean
  navbarToggleStatus: () => void
  isDesktop: boolean
}

const MenuBar = ({ isAuthenticated, navbarStatus, navbarToggleStatus, isDesktop }: MenuBarProps): ReactNode => {
  const router = useRouter()
  const { id, name, nickname, track, accessToken } = useAuthData()
  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(ref as RefObject<HTMLElement>, navbarToggleStatus)
  useEscClose(navbarStatus, navbarToggleStatus)

  const { mutate: LogoutMutate, isPending } = useMutationStore<LogoutType>(['logout'])

  const logoutHandler = () => {
    LogoutMutate(
      {
        accessToken,
      },
      {
        /** TODO: 로그아웃시 메인페이지로 이동하는 로직 (메인페이지에서 로그아웃 시 제대로 안됨) */
        onSuccess(data, variables, context) {
          router.replace(URL.MAIN.INDEX.value)
          window.location.reload()

          sessionStorage.removeItem('authData')
          sessionStorage.removeItem('accessToken')

          navbarToggleStatus()
        },
      },
    )
  }

  return (
    <div
      ref={ref}
      className='absolute right-0 top-[120%] z-10 flex w-max flex-col items-center justify-start rounded-xl bg-rcWhite shadow-rc-shadow'
    >
      <LucideIcon onClick={navbarToggleStatus} name='X' className='absolute right-3 top-3' />
      <div className='relative my-8 flex w-full flex-col items-center justify-start gap-4 px-8'>
        {!isDesktop && (
          <div className={cn('flex w-full flex-col items-center justify-start gap-3')}>
            <Image src={BabPulImage} alt='character-image' width={30} height={50} />
            <span className='font-semibold'>
              {!isAuthenticated ? `만능개발자 밥풀` : `${nickname} (${name}) / ${TrackTransformer[track]}`}
            </span>
          </div>
        )}

        <Link href={URL.PART.INDEX.value} className='relative w-full'>
          <Button className={cn('w-full rounded-lg')} variant='rcKakaoYellow'>
            밥팟 만들기
          </Button>
        </Link>

        <Link
          onClick={navbarToggleStatus}
          href={URL.MAIN.INDEX.value}
          className='mt-3 flex w-full cursor-pointer items-center justify-between hover:text-rcBlue'
        >
          <span>밥팟 찾기</span>
          <LucideIcon name='ChevronRight' />
        </Link>
      </div>

      <div className='h-1 w-full bg-[#EBEBEB]' />

      <div className='relative my-8 flex w-full flex-col items-center justify-between gap-6 px-8'>
        <NavLink
          isAuthenticated={isAuthenticated}
          text={{
            authenticated: '마이페이지',
            unAuthenticated: '로그인',
          }}
          route={{
            authenticated: URL.MYPAGE.BABPART.value,
            unAuthenticated: URL.AUTH.LOGIN.value,
          }}
          onClick={navbarToggleStatus}
          className='w-full'
        />

        <NavLink
          isAuthenticated={isAuthenticated}
          text={{
            authenticated: '정산하기',
            unAuthenticated: '회원가입',
          }}
          route={{
            authenticated: URL.MYPAGE.SETTLEMENT.value,
            unAuthenticated: URL.AUTH.REGISTER.value,
          }}
          onClick={navbarToggleStatus}
          className='w-full'
        />
      </div>

      <div className='h-1 w-full bg-[#EBEBEB]' />

      <div className='relative my-8 flex w-full flex-col items-center justify-between gap-6 px-8'>
        <div onClick={navbarToggleStatus} className='flex w-full cursor-pointer items-center justify-between gap-2 hover:text-rcBlue'>
          <span>개인정보 처리방침</span>
          <LucideIcon name='ChevronRight' />
        </div>
        <Link
          onClick={navbarToggleStatus}
          href={KAKAO_CHANNEL_LINK}
          className='flex w-full cursor-pointer items-center justify-between gap-2 hover:text-rcBlue'
        >
          <span>문의하기</span>
          <LucideIcon name='ChevronRight' />
        </Link>

        {isAuthenticated && (
          <div onClick={logoutHandler} className='flex w-full cursor-pointer items-center justify-between gap-2 hover:text-rcRed'>
            <span>로그아웃</span>
            <LucideIcon name='ChevronRight' />
          </div>
        )}
      </div>
    </div>
  )
}

interface NavLinkProps {
  isAuthenticated: boolean
  text: {
    authenticated: string
    unAuthenticated: string
  }
  route: {
    authenticated: RouteType
    unAuthenticated: RouteType
  }
  onClick: () => void
  className?: string
}

const NavLink = ({ isAuthenticated, text, route, onClick, className }: NavLinkProps) => {
  return (
    <Link
      onClick={onClick}
      href={!isAuthenticated ? route.unAuthenticated : route.authenticated}
      className={cn('flex cursor-pointer items-center justify-between hover:text-rcBlue', className)}
    >
      <span>{!isAuthenticated ? text.unAuthenticated : text.authenticated}</span>
      <LucideIcon name='ChevronRight' />
    </Link>
  )
}

interface DesktopNavBarProps {
  navbarStatus: boolean
  navbarToggleStatus: () => void
  alarmStatus: boolean
  alarmToggleStatus: () => void
  isAuthenticated: boolean
  authData: {
    id: number
    name: string
    nickname: string
    track: TrackType
  }
  className?: string
}

const DesktopNavBar = ({
  authData,
  navbarStatus,
  navbarToggleStatus,
  alarmStatus,
  alarmToggleStatus,
  isAuthenticated,
  className,
}: DesktopNavBarProps): ReactNode => {
  const { name, nickname, track } = authData

  const fullName = `${nickname} (${name}) / ${TrackTransformer[track]}`
  return (
    <nav className={cn('font-normal', className)}>
      <ul className='flex items-center justify-evenly gap-6 text-sm'>
        <li className={cn('cursor-pointer rounded-2xl bg-rcKakaoYellow px-4 py-2 font-semibold hover:bg-rcKakaoYellowHover')}>
          <Link href={URL.PART.INDEX.value}>밥팟 만들기</Link>
        </li>
        {isAuthenticated ? (
          <li>
            <LucideIcon name='Bell' size={20} />
          </li>
        ) : (
          <Link href={URL.AUTH.LOGIN.value}>로그인</Link>
        )}
        {isAuthenticated ? (
          <li onClick={navbarToggleStatus} className='relative flex cursor-pointer flex-col items-center gap-1'>
            <Image src={BabPulImage} alt='character-image' width={30} height={50} />
            <span className='text-xs'>{fullName}</span>
          </li>
        ) : (
          <Link href={URL.AUTH.REGISTER.value}>회원가입</Link>
        )}
        {navbarStatus && (
          <MenuBar isAuthenticated={isAuthenticated} navbarStatus={navbarStatus} navbarToggleStatus={navbarToggleStatus} isDesktop={true} />
        )}
      </ul>
    </nav>
  )
}
