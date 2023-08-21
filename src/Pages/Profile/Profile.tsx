import {  doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {  registeruser } from '../../Features/user/userSlice';
// import { loggedOut } from '../../Features/userInfo/userinfoSlice';
import { auth, db, storage } from '../../Firebase/Firebase';
import './Profile.scss';
import {  useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import { InputLabel, TextField } from '@mui/material';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { toast } from 'react-toastify';

const Profile = () => {
  const navigate = useNavigate();
  const [newName, setNewName] = useState('');
  const [newDepartment, setNewDepartment] = useState('');
  const [userId, setUserId] = useState<any>('')
  const [fbUser, setFbUser] = useState<any>(null);

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

   // TOASTIFY function
   function notify(message: string){
    toast.error(message);
}

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

  return (
    <React.Fragment>
      <Navbar isLoggedIn/>
      <div className="profilePage">
        <h2 className="profilePage__header">Profile Settings</h2>

        <form className="userInfo">
          <div className="userInfo__picTop">
            <div className="userInfo__profilePicture">
              <img src={apiResponse?.img} alt="avatar" />
            </div>

            {/* <button className="userInfo__changePicture" onClick={handleImageChange}>Change Profile photo</button> */}
            <label className='userInfo__changePictureInput'>
              <input 
                
                // type="file" 
                // onChange={handleImageChange}
                onClick={() => alert("Feature in progress")} 
                style={{ display: "none" }}
              />
              <span style={{ fontSize: "2.5rem", fontWeight: "500" }}>+</span>
            </label>
          </div>

          <div className="userInfo__form">
              {/* update Full Name */}
              <div>
                <InputLabel className='userInfo__formLabel'>FullName</InputLabel>
                <TextField 
                  className='userInfo__formField'
                  type="text"
                  variant="outlined" 
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
      </div>
    </React.Fragment>
  )
}

export default Profile