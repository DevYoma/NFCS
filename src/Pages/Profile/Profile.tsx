import {  doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {  registeruser } from '../../Features/user/userSlice';
// import { loggedOut } from '../../Features/userInfo/userinfoSlice';
import { auth, db } from '../../Firebase/Firebase';
import './Profile.scss';
import {  useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import { InputLabel, TextField } from '@mui/material';
// import Avatar from '../../assets/avatar.png';
// import { departments } from '../../utils/helper';


// type userDataResultType = {
//   birthday: string;
//   department: string;
//   email: string;
//   img: string;
//   name: string;
//   team: string;
//   teampass: string;
//   timeStamp: Date;
// }

const Profile = () => {
  const navigate = useNavigate();
  const [newName, setNewName] = useState('');
  const [newDepartment, setNewDepartment] = useState('');
  const [userId, setUserId] = useState<any>('')
  const [fbUser, setFbUser] = useState<any>(null);

  // Password reset state
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  
  const dispatch = useDispatch();

  // USEEFEECT FOR PERSISTING USER AND USER DATA
 useEffect(() => {
  dispatch(registeruser());

  auth.onAuthStateChanged(authState => {
    // console.log("User Id: " + authState?.uid);
    setUserId(authState?.uid)
    if(authState){
      getDataFromId(authState?.uid);
    }else if(authState === null){
      navigate('/')
    }
    else{
      navigate(-1); // PROTECTED ROUTE
    }
  })
}, [dispatch,  navigate])

  // GETTING LOGGED IN USER DETAILS.
  const getDataFromId = async (id: number | string | any) => {
    // const docRef = doc(db, "users", "SF");
    const docRef = doc(db, "users", id)
    const docSnap = await getDoc(docRef);

    const userDataResult: any = await (docSnap.data())
    
    // console.log(userDataResult) // RETURNS USER DETAILS
    setFbUser({
      ...fbUser,
      userDataResult
    })
    
    return userDataResult;
  }

  // assigning the returned value from the function to apiResponse.
  const apiResponse = fbUser?.userDataResult;

  // console.log(apiResponse);

  const handleNameUpdate = (e:any) => {
    e.preventDefault();
    if (newName === ' ' || newName.length <= 3){
      alert("Enter a Valid name")
      return;
    }

    // alert(`Name updated to ${newName}`)
    alert('Data has been updated')

    updateFunction(userId);
  }

  // console.log(userId);

  // UPDATE USER-DETAIL FUNCTION
  const updateFunction = async (id: string) => {
    const userDoc = doc(db, "users", id);
    // name !== "" && department !== ""
    if(newName !== "" && newDepartment !== ""){
      const newFields = {
        name: newName, 
        department: newDepartment
      }
      await updateDoc(userDoc, newFields);
      return
    }


    // name !== "" && department === ""
    if(newName !== "" && newDepartment === ""){
      const newFields = {name: newName}
      await updateDoc(userDoc, newFields)

      return
    }

    // name === "" && department !== ""
    if(newName === "" && newDepartment !== ""){
      const newFields = { department: newDepartment }
      await updateDoc(userDoc, newFields)

      return
    }
  }

  // HANDLING LOGOUT
  // const handleLogout = () => {
  //     auth.signOut().then(() => {
  //       dispatch(logout());
  //       dispatch(loggedOut)
  
  //       navigate('/')
  //     })
  // }

  // const handleDelete = async (id: string) => {
  //   const userDoc = doc(db, "users", id)
  //   await deleteDoc(userDoc)
  //   handleLogout();
  // }

  return (
    <React.Fragment>
      <Navbar isLoggedIn/>
      <div className="profilePage">
        <h2 className="profilePage__header">Profile Settings</h2>

        <form className="userInfo">
          <div className="userInfo__profilePicture">
            <img src={apiResponse?.img} alt="avatar" />
          </div>

          <p className="userInfo__changePicture">Change Profile photo</p>

          <div className="userInfo__form">
              {/* update Full Name */}
              <div>
                <InputLabel className='userInfo__formLabel'>FullName</InputLabel>
                <TextField 
                  className='userInfo__formField'
                  type="text"
                  variant="outlined" 
                  required
                  value={newName}
                  placeholder={apiResponse?.name}
                  onChange={(e: any) => setNewName(e.target.value)}
                />
              </div>

              {/* update department */}
              <div>
                <InputLabel className='userInfo__formLabel'>Department</InputLabel>
                <TextField 
                  className='userInfo__formField'
                  type="text"
                  variant="outlined" 
                  required
                  placeholder={apiResponse?.department}
                  value={newDepartment}
                  onChange={(e:any) => setNewDepartment(e.target.value)}
                />
              </div>

              {/* update Team field => NOT CHANGABLE*/}
            
              <div>
                <InputLabel className='userInfo__formLabel'>Team</InputLabel>
                <TextField 
                  className='userInfo__formField'
                  type="text"
                  variant="outlined" 
                  value={apiResponse?.team}
                  disabled
                />
              </div>

              {/* TEAMPASS => NOT EDITABLE */}
              <div>
                <InputLabel className='userInfo__formLabel'>Team Pass</InputLabel>
                <TextField 
                  className='userInfo__formField'
                  type="text"
                  variant="outlined" 
                  value={apiResponse?.teampass}
                  disabled
                />
              </div>

              {/* DOB */}
              <div>
                <InputLabel className='userInfo__formLabel'>Date of birth 📆</InputLabel>
                <TextField 
                    className='userInfo__formField'
                    type="text"
                    variant="outlined" 
                    name="birthday"
                    value={apiResponse?.birthday}
                    disabled
                />
              </div>
          </div>

          <button 
            disabled={newName === "" && newDepartment === ""}
            className="updateFormButton"
            onClick={handleNameUpdate} 
          >
            Save Changes
          </button>
        </form>

        <form className='profilePassword'>
          <h1 className="profilePassword__header">Password reset</h1>

          <p 
            className="profilePassword__subText"
            onClick={() => navigate('/forgot-password')}
          >
            Tap here if you have forgotten your old password
          </p>
          <div>
            <InputLabel className='password__labels'>Student Email</InputLabel>
            <TextField
              className='password__fields'
              type="email"
              variant="outlined" 
              value={apiResponse?.email}
              disabled
            />
          </div>

          <div>
            <InputLabel className='password__labels'>Old Password</InputLabel>
            <TextField
              className='password__fields' 
              type="text"
              variant="outlined" 
              value={oldPassword}
              required
              onChange={(e:any) => setOldPassword(e.target.value)}
            />
          </div>

          <div>
            <InputLabel className='password__labels'>New Password</InputLabel>
            <TextField
              className='password__fields' 
              type="text"
              variant="outlined" 
              value={newPassword}
              required
              onChange={(e:any) => setNewPassword(e.target.value)}
            />
          </div>

          <button disabled={oldPassword === "" || newPassword === ""} className="savePasswordButton">Save Changes</button>
        </form>

        <button onClick={() => alert('Delete Account Feature WIP 👷‍♂️')} className="profilePage__deleteButton">Delete account</button>
      </div>
    </React.Fragment>
  )
}

export default Profile