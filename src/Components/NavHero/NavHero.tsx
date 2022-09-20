import React from 'react'
import './NavHero.scss';
import HeroImg from '../../assets/HeroImg.png';
import { useNavigate } from 'react-router-dom';

const NavHero = () => {
    const navigate = useNavigate();

    // const getNotification = () => {
    //     Notification.requestPermission().then(perm => {
    //         if(perm === 'granted'){
    //             new Notification("Emore Ogheneyoma", {
    //                 body: "I am a FE Developer 🚀",
    //                 tag: "Welcome Message"
    //             })
    //         }
    //     })
    // }

  return (
    <section id="navHero">
        <div className="navHero__left">
            <div className="navHero__leftContainer">
                <h3 className="navHero__leftHeader">
                    <div>Making Years Count</div>
                    <div>for NFCSers in OAU</div>
                </h3>

                <div className="navHero__leftText">
                    <p>The Nigeria Federation of Catholic Students (NFCS) Obafemi</p>
                    <p>Awolowo University chapter, makes the birthdays of her</p>
                    <p>members a memoriable one by sharing love to her celebrants.</p>
                </div>

                <button className='navHero__leftButton' onClick={() => navigate('/register')}>Join our Family</button>
                {/* <button onClick={getNotification}>Notification</button> */}
            </div>
        </div>

        <div className="navHero__right">
            <img src={HeroImg} alt="img" className='navHero__rightImg'/>
        </div>
    </section>
  )
}

export default NavHero