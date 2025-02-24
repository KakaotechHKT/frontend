import Introduce from '@components/auth/Introduce'
import { Button } from '@components/ui/button'
import { Checkbox } from '@components/ui/checkbox'
import { Input } from '@components/ui/input'
import { URL } from '@lib/constants/routes'
import LucideIcon from '@lib/icons/LucideIcon'
import Link from 'next/link'
import { ReactNode } from 'react'

const LoginPage = (): ReactNode => {
  return (
    <>
      <Introduce className='flex flex-col items-center justify-start gap-6' />
      <div className='mt-8 flex w-1/2 max-w-sm flex-col items-center justify-start gap-4 rounded-xl bg-rcWhite pb-4 pt-8'>
        <h1 className='self-start px-12 font-dohyeon text-xl'>로그인</h1>

        <div className='relative flex w-full flex-col items-start justify-start gap-3 px-12'>
          <Input type='text' placeholder='아이디' className='rounded-md' />
          <div className='relative h-11 w-full rounded-md'>
            <Input type='password' placeholder='비밀번호' className='h-full w-full' />
            <LucideIcon name='EyeOff' className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-rcDarkGray' />
          </div>

          <Button variant='rcKakaoYellow' className='my-1 w-full'>
            로그인하기
          </Button>

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
    </>
  )
}

export default LoginPage
