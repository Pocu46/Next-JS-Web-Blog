
type WrapperComponentProps = {
  className?: string;
  children: React.ReactNode;
}

const WrapperComponent:React.FC<WrapperComponentProps> = ({className, children}) => {
  return (
    <div className={`w-[960px] mx-auto my-0 min-h-[calc(100vh_-_64px)] flex justify-center items-start ${className}`}>{children}</div>
  )
}

export default WrapperComponent;