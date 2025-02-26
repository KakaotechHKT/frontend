'use client'
import { URL } from '@lib/constants/routes'
import { cn } from '@lib/utils/utils'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

import { useAuthData } from '@lib/hooks/useAuthData'
import LogoImage from '@public/images/logo.svg'

export const LINKS = {
  NotAuthenticated: [URL.PART.INDEX, URL.AUTH.LOGIN, URL.AUTH.REGISTER],
  Authenticated: [URL.PART.INDEX, URL.AUTH.MYPAGE],
}

interface HeaderProps {
  className?: string
}

const Header = ({ className }: HeaderProps): ReactNode => {
  return (
    <header className={cn(className, 'relative mx-auto flex items-center justify-between px-8 backdrop-blur-sm')}>
      <Link href={URL.MAIN.INDEX.value} className='flex h-full w-max max-w-xs items-center justify-start gap-6 font-dohyeon text-2xl'>
        <Image alt='밥팟 로고' src={LogoImage} />
        밥팟
      </Link>

      <DesktopNavBar />
    </header>
  )
}

export default Header

interface DesktopNavBarProps {
  className?: string
}

const DesktopNavBar = ({ className }: DesktopNavBarProps): ReactNode => {
  const { id, name, nickname, track } = useAuthData()
  const links = !id ? LINKS.NotAuthenticated : LINKS.Authenticated
  return (
    <nav className={cn('font-normal', className)}>
      <ul className='flex items-center justify-evenly gap-6 text-sm'>
        {links.map((link, index) => (
          <li
            key={link.value}
            className={cn(
              'cursor-pointer',
              link.value === URL.PART.INDEX.value
                ? 'rounded-2xl bg-rcKakaoYellow px-4 py-2 font-semibold hover:bg-rcKakaoYellowHover'
                : 'hover:font-semibold',
            )}
          >
            <Link href={link.value}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
