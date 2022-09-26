import { Menu } from '@mui/icons-material';
import { Drawer, Typography, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './NavDrawer.scss';
import CloseIcon from '@mui/icons-material/Close';
import { auth } from '../../Firebase/Firebase';
import { useDispatch } from 'react-redux';
import { logout } from '../../Features/user/userSlice';
import { loggedOut } from '../../Features/userInfo/userinfoSlice';

const NavDrawer = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

     // logging out users
     const handleLogout = () => {
        auth.signOut().then(() => {
          dispatch(logout());
          dispatch(loggedOut)

          navigate('/')
        })
    }

  return (
    <div>
        <IconButton 
            edge="end" 
            sx={{ width: "54px", height: "54px"}} 
            aria-label="logo" 
            onClick={() => setIsDrawerOpen(!isDrawerOpen)} 
        >
            {isDrawerOpen ? <CloseIcon fontSize='large'/> : <Menu fontSize='large' /> }
        </IconButton>
        <Drawer anchor='right' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} className="navDrawer__container">
            <Box p={2} width={'70vw'} textAlign='left' role='presentation' className='navDrawer'>
                <Link to={'/app'} style={{ textDecoration: "none"}}>
                    <Typography variant='h6' component='div' className='navDrawer__text navDrawer__app'>Home</Typography>
                </Link>
                <Link to={'/birthday'} style={{ textDecoration: "none"}}>
                    <Typography variant='h6' component='div' className='navDrawer__text navDrawer__birthday'>Birthdays</Typography>
                </Link>
                <Link to={'#'} style={{ textDecoration: "none"}}>
                    <Typography variant='h6' component='div' className='navDrawer__text navDrawer__profile'>Profile</Typography>
                </Link>

                <hr />

                <Typography 
                    variant='h6' 
                    component='div' 
                    className='navDrawer__text navDrawer__logout'
                    onClick={handleLogout}
                >
                    Logout
                </Typography>
            </Box>
        </Drawer>
    </div>
  )
}

export default NavDrawer