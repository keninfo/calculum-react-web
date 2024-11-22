type AlertProps = {
  alert: string
  className?: string
}

const ActionAlert = ({ alert, className }: AlertProps) => (
  <p className={`py-2 text-dark ${className} w-full bg-citron text-center text-xs`}>{alert}</p>
)

export default ActionAlert
