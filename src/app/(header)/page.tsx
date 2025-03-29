import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

import PartCardList from '@components/main/PartCards/PartCardList'
import RecommendCardList from '@components/main/RecommendCardList'
import { Button } from '@components/ui/button'
import Loading from '@components/ui/Loading'
import { URL } from '@lib/constants/routes'
import { cn } from '@lib/utils/utils'
import SpoonImage from '@public/images/spoon.svg'

export default function Home() {
  const pageSize = `w-full px-8 sm:px-6 lg:px-8 max-w-xl md:max-w-4xl lg:max-w-7xl`
  return (
    <>
      <main className={cn('mx-auto mb-6 flex grow flex-col items-center justify-start gap-10 font-pretendard', pageSize)}>
        <video
          preload='metadata'
          src='https://oopy.lazyrockets.com/api/v2/notion/fileUrl?src=https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F38552da6-340d-42c1-a9a1-b181ff331f03%2F0a0dcb5e-97b6-46b1-936d-7ce51bc0c815%2FKTB_PC.mp4&amp;blockId=62cbf980-4a63-465c-9b11-d724edcafb6d#t=0.0001'
          autoPlay
          className='w-full rounded-xl md:w-3/4'
        />

        <section className='flex flex-col items-center justify-start gap-1 font-dohyeon text-xl sm:text-2xl xl:text-4xl'>
          <h1>카카오테크 부트캠프 예비 개발자</h1>
          <h1>여러분 환영합니다!</h1>
        </section>
        <section className='flex flex-col items-center justify-start gap-2 font-pretendard text-sm font-semibold xl:text-xl'>
          <h3>
            함께하는 밥자리 <span className='underline underline-offset-4'>밥팟</span>에서 새로운 인연을 만들어보세요!
          </h3>
        </section>

        <Link href={URL.PART.INDEX.value} className='relative h-14 w-64'>
          <Button className='h-full w-full rounded-lg text-lg' variant='rcKakaoYellow'>
            밥팟 만들기
          </Button>
        </Link>

        <section className='mb-7 mt-4 flex w-full flex-col items-center justify-start gap-[0.5px]'>
          <div className='relative flex items-center justify-between gap-3 font-dohyeon text-xl sm:text-2xl xl:text-3xl'>
            밥팟의 추천 장소
            <Image src={SpoonImage} alt='spoon-image' className='absolute -right-8' />
          </div>

          <span className='text-xss text-rcDarkGray lg:text-sm'>* 밥팟팀의 선호도를 기반으로 추천드려요!</span>
          <RecommendCardList className='my-6 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3' />
        </section>
        <Suspense fallback={<Loading className='w-full' />}>
          <PartCardList className='my-6 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4' />
        </Suspense>
      </main>
    </>
  )
}
