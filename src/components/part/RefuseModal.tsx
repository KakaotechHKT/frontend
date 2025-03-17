import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

import Backdrop from '@components/common/Backdrop'
import { Button } from '@components/ui/button'
import { URL } from '@lib/constants/routes'
import LogoImage from '@public/images/logo.svg'
import PartExampleImage from '@public/images/part_example.svg'

interface RefuseModalProps {
  isOpen: boolean
  text: string
}

const RefuseModal = ({ isOpen, text }: RefuseModalProps): ReactNode => {
  return (
    isOpen && (
      <>
        <Backdrop />
        <div className='fixed left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-start gap-4 rounded-lg bg-rcWhite px-8 py-4'>
          <div className='text-ㅣㅎxl flex items-center justify-start gap-4 self-start py-4 font-dohyeon'>
            <Image alt='밥팟 로고' src={LogoImage} className='w-6' />
            밥팟
          </div>

          <Image alt='밥팟 생성 페이지' src={PartExampleImage} />
          <div className='font-dohyeon text-lg'>{text}</div>

          <Button variant={'rcKakaoYellow'} className='w-3/4'>
            <Link href={URL.MAIN.INDEX.value}>메인화면 가기</Link>
          </Button>
        </div>
      </>
    )
  )
}

export default RefuseModal
