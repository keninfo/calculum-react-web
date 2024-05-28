type AlertProps = {
  alert: string
  className?: string
}

const ActionAlert = ({ alert, className }: AlertProps) => (
  <p className={`bg-carmesi px-[2vw] py-[1vh] rounded-lg mt-[4vh] mb-[2vh] ${className}`}>{alert}</p>
)

export default ActionAlert
