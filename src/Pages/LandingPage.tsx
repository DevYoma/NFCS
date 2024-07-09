import React, { useEffect, useState } from 'react'
import './LandingPage.scss';
import Navbar from '../Components/Navbar/Navbar';
import LPHero from '../Components/LPHero/LPHero';
import TeamLeaders from '../Components/TeamLeaders/TeamLeaders';
import Excos from '../Components/Excos/Excos';
import ScoreBoard from '../Components/ScoreBoard/ScoreBoard';
import Testimonial from '../Components/Testimonials/Testimonials';
import Footer from '../Components/Footer/Footer';
import LPWhy from '../Components/LPWhy/LPWhy';
import TopOfPage from '../utils/topOfPage';
import { databases } from '../AppWrite/Appwrite';
import { FbDataType } from './Home/Home';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import Portal from '../Components/Portal/Portal';


const LandingPage = () => {
  const [appWriteData, setAppWriteData] = useState<any>([])
  const [appWriteTotalUsers, setAppwriteTotalUsers] = useState(0);
  const [data, setData] = useState<FbDataType>([])
  const navigate = useNavigate()

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

  // const runWhenAppWriteIsDown = () => {
  //   if(appWriteTotalUsers === 0){
  //     fetchData()
  //   }
  // }

  useEffect(() => {
    const getTotalNumber = databases.listDocuments('64ceea379b69c1ef2b66','64ceea8cc086f25e06da');

    getTotalNumber.then(
      function(response){
        setAppWriteData(response.documents)
        setAppwriteTotalUsers(response.total)

        // runWhenAppWriteIsDown()
        fetchData()
      }, 
      function(error){
        console.log(error);
        fetchData();        
      }
    )
    
  }, [])

  // console.log('firebase', data.length);
  // console.log(appWriteTotalUsers);

  // returns user to top of page
  TopOfPage();

  return (
    <React.Fragment>
      <Navbar />
      <section id='landingPage'>
          <LPHero />
          <LPWhy />
          <TeamLeaders />
          <Excos />
          <ScoreBoard 
            totalNumber={data.length || appWriteTotalUsers}
            bethanyTeamNumber={data.filter((datum: any) => datum.team === 'bethany').length || appWriteData.filter((datum: any) => datum.team === 'bethany').length  }
            capernaumTeamNumber={data.filter((datum: any) => datum.team === 'capernaum').length || appWriteData.filter((datum: any) => datum.team === 'capernaum').length}
            galileeTeamNumber={data.filter((datum: any) => datum.team === 'galilee').length || appWriteData.filter((datum: any) => datum.team === 'galilee').length  }
            jerichoTeamNumber={data.filter((datum: any) => datum.team === 'jericho').length || appWriteData.filter((datum: any) => datum.team === 'jericho').length  }
            jordanTeamNumber={ data.filter((datum: any) => datum.team === 'jordan').length || appWriteData.filter((datum: any) => datum.team === 'jordan').length }
            nileTeamNumber={  data.filter((datum: any) => datum.team === 'nile').length || appWriteData.filter((datum: any) => datum.team === 'nile').length }
          />
          {/* <Testimonial /> */}
          <Footer />
      </section>
    </React.Fragment>
  )
}

export default LandingPage