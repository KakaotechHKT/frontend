import { RefObject, useRef, useState } from 'react'
import { useEscClose, useOutsideClick } from 'usehooks-jihostudy'

import { Button } from '@components/ui/button'
import useScrollLock from '@lib/hooks/useScrollLock'
import { cn } from '@lib/utils/utils'

type ModalData = {
  type: 'info' | 'confirm'
  title: string
  details: string
}

const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalData, setModalData] = useState<ModalData>()
  const ref = useRef<HTMLDivElement>(null)

  const { lockScroll, unLockScroll } = useScrollLock()

  const handleOpen = (modalData: ModalData) => {
    setModalData(modalData)
    lockScroll()
    setIsOpen(true)
  }
  const handleClose = () => {
    unLockScroll()
    setIsOpen(false)
  }

  useOutsideClick(ref as RefObject<HTMLElement>, handleClose)
  useEscClose(isOpen, handleClose)

  interface ModalProps<F> {
    confirmCallback?: F
  }
  /**
   * Actual Modal Component to Use
   */
  const Modal = <F extends (...args: any[]) => any>({ confirmCallback }: ModalProps<F>) => {
    const onConfirm = () => {
      if (confirmCallback) {
        confirmCallback()
      }
      handleClose()
    }
    // 2문장으로 된 경우 <br/> 추가하기
    const formattedDetails = modalData ? modalData.details.replace(/\.(.+)/, '.<br/>$1') : ''
    return isOpen ? (
      <>
        {/* <Backdrop /> */}
        <div className='fixed left-1/2 top-1/2 z-30 flex min-w-72 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-between gap-5 rounded-md border-sm border-solid border-rcBlack bg-rcWhite px-4 py-4'>
          <h2 className='flex items-center justify-center font-pretendard text-lg font-semibold'>{modalData?.title}</h2>
          <span
            className={cn(modalData?.type === 'info' && 'text-rcRed', 'text-center text-xs')}
            dangerouslySetInnerHTML={{
              __html: formattedDetails,
            }}
          />
          <div className='flex w-full items-center justify-between gap-4'>
            {modalData?.type === 'confirm' && (
              <Button onClick={handleClose} variant='rcKakaoLightYellow' className='w-full'>
                취소
              </Button>
            )}
            <Button onClick={modalData?.type === 'confirm' ? onConfirm : handleClose} variant='rcKakaoYellow' className='w-full'>
              확인
            </Button>
          </div>
        </div>
      </>
    ) : (
      <></>
    )
  }
  return { isOpen, handleOpen, Modal }
}

export default useModal
