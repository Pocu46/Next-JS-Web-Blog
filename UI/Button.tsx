import Link from "next/link";
import React from "react";

type ButtonProps = {
  text: string;
  style: string;
  onClick?: () => void;
  link?: string;
  isButton?: boolean;
};
const Button: React.FC<ButtonProps> = ({text, style, onClick, link, isButton}) => {

  if(isButton) {
    return <button className={style}>{text}</button>
  }

  return(
    <Link className={style} onClick={onClick} href={link}>{text}</Link>
  )
}

export default Button;