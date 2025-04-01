'use client'
import Image from 'next/image'
import { ReactNode, useState } from 'react'

import { placeDTO } from '@app/(headerless)/part/page'
import { Button } from '@components/ui/button'
import useToggle from '@lib/hooks/useToggle'
import { GeoType, SpeedType } from '@lib/types/part/part'
import { cn } from '@lib/utils/utils'

import PartCreationModal from './PartCreationModal'

export type PartDTO = {
  placeName: string
  placeId: number
  date: Date
  time: string
  headCount: number
  comment: string
  mealSpeed: SpeedType
}

interface PlaceListProps {
  placeList: placeDTO[]

  centerHandler: (center: GeoType) => void
  focusedPlaceId: number | undefined
  focusedPlaceIdHandler: (id: number) => void
}
const INITIAL_PARTDATA: Partial<PartDTO> = {
  mealSpeed: 'MIDDLE',
}

const PlaceList = ({ placeList, centerHandler, focusedPlaceId, focusedPlaceIdHandler }: PlaceListProps): ReactNode => {
  const placeClickHandler = (placeData: any) => {
    centerHandler({
      latitude: placeData.latitude,
      longitude: placeData.longitude,
    })
    focusedPlaceIdHandler(placeData.id)
  }

  /** 밥팟 생성 모달 열렸는지 여부  */
  const { status: isModalOpen, toggleStatus: toggleModal } = useToggle()

  /** 관리할 밥팟 데이터 */
  const [partData, setPartData] = useState<Partial<PartDTO>>(INITIAL_PARTDATA)
  const updatePartData = (partial: Partial<PartDTO>) => {
    setPartData(prev => ({ ...prev, ...partial }))
  }

  /** 밥팟 만들기 버튼 클릭 */
  const selectPlaceHandler = (placeData: any) => {
    toggleModal()
    updatePartData({ placeId: placeData.id, placeName: placeData.name })
  }
  return (
    <>
      <ul className='relative flex w-full grow flex-col items-start justify-start overflow-y-auto overflow-x-hidden'>
        {placeList.map(placeData => {
          const { id, mainCategory, menu: menuArray, name, subCategory, thumbnail } = placeData
          const subCategoryArray = subCategory.split(', ')

          return (
            <li
              key={id}
              onClick={() => placeClickHandler(placeData)}
              className={cn(
                id === focusedPlaceId && 'bg-rcKakaoLightYellow',
                'group relative flex w-full cursor-pointer items-center justify-start gap-4 border-b-[1px] border-solid border-rcLightGray px-2 py-3',
              )}
            >
              <Image
                className='aspect-square w-[45%] shrink-0 rounded-xl group-hover:opacity-80'
                src={thumbnail}
                width={100}
                height={100}
                alt='식당 이미지'
              />

              <div className='relative flex h-full grow flex-col items-start justify-start text-xs text-rcDarkGray'>
                <div className='w-full text-ellipsis whitespace-nowrap font-dohyeon text-sm text-rcBlue group-hover:text-rcBlueHover'>
                  {name}
                </div>

                <div className='my-1 flex items-center justify-start gap-2 text-xss'>
                  <span># {mainCategory}</span>
                  {subCategoryArray.map(subCategory => (
                    <span key={subCategory}># {subCategory}</span>
                  ))}
                </div>
                <span className='my-1 text-xs text-rcBlack'>대표메뉴</span>
                <ul className='flex flex-col items-start justify-start text-xss'>
                  {menuArray.slice(0, 3).map(menu => (
                    <li key={menu.name}>-{menu.name}</li>
                  ))}
                </ul>
              </div>

              {id === focusedPlaceId && (
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
      {isModalOpen && <PartCreationModal toggleModal={toggleModal} partData={partData} updatePartData={updatePartData} />}
    </>
  )
}

export default PlaceList
