import { useLockBodyScroll } from '@uidotdev/usehooks'

import type { ReactNode } from 'react'
import React, { useEffect, useRef, useState } from 'react'

import { createPortal } from 'react-dom'

/** * Properties for the `Modal` component. */
type ModalProps = {
  /** * The content to be displayed inside the modal. */
  children: ReactNode

  /** * Optional close message for the button. */
  closeMessage?: string

  /** * Callback function to handle closing the modal. */
  onClose: () => void
}

/**
 * A modal component that displays content in a pop-up overlay.
 *
 * @remarks
 * The modal can be closed by clicking outside or pressing the close button.
 *
 * @param children - The content to be displayed inside the modal.
 * @param closeMessage - Optional custom message for the close button (defaults to "CLOSE").
 * @param onClose - Callback function to execute when the modal is closed.
 * @returns The modal component with overlay and content.
 */
const Modal = ({ children, closeMessage, onClose }: ModalProps) => {
  const [open, setOpen] = useState(true)
  const modalRef = useRef<HTMLDivElement>(null)
  useLockBodyScroll()

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
    return createPortal(
      <div
        className="fixed left-0 top-0 z-50 flex h-screen w-screen items-end justify-center md:items-center"
        style={{ zIndex: 999999 }}
      >
        <div className="fixed left-0 top-0 z-40 h-screen w-screen bg-dark opacity-80"></div>
        <div ref={modalRef} className="z-40 w-full rounded-xl bg-eerie drop-shadow-xl md:h-fit md:w-[70vw]">
          <button
            onClick={handleClose}
            className="absolute -top-[8vh] left-1/2 z-50 -translate-x-1/2 translate-y-[4vh] font-bold text-offWhite"
          >
            {closeMessage || 'CLOSE'}
          </button>
          {children}
        </div>
      </div>,
      document.body, // Render at the top level of the DOM
    )
  }

  return null
}

export default Modal
