import { Twitter } from '@mui/icons-material';
import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

import './Footer.scss';


const Footer = () => {
  return (
    <section id="footer">
        <div className="footer__icons">
            <Twitter />
            <FacebookIcon />
            <YouTubeIcon />
            <InstagramIcon />
        </div>

        <div className="footer__copyright">
            All right Reserved Copyright 2022
        </div>

        <div className="footer__links">
            <span>Terms Of Use</span><span>NFCS Privacy</span><span>Contact Us</span>
        </div>
    </section>
  )
}

export default Footer