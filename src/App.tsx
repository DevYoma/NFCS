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

function App() {
  return (
    <div className="app">
      <Routes>
        {/* LANDING PAGES */}
        <Route path='/' element={<LandingPage />} />
        <Route path='/how-it-works' element={<How />} />

            {/* MAIN APP */}
        <Route path="/birthday" element={<Birthday />} />

        <Route path='/register' element={ <Register />} />

        <Route path='/login' element={ <Login />} />
        
        <Route path='/profile' element={ <Profile />} />

        <Route path='/events' element={ <Events />} />

        <Route path='/app' element={<Home /> } />

        <Route path='/forgot-password' element={<ForgotPassword /> } />

        <Route path="*" element={(<h1>404 page</h1>)}/>
      </Routes>
    </div>
  );
}

export default App;
