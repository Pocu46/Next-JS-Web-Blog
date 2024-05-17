import React from "react";
import {createPortal} from "react-dom";

type ClientPortalType = {
  children: React.ReactNode;
  show?: boolean;
  onClose?: () => void | null;
  root: string;
};
const ClientPortal: React.FC<ClientPortalType> = ({children, show, root}) => {
  return show && createPortal(children, document.getElementById(root))
};
export default ClientPortal;