import { Twitter, WhatsApp, Email } from '@mui/icons-material';
import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import Logo from '../../Atoms/Logo/Logo';
import './Footer.scss';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const date = new Date();
  const navigate = useNavigate();

  const handleLinks = (linkParameter: string): void => {
    if (linkParameter === '') {
      alert("Coming Soon")
    }
    window.open(linkParameter, "_self");
  }

  return (
      <section id="footer">
       {/* <Logo /> */}
       <div className='footer__section1'>
          <div className="footer__section1Header">
            <Logo />
          </div>

          <p className="footer__section1Body">
            Making years count for all NFCSers in OAU.
          </p>

          <p className="footer__section1CopyRight">
            {date.getFullYear()} NFCS. All rights reserved.
          </p>
       </div>


       <div className='footer__links'>
        <p className="footer__linksHeader">Community</p>
        <ul>
          {/* <li onClick={() => navigate("/saint")} style={{ cursor: "pointer" }}>Saint of the Day</li> */}
          <li onClick={() => alert("Coming Soon")} style={{ cursor: "pointer" }}>About Us</li>
          <li onClick={() => alert("Coming Soon")} style={{ cursor: "pointer" }}>Alumni</li>
          <li onClick={() => navigate('/events')} style={{ cursor: "pointer" }}>Events</li>
          <li onClick={() => alert("Coming Soon")} style={{ cursor: "pointer" }}>Gallery</li>
        </ul>
       </div>

        <div className='footer__connect'>
          <p className="footer__connectHeader">Connect with us</p>

          <div className="footer__connectLinks">
            <FacebookIcon onClick={() => handleLinks('')}/>
            <Twitter onClick={() => handleLinks('https://twitter.com/oau_nfcs?s=21&t=3bd4O4nB1q-fsrVh1l27aA')}/>
            <InstagramIcon onClick={() => handleLinks('https://instagram.com/nfcsoauofficial?igshid=MzRlODBiNWFlZA==')}/>
          </div>

          <div className="footer__connectWhatsApp" onClick={() => handleLinks('https://wa.me/+2349044107842')}>
            <WhatsApp />
            <span>+234 904 410 7842</span>
          </div>

          <div className="footer__connectEmail">
            <Email /> 
            <span>infonfcs@gmail.com</span>
          </div>
        </div>
      </section>
  )
}

export default Footer