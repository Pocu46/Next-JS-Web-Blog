import React from "react";
import {createPortal} from "react-dom";

type ClientPortalType = {
  children: React.ReactNode;
  show?: boolean;
  onClose?: () => void | null;
  root: string;
};

const ClientPortal: React.FC<ClientPortalType> = ({ children, show, root }) => {
  const rootElement = document.getElementById(root);

//   if (!rootElement) {
//     return null;
//   }
//
//   return show ? createPortal(children, rootElement) : null;
// };

  if (rootElement) {
    return show && createPortal(children, rootElement)
  }
};

export default ClientPortal;