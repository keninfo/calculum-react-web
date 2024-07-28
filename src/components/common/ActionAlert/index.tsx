type AlertProps = {
  alert: string
  className?: string
}

const ActionAlert = ({ alert, className }: AlertProps) => (
  <p className={`text-carmesi py-[1vh] rounded-lg my-[2vh] ${className} text-center w-full`}>{alert}</p>
)

export default ActionAlert
