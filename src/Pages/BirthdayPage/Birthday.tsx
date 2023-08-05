import { collection, doc, getDoc, getDocs } from '@firebase/firestore';
import { CSSProperties, useEffect, useState } from 'react'
import { auth, db } from '../../Firebase/Firebase';
import './Birthday.scss';
import PuffLoader from "react-spinners/PuffLoader";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Features/store';
import { useNavigate } from 'react-router-dom'
import { registeruser } from '../../Features/user/userSlice';
import Navbar from '../../Components/Navbar/Navbar';
// import { ordinal } from '../../utils/helper';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import BirthdayCard from '../../Components/BirthdayCard/BirthdayCard';


export type FbDataType = {
    id: string | number;
    name: string;
    team: string;
    level: string;
    email: string;
    department: string;
    birthday: string;
  }[]

const Birthday = () => {
  //contains all REGISTERED USERS and TOTAL NUMBER
    const [data, setData] = useState<FbDataType>([])
 
    const [selectedTeam, setSelectedTeam] = useState('')
    const teams = [
      {
        label: "All Teams",
        value: ""
      },
      {
          label: "Bethany",
          value: "bethany",
      },
      {
          label: "Capernaum", 
          value: "capernaum",
      },
      {
          label: "Galilee",
          value: "galilee"
      },
      {
          label: "Jericho",
          value: "jericho"
      },
      {
          label: "Jordan",
          value: "jordan"
      },
      {
          label: "Nile",
          value: "nile"
      },
    ]

    // Firebase User Result
    const [fbUser, setFbUser] = useState<any>(null);

    const user: boolean = useSelector((state: RootState) => state.user.user)
    // console.log(user);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const today = new Date();
  
    // USEEFFECT FOR GETTING ALL USER DATA FROM FB
    useEffect(() => {
        // dispatch(registeruser())

        // PREVENTING RE-ROUTING ON PAGE REFRESH
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
    
          // return () => {
          //   fetchData();
          // }
    }, []);

    // console.log(data);

    // Checking for all users (TOTAL NUMBER)
    // console.log(data.length)

     // USEEFEECT FOR PERSISTING USER AND USER DATA
     useEffect(() => {
      dispatch(registeruser());

      auth.onAuthStateChanged(authState => {
        // console.log("User Id: " + authState?.uid);
        if(authState){
          getDataFromId(authState?.uid);
        }
        else if(authState === null){
          navigate('/')
        }
        else{
          navigate(-1); // PROTECTED ROUTE
        }
      })
    }, [dispatch])

  
    // BIRTHDAY FILTER LOGIC
    const filterByDate = data.filter(list => {
        return  parseInt((list.birthday.split("-")[2])) === parseInt(today.getDate().toString()) && parseInt(list.birthday.split("-")[1]) - 1 === today.getMonth()
    })

    // BIRTHDAY FILTER LOGIC FOR NEXT DAY
    const upComingBirthday = data.filter(list => {
      return parseInt((list.birthday.split("-")[2])) === parseInt((today.getDate() + 1).toString()) && parseInt(list.birthday.split("-")[1]) - 1 === today.getMonth()
    })

      // SPINNER
      const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        // borderColor: "red",
      };

    // making page go to current page on reload
      const goBackToPreviousPage = () => {
        window.addEventListener("load", e => {
      navigate(-1);
    })
}


    // GETTING LOGGED IN USER DETAILS.
    const getDataFromId = async (id: number | string | any) => {
      // const docRef = doc(db, "users", "SF");
      const docRef = doc(db, "users", id)
      const docSnap = await getDoc(docRef);

      const userDataResult: any = await (docSnap.data())

      // USERDATA LOGGED TO CONSOLE
      // console.log(userDataResult)
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
        <section id='birthdayPage'>
          <Navbar isLoggedIn={true}/>
          <div className="birthdayPage__main">

            <div className="birthdayPage__header">
              <div className="birthdayPage__headerDetails">
                <h1>Hi {apiResponse?.name}</h1>
                <p>welcome</p>
              </div>

              {/* SEARCH FUNCTIONALITY */}
            </div>

            <select 
              className='birthdayPage__select'
              style={{
                padding: "3px"
              }}
              value={selectedTeam}
              required
              onChange={(e: any) => setSelectedTeam(e.target.value)}
              name="team"
            >            
              {teams.map(team => (
                <option key={team.value} value={team.value}>{team.label}</option>
              ))}
            </select>

            <div className="birthdayPage__today">Today</div>

            {/* FILTERED BIRTHDAY CELEBRANTS */}
            {
              data.length !== 0 ? (
                <section className='birthdayCard__container'>
                  { filterByDate.filter((value: any) => {
                    if(selectedTeam === ""){
                      // console.log(value);
                      return value
                    }else if(value?.team === selectedTeam){
                      // console.log(value);
                      return value;
                    }
                  }).map((data: any) => (
                      <div className={`birthdayCard ${data.team}`} key={data.id}>
                        <div className="birthdayCard__header">
                          <img src={data.img} alt="userImg" className='birthdaycard__userImage' />
                          <p className='birthdayCard__headerName'>{data.name}</p>
                        </div>

                        <div className="birthdayCard__body">
                          <p className="birthdayCard__bodyText">It's {data.name.split(" ")[1] ? data.name.split(" ")[1] : data.name.split(" ")[0]  } birthday today 🎂</p>
                        </div>
                      </div>
                  ))}
                </section>
              ) 
              : 
              (
                <PuffLoader color="#0A55E4" loading={true} cssOverride={override} size={100} />
              )
            }
          </div>

          {/* <div className="tomorrowBirthday">
            <h2>Tomorrow's Birthdays</h2>
            {upComingBirthday.map((upComing: any) => {
              return( 
                <div>
                  {upComing.name}
                </div>
              )
            })}
          </div>           */}
        </section>
        </>
      )}

      {!user && goBackToPreviousPage()}

     </>
  )
}

export default Birthday