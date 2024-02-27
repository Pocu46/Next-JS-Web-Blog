import React, {LegacyRef, useRef} from "react";

type ModalProps = {
  style: string,
  children: React.ReactNode
}
const Modal: React.FC<ModalProps> = ({style, children}) => {
  const ref: LegacyRef<HTMLDialogElement> = useRef()

  return(
    <dialog className={style} ref={ref} >
      {children}
    </dialog>
  )
}

export default Modal;