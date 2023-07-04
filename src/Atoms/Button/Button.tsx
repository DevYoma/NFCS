import React from 'react'
import './Button.scss';

type ButtonProps = {
    children: React.ReactNode;
    buttonStyle?: React.CSSProperties; // marginTop and width of button.
    buttonType?: "button" | "submit" | "reset";
    route?: string;
    onClick?: VoidFunction;
}

const Button = ({ children, buttonStyle, buttonType, onClick }: ButtonProps) => {
  return (
    <button id="button" type={buttonType} style={buttonStyle} onClick={onClick}>
        {children}
    </button>
  )
}

export default Button