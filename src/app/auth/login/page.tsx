'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'
import { toast } from 'sonner'

import Introduce from '@components/auth/Introduce'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import Loading from '@components/ui/Loading'
import { URL } from '@lib/constants/routes'
import { LoginType } from '@lib/HTTP/API/auth'
import { useMutationStore } from '@lib/HTTP/tanstack-query'
import LucideIcon from '@lib/provider/LucideIcon'

const LoginPage = (): ReactNode => {
  const router = useRouter()
  // States for storing user input
  const [id, setId] = useState('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [password, setPassword] = useState('')

  // Mutations
  const { mutate: LoginMutate, isPending } = useMutationStore<LoginType>(['login'])
  // Functions
  const loginHandler = () => {
    if (id.length === 0 || password.length === 0) {
      toast.error('아이디와 비밀번호를 입력해주세요.')

      return
    }

    LoginMutate(
      { id, password },
      {
        onSuccess(data, variables, context) {
          router.push(URL.MAIN.INDEX.value)
          // 로그인 정보를 SessionStorage에 저장
          const { authToken, ...authData } = data.data
          sessionStorage.setItem('authData', JSON.stringify(authData))
          sessionStorage.setItem('accessToken', authToken.accessToken)
        },
      },
    )
  }
  return (
    <>
      <Introduce className='flex flex-col items-center justify-start gap-6' />
      <div className='mt-8 flex w-1/2 max-w-sm flex-col items-center justify-start gap-4 rounded-xl bg-rcWhite pb-4 pt-8'>
        <h1 className='self-start px-12 font-dohyeon text-xl'>로그인</h1>

        <div className='relative flex w-full flex-col items-start justify-start gap-3 px-12'>
          <Input type='text' placeholder='아이디' className='rounded-md' value={id} onChange={e => setId(e.target.value)} />
          <div className='relative h-11 w-full rounded-md'>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder='비밀번호'
              className='h-full w-full'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <LucideIcon
              onClick={() => setShowPassword(prev => !prev)}
              name={showPassword ? 'Eye' : 'EyeOff'}
              className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-rcDarkGray'
            />
          </div>

          {!isPending ? (
            <Button onClick={loginHandler} variant='rcKakaoYellow' className='my-1 w-full'>
              로그인하기
            </Button>
          ) : (
            <Loading className='my-1 flex h-9 w-full items-center justify-center' />
          )}

          <div className='mb-3 mt-3 flex w-full items-center justify-end text-xs font-normal text-rcDarkGray'>
            <Link href={URL.AUTH.FIND_PASSWORD.value} className='cursor-pointer'>
              비밀번호 찾기
            </Link>
          </div>
        </div>

        <div className='h-[1px] w-full bg-rcGray' />

        <div className='flex items-center justify-center gap-6 text-xs'>
          <span className='text-rcGray'>아직 회원이 아니세요?</span>
          <Link href={URL.AUTH.REGISTER.value} className='text-rcKakaoYellow hover:text-rcKakaoYellowHover'>
            회원가입
          </Link>
        </div>
      </div>
    </>
  )
}

export default LoginPage
