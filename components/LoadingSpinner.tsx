
type LoadingSpinnerProps = {
    message:string
}

const LoadingSpinner = ({message} : LoadingSpinnerProps) => {
  return (
    <div className="flex justify-center items-center min-h-[50vh] text-lg font-semibold text-muted-foreground">
    {message}
  </div>
  )
}

export default LoadingSpinner