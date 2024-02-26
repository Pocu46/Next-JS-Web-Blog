import Link from "next/link";
import React from "react";

type ButtonProps = {
  text: string;
  style: string;
  action?: () => void;
  link: string;
  isButton?: boolean;
};
const Button: React.FC<ButtonProps> = ({text, style, action, link, isButton}) => {

  const buttonClasses: string =`flex justify-center items-center w-[126px] h-[36px] rounded-[12px] mt-5 ${style}`

  if(isButton) {
    return <button className={buttonClasses} onClick={action}>{text}</button>
  }

  return(
    <Link className={buttonClasses} href={link}>{text}</Link>
  )
}

export default Button;