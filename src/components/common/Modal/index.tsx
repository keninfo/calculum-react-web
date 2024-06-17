import type { ReactNode } from 'react'
import React, { useEffect, useRef, useState } from 'react'

type ModalProps = {
  children: (handleClose: () => void) => ReactNode
  closeMessage?: string
}

const Modal = ({ children, closeMessage }: ModalProps) => {
  const [open, setOpen] = useState(true)
  const modalRef = useRef<HTMLDivElement>(null)

  const handleClose = () => setOpen(false)

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleClose()
    }
  }

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (open) {
    return (
      <div className="fixed top-0 left-0 bg-smoke/90 w-screen h-screen z-50 flex items-center justify-center">
        <div
          ref={modalRef}
          className="relative bg-darkness w-[50vw] h-[80vh] z-40 px-[3vw] py-[5vh] drop-shadow-xl flex flex-col items-center justify-center"
        >
          <button onClick={handleClose} className="absolute top-[3vh] right-[3vh]">
            {closeMessage ? closeMessage : 'X'}
          </button>
          {typeof children === 'function' ? children(handleClose) : children}
        </div>
      </div>
    )
  }

  return null
}

export default Modal
