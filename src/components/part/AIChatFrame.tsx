import Image from 'next/image'
import { ReactNode } from 'react'

import Character from '@public/images/babpul.svg'

interface AIChatFrameProps {
  content: string
  children?: ReactNode
}

const AIChatFrame = ({ content, children }: AIChatFrameProps): ReactNode => {
  return (
    <div className='justify-starts flex flex-col items-start'>
      <div className='grid grid-cols-[auto,1fr] grid-rows-[auto,auto] items-center gap-2 py-2'>
        <div className='col-start-2 row-start-1 font-dohyeon text-xs'>밥봇</div>
        <Image alt='밥팟 로고' src={Character} className='col-start-1 row-start-2 aspect-square w-6 self-start' />
        <div className='col-start-2 row-start-2 flex flex-col items-start justify-start gap-2'>
          <div
            className='col-start-2 row-start-2 whitespace-pre-line rounded-lg bg-rcChatGray px-4 py-3 text-xs leading-relaxed'
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
          {children}
        </div>
      </div>
    </div>
  )
}

export default AIChatFrame
