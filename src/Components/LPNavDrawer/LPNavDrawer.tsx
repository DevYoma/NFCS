import { Drawer, IconButton, Menu, Typography } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import './LPNavDrawer.scss';
import { Box } from '@mui/system';
import { Link, NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '../../Atoms/Button/Button';

type MobileNavDrawer = {
    onMobileView?: boolean;
    isLoggedIn?: boolean;
}

const LPNavDrawer = ({onMobileView, isLoggedIn}: MobileNavDrawer) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    // console.log(isLoggedIn);

  return (
    <div className='lpNavDrawer'>
        <IconButton 
            edge="end" 
            sx={{ width: "54px", height: "54px"}} 
            aria-label="logo" 
            onClick={() => setIsDrawerOpen(!isDrawerOpen)} 
        >
            {isDrawerOpen ? <CloseIcon fontSize='large'/> : <MenuIcon fontSize="large"  /> }
        </IconButton>
        <Drawer anchor='right' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} className="navDrawer__container">
            <Box p={2} width={'70vw'} textAlign='left' role='presentation' className='navDrawer'>
                {!isLoggedIn ? 
                    (<React.Fragment>
                        <Link to={'/'} style={{ textDecoration: "none"}}>
                            <Typography variant='h6' component='div' className='navDrawer__text navDrawer__app'>Home</Typography>
                        </Link>
                        <Link to={'/how-it-works'} style={{ textDecoration: "none"}}>
                            <Typography variant='h6' component='div' className='navDrawer__text navDrawer__howItWorks'>How it works</Typography>
                        </Link>
                        <Link to={'/events'} style={{ textDecoration: "none"}}>
                            <Typography variant='h6' component='div' className='navDrawer__text navDrawer__events'>Events</Typography>
                        </Link>
                    </React.Fragment>) 
                    : 
                    (<React.Fragment>
                        <Link to={'/birthday'} style={{ textDecoration: "none"}}>
                            <Typography variant='h6' component='div' className='navDrawer__text navDrawer__app'>Birthday</Typography>
                        </Link>
                        <Link to={'/profile'} style={{ textDecoration: "none"}}>
                            <Typography variant='h6' component='div' className='navDrawer__text navDrawer__profile'>Profile</Typography>
                        </Link>
                    </React.Fragment>)
                }

                <hr />
                {!isLoggedIn ? 
                    (
                        <NavLink
                            to={'/login'}
                        >
                            <Button buttonStyle={{ marginTop: "10px", padding: "10px 10px" }}>
                                Login
                            </Button>
                        </NavLink>
                    ) 
                    : 
                    (
                        <NavLink
                        to={'/'}
                    >
                            <Button buttonStyle={{ marginTop: "10px", padding: "10px 10px", background: "#8E98A8" }}>
                                Log out
                            </Button>
                        </NavLink>
                    )
                }
            </Box>
        </Drawer>
    </div>
  )
}

export default LPNavDrawer