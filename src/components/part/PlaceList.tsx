import LogoImage from '@public/images/logo.svg'
import Image from 'next/image'
import { ReactNode } from 'react'

// TODO: 진짜 음식점 데이터 페칭해서 처리
const make_DUMMY_DATA = (id: number) => {
  return {
    id: id,
    name: '봉피양 판교점',
    mainCategory: '한식',
    subCategory: ['고기'],
    latitude: 37.4021235864699,
    longitude: 127.10858950934346,
    url: 'https://map.kakao.com/?q=%EB%B4%89%ED%94%BC%EC%96%91%20%ED%8C%90%EA%B5%90%EC%A0%90',
    menu: [
      {
        name: '평양냉면',
        price: '16000',
      },
      {
        name: '돼지목심본갈비(270g)',
        price: '36000',
      },
    ],
  }
}

const make_DUMMY_DATA2 = (id: number) => {
  return {
    id: id,
    name: '원조감자탕일미집 판교점',
    mainCategory: '한식',
    subCategory: ['감자탕'],
    latitude: 37.40209444163266,
    longitude: 127.109228804893,
    url: 'https://map.kakao.com/?q=%EC%9B%90%EC%A1%B0%EA%B0%90%EC%9E%90%ED%83%95%EC%9D%BC%EB%AF%B8%EC%A7%91%20%ED%8C%90%EA%B5%90%EC%A0%90',
    menu: [
      {
        name: '감자탕백반',
        price: '10000',
      },
      {
        name: '감자탕 - 소',
        price: '23000',
      },
    ],
  }
}

export const DUMMY_PLACE_DATA = Array.from(Array(20), (_, index) => {
  if (index % 2) {
    return make_DUMMY_DATA(index)
  } else {
    return make_DUMMY_DATA2(index)
  }
})

interface PlaceListProps {}

const PlaceList = ({}: PlaceListProps): ReactNode => {
  return (
    <ul className='relative flex w-full grow flex-col items-start justify-start overflow-y-auto overflow-x-hidden'>
      {DUMMY_PLACE_DATA.map((placeData, index) => (
        <li
          key={placeData.id}
          className='relative flex w-full cursor-pointer items-center justify-start gap-4 border-b-[1px] border-solid border-rcLightGray px-2 py-3'
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
                <li key={menu.name}>-{menu.name}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default PlaceList
