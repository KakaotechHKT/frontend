import Image from 'next/image'
import { ReactNode } from 'react'

import { Button } from '@components/ui/button'
import LogoImage from '@public/images/logo.svg'

interface AIChatButtonFrameProps {
  content: string
  clickHandler?: () => void
  children?: ReactNode
}

const AIChatButtonFrame = ({ content, clickHandler, children }: AIChatButtonFrameProps): ReactNode => {
  return (
    <div className='justify-starts flex flex-col items-start'>
      <div className='grid grid-cols-[auto,1fr] grid-rows-[auto,auto] items-center gap-2 py-2'>
        <div className='col-start-2 row-start-1 text-xs font-semibold'>밥팟 챗봇 AI</div>
        <Image alt='밥팟 로고' src={LogoImage} className='col-start-1 row-start-2 aspect-square w-6 self-start' />
        <div className='relative col-start-2 row-start-2 rounded-lg bg-gray-100 px-4 py-3 text-xs'>
          <div
            className='whitespace-pre-line leading-relaxed'
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
          <Button onClick={clickHandler} variant='rcGreen' className='mt-2 w-full font-pretendard text-xs font-medium'>
            키워드 재선택하기
          </Button>
        </div>
      </div>
      {children}
    </div>
  )
}

export default AIChatButtonFrame
