import React from 'react'
import LogoImg from '../../assets/NFCS.png'

type logoProp = {
  logoStyle?: React.CSSProperties;
}

const Logo = ({ logoStyle }: logoProp) => {
  return (
    <section style={logoStyle} id="logo">
        <img src={LogoImg} alt="Logo" />
    </section>
  )
}

export default Logo