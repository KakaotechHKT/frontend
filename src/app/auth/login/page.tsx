'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'

import Introduce from '@components/auth/Introduce'
import { Button } from '@components/ui/button'
import { Checkbox } from '@components/ui/checkbox'
import { Input } from '@components/ui/input'
import Loading from '@components/ui/Loading'
import { URL } from '@lib/constants/routes'
import useModal from '@lib/hooks/useModal'
import { LoginType } from '@lib/HTTP/API/auth'
import { useMutationStore } from '@lib/HTTP/tanstack-query'
import LucideIcon from '@lib/provider/LucideIcon'

const LoginPage = (): ReactNode => {
  const router = useRouter()
  const { isOpen, handleOpen, Modal } = useModal()
  // States for storing user input
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  // Mutations
  const { mutate: LoginMutate, isPending } = useMutationStore<LoginType>(['login'])

  // Functions
  const loginHandler = () => {
    if (id.length === 0 || password.length === 0) {
      console.log('데이터가 충분하지 않습니다.')
      return
    }

    LoginMutate(
      { id, password },
      {
        onSuccess(data, variables, context) {
          router.push(URL.MAIN.INDEX.value)
          // 로그인 정보를 SessionStorage에 저장
          sessionStorage.setItem('auth', JSON.stringify(data.data))
        },
        onError(error, variables, context) {
          alert(error.message)
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
              type='password'
              placeholder='비밀번호'
              className='h-full w-full'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <LucideIcon name='EyeOff' className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-rcDarkGray' />
          </div>

          {!isPending ? (
            <Button onClick={loginHandler} variant='rcKakaoYellow' className='my-1 w-full'>
              로그인하기
            </Button>
          ) : (
            <Loading className='my-1 flex h-9 w-full items-center justify-center' />
          )}

          <div className='mb-3 mt-3 flex w-full items-center justify-between text-xs font-normal text-rcDarkGray'>
            <div className='flex cursor-pointer items-center justify-start gap-2'>
              <Checkbox id='login-state' defaultChecked={true} />
              <label htmlFor='login-state'>로그인 상태 유지</label>
            </div>

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
      <Modal />
    </>
  )
}

export default LoginPage
