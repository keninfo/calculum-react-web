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
      <div className="fixed top-0 left-0 bg-black/80 w-screen h-screen z-50 flex items-end justify-center | md:items-center">
        <div ref={modalRef} className="bg-darkness w-[50vw] h-[90vh] z-40 drop-shadow-xl rounded-xl | md:h-fit">
          <button
            onClick={handleClose}
            className="absolute -top-0 translate-y-[4vh] left-1/2 -translate-x-1/2 font-bold z-50 text-[#ffffff] | md:-top-[8vh]"
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
