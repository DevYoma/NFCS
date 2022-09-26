// import './firebase-messaging-sw'
import React, { useEffect, lazy, Suspense } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import Birthday from './Pages/BirthdayPage/Birthday';
import LandingPage from './Pages/LandingPage';
import Register from './Pages/Register/Register';
import TeamPass from './Pages/TeamPass/TeamPass';
import Home from './Pages/Home/Home';
import RequireAuth from './Components/RequireAuth';
import Login from './Pages/Login';
import { useSelector, useDispatch } from 'react-redux'
import { registeruser, logout } from './Features/user/userSlice'
import { RootState } from './Features/store';
import Test from './Components/Test';


function App() {
  
  const user = useSelector((state: RootState) => state.user.user)
  const dispatch = useDispatch()

  // console.log(user)

  useEffect(() => {
    if(user){
      dispatch(registeruser());
    }
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage />} />
        
        {/* testing birthday form */}
        <Route path="/birthday" element={<Birthday />} />

        <Route path='/register' element={ <Register />} />

        <Route path='/login' element={ <Login />} />

        {/* <Route path='/teampass' element={<TeamPass />} /> */}
        <Route path="/test" element={<Test />}/>

        {/* <Route path='/home' element={<RequireAuth><Home /></RequireAuth> } /> */}
        <Route path='/app' element={<React.Suspense><Home /></React.Suspense> } />

        <Route path="*" element={(<h1>404 page</h1>)}/>
      </Routes>

     

    </div>
  );
}

export default App;
