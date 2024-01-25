import {FC, LegacyRef, useRef} from "react";

const Modal: FC<string> = ({style, children}) => {
  const ref: LegacyRef<HTMLDialogElement> = useRef()

  return(
    <dialog className={style} ref={ref} >
      {children}
    </dialog>
  )
}

export default Modal;