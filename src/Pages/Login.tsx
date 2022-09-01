import React, { useState } from 'react'
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import {  registeruser, logout } from '../Features/user/userSlice'
import { RootState } from '../Features/store'
import { loggedIn } from '../Features/userInfo/userinfoSlice';
import { auth } from '../Firebase/Firebase';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../Atoms/Logo/Logo';
import BackgroundImg from '../assets/loginBackground.png';
import Button from '../Atoms/Button/Button';

const Login = () => {
  const [error, setError] = useState("")

  // TOASTIFY ERROR MESSAGE
  function notify(message: string){
    toast.error(message);
  }

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
    
    if(loginData.email === "" || loginData.password === ""){
      // alert("This is not a valid email address")
      notify("Please enter valid details")
      return;
    }

    if(!loginData.email.includes('student.oauife.edu.ng')){
      // console.log(loginData)
      // alert("Please enter valid details");
      notify("This is not a valid email address")
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
        // alert(error);
        console.log(error);
        notify(error.message)
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
    <section id="login">
      <div className="login__left">
        {/* <div className="login__leftHeader">
          <Logo />
        </div> */}

        <div className="login__leftHeaderFormContainer">
          <form onSubmit={handleLogin} className="login__leftForm">
            <h1 className='login__formWelcome'>Welcome Back</h1>
            <p className="login__formText">Welcome back! Please enter your details</p>

            <div className="login__formDiv">
              <div className='login__formLabelDiv'>
                <label>Email</label>
              </div>
              <input 
                type="email" 
                value={loginData.email}
                name="email"
                placeholder='student Email'
                onChange={handleOnChange}
              />
            </div>

            <div className="login__formDiv">
              <div  className='login__formLabelDiv'>
                <label>Password</label>
              </div>
              <input 
                type="password" 
                value={loginData.password}
                name="password"
                placeholder='xxxxxxx'
                onChange={handleOnChange}
              />
            </div>

            {/*  */}
            {/* <button type="submit" className='login__formButton'>Login</button> */}
            <Button 
              buttonType='submit'
              buttonStyle={{ marginTop: '30px' }}
            >
              Login
            </Button>
          </form>

          <p className='login__RegisterLink'>
            Don't have an Account?<Link to={'/register'}> Sign Up</Link>
          </p>

          <ToastContainer style={{ fontSize: "1rem" }}/>
        </div>
    </div>

      <div className="login__right">
        {/* <img src={BackgroundImg} alt="backgroundImg" /> */}
      </div>
    </section>
  )
}

export default Login