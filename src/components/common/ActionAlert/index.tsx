type AlertProps = {
  alert: string
  className?: string
}

const ActionAlert = ({ alert, className }: AlertProps) => (
  <p className={`text-carmesi py-[1vh] rounded-lg mb-[2vh] ${className} text-left`}>{alert}</p>
)

export default ActionAlert
