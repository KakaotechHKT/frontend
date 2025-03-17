'use client'
import { ReactNode, useState } from 'react'

import Backdrop from '@components/common/Backdrop'
import { Checkbox } from '@components/ui/checkbox'
import { Label } from '@components/ui/label'
import { cn } from '@lib/utils/utils'

import { SettlementDTO } from './SettlementTable'

interface RequestSettlementModalProps {
  modalData: SettlementDTO | undefined
  className?: string
}

const RequestSettlementModal = ({ modalData, className }: RequestSettlementModalProps): ReactNode => {
  const [step, setStep] = useState<number>(1)

  const setNextStep = () => {
    setStep(2)
  }

  return (
    <>
      <Backdrop />
      <div
        className={cn(
          className,
          'fixed left-1/2 top-1/2 z-20 flex min-h-[550px] w-max -translate-x-1/2 -translate-y-1/2 flex-col items-start justify-start gap-2 rounded-2xl bg-rcWhite px-10 py-8 shadow-rc-shadow',
        )}
      >
        {step === 1 ? <RequirementStep setNextStep={setNextStep} /> : <InfoInputStep />}
      </div>
    </>
  )
}

export default RequestSettlementModal

type CheckListType = {
  paid: boolean
  noCancel: boolean
  responsibility: boolean
  consent: boolean
}
const RequirementStep = ({ setNextStep }: { setNextStep: () => void }) => {
  // 체크박스 상태 관리
  const [checkList, setCheckList] = useState<CheckListType>({
    paid: false,
    noCancel: false,
    responsibility: false,
    consent: false,
  })

  // 모든 체크박스가 선택되었는지 확인
  const allChecked = Object.values(checkList).every(Boolean)

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (key: keyof typeof checkList) => {
    setCheckList(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className='relative flex h-full flex-grow flex-col items-start justify-between gap-6'>
      <div className='flex flex-col items-start justify-start gap-4'>
        {/* 제목 */}
        <span className='text-2xl font-bold underline underline-offset-4'>정산요청 동의서</span>

        {/* 체크박스 리스트 */}
        <div className='flex flex-col gap-5 text-sm'>
          <label className='flex items-center gap-2'>
            <Checkbox checked={checkList.paid} onClick={() => handleCheckboxChange('paid')} />
            해당 밥팟에서 결제를 하셨습니까?
          </label>

          <label className='flex items-center gap-2 font-semibold text-red-500'>
            <Checkbox checked={checkList.noCancel} onClick={() => handleCheckboxChange('noCancel')} />
            정산요청 정보는 철회 및 수정할 수 없습니다.
          </label>

          <Label className='flex items-center gap-2'>
            <Checkbox checked={checkList.responsibility} onClick={() => handleCheckboxChange('responsibility')} />
            잘못된 계좌번호 입력으로 인한 책임은 본인에게 있습니다.
          </Label>

          <label className='flex items-center gap-2'>
            <Checkbox checked={checkList.consent} onClick={() => handleCheckboxChange('consent')} />
            사용자는 계좌정보, 실명 등 개인정보 수집에 동의합니다.
          </label>
        </div>
      </div>
      {/* ✅ 버튼을 하단으로 밀어내는 핵심 코드 */}
      {/* 다음 버튼 */}
      <button
        className={cn(
          'w-full rounded-lg py-3 text-lg font-bold transition-colors',
          allChecked ? 'bg-yellow-500 text-black' : 'cursor-not-allowed bg-gray-300 text-gray-500',
        )}
        disabled={!allChecked}
        onClick={setNextStep}
      >
        다음
      </button>
    </div>
  )
}

const InfoInputStep = () => {
  return <></>
}
