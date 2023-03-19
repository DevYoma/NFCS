import React, { useEffect } from 'react'
import './LandingPage.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import {  logout } from '../Features/user/userSlice'
import { RootState } from '../Features/store';
import Navbar from '../Components/Navbar/Navbar';
import LPHero from '../Components/LPHero/LPHero';
import LPAddress from '../Components/LPAddress/LPAddress';
import TeamLeaders from '../Components/TeamLeaders/TeamLeaders';
import Excos from '../Components/Excos/Excos';
import ScoreBoard from '../Components/ScoreBoard/ScoreBoard';
import Testimonial from '../Components/Testimonials/Testimonials';
import Footer from '../Components/Footer/Footer';
import LPWhy from '../Components/LPWhy/LPWhy';

const LandingPage = () => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user.user)
    const dispatch = useDispatch()

    const register = () => {
        navigate('/register')
    }

    // console.log(user);

    const login = () => {
        navigate('/login')
    }

  return (
    // think of adding a container element here
    // think of controlling the padding from here 💁‍♂️

    // Header => Serif
    // body => san serif
    <React.Fragment>
      <Navbar />
      <section id='landingPage'>
          <LPHero />
          <LPAddress />
          <LPWhy />
          <TeamLeaders />
          <Excos />
          <ScoreBoard />
          <Testimonial />
          <Footer />
      </section>
    </React.Fragment>
  )
}

export default LandingPage