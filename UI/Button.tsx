import Link from "next/link";
import React from "react";

type ButtonProps = {
  text: string;
  style?: string;
  action?: () => void;
  link: string;
  isButton?: boolean;
};
const Button: React.FC<ButtonProps> = ({text, style, action, link, isButton}) => {
  if(isButton) {
    return <button className={style} onClick={action}>{text}</button>
  }

  return(
    <Link className={style} href={link}>{text}</Link>
  )
}

export default Button;