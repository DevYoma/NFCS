import { collection, getDocs } from '@firebase/firestore';
import { CSSProperties, useEffect, useState } from 'react'
import { db } from '../../Firebase/Firebase';
import AppNav from '../../Components/AppNav/AppNav';
import './Birthday.scss';
import BirthdayLogo from '../../assets/birthday.png'
// import { useDispatch } from 'react-redux';
import { ordinal } from '../../utils/helper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PuffLoader from "react-spinners/PuffLoader";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Features/store';
import { useNavigate, Navigate } from 'react-router-dom'
import BirthdayCard from '../../Components/BirthdayCard/BirthdayCard';
import { registeruser, logout } from '../../Features/user/userSlice';


type FbDataType = {
    id: string | number;
    name: string;
    team: string;
    level: string;
    email: string;
    department: string;
    birthday: string;
  }[]

const Birthday = () => {
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

  const user: boolean = useSelector((state: RootState) => state.user.user)
  console.log(user);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const today = new Date();
  

    // USEEFFECT FOR GETTING ALL USER DATA FROM FB
    useEffect(() => {
        dispatch(registeruser())
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
    }, [dispatch]);

    // useEffect(() => {
    //   dispatch(registeruser())
    // }, [dispatch])

    // BIRTHDAY FILTER LOGIC
    const filterByDate = data.filter(list => {
        return  parseInt((list.birthday.split("-")[2])) === parseInt(today.getDate().toString()) && parseInt(list.birthday.split("-")[1]) - 1 === today.getMonth()
    })

    // BIRTHDAY FILTER LOGIC FOR NEXT DAY
    const upComingBirthday = data.filter(list => {
      return parseInt((list.birthday.split("-")[2])) === parseInt((today.getDate() + 1).toString()) && parseInt(list.birthday.split("-")[1]) - 1 === today.getMonth()
    })

    console.log(upComingBirthday);
    console.log(today.getDate() -1);

    // BIRTHDAY FOR THE DAY
    // console.log(filterByDate);

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

  return (
    <>
      {/* {!user && <Navigate to={'/'}/>} */}

      {user && (
        <>
        <section id='birthdayPage'>
          <AppNav />
          <div className="birthdayPage__main">

            <h3 className='birthdayPage__teams'>Teams</h3>
            
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

            {filterByDate.length === 0 ? <p className='birthdayPage__today'>We Don't have any Birthday Celebrants today</p> :<p className="birthdayPage__today">We have {filterByDate.length} Birthday Celebrants 🎂</p>}


            {/* FILTERED BIRTHDAY CELEBRANTS */}
            {
              data.length !== 0 ? (
                <section className='birthdayCard__container'>
                  { filterByDate.filter((value: any) => {
                    if(selectedTeam === ""){
                      return value
                    }else if(value?.team === selectedTeam){
                      console.log(value);
                      return value;
                    }
                  }).map((data: any) => (
                      <div className="birthdayCard" key={data.id}>
                        <div className="birthdayCard__header">
                          <img src={data.img} alt="userImg" className='birthdaycard__userImage' />
                          <p className='birthday__paragraph'>
                            Happy Birthday  
                            <img src={BirthdayLogo} alt="birthdayIcon" className='birthday__icon' /> 
                          </p>
                        </div>

                        <div className="birthdayCard__body">
                          <p className='birthdayCard__bodyName'>{data.name}</p>
                          <p className='birthdayCard__bodyDate'>{ordinal(Number(data.birthday.slice(8, 10)))} of {today.toLocaleString('default', {month: 'long'})}</p>
                          <KeyboardArrowDownIcon fontWeight="400" className='birthdayCard__bodyIcon'/>
                        </div>
                      </div>
                      // <BirthdayCard data={data}/>
                  ))}
                </section>
              ) : (
                // [1,2].map((n) => <SkeletonElement key={n} type='card' />
                // )
                // <p>Loading...</p>
                <PuffLoader color="#0A55E4" loading={true} cssOverride={override} size={100} />
                )

            }
          </div>

          <div className="tomorrowBirthday">
            <h2>Tomorrow's Birthdays</h2>
            {upComingBirthday.map((upComing: any) => {
              return( 
                <div>
                  {upComing.name}
                </div>
              )
            })}
          </div>          
        </section>
        </>
      )}

      {!user && goBackToPreviousPage()}

     </>
  )
}

export default Birthday