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



const LandingPage = () => {
  const [appWriteData, setAppWriteData] = useState<any>([])
  const [appWriteTotalUsers, setAppwriteTotalUsers] = useState(0);
  const [data, setData] = useState<FbDataType>([])
  const navigate = useNavigate()


  useEffect(() => {
    const getTotalNumber = databases.listDocuments('64ceea379b69c1ef2b66','64ceea8cc086f25e06da');

    getTotalNumber.then(
      function(response){
        setAppWriteData(response.documents)
        setAppwriteTotalUsers(response.total)
      }, 
      function(error){
        // console.log(error);
      }
    )
    
  }, [])

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
    }, []);

      // USEEFFECT TO READ USER DATA ON PAGE LOAD
    // useEffect(() => {
    //   console.log(data.length);
    //   // console.log(data);
    // }, [data])


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
            totalNumber={appWriteTotalUsers || data.length}
            bethanyTeamNumber={appWriteData.filter((datum: any) => datum.team === 'bethany').length || data.filter((datum: any) => datum.team === 'bethany').length}
            capernaumTeamNumber={appWriteData.filter((datum: any) => datum.team === 'capernaum').length || data.filter((datum: any) => datum.team === 'capernaum').length}
            galileeTeamNumber={appWriteData.filter((datum: any) => datum.team === 'galilee').length || data.filter((datum: any) => datum.team === 'galilee').length}
            jerichoTeamNumber={appWriteData.filter((datum: any) => datum.team === 'jericho').length || data.filter((datum: any) => datum.team === 'jericho').length}
            jordanTeamNumber={appWriteData.filter((datum: any) => datum.team === 'jordan').length || data.filter((datum: any) => datum.team === 'jordan').length}
            nileTeamNumber={appWriteData.filter((datum: any) => datum.team === 'nile').length || data.filter((datum: any) => datum.team === 'nile').length}
          />
          <Testimonial />
          <Footer />
      </section>
    </React.Fragment>
  )
}

export default LandingPage