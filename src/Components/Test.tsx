import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { registeruser, logout } from '../Features/user/userSlice'
import { RootState } from '../Features/store';
import { Link } from 'react-router-dom';


const Test = () => {

    const user = useSelector((state: RootState) => state.user.user)
    const dispatch = useDispatch()

    useEffect(() => {
            dispatch(registeruser());
    }, [])

    const handleLogout = () => {
        dispatch(logout());
    }

  return (
    <>
        {user && (
            <React.Fragment>
                <p>LoggedIn</p>
                <button onClick={handleLogout}>Logout</button>
            </React.Fragment>
        )}


        {!user && (
            <React.Fragment>
                <p>Not Logged in</p>
                <p>Go to<Link to={'/'}>home page</Link></p>
            </React.Fragment>
        )}
    </>
  )
}

export default Test