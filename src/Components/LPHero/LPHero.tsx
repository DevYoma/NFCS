import Button from '../../Atoms/Button/Button';
import './LPHero.scss';
import LPImg from '../../assets/newLPImg.png'
import Blur1 from '../../assets/blurUp.png';
import Blur2 from '../../assets/blurDown.png';
import TopDots from '../../assets/lpDots.png'

const LPHero = () => {
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
            buttonStyle={{ padding: "1.1rem 3.75rem" }}
          >
            Join our family
          </Button>
        </div>
      </div>
      <div className="LPHeroRight">
        <img className='LPHeroRight__mainImg' src={LPImg} alt="landing-page-image" />
      </div>
    </div>
  )
}

export default LPHero