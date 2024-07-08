import "./Home.scss";
import { useSelector, useDispatch } from "react-redux";
import { registeruser } from "../../Features/user/userSlice";
import { RootState } from "../../Features/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import { auth, db } from "../../Firebase/Firebase";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Navbar from "../../Components/Navbar/Navbar";
import useFetchUsers from "../../hooks/useFetchUsers";
import Members from "../Members/Members";

export type FbDataType = {
  id: string | number;
  name: string;
  team: string;
  level: string;
  email: string;
  department: string;
  birthday: string;
  teampass?: string;
  admin?: boolean;
  img?: string;
  telephone?: string;
}[];

const Home = () => {
  const data = useFetchUsers();
  // console.log(data)
  const [fbUser, setFbUser] = useState<any>(null);

  const [searchTitle, setSearchTitle] = useState("");

  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  // userInfo details
  // const userInfo: any = useSelector((state: RootState) => state.userInfo.userInfo)

  // console.log(userInfo);

  // Admin Result 👇
  // console.log(fbUser?.userDataResult.admin);

  // making page go to current page on reload
  const goBackToPreviousPage = () => {
    window.addEventListener("load", (e) => {
      navigate(-1);
    });
  };

  // USEEFEECT FOR PERSISTING USER AND USER DATA
  useEffect(() => {
    dispatch(registeruser());

    auth.onAuthStateChanged((authState) => {
      // console.log("User Id: " + authState?.uid);
      if (authState) {
        getDataFromId(authState?.uid);
      }
    });
  }, [dispatch]);

  // GETTING LOGGED IN USER DETAILS.
  const getDataFromId = async (id: number | string | any) => {
    // const docRef = doc(db, "users", "SF");
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    const userDataResult: any = await docSnap.data();

    // console.log(userDataResult);
    setFbUser({
      ...fbUser,
      userDataResult, 
    });

    return userDataResult;
  };

  // assigning the returned value from the function to apiResponse.
  const apiResponse = fbUser?.userDataResult;

  return (
    <>
      {user && (
        <>
          <Navbar isLoggedIn={true} isAdmin={fbUser?.userDataResult.admin} />
          <div>
            <input 
                className="home__input"
                type="text" 
                placeholder='Search...'
                onChange={(e: any) => {
                  // console.log(searchTitle)
                  setSearchTitle(e.target.value)
                }}
              />
            {/* Data from FB */}
            {/* {data && (
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
              ) } */}

            <Members searchQuery={searchTitle} />

          </div>
        </>
      )}
    </>
  );
};

export default Home;
