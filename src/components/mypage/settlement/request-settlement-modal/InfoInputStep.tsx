import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@components/ui/button'
import Loading from '@components/ui/Loading'
import { URL } from '@lib/constants/routes'
import { useAuthData } from '@lib/hooks/useAuthData'
import { RequestSettlementAlarmType } from '@lib/HTTP/API/mypage/settlement'
import { useMutationStore } from '@lib/HTTP/tanstack-query'
import { cn } from '@lib/utils/utils'

import { SettlementDTO } from '../SettlementTable'
import { INITIAL_INPUT_DATA } from './constants'
import InputField from './InputField'
import { InputDataType } from './types'

interface InfoInputStepProps {
  data: SettlementDTO | undefined
}

const InfoInputStep = ({ data }: InfoInputStepProps) => {
  const { accessToken } = useAuthData()
  const router = useRouter()
  const [inputData, setInputData] = useState<InputDataType>(INITIAL_INPUT_DATA)
  const { mutate: RequestSettlementMutate, isPending: isSending } = useMutationStore<RequestSettlementAlarmType>(['settlement', 'request'])

  const handleChange = (key: keyof InputDataType, value: string | number) => {
    setInputData(prev => ({ ...prev, [key]: value }))
  }

  const allChecked = Object.values(inputData).every(elm => {
    if (typeof elm === 'number') return elm !== 0
    return elm !== ''
  })

  const requestSettlementHandler = () => {
    if (!data) return

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
        onSuccess: () => window.location.reload(),
      },
    )
  }

  return (
    <div className='relative flex h-full w-full flex-grow flex-col items-start justify-between gap-6'>
      <div className='flex w-full flex-col items-start justify-start gap-4'>
        <span className='text-2xl font-bold underline underline-offset-4'>정산 요청 정보 입력</span>
        <span className='text-sm text-rcDarkGray'>* 정산하고자 하는정보를 입력 및 확인해주세요!</span>

        <div className='grid w-full grid-cols-[auto,1fr] grid-rows-6 place-items-start gap-x-6 gap-y-3 text-sm'>
          <InputField label='금액' onChange={value => handleChange('totalPrice', parseInt(value))} placeholder='정산할 금액' />
          <InputField label='인원수' onChange={value => handleChange('memberCount', parseInt(value))} placeholder='함께한 인원수' />
          <InputField label='1인당 금액' onChange={value => handleChange('perPrice', parseInt(value))} placeholder='1인당 금액' />
          <InputField label='계좌번호' onChange={value => handleChange('accountNumber', value)} placeholder='계좌번호' />
          <InputField label='은행' onChange={value => handleChange('bankName', value)} placeholder='은행' />
          <InputField label='예금주' onChange={value => handleChange('accountHolder', value)} placeholder='예금주' />
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

export default InfoInputStep
