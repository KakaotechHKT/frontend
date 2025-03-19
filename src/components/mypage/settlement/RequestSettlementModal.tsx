'use client'
import { useRouter } from 'next/navigation'
import { ReactNode, RefObject, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEscClose, useOutsideClick } from 'usehooks-jihostudy'

import Backdrop from '@components/common/Backdrop'
import { Button } from '@components/ui/button'
import { Checkbox } from '@components/ui/checkbox'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import Loading from '@components/ui/Loading'
import { URL } from '@lib/constants/routes'
import { useAuthData } from '@lib/hooks/useAuthData'
import { RequestSettlementAlarmType } from '@lib/HTTP/API/mypage/settlement'
import { useMutationStore } from '@lib/HTTP/tanstack-query'
import LucideIcon from '@lib/provider/LucideIcon'
import { cn } from '@lib/utils/utils'

import { SettlementDTO } from './SettlementTable'

interface RequestSettlementModalProps {
  modalData: SettlementDTO | undefined
  requestModal: boolean
  closeRequestModalHandler: () => void
  className?: string
}

const RequestSettlementModal = ({
  modalData,
  requestModal,
  closeRequestModalHandler,
  className,
}: RequestSettlementModalProps): ReactNode => {
  const [step, setStep] = useState<number>(1)

  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(ref as RefObject<HTMLElement>, closeRequestModalHandler)
  useEscClose(requestModal, closeRequestModalHandler)

  const setNextStep = () => {
    setStep(2)
  }

  return (
    <>
      <Backdrop />
      <div
        ref={ref}
        className={cn(
          className,
          'fixed left-1/2 top-1/2 z-20 flex min-h-[550px] w-[450px] -translate-x-1/2 -translate-y-1/2 flex-col items-start justify-start gap-2 rounded-2xl bg-rcWhite px-12 py-8 shadow-rc-shadow',
        )}
      >
        <LucideIcon size={20} name='X' onClick={closeRequestModalHandler} className='absolute right-4 top-4' />
        {step === 1 ? <RequirementStep setNextStep={setNextStep} /> : <InfoInputStep data={modalData} />}
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

interface InfoInputStepProps {
  data: SettlementDTO | undefined
}
type InputDataType = {
  totalPrice: number
  perPrice: number
  accountNumber: string
  memberCount: number
  bankName: string
  accountHolder: string
}
const InfoInputStep = ({ data }: InfoInputStepProps) => {
  const { accessToken } = useAuthData()
  const router = useRouter()

  const { participants } = data as SettlementDTO
  const participantsCount = participants.length

  const [inputData, setInputData] = useState<InputDataType>({
    totalPrice: 0,
    perPrice: 0,
    accountNumber: '',
    memberCount: 0,
    bankName: '',
    accountHolder: '',
  })

  const handleChange = (key: keyof InputDataType, value: string | number) => {
    setInputData(prev => ({ ...prev, [key]: value }))
  }

  // 모든 체크박스가 선택되었는지 확인
  const allChecked = Object.values(inputData).every(elm => {
    if (typeof elm === 'number') {
      return elm !== 0
    } else if (typeof elm === 'string') {
      return elm !== ''
    }
  })

  const { mutate: RequestSettlementMutate, isPending: isSending } = useMutationStore<RequestSettlementAlarmType>(['settlement', 'request'])

  const requestSettlementHandler = () => {
    if (data) {
      const { babpatId } = data
      const { totalPrice, perPrice, memberCount, accountNumber, bankName, accountHolder } = inputData
      if (!totalPrice || !perPrice || !memberCount || !accountNumber || !bankName || !accountHolder) {
        toast.error('정산 정보를 모두 입력해주세요.')
        return
      }
      if (!accessToken) {
        toast.error('로그인 정보를 확인할 수 없습니다. 다시 로그인해주세요')
        router.push(URL.AUTH.LOGIN.value)
        return
      }
      RequestSettlementMutate(
        {
          babpatId,
          totalPrice,
          perPrice,
          memberCount,
          accountNumber,
          bankName,
          accountHolder,
          accessToken,
        },
        {
          onSuccess(data, variables, context) {
            window.location.reload()
          },
        },
      )
    }
  }
  return (
    <div className='relative flex h-full w-full flex-grow flex-col items-start justify-between gap-6'>
      <div className='flex w-full flex-col items-start justify-start gap-4'>
        {/* 제목 */}
        <span className='text-2xl font-bold underline underline-offset-4'>정산 요청 정보 입력</span>
        <span className='text-sm text-rcDarkGray'>* 정산하고자 하는정보를 입력 및 확인해주세요!</span>

        {/* 체크박스 리스트 */}
        <div className='grid w-full grid-cols-[auto,1fr] grid-rows-6 place-items-start gap-x-6 gap-y-3 text-sm'>
          {/* 금액 */}
          <span className='font-dohyeon text-xl'>금액</span>
          <Input
            onChange={e => handleChange('totalPrice', parseInt(e.target.value))}
            type='number'
            placeholder='정산할 금액'
            className='h-9 w-full text-xs'
          />
          {/* 인원수 */}
          <span className='font-dohyeon text-xl'>인원수</span>
          <Input
            onChange={e => handleChange('memberCount', parseInt(e.target.value))}
            type='number'
            placeholder='함께한 인원수'
            className='h-9 w-full text-xs'
          />
          {/* 1인당 금액 */}
          <span className='font-dohyeon text-xl'>1인당 금액</span>
          <Input
            onChange={e => handleChange('perPrice', parseInt(e.target.value))}
            type='number'
            placeholder='1인당 금액'
            className='h-9 w-full text-xs'
          />
          {/* 계좌번호 */}
          <span className='font-dohyeon text-xl'>계좌번호</span>
          <Input
            onChange={e => handleChange('accountNumber', e.target.value)}
            type='text'
            placeholder='계좌번호'
            className='h-9 w-full text-xs'
          />
          {/* 은행 */}
          <span className='font-dohyeon text-xl'>은행</span>
          <Input onChange={e => handleChange('bankName', e.target.value)} type='text' placeholder='은행' className='h-9 w-full text-xs' />
          {/* 예금주 */}
          <span className='font-dohyeon text-xl'>예금주</span>
          <Input
            onChange={e => handleChange('accountHolder', e.target.value)}
            type='text'
            placeholder='예금주'
            className='h-9 w-full text-xs'
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
        onClick={requestSettlementHandler}
      >
        {!isSending ? '정산 요청하기' : <Loading />}
      </Button>
    </div>
  )
}
