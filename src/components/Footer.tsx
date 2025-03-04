import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

import { cn } from '@lib/utils/utils'
import LogoImage from '@public/images/logo.svg'

interface FooterProps {
  className?: string
}

const Footer = ({ className }: FooterProps): ReactNode => {
  return (
    <footer className={cn('relative flex w-screen flex-col items-start justify-start gap-3 bg-rcChatGray px-8 py-6', className)}>
      <div className='flex w-full items-start justify-center gap-4 lg:justify-start'>
        <Image alt='밥팟 로고' src={LogoImage} width={65} height={65} className='w-12' />
        <div className='relative flex w-full flex-col items-start justify-start gap-1 text-xs'>
          <span className='text-swGrayDark w-full text-pretty text-center lg:text-left'>
            경기도 성남시 분당구 대왕판교로 660 유스페이스 1 A동 405호 카카오테크 부트캠프 교육장
          </span>
          <span className='text-swGrayDark w-full text-pretty text-center lg:text-left'>
            COPYRIGHT &copy; 주식(主食)회사 All Rights Reserved
          </span>
        </div>
      </div>

      <div className='flex w-full items-center justify-center gap-6 text-xs text-rcDarkGray lg:justify-start'>
        <Link className='cursor-pointer font-medium hover:text-rcBlack' target='_blank' href={''}>
          개인정보 처리방침
        </Link>
        <Link href={''} target='_blank' className='cursor-pointer font-medium hover:text-rcBlack'>
          문의하기
        </Link>
        {/* 
        TODO: 개인정보 처리방침 및 문의하기 페이지 만들어서 Link 달기 
        <Link href={앱 다운로드 링크}>앱 다운로드</Link>
        <Link href={개인정보 처리 방침 링크}>개인정보 처리방침</Link>
        <Link href={문의하기}>문의하기</Link> 
        */}
      </div>
    </footer>
  )
}
export default Footer
