import { Menu } from '@mui/icons-material';
import { Drawer, Typography, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './NavDrawer.scss';
import CloseIcon from '@mui/icons-material/Close';

const NavDrawer = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  return (
    <React.Fragment>
        <IconButton 
            edge="end" 
            sx={{ width: "54px", height: "54px"}} 
            aria-label="logo" 
            onClick={() => setIsDrawerOpen(!isDrawerOpen)} 
            className={true ? "iconWhite" : "iconGreen"}
        >
            {isDrawerOpen ? <CloseIcon fontSize='large'/> : <Menu fontSize='large' /> }
        </IconButton>
        <Drawer anchor='right' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
            <Box p={2} width={'100vw'} textAlign='left' role='presentation' sx={{ paddingTop: "150px", height: "100vh"}} className='nav__drawerLists'>
                <Link to={'/'} style={{ textDecoration: "none"}}>
                    <Typography variant='h6' component='div' className='nav__drawerText'>Home</Typography>
                </Link>
                <Link to={'/about'} style={{ textDecoration: "none"}}>
                    <Typography variant='h6' component='div' className='nav__drawerText'>About Us</Typography>
                </Link>
                <Link to={'/blog'} style={{ textDecoration: "none"}}>
                    <Typography variant='h6' component='div' className='nav__drawerText'>Blog</Typography>
                </Link>
                <Link to={'/contact'} style={{ textDecoration: "none"}}>
                    <Typography variant='h6' component='div' className='nav__drawerText'>Contact Us</Typography>
                </Link>
            </Box>
        </Drawer>
    </React.Fragment>
  )
}

export default NavDrawer