import React, { useEffect } from 'react'
import './LandingPage.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import {  logout } from '../Features/user/userSlice'
import { RootState } from '../Features/store';

const LandingPage = () => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user.user)
    const dispatch = useDispatch()

    const register = () => {
        navigate('/register')
    }

    console.log(user);

    const login = () => {
        navigate('/login')
    }

  return (
    <>
        <div>LandingPage</div>

        {user && (<p>Working</p>)}
        {/* <button onClick={() => dispatch(loginUser())}>Get Started</button> */}
        <button onClick={register} >Register</button>

        {/* <button onClick={() => dispatch(logout())}>Login</button> */}
        <button onClick={login}>Login</button>
    </>
  )
}

export default LandingPage