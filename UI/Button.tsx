import React from "react";
import Link from "next/link";

type ButtonProps = {
  text: string;
  style?: string;
  action?: () => void;
  link: string;
  isButton?: boolean;
  type?: "submit" | "reset" | "button" | undefined
};
const Button: React.FC<ButtonProps> = ({text, style, action, link, isButton, type}) => {
  if(isButton) {
    return <button className={style} onClick={action} type={type} >{text}</button>
  }

  return(
    <Link className={style} href={link}>{text}</Link>
  )
}

export default Button;