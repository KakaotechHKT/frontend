'use client'

import Introduce from '@components/auth/Introduce'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select'
import { URL } from '@lib/constants/routes'
import useModal from '@lib/hooks/useModal'
import LucideIcon from '@lib/icons/LucideIcon'
import Link from 'next/link'
import { ReactNode, useState } from 'react'

const RegisterPage = (): ReactNode => {
  const { isOpen, handleOpen, Modal } = useModal()

  const [step, setStep] = useState<number>(0)

  // Functions
  // TODO: 회원가입 API 연동
  const registerHandler = () => {
    handleOpen({
      type: 'info',
      title: '카테부 정보 입력',
      details: '이미 존재하는 회원 정보입니다. 로그인을 이용해주세요.',
    })
  }
  return (
    <>
      <Introduce className='flex flex-col items-center justify-start gap-6' />

      {step === 0 ? <RegisterStep onNextStep={() => setStep(1)} /> : <KTBInfoStep registerHandler={registerHandler} />}
      <Modal />
    </>
  )
}

export default RegisterPage

interface RegisterPageProps {
  onNextStep: () => void
}
const RegisterStep = ({ onNextStep }: RegisterPageProps) => {
  return (
    <div className='mt-8 flex w-1/2 max-w-sm flex-col items-center justify-start gap-4 rounded-xl bg-rcWhite pb-4 pt-8'>
      <h1 className='self-start px-12 font-dohyeon text-xl'>회원가입 (1/2)</h1>

      <div className='relative flex w-full flex-col items-start justify-start gap-3 px-12'>
        <Input type='text' placeholder='아이디' className='rounded-md' />
        <div className='relative h-11 w-full rounded-md'>
          <Input type='password' placeholder='비밀번호 (10자리 이상)' className='h-full w-full' />
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
  registerHandler: () => void
}

const KTBInfoStep = ({ className, registerHandler }: KTBInfoStepProps) => {
  return (
    <div className='mt-8 flex w-1/2 max-w-sm flex-col items-center justify-start gap-4 rounded-xl bg-rcWhite pb-4 pt-8'>
      <h1 className='flex w-full flex-col items-start justify-start self-start px-12 font-dohyeon text-xl'>
        <span>카테부 정보 입력</span>
        <span className='w-full font-pretendard text-[10px] font-light'>
          * <u>개인 식별</u>을 위해서 개인정보를 수집하고 있습니다.
        </span>
      </h1>

      <div className='relative flex w-full flex-col items-start justify-start gap-3 px-12'>
        <Select>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='과정 선택' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='fullstack'>풀스택</SelectItem>
              <SelectItem value='ai'>AI</SelectItem>
              <SelectItem value='cloud'>클라우드</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className='relative h-11 w-full rounded-md'>
          <Input type='text' placeholder='영어 닉네임' className='h-full w-full' />
          <LucideIcon name='EyeOff' className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-rcDarkGray' />
        </div>

        <div className='relative h-11 w-full rounded-md'>
          <Input type='text' placeholder='실명' className='h-full w-full' />
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
