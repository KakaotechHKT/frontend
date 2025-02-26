'use client'
import { format } from 'date-fns'
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

import { PartDTO, Speed } from '@app/part/page'
import Backdrop from '@components/common/Backdrop'
import { DatePicker } from '@components/ui/DatePicker'
import { Input } from '@components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select'
import { TimePicker } from '@components/ui/timepicker/timepicker'
import LucideIcon from '@lib/provider/LucideIcon'
import { TrackTransformer } from '@public/data'

interface PartCreationModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  partData: PartDTO
  updatePartData: (partial: Partial<PartDTO>) => void
}

const PartCreationModal = ({ setIsModalOpen, partData, updatePartData }: PartCreationModalProps): ReactNode => {
  const { leader, placeName, placeId, date, time, headCount, comment, mealSpeed } = partData
  const [tmpTime, setTmpTime] = useState<Date>()
  const leaderName = `${leader.nickname} (${leader.name}) / ${TrackTransformer[leader.track]} `

  useEffect(() => {
    if (tmpTime) {
      updatePartData({ time: format(tmpTime, 'HH:mm') })
    }
  }, [tmpTime])

  // headCount
  const MAX_HEADCOUNT = 10
  const numbers = Array.from({ length: MAX_HEADCOUNT - 1 }, (_, i) => i + 2) // 2~8 생성
  const headCountHandler = (head: string) => {
    updatePartData({ headCount: Number(head) })
  }

  // comment
  const commentHandler = (comment: string) => {
    updatePartData({ comment: comment })
  }
  // speed
  const speedHandler = (speed: Speed) => {
    updatePartData({ mealSpeed: speed })
  }

  // 닫기
  const closeHandler = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <Backdrop />
      <div className='fixed left-1/2 top-1/2 z-30 flex min-w-72 -translate-x-1/2 -translate-y-1/2 flex-col items-start justify-between rounded-lg border border-solid border-black bg-rcWhite px-10 py-8'>
        <LucideIcon name='X' onClick={closeHandler} className='absolute right-4 top-4 cursor-pointer' size={20} />
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
          <Select onValueChange={headCountHandler}>
            <SelectTrigger className='w-[112px] text-xs'>
              <SelectValue placeholder='인원수 선택' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {numbers.map(num => (
                  <SelectItem key={num} value={String(num)}>
                    {num}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* 소개글 */}
          <Name name='소개글' isNotNull={true} />
          <Input onChange={e => commentHandler(e.target.value)} type='text' placeholder='한줄 짧은 소개글' className='h-9 w-4/5 text-xs' />
          {/* 식사 속도 */}
          <Name name='식사 속도' isNotNull={false} />
          <Select onValueChange={speedHandler}>
            <SelectTrigger className='w-[112px] text-xs'>
              <SelectValue placeholder='선호 식사속도' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='FAST'>빠르게</SelectItem>
                <SelectItem value='MIDDLE'>적당히</SelectItem>
                <SelectItem value='SLOW'>천천히</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
