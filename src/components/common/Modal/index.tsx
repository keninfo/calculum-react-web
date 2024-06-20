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
      <div className="fixed top-0 left-0 bg-smoke/90 w-screen h-screen z-50 flex items-center justify-center">
        <div ref={modalRef} className="relative bg-darkness w-screen h-[80vh] z-40 drop-shadow-xl">
          <button onClick={handleClose} className="absolute -top-[5vh] left-1/2 -translate-x-1/2 font-bold">
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
