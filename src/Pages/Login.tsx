import { useState } from 'react'
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import {  registeruser } from '../Features/user/userSlice'
import { loggedIn } from '../Features/userInfo/userinfoSlice';
import { auth } from '../Firebase/Firebase';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import Logo from '../assets/nfcsLogonew.svg'
import { InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

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
        navigate('/app')
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
        <div className="login__leftHeaderFormContainer">
          
          <div className="login__imgContainer">
            <img src={Logo} alt="logo" />

            <h3 className="login__nfcs">NFCS</h3>
            <p className="login__name">Our Lady of Perpetual Light Chapel OAU</p>
          </div>

          <form onSubmit={handleLogin} className="login__leftForm">
            <h1 className='login__formWelcome'>Welcome Back</h1>
            <p className="login__formText">Login to NFCS account</p>

            <div className="login__formDiv">
              <TextField 
                  className="input-field"
                  type="email"
                  label='Email'
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
                  label='password'
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

            <p className="login__forgotPassword"><Link to={'#'}> Forgot Password?</Link></p>          
            <button className='login__button'>Login</button>
          </form>

          <p className='login__RegisterLink'>
            Don't have an Account?<Link to={'/register'}> Sign Up</Link>
          </p>

          <ToastContainer style={{ fontSize: "1rem" }}/>
        </div>
      </div>

      <div className="login__right">
      </div>
    </section>
  )
}

export default Login