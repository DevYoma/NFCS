import React from 'react'
import './Logo.scss';
import LogoImg from '../../assets/NFCS-LOGO.png'

type logoProp = {
  logoStyle?: React.CSSProperties;
}

const Logo = ({ logoStyle }: logoProp) => {
  return (
    <section style={logoStyle} id="logo">
        <img src={LogoImg} alt="imgLogo" className="logo__firstImg" />
        <div>
          <h2>NFCS</h2>
          <p className="logo__smallText">OAU</p>
        </div>
    </section>
  )
}

export default Logo