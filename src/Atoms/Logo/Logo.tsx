import React from 'react'
import './Logo.scss';
import LogoTextImg from '../../assets/NFCS.png'
import LogoImg from '../../assets/NfcsLogo.svg';
import FakeLogo from '../../assets/makeShiftLogo.png';

type logoProp = {
  logoStyle?: React.CSSProperties;
}

const Logo = ({ logoStyle }: logoProp) => {
  return (
    <section style={logoStyle} id="logo">
        <img src={FakeLogo} alt="imgLogo" className="logo__firstImg" />
        <div>
          <h2>NFCS</h2>
          <p className="logo__smallText">OAU</p>
        </div>
    </section>
  )
}

export default Logo