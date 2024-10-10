type AlertProps = {
  alert: string
  className?: string
}

const ActionAlert = ({ alert, className }: AlertProps) => (
  <p className={`my-[2vh] rounded-lg py-[1vh] text-carmesi ${className} w-full text-center`}>{alert}</p>
)

export default ActionAlert
