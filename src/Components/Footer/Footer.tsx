import { Twitter, WhatsApp, Email } from '@mui/icons-material';
import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import Logo from '../../Atoms/Logo/Logo';
import './Footer.scss';


const Footer = () => {
  const date = new Date();
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
        <p className="footer__linksHeader">Company</p>
        <ul>
          <li>About Us</li>
          <li>Alumni</li>
          <li>Events</li>
          <li>Gallery</li>
        </ul>
       </div>

        <div className='footer__connect'>
          <p className="footer__connectHeader">Connect with us</p>

          <div className="footer__connectLinks">
            <FacebookIcon />
            <Twitter />
            <InstagramIcon />
            <YouTubeIcon />
          </div>

          <div className="footer__connectWhatsApp">
            <WhatsApp />
            <span>+234 888-3334-509</span>
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