import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { logout, registeruser } from '../../Features/user/userSlice';
import { loggedOut } from '../../Features/userInfo/userinfoSlice';
import { auth, db } from '../../Firebase/Firebase';
import './Profile.scss';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [newValue, setNewValue] = useState('')
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
    }
  })
}, [])


  // GETTING LOGGED IN USER DETAILS.
  const getDataFromId = async (id: number | string | any) => {
    // const docRef = doc(db, "users", "SF");
    const docRef = doc(db, "users", id)
    const docSnap = await getDoc(docRef);

    const userDataResult: any = await (docSnap.data())
    
    console.log(userDataResult)
    setFbUser({
      ...fbUser,
      userDataResult
    })
    
    return userDataResult;
  }

  // assigning the returned value from the function to apiResponse.
  const apiResponse = fbUser?.userDataResult;

  const handleNameUpdate = () => {
    if (newValue === ''){
      alert("Field cannot be empty")
      return;
    }
    alert(`Name updated to ${newValue}`)
    setNewValue('')

    updateFunction(userId);
  }

  // console.log(userId);

  const updateFunction = async (id: string) => {
    const userDoc = doc(db, "users", id);
    const newFields = {name: newValue}
    await updateDoc(userDoc, newFields)
  }

  // HANDLING LOGOUT
  const handleLogout = () => {
      auth.signOut().then(() => {
        dispatch(logout());
        dispatch(loggedOut)
  
        navigate('/')
      })
}

  const handleDelete = async (id: string) => {
    // DELETING USER DETAIL
    const userDoc = doc(db, "users", id)
    await deleteDoc(userDoc)

    // ROUTING USER TO LANDING PAGE
    handleLogout();

    // MAKE A COLLECTION OF EMAILS OF DELETED USERS

  }

  return (
    <div className='profilePage'>
      {/* {apiResponse?.name} */}
      <h1>Profile Page</h1>
      <p>{apiResponse?.name}</p>
      <img src={apiResponse?.img} alt={apiResponse?.name} />

      <div>
        <input 
          value={newValue}
          onChange={(e: any) => setNewValue(e.target.value)}
          type="text" 
        />

        <button onClick={handleNameUpdate}>Update Name</button> <br />

        <button onClick={() => handleDelete(userId)}>Delete Account</button>
      </div>
    </div>
  )
}

export default Profile