import React, { useState } from 'react'
import './AppNav.scss'
import Avatar from '../../assets/avatar.png';
import { Link } from 'react-router-dom';
import NavDrawer from '../NavDrawer/NavDrawer';

type AppNavProp = {
  username: string | any;
  image: string | any;
}

const AppNav = ({ username='user', image=Avatar }: AppNavProp) => {
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
  return (
    <section id='appNav'>
      <img src={image} alt="user" className='appNav__image'/>

      <p className="appNav__userName">Hello <span>{username}!</span></p>

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
        </ul>
      </div>

      <div className="appNav__drawer">
        <NavDrawer />
      </div>
    </section>
  )
}

export default AppNav