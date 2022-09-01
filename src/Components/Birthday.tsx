import { collection, getDocs } from '@firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { db } from '../Firebase/Firebase';
import SkeletonElement from './Skeletons/SkeletonElement';

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


    const today = new Date();
    
    const stringifiedToday = today.getMonth();
    // console.log(stringifiedToday);

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


    const filterByDate = data.filter(list => {
        // console.log(parseInt(list.birthday.split("-")[2]))
        return  parseInt((list.birthday.split("-")[2])) === parseInt(today.getDate().toString()) && parseInt(list.birthday.split("-")[1]) - 1 === today.getMonth()
    })

    console.log(filterByDate);
    console.log(selectedTeam);

  return (
    <>
        <h2>Filtered Birthday List</h2>
        <p>Go back to home page <Link to={'/home'}>Home Page</Link></p>

        <p style={{ fontSize: "14px"}}>Number of birthday Celebrants - {filterByDate.length}</p>
        {/* {data.length === 0 && <p>No Birthday today 🤕</p>}

      {!data.length && <p>No Birthdays available</p>} */}
         <select 
            value={selectedTeam}
            required
            onChange={(e: any) => setSelectedTeam(e.target.value)}
            name="team"
        >
        {teams.map(team => (
                <option key={team.value} value={team.value}>{team.label}</option>
        ))}
        </select>

        {
          data.length !== 0 ? (
            <>
            { filterByDate.filter((value: any) => {
              if(selectedTeam === ""){
                return value
              }else if(value?.team === selectedTeam){
                console.log(value);
                return value;
              }
            }).map((data: any) => (
                <div key={data.id}>
                  <p>{data.name} === {data.birthday}</p>
                  <img src={data.img} alt="userImg" />
                </div>
            ))}
            </>
          ) : (
            [1,2,3,4,5].map((n) => <SkeletonElement key={n} type='title' />)
          )
        }


        {
          filterByDate.length === 0 && <p>No Birthday today</p>
        }

        {/* previous code */}
        {/* {
            filterByDate.map((data: any) => (
                <p key={data.id}>{data.name} === {data.birthday}</p>
            ))
        } */}
        
    </>
  )
}

export default Birthday