import React, { useState } from 'react'
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import {  registeruser, logout } from '../Features/user/userSlice'
import { RootState } from '../Features/store'
import { loggedIn } from '../Features/userInfo/userinfoSlice';
import { auth } from '../Firebase/Firebase';
import { signInWithEmailAndPassword } from '@firebase/auth';

const Login = () => {
  const [error, setError] = useState("")

  // const user = useSelector((state: RootState) => state.user.user)
  const dispatch = useDispatch()

  //getting userInfo temporarily
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo)


  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const handleLogin = async (e: any) => {

    e.preventDefault();
    
    if(!loginData.email.includes('student.oauife.edu.ng')){
      alert("This is not a valid email address")
      return;
    }

    if(loginData.email === "" || loginData.password === ""){
      // console.log(loginData)
      alert("Please enter valid details");
    }else{
      dispatch(registeruser());
      dispatch(loggedIn({
        email: loginData.email,
      }))
      console.log(loginData)
      // navigate('/home')
    }

      // FIREBASE OPERATIONS

      // LOGGING THE USER WITH FIREBASE
      try{
        const loginUserFB = await signInWithEmailAndPassword(auth, loginData.email, loginData.password)
        console.log(loginUserFB)
        navigate('/home')
      }catch(error: any){
        alert(error);
        navigate('/login');
      }

      // FIREBASE OPERATIONS BACKEND
  }

  const handleOnChange = (e: any) => {
      
    const value = e.target.value;
    const name = e.target.name;

    setLoginData({
      ...loginData,
      [name]: value
    })
  }

  return (
    <>
      <div>Login</div>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            value={loginData.email}
            name="email"
            onChange={handleOnChange}
          />
        </div>

        <div>
          <label>Password</label>
          <input 
            type="password" 
            value={loginData.password}
            name="password"
            onChange={handleOnChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      <p style={{ fontSize: "14px" }}>Don't have an Account?<Link to={'/register'}>Register</Link></p>

    </>
  )
}

export default Login