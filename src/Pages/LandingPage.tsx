import React, { useEffect } from 'react'
import './LandingPage.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import {  logout } from '../Features/user/userSlice'
import { RootState } from '../Features/store';
import Navbar from '../Components/Navbar/Navbar';
import NavHero from '../Components/NavHero/NavHero';
import BirthdayCelebrants from '../Components/BirthdayCelebrants/BirthdayCelebrants';
import Footer from '../Components/Footer/Footer';

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
    <section id='landingPage'>
        <Navbar />
        <NavHero />
        <BirthdayCelebrants header='Birthday Celebrants 🎂'/>
        <BirthdayCelebrants header='Past Birthday Celebrants 🎂'/>
        {/* team leaders talk component */}
        <Footer />
    </section>
  )
}

export default LandingPage