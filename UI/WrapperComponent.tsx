
type WrapperComponentProps = {
  style?: string;
  children: React.ReactNode;
}

const WrapperComponent:React.FC<WrapperComponentProps> = ({style, children}) => {
  return (
    <div className={style}>{children}</div>
  )
}

export default WrapperComponent;