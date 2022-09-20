import React from 'react'
import './Logo.scss';
import LogoTextImg from '../../assets/NFCS.png'
import LogoImg from '../../assets/NfcsLogo.svg';

type logoProp = {
  logoStyle?: React.CSSProperties;
}

const Logo = ({ logoStyle }: logoProp) => {
  return (
    <section style={logoStyle} id="logo">
        <img src={LogoImg} alt="imgLogo" className="logo__firstImg" />
        <div>
          <img src={LogoTextImg} alt="Logo" />
          <span>
            <p>Our Lady Of Perpetual</p>
            <p>Light Chapel OAU</p>
          </span>
        </div>
    </section>
  )
}

export default Logo