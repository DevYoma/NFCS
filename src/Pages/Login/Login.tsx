import React, { useState } from 'react'
import './Login.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import {  registeruser } from '../../Features/user/userSlice'
import { loggedIn } from '../../Features/userInfo/userinfoSlice';
import { auth } from '../../Firebase/Firebase';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import Logo from '../assets/nfcsLogonew.svg'
import { InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Navbar from '../../Components/Navbar/Navbar';
import { ClipLoader } from 'react-spinners';
import TopOfPage from '../../utils/topOfPage';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  // TOASTIFY ERROR MESSAGE
  function notify(message: string){
    toast.error(message);
  }

  // const user = useSelector((state: RootState) => state.user.user)
  const dispatch = useDispatch()

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const handleLogin = async (e: any) => {

    e.preventDefault();

    setLoading(true)
    
    if(loginData.email === "" || loginData.password === ""){
      // alert("This is not a valid email address")
      notify("Please enter valid details")
      setLoading(false)
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

        setLoading(true)

        const loginUserFB = await signInWithEmailAndPassword(auth, loginData.email, loginData.password)
        console.log(loginUserFB)
        navigate('/birthday')
      }catch(error: any){
        // alert(error);

        setLoading(false);

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

  // takes user to top of page
  TopOfPage();

  return (
    <React.Fragment>
      <Navbar 
        hideDrawer={true}
        hideLinks={true}
      />
        <div className="login">
          <h1 className="login__header">Log in to your NFCS Birthday reminder account</h1>
          <p className="login__question">Don’t have an account? <Link to={'/register'} style={{ color: "#4318FF", textDecoration: "none" }}>create one here</Link></p>
          <div className="login__FormContainer">
            <form onSubmit={handleLogin} className="login__Form">

              <div className="login__formDiv">
                <TextField 
                    className="input-field"
                    type="email"
                    label='Student Email'
                    variant="outlined" 
                    name="email"
                    placeholder='olemore@student.oauife.edu.ng'
                    required
                    value={loginData.email}
                    onChange={handleOnChange}
                  />
              </div>

              <div className="login__formDiv">
                <TextField 
                    className="input-field"
                    label='Password'
                    variant="outlined" 
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={loginData.password}
                    required
                    onChange={handleOnChange}

                    InputProps={{
                      endAdornment: (
                        <InputAdornment 
                          position="end" 
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                              cursor: "pointer"
                          }}
                      >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </InputAdornment>
                      ),
                  }}
                  />
              </div>

              <p className="login__forgotPassword">Forgot your password?<Link to={'/forgot-password'} style={{color: "#4318FF"}}> Reset it here</Link></p>          
              <button className='login__button'>{loading ? (<ClipLoader color='white'/>) : 'Login'}</button>
            </form>

            <ToastContainer style={{ fontSize: "1rem" }}/>
          </div>
        </div>
    </React.Fragment>
  )
}

export default Login