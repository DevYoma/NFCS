import { collection, getDocs, getDoc, doc } from '@firebase/firestore';
import { CSSProperties, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { auth, db } from '../../Firebase/Firebase';
import AppNav from '../../Components/AppNav/AppNav';
import SkeletonElement from '../../Components/Skeletons/SkeletonElement';
import './Birthday.scss';
import BirthdayLogo from '../../assets/birthday.png'
import { list } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { registeruser } from '../../Features/user/userSlice';
import { RootState } from '../../Features/store';
import { ordinal } from '../../utils/helper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import ClipLoader from "react-spinners/ClipLoader";
import PuffLoader from "react-spinners/PuffLoader";


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

    // for getting user info
    const [fbUser, setFbUser] = useState<any>(null);

 
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

    const today = new Date();
    const dispatch = useDispatch()

    
    const stringifiedToday = today.getMonth();
    // console.log(stringifiedToday);

    // USEEFFECT FOR GETTING ALL USER DATA FROM FB
    useEffect(() => {

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

    // BIRTHDAY FILTER LOGIC
    const filterByDate = data.filter(list => {
        return  parseInt((list.birthday.split("-")[2])) === parseInt(today.getDate().toString()) && parseInt(list.birthday.split("-")[1]) - 1 === today.getMonth()
    })

    // BIRTHDAY FOR THE DAY
    // console.log(filterByDate);

    
    // USEEFEECT FOR PERSISTING USER AND USER DATA
    useEffect(() => {
      dispatch(registeruser());

      auth.onAuthStateChanged(authState => {
        console.log("User Id: " + authState?.uid);
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

      // SPINNER
      const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        // borderColor: "red",
      };

  return (
    <section id='birthdayPage'>
        <AppNav 
          username={apiResponse?.name}
          image={apiResponse?.img}
        />
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

          <p className="birthdayPage__today">Today's Birthdays</p>

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

                        {/* <p>{data.birthday}</p>
                        <p>{data.team}</p> */}
                      <div className="birthdayCard__body">
                        <p className='birthdayCard__bodyName'>{data.name}</p>
                        <p className='birthdayCard__bodyDate'>{ordinal(Number(data.birthday.slice(8, 10)))} of {today.toLocaleString('default', {month: 'long'})}</p>
                        <KeyboardArrowDownIcon fontWeight="400" className='birthdayCard__bodyIcon'/>
                      </div>
                    </div>
                ))}
              </section>
            ) : (
              // [1,2].map((n) => <SkeletonElement key={n} type='card' />
              // )
              // <p>Loading...</p>
              <PuffLoader color="#0A55E4" loading={true} cssOverride={override} size={100} />
            )
          }


          {
            filterByDate.length === 0 && <p>No Birthday today</p>
          }
        </div>

        
    </section>
  )
}

export default Birthday
{/* previous code */}
{/* {
    filterByDate.map((data: any) => (
        <p key={data.id}>{data.name} === {data.birthday}</p>
    ))
} */}