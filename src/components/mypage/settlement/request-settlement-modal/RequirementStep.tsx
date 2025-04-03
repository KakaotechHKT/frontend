import { useState } from 'react'

import { Button } from '@components/ui/button'
import { cn } from '@lib/utils/utils'

import CheckboxItem from './CheckboxItem'
import { INITIAL_CHECK_LIST } from './constants'
import { CheckListType } from './types'

interface RequirementStepProps {
  setNextStep: () => void
}

const RequirementStep = ({ setNextStep }: RequirementStepProps) => {
  const [checkList, setCheckList] = useState<CheckListType>(INITIAL_CHECK_LIST)
  const allChecked = Object.values(checkList).every(Boolean)

  const handleCheckboxChange = (key: keyof CheckListType) => {
    setCheckList(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className='relative flex h-full flex-grow flex-col items-start justify-between gap-6'>
      <div className='flex flex-col items-start justify-start gap-4'>
        <span className='text-2xl font-bold underline underline-offset-4'>정산요청 동의서</span>
        <div className='flex flex-col gap-5 text-sm'>
          <CheckboxItem checked={checkList.paid} onChange={() => handleCheckboxChange('paid')} label='해당 밥팟에서 결제를 하셨습니까?' />
          <CheckboxItem
            checked={checkList.noCancel}
            onChange={() => handleCheckboxChange('noCancel')}
            label='정산요청 정보는 철회 및 수정할 수 없습니다.'
            className='font-semibold text-red-500'
          />
          <CheckboxItem
            checked={checkList.responsibility}
            onChange={() => handleCheckboxChange('responsibility')}
            label='잘못된 계좌번호 입력으로 인한 책임은 본인에게 있습니다.'
          />
          <CheckboxItem
            checked={checkList.consent}
            onChange={() => handleCheckboxChange('consent')}
            label='사용자는 계좌정보, 실명 등 개인정보 수집에 동의합니다.'
          />
        </div>
      </div>
      <Button
        className={cn(
          'w-full rounded-lg py-5 font-pretendard text-lg font-bold transition-colors',
          allChecked ? 'bg-rcKakaoYellow text-black' : 'cursor-not-allowed bg-rcGray text-rcDarkGray',
        )}
        variant='rcKakaoYellow'
        disabled={!allChecked}
        onClick={setNextStep}
      >
        다음
      </Button>
    </div>
  )
}

export default RequirementStep
