import Image from 'next/image'
import { Dispatch, ReactNode, SetStateAction } from 'react'

import { PartDTO, placeDTO } from '@app/part/page'
import { Button } from '@components/ui/button'
import { GeoType } from '@lib/types/part/part'
import { cn } from '@lib/utils/utils'

interface PlaceListProps {
  placeList: placeDTO[]

  centerHandler: (center: GeoType) => void
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
  // console.log(placeList)

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
              'group relative flex w-full cursor-pointer items-center justify-start gap-4 border-b-[1px] border-solid border-rcLightGray px-2 py-3',
            )}
          >
            <Image
              className='aspect-square w-[45%] shrink-0 rounded-xl group-hover:opacity-80'
              src={placeData.thumbnail}
              width={100}
              height={100}
              alt='식당 이미지 '
            />

            <div className='relative flex h-full grow flex-col items-start justify-start text-xs text-rcDarkGray'>
              <div className='w-full text-ellipsis whitespace-nowrap font-dohyeon text-sm text-rcBlue group-hover:text-rcBlueHover'>
                {placeData.name}
              </div>

              <div className='my-1 flex items-center justify-start gap-2 text-xss'>
                <span># {placeData.mainCategory}</span>
                {subCategory.map(cat => (
                  <span key={cat}># {cat}</span>
                ))}
              </div>
              <span className='my-1 text-xs text-rcBlack'>대표메뉴</span>
              <ul className='flex flex-col items-start justify-start text-xss'>
                {placeData.menu.slice(0, 3).map(menu => (
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
