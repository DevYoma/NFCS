import React, {  useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../Atoms/Logo/Logo'
import { useNavigate } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
    const [links] = useState([
        {
            id: 1,
            text: 'Home', 
        }, 
        {
            id: 2, 
            text: 'About',
        }, 
        {
            id: 3, 
            text: 'Team', 
        },
        {
            id: 4, 
            text: 'Gallery',
        },
        {
            id: 5, 
            isButton: true
        }
    ])

    const navigate = useNavigate();
  return (
    <nav id="navbar" className='container'>
        <Logo />

        <div className="navbar__links">
            {links.map(link => (
                <div>
                    <Link 
                        style={{
                            fontFamily: 'Inter', 
                            fontWeight: "300", 
                            fontSize: "18px", 
                            lineHeight: "29px",
                            textDecoration: "none"
                        }}
                        to={link.text === 'Home' ? `/` :`/${link.text}`}
                    >
                        {link.text}
                    </Link>
                    {link.isButton && <button className="navbar__loginBtn" onClick={() => navigate('/login')}>Login</button>}
                </div>
            ))}
        </div>
    </nav>
  )
}

export default Navbar