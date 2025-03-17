'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'
import { toast } from 'sonner'

import Introduce from '@components/auth/Introduce'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import Loading from '@components/ui/Loading'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select'
import { URL } from '@lib/constants/routes'
import useModal from '@lib/hooks/useModal'
import { DuplicateCheckType, RegisterType } from '@lib/HTTP/API/auth'
import { useMutationStore } from '@lib/HTTP/tanstack-query'
import LucideIcon from '@lib/provider/LucideIcon'
import { TrackType } from '@lib/types/part/part'
import { cn } from '@lib/utils/utils'

type RegisterDTO = {
  id: string
  password: string
  nickname: string // 카테부 영어이름
  name: string // 실명
  track: TrackType | null
}

const RegisterPage = (): ReactNode => {
  const { isOpen, openModalHandler, Modal } = useModal()

  const [step, setStep] = useState<number>(0)

  const [data, setData] = useState<RegisterDTO>({
    id: '',
    password: '',
    nickname: '',
    name: '',
    track: null, // 기본값
  })

  // formData 일부를 업데이트하는 헬퍼 함수
  const updateData = (partial: Partial<RegisterDTO>) => {
    setData(prev => ({ ...prev, ...partial }))
  }

  return (
    <>
      <Introduce className='flex flex-col items-center justify-start gap-6' />

      {step === 0 ? (
        <RegisterStep data={data} updateData={updateData} navigateToNextStep={() => setStep(1)} />
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
  navigateToNextStep: () => void
  updateData: (partial: Partial<RegisterDTO>) => void
}
const RegisterStep = ({ data, navigateToNextStep, updateData }: RegisterPageProps) => {
  const [duplicateChecked, setDuplicatedChecked] = useState<boolean | undefined>()

  const [passwordConfirmValue, setPasswordConfirmValue] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false)

  /** 중복검사 API */
  const { mutate: DuplicateCheckMutate, isPending } = useMutationStore<DuplicateCheckType>(['check_IDDuplicate'])

  /** 아이디 유효성 검사 */
  const isValidIdInfo = validateId(data.id)
  const isValidPassword = validatePassword(data.password)
  const isValidPasswordConfirm = validatePasswordConfirm(data.password, passwordConfirmValue)

  const duplicateHandler = () => {
    if (!isValidIdInfo.valid) {
      toast('아이디 형식을 지켜주세요')
      return
    }

    DuplicateCheckMutate(
      {
        username: data.id,
      },
      {
        onSuccess(data, variables, context) {
          const content = data.data

          const { isOccupied } = content
          if (isOccupied) {
            toast.error('중복 검사 실패')
            setDuplicatedChecked(false)
          } else {
            toast('중복 검사 성공!')
            setDuplicatedChecked(true)
          }
        },
      },
    )
  }

  function validateId(username: string): { valid: boolean; message?: string } {
    // 길이 제한
    if (username.length === 0) {
      return { valid: false, message: '* 아이디를 입력해주세요' }
    }
    if (username.length < 5 || username.length > 15) {
      return { valid: false, message: '* 아이디는 5~15자 사이여야 합니다.' }
    }

    // 허용된 문자만 포함 (영문, 숫자, _, -)
    if (!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(username)) {
      return { valid: false, message: '* 아이디는 영문자로 시작하고, 영문, 숫자, _ , - 만 사용할 수 있습니다.' }
    }

    // 연속된 문자 제한 (3회 이상 같은 문자 반복 방지)
    if (/(.)\1\1/.test(username)) {
      return { valid: false, message: '* 같은 문자를 3번 이상 연속 사용할 수 없습니다.' }
    }

    // 금칙어 포함 여부 검사
    const restrictedWords = ['admin', 'root', 'master', 'test', 'system']
    if (restrictedWords.some(word => username.toLowerCase().includes(word))) {
      return { valid: false, message: '* 아이디에 금칙어를 포함할 수 없습니다.' }
    }

    return { valid: true }
  }
  function validatePassword(password: string, username?: string): { valid: boolean; message?: string } {
    // 길이 제한
    if (password.length < 10) {
      return { valid: false, message: '* 비밀번호는 최소 10자 이상이어야 합니다.' }
    }

    // 영문 소문자, 숫자, 특수문자 포함 여부 확인
    if (!/[a-z]/.test(password)) {
      return { valid: false, message: '* 비밀번호에는 최소 1개의 소문자가 포함되어야 합니다.' }
    }
    if (!/[0-9]/.test(password)) {
      return { valid: false, message: '* 비밀번호에는 최소 1개의 숫자가 포함되어야 합니다.' }
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return { valid: false, message: '* 비밀번호에는 최소 1개의 특수문자가 포함되어야 합니다.' }
    }

    // 연속된 문자 제한 (3회 이상 같은 문자 반복 방지)
    if (/(.)\1\1/.test(password)) {
      return { valid: false, message: '* 같은 문자를 3번 이상 연속 사용할 수 없습니다.' }
    }

    // 공백 포함 금지
    if (/\s/.test(password)) {
      return { valid: false, message: '* 비밀번호에는 공백을 포함할 수 없습니다.' }
    }

    // 아이디 포함 여부 검사
    if (username && password.toLowerCase().includes(username.toLowerCase())) {
      return { valid: false, message: '* 비밀번호에 아이디를 포함할 수 없습니다.' }
    }

    return { valid: true }
  }
  function validatePasswordConfirm(password: string, passwordConfirm: string): { valid: boolean; message?: string } {
    if (data.password.length !== 0 && passwordConfirm.length === 0) {
      return { valid: false, message: '* 비밀번호 확인을 입력해주세요.' }
    }

    if (password !== passwordConfirm) {
      return { valid: false, message: '* 비밀번호가 일치하지 않습니다.' }
    }

    return { valid: true }
  }

  const navigateToNextStepHandler = () => {
    if (!isValidIdInfo.valid) {
      toast('아이디 형식을 지켜주세요')
      return
    } else if (!isValidPassword.valid) {
      toast('비밀번호 형식을 지켜주세요')
      return
    } else if (!isValidPasswordConfirm.valid) {
      toast('비밀번호 확인을 확인해주세요')
      return
    } else if (!duplicateChecked) {
      toast('아이디 중복검사를 진행해주세요')
      return
    }
    navigateToNextStep()
  }

  return (
    <div className='mt-8 flex w-4/5 max-w-sm flex-col items-center justify-start gap-4 rounded-xl bg-rcWhite pb-4 pt-8'>
      <h1 className='self-start px-12 font-dohyeon text-xl'>회원가입</h1>

      <div className='relative flex w-full flex-col items-start justify-start gap-3 px-12'>
        <div className='flex w-full flex-col items-start justify-start gap-2'>
          <div className='relative flex w-full items-center justify-between gap-2'>
            <Input
              type='text'
              placeholder='아이디'
              className={cn(duplicateChecked !== undefined ? (duplicateChecked ? 'border-rcBlue' : 'border-rcRed') : '', 'rounded-md')}
              value={data.id}
              onChange={e => updateData({ id: e.target.value })}
            />
            {
              <Button onClick={duplicateHandler} variant='rcKakaoYellow' className='h-full w-24'>
                {!isPending ? '중복 검사' : <Loading />}
              </Button>
            }
          </div>
          <span className='pl-2 text-xss'>* 아이디는 카테부 영어 닉네임이 아닌,서비스 로그인에 사용됩니다.</span>

          {!isValidIdInfo.valid && <span className='ml-3 text-sm text-rcRed'>{isValidIdInfo.message}</span>}
        </div>
        <div className='flex w-full flex-col items-start justify-start gap-2'>
          <div className='relative h-11 w-full rounded-md'>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder='비밀번호 (10자리 이상)'
              className='h-full w-full'
              value={data.password}
              onChange={e => updateData({ password: e.target.value })}
            />
            <LucideIcon
              onClick={() => setShowPassword(prev => !prev)}
              name={showPassword ? 'Eye' : 'EyeOff'}
              className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-rcDarkGray'
            />
          </div>
          {!isValidPassword.valid && <span className='ml-3 text-sm text-rcRed'>{isValidPassword.message}</span>}
        </div>

        <div className='flex w-full flex-col items-start justify-start gap-2'>
          <div className='relative h-11 w-full rounded-md'>
            <Input
              type={showPasswordConfirm ? 'text' : 'password'}
              placeholder='비밀번호 확인'
              className='h-full w-full'
              value={passwordConfirmValue}
              onChange={e => setPasswordConfirmValue(e.target.value)}
            />
            <LucideIcon
              onClick={() => setShowPasswordConfirm(prev => !prev)}
              name={showPasswordConfirm ? 'Eye' : 'EyeOff'}
              className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-rcDarkGray'
            />
          </div>
          {!isValidPasswordConfirm.valid && <span className='ml-3 text-sm text-rcRed'>{isValidPasswordConfirm.message}</span>}
        </div>

        <Button variant='rcKakaoYellow' className='my-1 w-full' onClick={navigateToNextStepHandler}>
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

  const selectHandler = (track: TrackType) => {
    updateData({ track: track })
  }

  const { mutate: RegisterMutate, isPending } = useMutationStore<RegisterType>(['register'])
  // Functions
  const registerHandler = () => {
    const { id, name, nickname, password, track } = data
    if (!track) {
      toast.error('수강 트랙을 선택해주세요')
      return
    } else if (!nickname) {
      toast.error('카테부 영어 닉네임을 입력해주세요')
      return
    } else if (!name) {
      toast.error('실명을 입력해주세요')
      return
    }

    RegisterMutate(
      { id, password, nickname, name, track },
      {
        onSuccess(data, variables, context) {
          toast('회원가입 성공')
          router.push(URL.AUTH.LOGIN.value)
        },
      },
    )
  }
  return (
    <div className='mt-8 flex w-4/5 max-w-sm flex-col items-center justify-start gap-4 rounded-xl bg-rcWhite pb-4 pt-8 sm:w-1/2'>
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
          {/* <LucideIcon name='EyeOff' className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-rcDarkGray' /> */}
        </div>

        <div className='relative h-11 w-full rounded-md'>
          <Input
            type='text'
            placeholder='실명'
            className='h-full w-full'
            value={data.name}
            onChange={e => updateData({ name: e.target.value })}
          />
          {/* <LucideIcon name='EyeOff' className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-rcDarkGray' /> */}
        </div>

        <Button variant='rcKakaoYellow' className='my-1 w-full' onClick={registerHandler}>
          {!isPending ? '회원가입하기' : <Loading />}
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
