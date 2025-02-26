import Image from 'next/image'
import { ReactNode } from 'react'

import LogoImage from '@public/images/logo.svg'

interface AIChatFrameProps {
  content: string
  children?: ReactNode
}

const AIChatFrame = ({ content, children }: AIChatFrameProps): ReactNode => {
  return (
    <div className='justify-starts flex flex-col items-start'>
      <div className='grid grid-cols-[auto,1fr] grid-rows-[auto,auto] items-center gap-2 py-2'>
        <div className='col-start-2 row-start-1 text-xs font-semibold'>밥팟 챗봇 AI</div>
        <Image alt='밥팟 로고' src={LogoImage} className='col-start-1 row-start-2 aspect-square w-6 self-start' />
        <div
          className='col-start-2 row-start-2 whitespace-pre-line rounded-lg bg-gray-100 px-4 py-3 text-xs leading-relaxed'
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </div>
      {children}
    </div>
  )
}

export default AIChatFrame
