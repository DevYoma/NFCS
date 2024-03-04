import './App.css';
import { Routes, Route } from 'react-router-dom'
import Birthday from './Pages/BirthdayPage/Birthday';
import LandingPage from './Pages/LandingPage';
import Register from './Pages/Register/Register';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import How from './Pages/How/How';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import Events from './Pages/Events/Events';
import Members from './Pages/Members/Members';
import PrivateRoute from './Components/PrivateRoute';
import SaintDay from './Pages/SaintDay/SaintDay';
import MakeAdmin from './Pages/MakeAdmin/MakeAdmin';

function App() {
  return (
    <div className="app">
      <Routes>
        {/* LANDING PAGES */}
        <Route path='/' element={<LandingPage />} />
        <Route path='/how-it-works' element={<How />} />

            {/* MAIN APP */}

        <Route path='/register' element={ <Register />} />

        <Route path='/login' element={ <Login />} />

        <Route path='/events' element={ <Events />} />


        <Route path='/forgot-password' element={<ForgotPassword /> } />

        <Route path="/saint" element={<SaintDay />}/>

        <Route path="/admin" element={<MakeAdmin />}/>

        {/* PROTECTED ROUTES */}
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={ <Profile />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path='/users' element={<Home /> } />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/birthday" element={<Birthday />} />
        </Route>
        
        {/* TEAM LEADERS ROUTES */}
        <Route element={<PrivateRoute />}>
          <Route path='/members' element={<Members />}/>
        </Route>

        <Route path="*" element={(<h1>404 page</h1>)}/>
      </Routes>
    </div>
  );
}

export default App;
