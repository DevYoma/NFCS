import React from 'react'
import './LPHero.scss';
import MakeShiftLogo from '../../assets/makeShiftLogo.png';
import { useNavigate } from 'react-router-dom';
import Picture from '../../Molecules/Picture/Picture';
import LandscapePic from '../../assets/landscapeHero.png';
import HeroNewImg from '../../assets/HeroImgNew.png';
import Dots from '../../assets/dots.png';

const LPHero = () => {
    const navigate = useNavigate();

  return (
    <div className="LPHero">
        <div className="LPHero__left">
            <h2 className="LPHero__leftHeader">
                Making years count <br />for <span>NFCSers</span> in OAU
            </h2>

            <div className="LPHero__leftBody">
                The Nigeria Federation of Catholic Students (NFCS) Obafemi Awolowo University chapter, has created this platform to make the birthdays of her members a memorable one by sharing love to her celebrants.
            </div>

            <button className='LPHero__leftButton' onClick={() => navigate('/register')}>Join Our Family</button>
        </div>

        <div className="LPHero__right">
            <Picture 
                dotOne={true}
                dotTwo={true}
                addressDotOne={false}
                addressDotTwo={false}
                // main={HeroNewImg}
                main={LandscapePic}
                picture1={Dots}
                picture2={Dots}
            />
        </div>
    </div>
  )
}

export default LPHero