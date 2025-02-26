'use client'
import { TrackTransformer } from '@app/auth/register/page'
import { PartDTO } from '@app/part/page'
import { format } from 'date-fns'

import Backdrop from '@components/common/Backdrop'
import { DatePicker } from '@components/ui/DatePicker'
import { TimePicker } from '@components/ui/timepicker/timepicker'
import { ReactNode, useEffect, useState } from 'react'

interface PartCreationModalProps {
  partData: PartDTO
  updatePartData: (partial: Partial<PartDTO>) => void
}

const PartCreationModal = ({ partData, updatePartData }: PartCreationModalProps): ReactNode => {
  const { leader, placeName, placeId, date, time, headCount, comment, mealSpeed } = partData
  const [tmpTime, setTmpTime] = useState<Date>()
  const leaderName = `${leader.nickname} (${leader.name}) / ${TrackTransformer[leader.track]} `

  useEffect(() => {
    if (tmpTime) {
      updatePartData({ time: format(tmpTime, 'HH:mm') })
    }
  }, [tmpTime])

  return (
    <>
      <Backdrop />
      <div className='fixed left-1/2 top-1/2 z-30 flex min-w-72 -translate-x-1/2 -translate-y-1/2 flex-col items-start justify-between rounded-lg border border-solid border-black bg-rcWhite px-10 py-8'>
        <h1 className='font-dohyeon text-2xl underline underline-offset-4'>밥팟 상세 정보 입력</h1>
        <span className='mb-4 mt-1 text-xs text-rcDarkGray'>* 생성하고자 하는 밥팟의 정보를 입력 및 확인해주세요!</span>

        <div className='grid w-full grid-cols-[2fr,5fr] grid-rows-7 place-items-center gap-y-2'>
          {/* 대표자 */}

          <Name name='대표자' isNotNull={true} />
          <span className='text-sm text-rcGray'>{leaderName}</span>
          {/* 음식점 */}
          <Name name='음식점' isNotNull={true} />
          <span className='text-sm text-rcGray'>{placeName}</span>

          {/* 날짜 */}
          <Name name='날짜' isNotNull={true} />
          <DatePicker date={date} updatePartData={updatePartData} />

          {/* 시간 */}
          <Name name='시간' isNotNull={true} />
          <TimePicker date={tmpTime} setDate={setTmpTime} />

          {/* 인원수 */}
          <Name name='인원수' isNotNull={true} />
          <span className='text-sm'>{placeName}</span>
          {/* 소개글 */}
          <Name name='소개글' isNotNull={true} />
          <span className='text-sm'>{placeName}</span>
          {/* 식사 속도 */}
          <Name name='식사 속도' isNotNull={false} />
          <span className='text-sm'>{placeName}</span>
        </div>
      </div>
    </>
  )
}

export default PartCreationModal

const Name = ({ name, isNotNull }: { name: string; isNotNull: boolean }) => {
  return (
    <div className='relative'>
      <span className='font-dohyeon text-xl'>{name}</span>
      {isNotNull && <span className='absolute -right-2 -top-2 text-sm font-bold text-black'>*</span>}
    </div>
  )
}
