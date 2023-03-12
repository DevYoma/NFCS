import React, {  useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../../Atoms/Logo/Logo'
import { useNavigate } from 'react-router-dom';
import './Navbar.scss';
import LPNavDrawer from '../LPNavDrawer/LPNavDrawer';

const Navbar = () => {
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

    const navigate = useNavigate();

  return (
    <nav id="navbar">
        <Logo />

        <div className="navbar__links">
            {links.map(link => (
                <div key={link.id} className="navbar__link"> 
                    <NavLink 
                        to={link.route}
                    >
                        {link.text}
                    </NavLink>
                </div>
            ))}
            <button
                onClick={() => navigate('/login')} 
                className="navbar__loginBtn"
            >
                Login
            </button>
        </div>

        <div className="navbar__mobileLinks">
            <LPNavDrawer />
        </div>
    </nav>
  )
}

export default Navbar