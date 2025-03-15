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
        <h1>밥팟을 만들거나 참여하여</h1>
        <h1>소중한 인연을 만들어보세요!</h1>
      </section>
    </div>
  )
}

export default Introduce
