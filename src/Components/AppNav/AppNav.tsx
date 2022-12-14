import React, { useEffect, useState } from 'react'
import './AppNav.scss'
import Avatar from '../../assets/avatar.png';
import { Link } from 'react-router-dom';
import NavDrawer from '../NavDrawer/NavDrawer';
import { logout, registeruser } from '../../Features/user/userSlice';
import { useDispatch } from 'react-redux'
import { auth, db } from '../../Firebase/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import LogoutIcon from '@mui/icons-material/Logout';
import { loggedOut } from '../../Features/userInfo/userinfoSlice';
import { useNavigate } from 'react-router-dom';

// type AppNavProp = {
//   username: string | any;
//   image: string | any;
// }


const AppNav = ({ username='user', image=Avatar }) => {
  const [links] = useState([
    {
      id: 1, 
      linkRoute: '/app',
      text: "Home"
    },
    {
      id: 2, 
      linkRoute: '/birthday',
      text: "Birthdays"
    },
    {
      id: 3, 
      linkRoute: '#',
      text: "Profile"
    },
    // {
    //   id: 4, 
    //   linkRoute: '#',
    //   text: "LogOut"
    // }
  ])
  const [fbUser, setFbUser] = useState<any>(null);

  const dispatch = useDispatch()

  const navigate = useNavigate();

   // USEEFEECT FOR PERSISTING USER AND USER DATA
 useEffect(() => {
  dispatch(registeruser());

  auth.onAuthStateChanged(authState => {
    // console.log("User Id: " + authState?.uid);
    if(authState){
      getDataFromId(authState?.uid);
    }
  })
}, [])

// GETTING LOGGED IN USER DETAILS.
  const getDataFromId = async (id: number | string | any) => {
    // const docRef = doc(db, "users", "SF");
    const docRef = doc(db, "users", id)
    const docSnap = await getDoc(docRef);

    const userDataResult: any = await (docSnap.data())
    
    // console.log(userDataResult)
    setFbUser({
      ...fbUser,
      userDataResult
    })
    
    return userDataResult;
  }

  // assigning the returned value from the function to apiResponse.
  const apiResponse = fbUser?.userDataResult;

  // HANDLING LOGOUT
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout")){
      auth.signOut().then(() => {
        dispatch(logout());
        dispatch(loggedOut)
  
        navigate('/')
      })
    };
}

  return (
    <section id='appNav'>
      <img src={apiResponse?.img ? apiResponse?.img : image} alt="user" className='appNav__image'/>

      <p className="appNav__userName">Hello <span>{apiResponse?.name ? apiResponse?.name : username}!</span></p>

      <div className="appNav__lists">
        <ul>
          {links.map(link => (
            <li 
              key={link.id} 
              className="navList"
            >
              <Link 
                to={link.linkRoute} 
                style={{
                  textDecoration: "none"
                }}
              >
                {link.text}
              </Link>
            </li>
          ))}
          {/* <button>Logout</button> */}
          {/* <p className='navList__logout'>Logout</p> */}
          <LogoutIcon className='navList__logout' onClick={handleLogout}/>
        </ul>
      </div>

    <div className="appNav__drawer">
        <NavDrawer />
      </div>
    </section>
  )
}

export default AppNav