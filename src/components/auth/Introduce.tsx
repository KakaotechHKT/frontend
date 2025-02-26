import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

import { URL } from '@lib/constants/routes'
import { cn } from '@lib/utils/utils'
import LogoImage from '@public/images/logo.svg'

interface IntroduceProps {
  className?: string
}

const Introduce = ({ className }: IntroduceProps): ReactNode => {
  return (
    <div className={cn(className)}>
      <Link href={URL.MAIN.INDEX.value} className='flex h-full w-max max-w-xs items-center justify-start gap-6 font-dohyeon text-4xl'>
        <Image alt='밥팟 로고' src={LogoImage} />
        밥팟
      </Link>

      <section className='flex flex-col items-center justify-start gap-2 font-dohyeon text-2xl'>
        <h1>카카오테크 부트캠프 예비 개발자</h1>
        <h1>여러분 환영합니다!</h1>
      </section>
    </div>
  )
}

export default Introduce
