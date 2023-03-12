import React from 'react'
import Picture from '../../Molecules/Picture/Picture';
import './LPAddress.scss';
import SmallDots from '../../assets/smallDot.svg';
import President from '../../assets/president.png';


const LPAddress = () => {
  return (
    <div className="LPAddress">
        <div className="LPAddress__left">
            <h2 className="LPAddress__leftHeader">
                President's Welcome Address
            </h2>

            <div className="LPAddress__leftBody">
                Dear fellow members of our community,
                It is with great pleasure that I stand before you today as your newly elected President. I am honored to have been chosen to lead this community, and I promise to serve you to the best of my abilities.
                Your active involvement is a testament to the strength of our community, and I look forward to working with each and every one of you to achieve our shared goals.
                As we begin this new chapter together, I want to emphasize that our community's success is built on our collective efforts. Each of us has a role to play in making our community a better place, whether it is through volunteering, supporting local businesses, or simply being a good neighbor.
                Thank you for your attention, and I look forward to working with you all.
            </div>
        </div>

        <div className="LPAddress__right">
            <Picture 
                addressDotOne={true}
                addressDotTwo={true}
                dotOne={false}
                dotTwo={false}

                main={President}
                picture1={SmallDots}
                picture2={SmallDots}
            />

            <div className="LPAddress__rightDetails">
                <p className="nfcsRole">NFCS President</p>
                <p className="nfcsRole__name">Lawrence Yoma</p>
            </div>
        </div>
    </div>
  )
}

export default LPAddress