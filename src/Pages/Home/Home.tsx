import './Home.scss';
import { useSelector, useDispatch } from 'react-redux';
import {  logout, registeruser } from '../../Features/user/userSlice'
import { RootState } from '../../Features/store';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { loggedIn, loggedOut } from '../../Features/userInfo/userinfoSlice';
import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import { auth, db } from '../../Firebase/Firebase';
import Login from '../Login';
import SkeletonElement from '../../Components/Skeletons/SkeletonElement';
import SkeletonUserLoading from '../../Components/Skeletons/SkeletonUserLoading';
    
type FbDataType = {
  id: string | number;
  name: string;
  team: string;
  level: string;
  email: string;
  department: string;
  birthday: string;
}[]

const Home = () => {

    // const [data, setData] = useState<FbDataType>([])
    const [data, setData] = useState<FbDataType | any>(null)
    const [fbUser, setFbUser] = useState<any>(null);

    const [searchTitle, setSearchTitle] = useState('');

    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user.user)
    const dispatch = useDispatch()

    // userInfo details
    const userInfo: any = useSelector((state: RootState) => state.userInfo.userInfo)

    // console.log(userInfo);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(loggedOut)

        navigate('/')
    }

    const goBackToPreviousPage = () => {
           window.addEventListener("load", e => {
          navigate(-1);
        })
    }

    // USEEFFECT TO FETCH DATA COLLECTION FROM FIRESTORE.
    useEffect(() => {

      dispatch(registeruser());

        window.addEventListener("popstate", e => {
          navigate(1);
        })

   

        const fetchData = async () => {
            let list: any = [];
            try{
              const querySnapshot = await getDocs(collection(db, "users"));
              querySnapshot.forEach((doc) => {
                list.push({id: doc.id, ...doc.data()}) // spreading the data object in the list object.
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
    
                setData(list)
                // console.log(list)
              });
            }catch(error) {
              console.log(error);
            }
          }

          fetchData();
    
          return () => {
            fetchData();
          }
    }, []);

    // USEEFEECT FOR PERSISTING USER AND USER DATA
    useEffect(() => {
      dispatch(registeruser());

      auth.onAuthStateChanged(authState => {
        console.log(authState?.uid);
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
    <>
        {user && (
          <>
            {/* <p style={{ fontSize: "14px" }}>Go to test page <Link to={'/test'}>Test Page</Link></p> */}
            <p style={{ fontSize: "14px" }}>Go to birthday page <Link to={'/birthday'}>Birthday Page</Link></p>
            <React.Fragment>
              <div>Home</div>
              <button onClick={handleLogout}>Logout</button> <br />

              <p>Total Number of Registered users {data?.length}</p>

              <p>{userInfo?.email ? userInfo.email : apiResponse?.email}</p>
              <p>{userInfo?.name ? userInfo.name : apiResponse?.name}</p>
              <p>{userInfo?.birthday ? userInfo.birthday : apiResponse?.birthday }</p>
              <p>{userInfo?.team ? userInfo.team : apiResponse?.team}</p>
              <p>{userInfo?.level ? userInfo.level : apiResponse?.level}</p>


              <input 
                className="home__input"
                type="text" 
                placeholder='Search...'
                onChange={(e: any) => setSearchTitle(e.target.value)}
              />

            
              {/* Data from FB */}
              {data ? (
                <div className='home__lists'>
                {data.filter((value: any) => {
                  if(searchTitle === ""){
                    return value;
                  } else if(value.name.toLowerCase().includes(searchTitle.toLocaleLowerCase())){
                    return value;
                  }
                }).map((datum: any) => (
                  <div key={datum.id} className={`home__list ${datum.team}`} >
                    {datum?.img && <img  loading='lazy' alt={`name${datum.name}`} style={{ width: "100px", height: "100px", objectFit: "cover", clipPath: "circle()" }} src={datum?.img}  />}
                    <div>
                      <p>{datum?.name}</p>
                      <p>{datum?.department}</p>
                      <p>{datum?.birthday}</p>
                    </div>
                    {/* {datum?.birthday} <br />
                    {datum?.team} <br />
                    {datum?.level} <br />
                    {datum?.email} <br /> */}
                  </div>
                ))}
                </div>
              ) : ([1,2,3,4,5].map((n) => <SkeletonUserLoading key={n}/>))}
             
             {/* ADD THE LOADING SKELETON ABOVE */}
            </React.Fragment>
          
          </>

        )}

        {/* {!user && <Navigate to={'/login'} />} */}
        {!user && goBackToPreviousPage() }
    </>
  )
}

export default Home