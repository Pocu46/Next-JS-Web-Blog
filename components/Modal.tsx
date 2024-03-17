import React, {useEffect, useRef} from "react";
import ClientPortal from "@/components/ClientPortal";

type ModalProps = {
  children: React.ReactNode;
  style: string;
  open: boolean;
  onClose: () => void;
  root: string;
}

const Modal: React.FC<ModalProps> = ({children, style, open, onClose, root}) => {
  const dialogRef = useRef(null)

  const handleClickOutside = (event) => {
    const target = event.target.className

    if (target.includes('modal')) {
      dialogRef.current.close()
      document.removeEventListener('click', handleClickOutside)
    }
  }

  useEffect(() => {
    if(open) {
      dialogRef.current.showModal()
      document.addEventListener('click', handleClickOutside);
    }

    // return () => dialogRef.current?.close()
  }, [open])

  return (
    <ClientPortal show={open} root={root}>
      <dialog
        className={style}
        ref={dialogRef}
        onClose={onClose}
      >
        {children}
      </dialog>
    </ClientPortal>
  )
}

export default Modal;