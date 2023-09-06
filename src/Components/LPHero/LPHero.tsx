import Button from '../../Atoms/Button/Button';
import './LPHero.scss';
import LPImg from '../../assets/newLPImg.png'
import Blur1 from '../../assets/blurUp.png';
// import Blur2 from '../../assets/blurDown.png';
import TopDots from '../../assets/lpDots.png'
import { useNavigate } from 'react-router-dom';
import { imagesCarousel } from '../../data/carouselData';
import { useState, useEffect } from 'react';
import {  ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const LPHero = () => {
  const navigate = useNavigate();
  const [currImg, setCurrImg] = useState(0);

  const [count, setCount] = useState(0);

  const handleForwardClick = () => {
    currImg < imagesCarousel.length - 1 &&  setCurrImg(currImg + 1);
  }

  const handleBackwardClick = () => {
    currImg > 0 && setCurrImg(currImg - 1)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(prevCount => prevCount + 1);
      setCurrImg((prevCurrImg) => (prevCurrImg + 1) % imagesCarousel.length);
      // if(currImg > 0){
      //   setCurrImg(currImg - 1)
      // }
    }, 10000); // 30 seconds in milliseconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [count]); // Re

  return (
    <div className="LPHero">
      <img src={Blur1} alt="blur1" className="absolute absolute1" />
      {/* <img src={Blur2} alt="blur2" className="absolute absolute2" /> */}
      <img src={TopDots} alt="topDots" className="absolute absoluteDots" />
      <div className="LPHeroLeft">
        <h1 className="LPHeroLeft__header">
          Making years count for  <span>NFCSers</span> in OAU
        </h1>

        <p className="LPHeroLeft__text">
          The Nigeria Federation of Catholic Students (NFCS) Obafemi Awolowo University chapter, has created this platform to make the birthdays of her members a memorable one by sharing love to her celebrants.
        </p>

        <div className="LPHeroLeft__button">
          <Button
            onClick={() => navigate('/register')}
          >
            Join our family
          </Button>
        </div>
      </div>
      <div className="LPHeroRight">
        {/* <div className="LPHeroRight-al"><ArrowBackIos onClick={handleBackwardClick}/></div> */}
        <img className='LPHeroRight__mainImg' src={imagesCarousel[currImg].img} alt="youth posing for the camera" />
        {/* <div className="LPHeroRight-ar"><ArrowForwardIos onClick={handleForwardClick}/></div> */}
      </div>
    </div>
  )
}

export default LPHero