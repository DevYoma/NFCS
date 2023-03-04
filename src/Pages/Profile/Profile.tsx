import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { registeruser } from '../../Features/user/userSlice';
import { auth, db } from '../../Firebase/Firebase';
import './Profile.scss';

const Profile = () => {
  const [fbUser, setFbUser] = useState<any>(null);
  
  const dispatch = useDispatch();

  // USEEFEECT FOR PERSISTING USER AND USER DATA
 useEffect(() => {
  dispatch(registeruser());

  auth.onAuthStateChanged(authState => {
    // console.log("User Id: " + authState?.uid);
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


  return (
    <div className='profilePage'>
      {/* {apiResponse?.name} */}
      <h1>Profile Page</h1>
      <p>{apiResponse?.name}</p>
      <img src={apiResponse?.img} alt={apiResponse?.name} />
    </div>
  )
}

export default Profile