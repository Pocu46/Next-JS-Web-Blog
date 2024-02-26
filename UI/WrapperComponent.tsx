import {ReactNode} from "react";

type WrapperComponentProps = {
  className?: string;
  children: ReactNode;
}

const WrapperComponent:React.FC<WrapperComponentProps> = ({className, children}) => {
  return (
    <div className={`w-full mx-auto my-0 min-h-[calc(100vh_-_64px)] flex justify-center ${className}`}>{children}</div>
  )
}

export default WrapperComponent;