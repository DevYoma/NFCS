import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../../Atoms/Logo/Logo'
import { useNavigate } from 'react-router-dom';
import './Navbar.scss';
import LPNavDrawer from '../LPNavDrawer/LPNavDrawer';
import { auth } from '../../Firebase/Firebase';
import { signOut } from 'firebase/auth';
import { logout } from '../../Features/user/userSlice';
import { loggedOut } from '../../Features/userInfo/userinfoSlice';
import { useDispatch } from 'react-redux';

type NavbarProp = {
    hideLinks?: boolean; 
    hideDrawer?: boolean;
    isLoggedIn?: boolean;
    hideBoxShadow?: boolean;
}

const Navbar = ({ hideLinks, hideDrawer, isLoggedIn, hideBoxShadow }: NavbarProp) => {
    const [links] = useState([
        {
            id: 1,
            text: 'Home', 
            route: '/', 
        }, 
        {
            id: 2, 
            text: 'How it works',
            route: "/how-it-works",
        }, 
        {
            id: 3, 
            text: 'Events', 
            route: "/events",
        },
    ])

    const [appLinks] = useState([
        {
            id: 1, 
            text: "Birthdays", 
            // route: "/app"
            route: "/birthday"
        },
        {
            id: 2, 
            text: "Profile", 
            route: "/profile"
        }
    ])

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // console.log(isLoggedIn);

    const handleLogout = () => {
        signOut(auth).then(() => {
            dispatch(logout());
            dispatch(loggedOut())
            navigate('/');
        }).catch((error: any) => {
            alert(error)
        })
        // localStorage.removeItem("formValues");

    }

  return (
    <nav id="navbar" 
        className={`
            ${hideBoxShadow ? 'navbar__shadow' : ''}
        `}
    >
        <NavLink to={!isLoggedIn ? '/' : '#'} style={{textDecoration: "none"}}>
            <Logo />
        </NavLink>

        <div className={`
            ${!isLoggedIn ? 'navbar__links' : 'navbar__appLinks'}
            ${hideLinks ? 'navbar__hideLinks' : ''}
        `}>
            {!isLoggedIn && links.map(link => (
                <div key={link.id} className="navbar__link"> 
                    <NavLink 
                        to={link.route}
                    >
                        {link.text}
                    </NavLink>
                </div>
            ))}

            {isLoggedIn && appLinks.map(appLink => (
                 <div key={appLink.id} className="navbar__appLink"> 
                 <NavLink 
                     to={appLink.route}
                 >
                     {appLink.text}
                 </NavLink>
             </div>
            ))}
            
            
            {isLoggedIn ? 
            (<button
                onClick={handleLogout} 
                className="navbar__loginOutBtn"
            >
                Logout
            </button>)
             : 
            (
                <button
                onClick={() => navigate('/login')} 
                className="navbar__loginBtn"
            >
                Login
            </button>
            )}
        </div>

        <div className={`
            navbar__mobileLinks
            ${hideDrawer ? 'navbar__hideMobileLinks' : ''}
        `}>
            <LPNavDrawer isLoggedIn={isLoggedIn}/>
        </div>
    </nav>
  )
}

export default Navbar