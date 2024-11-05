import type { ReactNode } from 'react'
import React, { useEffect, useRef, useState } from 'react'

type ModalProps = {
  children: ReactNode
  closeMessage?: string
  onClose: () => void
}

const Modal = ({ children, closeMessage, onClose }: ModalProps) => {
  const [open, setOpen] = useState(true)
  const modalRef = useRef<HTMLDivElement>(null)

  const handleClose = () => {
    setOpen(false)
    onClose()
  }

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
      <div className="| bg-eerie/80 fixed left-0 top-0 z-50 flex h-screen w-screen items-end justify-center md:items-center">
        <div ref={modalRef} className="z-40 w-full rounded-xl bg-eerie drop-shadow-xl md:h-fit md:w-[50vw]">
          <button
            onClick={handleClose}
            className="absolute -top-[8vh] left-1/2 z-50 -translate-x-1/2 translate-y-[4vh] font-bold text-[#ffffff]"
          >
            {closeMessage ? closeMessage : 'CLOSE'}
          </button>
          {children}
        </div>
      </div>
    )
  }

  return null
}

export default Modal
