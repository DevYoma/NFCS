import { Drawer, IconButton, Menu, Typography } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import './LPNavDrawer.scss';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const LPNavDrawer = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  return (
    <div>
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
                <Link to={'/'} style={{ textDecoration: "none"}}>
                    <Typography variant='h6' component='div' className='navDrawer__text navDrawer__app'>Home</Typography>
                </Link>
                <Link to={'/how-it-works'} style={{ textDecoration: "none"}}>
                    <Typography variant='h6' component='div' className='navDrawer__text navDrawer__birthday'>How it works</Typography>
                </Link>
                <Link to={'/events'} style={{ textDecoration: "none"}}>
                    <Typography variant='h6' component='div' className='navDrawer__text navDrawer__profile'>Events</Typography>
                </Link>

                <hr />
            </Box>
        </Drawer>
    </div>
  )
}

export default LPNavDrawer