import './Home.scss';
import { useSelector, useDispatch } from 'react-redux';
import {  logout, registeruser } from '../../Features/user/userSlice'
import { RootState } from '../../Features/store';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loggedOut } from '../../Features/userInfo/userinfoSlice';
import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import { auth, db } from '../../Firebase/Firebase';
import SkeletonUserLoading from '../../Components/Skeletons/SkeletonUserLoading';
import {LazyLoadImage}  from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import AppNav from '../../Components/AppNav/AppNav';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
    
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

    // making page go to current page on reload
    const goBackToPreviousPage = () => {
           window.addEventListener("load", e => {
          navigate(-1);
        })
    }

    // USEEFFECT TO FETCH DATA COLLECTION FROM FIRESTORE.
    useEffect(() => {

      // dispatch(registeruser());

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
    }, [dispatch, navigate]);

    // USEEFEECT FOR PERSISTING USER AND USER DATA
    useEffect(() => {
      dispatch(registeruser());

      auth.onAuthStateChanged(authState => {
        console.log("User Id: " + authState?.uid);
        if(authState){
          getDataFromId(authState?.uid);
        }
      })
    }, [dispatch])

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
            <AppNav />
            <div>

              <input 
                className="home__input"
                type="text" 
                placeholder='Search...'
                onChange={(e: any) => setSearchTitle(e.target.value)}
              />

              {/* Data from FB */}
              {data && (
                <div className='home__lists'>
                {data.filter((value: any) => {
                  if(searchTitle === ""){
                    // return value;
                    return null;
                  } else if(value.name.toLowerCase().includes(searchTitle.toLocaleLowerCase())){
                    return value;
                  }
                }).map((datum: any) => (
                  <div key={datum.id} className={`home__list ${datum.team}`} >
                    {datum?.img && <LazyLoadImage 
                                      effect='blur' 
                                      loading='lazy' 
                                      alt={`name${datum.name}`} 
                                      style={{ width: "100px", 
                                        height: "100px", 
                                        objectFit: "cover", 
                                        clipPath: "circle()"
                                      }} 
                                      src={datum?.img}  />}
                    <div>
                      <p>{datum?.name}</p>
                      <p>{datum?.department}</p>
                      <p>{datum?.birthday}</p>
                    </div>
                  </div>
                ))}
                </div>
              ) }
              {/* : ([1,2,3,4,5].map((n) => <SkeletonUserLoading key={n}/>))} */}
             
            </div>
          
          </>

        )}

        {!user && goBackToPreviousPage() }
      </>
  )
}

export default Home