'use client'

import { ReactNode, RefObject, useRef, useState } from 'react'
import { useEscClose, useOutsideClick } from 'usehooks-jihostudy'

import Backdrop from '@components/common/Backdrop'
import LucideIcon from '@lib/provider/LucideIcon'
import { cn } from '@lib/utils/utils'

import InfoInputStep from './InfoInputStep'
import RequirementStep from './RequirementStep'
import { RequestSettlementModalProps } from './types'

export const RequestSettlementModal = ({
  modalData,
  requestModal,
  closeRequestModalHandler,
  className,
}: RequestSettlementModalProps): ReactNode => {
  const [step, setStep] = useState<number>(1)
  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(ref as RefObject<HTMLElement>, closeRequestModalHandler)
  useEscClose(requestModal, closeRequestModalHandler)

  return (
    <>
      <Backdrop />
      <div
        ref={ref}
        className={cn(
          className,
          'fixed left-1/2 top-1/2 z-20 flex min-h-[550px] w-[450px] -translate-x-1/2 -translate-y-1/2 flex-col items-start justify-start gap-2 rounded-2xl bg-rcWhite px-12 py-8 shadow-rc-shadow',
        )}
      >
        <LucideIcon size={20} name='X' onClick={closeRequestModalHandler} className='absolute right-4 top-4' />
        {step === 1 ? <RequirementStep setNextStep={() => setStep(2)} /> : <InfoInputStep data={modalData} />}
      </div>
    </>
  )
}
