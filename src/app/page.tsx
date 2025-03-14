import Image from 'next/image'

import Footer from '@components/Footer'
import Header from '@components/Header'
import SpoonImage from '@public/images/spoon.svg'
export default function Home() {
  return (
    <>
      <Header className='z-10 h-[12dvh] w-full max-w-xl md:max-w-4xl lg:max-w-7xl' />
      <main className='flex w-full max-w-xl grow flex-col items-center justify-start gap-10 font-pretendard md:max-w-4xl lg:max-w-7xl'>
        <video
          preload='metadata'
          src='https://oopy.lazyrockets.com/api/v2/notion/fileUrl?src=https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F38552da6-340d-42c1-a9a1-b181ff331f03%2F0a0dcb5e-97b6-46b1-936d-7ce51bc0c815%2FKTB_PC.mp4&amp;blockId=62cbf980-4a63-465c-9b11-d724edcafb6d#t=0.0001'
          autoPlay
          loop={true}
          className='aspect-video w-full max-w-2xl rounded-lg'
        />
        <section className='flex flex-col items-center justify-start gap-4 font-dohyeon text-4xl'>
          <h1>카카오테크 부트캠프 예비 개발자</h1>
          <h1>여러분 환영합니다!</h1>
        </section>
        <section className='flex flex-col items-center justify-start gap-2 font-pretendard text-xl font-semibold'>
          <h3>
            함께하는 밥자리 <span className='underline underline-offset-4'>밥팟</span>에서 새로운 인연을 만들어보세요!
          </h3>
        </section>

        <div className='mb-7 flex w-full flex-col items-center justify-start gap-1'>
          <span className='flex items-center justify-between gap-3 font-dohyeon text-2xl'>
            밥팟의 추천 장소 <Image src={SpoonImage} alt='spoon-image' />
          </span>
          <span className='text-xss text-rcDarkGray'>* 밥팟팀의 선호도를 기반으로 추천드려요!</span>
          {/* <RecommendCardList className='my-6' /> */}
        </div>
        <div className='flex flex-col items-center justify-start gap-1'>
          <span className='font-dohyeon text-2xl'>밥팟 참여하기</span>
          <span className='text-xss text-rcDarkGray'>* 밥팟에 참여하여 많은 사람들과 식사를 함께하세요!</span>
          {/* <PartCardList className='my-6' /> */}
        </div>
      </main>
      <Footer className='z-10 h-max w-full' />
    </>
  )
}
