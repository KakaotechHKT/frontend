import LogoImage from '@public/images/logo.png'
import Image from 'next/image'
import { ReactNode } from 'react'

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

interface PlaceListProps {}

const PlaceList = ({}: PlaceListProps): ReactNode => {
  return (
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
  )
}

export default PlaceList
