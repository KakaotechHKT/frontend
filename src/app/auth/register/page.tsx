'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

import Introduce from '@components/auth/Introduce'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select'
import { URL } from '@lib/constants/routes'
import useModal from '@lib/hooks/useModal'
import { DuplicateCheckType, RegisterType } from '@lib/HTTP/API/auth'
import { useMutationStore } from '@lib/HTTP/tanstack-query'
import LucideIcon from '@lib/provider/LucideIcon'
import { cn } from '@lib/utils/utils'

export type Track = 'FULLSTACK' | 'AI' | 'CLOUD'

type RegisterDTO = {
  id: string
  password: string
  nickname: string // 카테부 영어이름
  name: string // 실명
  track: Track | null
}

const RegisterPage = (): ReactNode => {
  const { isOpen, handleOpen, Modal } = useModal()

  const [step, setStep] = useState<number>(0)

  const [data, setData] = useState<RegisterDTO>({
    id: '',
    password: '',
    nickname: '',
    name: '',
    track: null, // 기본값
  })

  useEffect(() => {
    console.log(data)
  }, [data])

  // formData 일부를 업데이트하는 헬퍼 함수
  const updateData = (partial: Partial<RegisterDTO>) => {
    setData(prev => ({ ...prev, ...partial }))
  }

  return (
    <>
      <Introduce className='flex flex-col items-center justify-start gap-6' />

      {step === 0 ? (
        <RegisterStep data={data} updateData={updateData} onNextStep={() => setStep(1)} />
      ) : (
        <KTBInfoStep data={data} updateData={updateData} />
      )}
      <Modal />
    </>
  )
}

export default RegisterPage

interface RegisterPageProps {
  data: RegisterDTO
  onNextStep: () => void
  updateData: (partial: Partial<RegisterDTO>) => void
}
const RegisterStep = ({ data, onNextStep, updateData }: RegisterPageProps) => {
  const [duplicateChecked, setDuplicatedChecked] = useState<boolean>(false)
  // 중보검사 함수
  const { mutate: DuplicateCheckMutate, isPending } = useMutationStore<DuplicateCheckType>(['check_IDDuplicate'])

  const duplicateHandler = () => {
    // TODO: 에러 핸들링 UI 필요
    if (data.id.length === 0) {
      alert('아이디 길이가 0이어서 안됨')
      return
    }
    DuplicateCheckMutate(
      {
        id: data.id,
      },
      {
        onSuccess(data, variables, context) {
          alert('중복 검사 성공')

          setDuplicatedChecked(true)
        },
      },
    )
  }
  return (
    <div className='mt-8 flex w-[70%] max-w-sm flex-col items-center justify-start gap-4 rounded-xl bg-rcWhite pb-4 pt-8'>
      <h1 className='self-start px-12 font-dohyeon text-xl'>회원가입 (1/2)</h1>

      <div className='relative flex w-full flex-col items-start justify-start gap-3 px-12'>
        <div className='relative flex w-full items-center justify-between gap-2'>
          <Input
            type='text'
            placeholder='아이디'
            className={cn(duplicateChecked && 'border-rcBlue', 'rounded-md')}
            value={data.id}
            onChange={e => updateData({ id: e.target.value })}
          />
          <Button onClick={duplicateHandler} variant='rcKakaoYellow' className='h-full'>
            중복 검사
          </Button>
        </div>
        <div className='relative h-11 w-full rounded-md'>
          <Input
            type='password'
            placeholder='비밀번호 (10자리 이상)'
            className='h-full w-full'
            value={data.password}
            onChange={e => updateData({ password: e.target.value })}
          />
          <LucideIcon name='EyeOff' className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-rcDarkGray' />
        </div>

        <div className='relative h-11 w-full rounded-md'>
          <Input type='password' placeholder='비밀번호 확인' className='h-full w-full' />
          <LucideIcon name='EyeOff' className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-rcDarkGray' />
        </div>

        <Button variant='rcKakaoYellow' className='my-1 w-full' onClick={onNextStep}>
          다음 단계
        </Button>
      </div>

      <div className='h-[1px] w-full bg-rcGray' />

      <div className='flex items-center justify-center gap-6 text-xs'>
        <span className='text-rcGray'>이미 회원이신가요?</span>
        <Link href={URL.AUTH.LOGIN.value} className='text-rcKakaoYellow hover:text-rcKakaoYellowHover'>
          로그인
        </Link>
      </div>
    </div>
  )
}

interface KTBInfoStepProps {
  className?: string
  data: RegisterDTO
  updateData: (partial: Partial<RegisterDTO>) => void
}

const KTBInfoStep = ({ className, data, updateData }: KTBInfoStepProps) => {
  const router = useRouter()

  const selectHandler = (track: Track) => {
    updateData({ track: track })
  }

  const { mutate: RegisterMutate, isPending } = useMutationStore<RegisterType>(['register'])
  // Functions
  const registerHandler = () => {
    const { id, name, nickname, password, track } = data
    if (!track) {
      alert('트랙을 선택하세요')
      return
    }
    RegisterMutate(
      { id, password, nickname, name, track },
      {
        onSuccess(data, variables, context) {
          alert('회원가입 성공')
          router.push(URL.AUTH.LOGIN.value)
        },
      },
    )
  }
  return (
    <div className='mt-8 flex w-1/2 max-w-sm flex-col items-center justify-start gap-4 rounded-xl bg-rcWhite pb-4 pt-8'>
      <h1 className='flex w-full flex-col items-start justify-start self-start px-12 font-dohyeon text-xl'>
        <span>카테부 정보 입력</span>
        <span className='w-full font-pretendard text-[10px] font-light'>
          * <u>개인 식별</u>을 위해서 개인정보를 수집하고 있습니다.
        </span>
      </h1>

      <div className='relative flex w-full flex-col items-start justify-start gap-3 px-12'>
        <Select onValueChange={selectHandler}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='과정 선택' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='FULLSTACK'>풀스택</SelectItem>
              <SelectItem value='AI'>AI</SelectItem>
              <SelectItem value='CLOUD'>클라우드</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className='relative h-11 w-full rounded-md'>
          <Input
            type='text'
            placeholder='영어 닉네임'
            className='h-full w-full'
            value={data.nickname}
            onChange={e => updateData({ nickname: e.target.value })}
          />
          <LucideIcon name='EyeOff' className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-rcDarkGray' />
        </div>

        <div className='relative h-11 w-full rounded-md'>
          <Input
            type='text'
            placeholder='실명'
            className='h-full w-full'
            value={data.name}
            onChange={e => updateData({ name: e.target.value })}
          />
          <LucideIcon name='EyeOff' className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-rcDarkGray' />
        </div>

        <Button variant='rcKakaoYellow' className='my-1 w-full' onClick={registerHandler}>
          회원가입하기
        </Button>
      </div>

      <div className='h-[1px] w-full bg-rcGray' />

      <div className='flex items-center justify-center gap-6 text-xs'>
        <span className='text-rcGray'>이미 회원이신가요?</span>
        <Link href={URL.AUTH.LOGIN.value} className='text-rcKakaoYellow hover:text-rcKakaoYellowHover'>
          로그인
        </Link>
      </div>
    </div>
  )
}
