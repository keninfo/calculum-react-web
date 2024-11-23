type AlertProps = {
  alert: string
  className?: string
  closeAction?: () => void
}

const ActionAlert = ({ alert, className, closeAction }: AlertProps) => (
  <div
    className={`py-2 text-dark ${className} w-full bg-citron text-center text-xs ${closeAction ? '!cursor-pointer' : ''} flex items-center justify-between px-4`}
    onClick={closeAction}
  >
    <p> </p>
    <p>{alert}</p>
    <p>{closeAction ? 'x' : ''}</p>
  </div>
)

export default ActionAlert
