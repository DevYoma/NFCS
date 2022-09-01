import React from 'react'
import './Button.scss';

type ButtonProps = {
    children: React.ReactNode;
    buttonStyle?: React.CSSProperties; // marginTop and width of button.
    buttonType?: "button" | "submit" | "reset";
}

const Button = ({ children, buttonStyle, buttonType }: ButtonProps) => {
  return (
    <button id="button" type={buttonType} style={buttonStyle}>
        {children}
    </button>
  )
}

export default Button