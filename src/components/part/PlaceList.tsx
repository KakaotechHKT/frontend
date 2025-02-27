import Image from 'next/image'
import { Dispatch, ReactNode, SetStateAction } from 'react'

import { Geo, PartDTO, placeDTO } from '@app/part/page'
import { Button } from '@components/ui/button'
import { cn } from '@lib/utils/utils'
import LogoImage from '@public/images/logo.svg'

// const make_DUMMY_DATA = (id: number) => {
//   return {
//     id: id,
//     name: '봉피양 판교점',
//     mainCategory: '한식',
//     subCategory: ['고기'],
//     latitude: 37.4021235864699,
//     longitude: 127.10858950934346,
//     url: 'https://map.kakao.com/?q=%EB%B4%89%ED%94%BC%EC%96%91%20%ED%8C%90%EA%B5%90%EC%A0%90',
//     menu: [
//       {
//         name: '평양냉면',
//         price: '16000',
//       },
//       {
//         name: '돼지목심본갈비(270g)',
//         price: '36000',
//       },
//     ],
//   }
// }
// const make_DUMMY_DATA2 = (id: number) => {
//   return {
//     id: id,
//     name: '원조감자탕일미집 판교점',
//     mainCategory: '한식',
//     subCategory: ['감자탕'],
//     latitude: 37.40209444163266,
//     longitude: 127.109228804893,
//     url: 'https://map.kakao.com/?q=%EC%9B%90%EC%A1%B0%EA%B0%90%EC%9E%90%ED%83%95%EC%9D%BC%EB%AF%B8%EC%A7%91%20%ED%8C%90%EA%B5%90%EC%A0%90',
//     menu: [
//       {
//         name: '감자탕백반',
//         price: '10000',
//       },
//       {
//         name: '감자탕 - 소',
//         price: '23000',
//       },
//     ],
//   }
// }
// export const DUMMY_PLACE_DATA = Array.from(Array(20), (_, index) => {
//   if (index % 2) {
//     return make_DUMMY_DATA(index)
//   } else {
//     return make_DUMMY_DATA2(index)
//   }
// })

interface PlaceListProps {
  placeList: placeDTO[]

  centerHandler: (center: Geo) => void
  focusedPlaceId: number | undefined
  focusedPlaceIdHandler: (id: number) => void

  updatePartData: (partial: Partial<PartDTO>) => void
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

const PlaceList = ({
  placeList,
  centerHandler,
  focusedPlaceId,
  focusedPlaceIdHandler,
  updatePartData,
  setIsModalOpen,
}: PlaceListProps): ReactNode => {
  console.log(placeList)

  const placeClickHandler = (placeData: any) => {
    centerHandler({
      latitude: placeData.latitude,
      longitude: placeData.longitude,
    })
    focusedPlaceIdHandler(placeData.id)
  }

  // 밥맛 만들기 버튼 클릭시
  const selectPlaceHandler = (placeData: any) => {
    setIsModalOpen(true)

    updatePartData({ placeId: placeData.id, placeName: placeData.name })
  }
  return (
    <ul className='relative flex w-full grow flex-col items-start justify-start overflow-y-auto overflow-x-hidden'>
      {placeList.map((placeData, index) => {
        const subCategory = placeData.subCategory.split(', ')
        return (
          <li
            key={placeData.id}
            onClick={() => placeClickHandler(placeData)}
            className={cn(
              placeData.id === focusedPlaceId && 'bg-rcKakaoLightYellow',
              'relative flex w-full cursor-pointer items-center justify-start gap-4 border-b-[1px] border-solid border-rcLightGray px-2 py-3',
            )}
          >
            <Image className='aspect-square w-[45%] shrink-0' src={LogoImage} alt='식당 이미지 ' />

            <div className='relative flex h-full grow flex-col items-start justify-start text-xs text-rcDarkGray'>
              <div className='w-full text-ellipsis whitespace-nowrap font-dohyeon text-sm text-rcBlue'>{placeData.name}</div>

              <div className='my-1 flex items-center justify-start gap-2 text-xss'>
                <span># {placeData.mainCategory}</span>
                {subCategory.map(cat => (
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

            {placeData.id === focusedPlaceId && (
              <Button
                onClick={() => selectPlaceHandler(placeData)}
                variant='rcKakaoYellow'
                className='absolute bottom-2 right-1 px-2 py-1 font-dohyeon text-xs'
              >
                밥팟 만들기
              </Button>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default PlaceList
