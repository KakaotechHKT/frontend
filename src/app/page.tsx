import Image from 'next/image'

import Footer from '@components/Footer'
import Header from '@components/Header'
import RecommendCardList from '@components/main/RecommendCardList'
import { cn } from '@lib/utils/utils'
import KTBMainImage from '@public/images/ktb_1.jpeg'
import SpoonImage from '@public/images/spoon.svg'

export default function Home() {
  const pageSize = `w-full px-4 lg:px-8 max-w-xl md:max-w-4xl lg:max-w-7xl`
  return (
    <>
      <Header className={cn('z-10 h-[12dvh]', pageSize)} />
      <main className={cn('mx-auto flex grow flex-col items-center justify-start gap-10 font-pretendard', pageSize)}>
        <Image src={KTBMainImage} alt='main-image' width={650} height={400} className='aspect-video w-full max-w-2xl rounded-lg' />
        <section className='flex flex-col items-center justify-start gap-4 font-dohyeon text-xl sm:text-2xl xl:text-4xl'>
          <h1>카카오테크 부트캠프 예비 개발자</h1>
          <h1>여러분 환영합니다!</h1>
        </section>
        <section className='flex flex-col items-center justify-start gap-2 font-pretendard text-sm font-semibold xl:text-xl'>
          <h3>
            함께하는 밥자리 <span className='underline underline-offset-4'>밥팟</span>에서 새로운 인연을 만들어보세요!
          </h3>
        </section>

        <section className='mb-7 flex w-full flex-col items-center justify-start gap-1'>
          <div className='relative flex items-center justify-between gap-3 font-dohyeon text-xl sm:text-2xl xl:text-3xl'>
            밥팟의 추천 장소
            <Image src={SpoonImage} alt='spoon-image' className='absolute -right-8' />
          </div>

          <span className='text-xss text-rcDarkGray lg:text-sm'>* 밥팟팀의 선호도를 기반으로 추천드려요!</span>
          <RecommendCardList className='my-6 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3' />
        </section>
        <section className='flex flex-col items-center justify-start gap-1'>
          <span className='font-dohyeon text-xl sm:text-2xl xl:text-3xl'>밥팟 참여하기</span>
          <span className='text-xss text-rcDarkGray lg:text-sm'>* 밥팟에 참여하여 많은 사람들과 식사를 함께하세요!</span>
          {/* <PartCardList className='my-6 w-full px-8' /> */}
        </section>
      </main>
      <Footer className='z-10 h-max w-full' />
    </>
  )
}
