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



const LandingPage = () => {
  const [appWriteData, setAppWriteData] = useState<any>([])
  const [appWriteTotalUsers, setAppwriteTotalUsers] = useState(0);

  useEffect(() => {
    const getTotalNumber = databases.listDocuments('64ceea379b69c1ef2b66','64ceea8cc086f25e06da');

    getTotalNumber.then(
      function(response){
        setAppWriteData(response.documents)
        setAppwriteTotalUsers(response.total)
      }, 
      function(error){
        console.log(error);
      }
    )
    
  }, [])

  // returns user to top of page
  TopOfPage();

  return (
    <React.Fragment>
      <Navbar />
      <section id='landingPage'>
          <LPHero />
          {/* <LPAddress /> */} 
          <LPWhy />
          <TeamLeaders />
          <Excos />
          <ScoreBoard 
            totalNumber={appWriteTotalUsers}
            bethanyTeamNumber={appWriteData.filter((datum: any) => datum.team === 'bethany').length}
            capernaumTeamNumber={appWriteData.filter((datum: any) => datum.team === 'capernaum').length}
            galileeTeamNumber={appWriteData.filter((datum: any) => datum.team === 'galilee').length}
            jerichoTeamNumber={appWriteData.filter((datum: any) => datum.team === 'jericho').length}
            jordanTeamNumber={appWriteData.filter((datum: any) => datum.team === 'jordan').length}
            nileTeamNumber={appWriteData.filter((datum: any) => datum.team === 'nile').length}
          />
          <Testimonial />
          <Footer />
      </section>
    </React.Fragment>
  )
}

export default LandingPage