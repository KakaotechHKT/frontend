'use client'
import KakaoMap from '@components/common/KakaoMap'
import { URL } from '@lib/constants/routes'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

import { Input } from '@components/ui/input'
import LucideIcon from '@lib/icons/LucideIcon'
import { MainCategories } from '@public/data/keywords'
import LogoImage from '@public/images/logo.png'

// TODO: 진짜 음식점 데이터 페칭해서 처리
const make_DUMMY_DATA = (id: number) => {
  return {
    id,
    name: '판교테크노벨리점afsdfsadf12213 청년다방 ',
    menu: ['떡튀순 떡볶이', '차돌 떡볶이', '통큰오짱 떡볶이'],
    mainCategory: '분식',
    subCategory: ['떡볶이', '만원 이상'],
  }
}
const make_DUMMY_DATA2 = (id: number) => {
  return {
    id,
    name: '청년다방 판교테크노벨리점',
    menu: ['떡튀순 떡볶이', '차돌 떡볶이', '통큰오짱 떡볶이'],
    mainCategory: '분식',
    subCategory: ['떡볶이', '만원 이상'],
  }
}

const DUMMY_PLACE_DATA = Array.from(Array(20), (_, index) => {
  if (index % 2) {
    return make_DUMMY_DATA(index)
  } else {
    return make_DUMMY_DATA2(index)
  }
})

const PartPage = (): ReactNode => {
  return (
    <>
      {/* 선호 음식 */}
      <div className='relative flex h-screen w-1/4 flex-col items-start justify-start'>
        <Link href={URL.MAIN.INDEX.value} className='flex w-full max-w-xs items-center justify-start gap-6 px-8 py-4 font-dohyeon text-3xl'>
          <Image alt='밥팟 로고' src={LogoImage} className='w-12' />
          밥팟
        </Link>

        <div className='flex flex-col items-start justify-start gap-1 pl-8'>
          <span className='font-dohyeon text-2xl'>선호 음식</span>
          <span className='text-xss text-rcDarkGray'>* 선호 음식을 눌러 카테부 주변의 맛집을 추천 받아보세요!</span>

          <ul className='mb-2 grid w-full grid-cols-4 grid-rows-2 gap-2'>
            {MainCategories.map(category => (
              <li
                className='flex cursor-pointer items-center justify-center rounded-md border-[0.5px] border-solid border-rcGray px-1 py-2 text-[10px] font-semibold hover:bg-rcKakaoYellow'
                key={category}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        <div className='my-1 h-1 w-full bg-rcLightGray' />

        <ul className='relative flex w-full grow flex-col items-start justify-start overflow-y-auto overflow-x-hidden'>
          {DUMMY_PLACE_DATA.map(placeData => (
            <li
              key={placeData.id}
              className='relative flex w-full items-center justify-start gap-4 border-b-[1px] border-solid border-rcLightGray px-2 py-3'
            >
              <Image className='aspect-square w-[45%] shrink-0' src={LogoImage} alt='식당 이미지 ' />

              <div className='relative flex h-full grow flex-col items-start justify-start text-xs text-rcDarkGray'>
                <div className='w-full text-ellipsis whitespace-nowrap font-dohyeon text-sm text-rcBlue'>{placeData.name}</div>

                <div className='my-1 flex items-center justify-start gap-2 text-xss'>
                  <span># {placeData.mainCategory}</span>
                  {placeData.subCategory.map(cat => (
                    <span key={cat}># {cat}</span>
                  ))}
                </div>
                <span className='my-1 text-xs text-rcBlack'>대표메뉴</span>
                <ul className='flex flex-col items-start justify-start text-xss'>
                  {placeData.menu.map(menu => (
                    <li key={menu}>-{menu}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 채팅 */}
      <div className='relative flex h-screen w-1/4 flex-col items-center justify-between pb-3 pt-5'>
        <span className='flex w-full items-center justify-center font-dohyeon text-2xl'>밥팟 AI 챗봇</span>

        {/* 채팅내용 */}
        <div></div>
        <div className='flex w-[90%] items-center justify-between rounded-3xl border-sm border-solid border-rcBlack bg-rcLightGray pr-2'>
          <Input
            type='text'
            placeholder='메세지를 입력해주세요.'
            className='border-none text-xss shadow-none outline-none focus:outline-none focus-visible:ring-0'
          />
          <LucideIcon name='CircleArrowUp' size={30} strokeWidth={1} />
        </div>
      </div>

      {/* 카카오맵 */}
      <div className='h-screen grow'>
        <KakaoMap />
      </div>
    </>
  )
}

export default PartPage
