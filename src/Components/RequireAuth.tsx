import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import {  registeruser, logout } from '../Features/user/userSlice';
import {  RootState } from '../Features/store';
import { useSelector, useDispatch } from 'react-redux'

type RequireAuthProp = {
    children: any;
    userProp?: boolean;
}

const RequireAuth = ({ children, userProp }: RequireAuthProp) => {

  const user = useSelector((state: RootState) => state.user.user)
  const dispatch = useDispatch()
  console.log(userProp)

  useEffect(() => {
    dispatch(registeruser())
  }, [])
  
  // const currentUser =  false;
  return user ? children : <Navigate to={'/login'}/>
}

export default RequireAuth