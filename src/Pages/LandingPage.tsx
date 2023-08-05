import React, { useState } from 'react'
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
import { FbDataType } from './Home/Home';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux'
// import { RootState } from '../Features/store';
// import LPAddress from '../Components/LPAddress/LPAddress';
// import { db } from '../Firebase/Firebase';
// import { collection, getDocs } from 'firebase/firestore';
// import {  logout } from '../Features/user/userSlice'

const LandingPage = () => {
  const [datas, setData] = useState<FbDataType>([])
  const [bethanyNumber, setBethanyNumber] = useState(0);
  const [capernaumNumber, setCapernaumNumber] = useState(0);
  const [galileeNumber, setGalileeNumber] = useState(0);
  const [jerichoNumber, setJerichoNumber] = useState(0);
  const [jordanNumber, setJordanNumber] = useState(0);
  const [nileNumber, setNileNumber] = useState(0);
  
  // const navigate = useNavigate();
  // const user = useSelector((state: RootState) => state.user.user)
  // const dispatch = useDispatch()

  // console.log(user);

  // const fetchData = async () => {
  //   let list: any = [];
  //   try{
  //     const querySnapshot = await getDocs(collection(db, "users"));
  //     querySnapshot.forEach((doc) => {
  //       list.push({id: doc.id, ...doc.data()}) // spreading the data object in the list object.
  //       // doc.data() is never undefined for query doc snapshots
  //       // console.log(doc.id, " => ", doc.data());

  //       setData(list);
  //       // return datas;
  //     });
  //   }catch(error) {
  //     console.log(error);
  //   }
  // }

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
            totalNumber={datas.length}
            bethanyTeamNumber={datas.filter(datum => datum.team === 'bethany').length}
            capernaumTeamNumber={datas.filter(datum => datum.team === 'capernaum').length}
            galileeTeamNumber={datas.filter(datum => datum.team === 'galilee').length}
            jerichoTeamNumber={datas.filter(datum => datum.team === 'jericho').length}
            jordanTeamNumber={datas.filter(datum => datum.team === 'jordan').length}
            nileTeamNumber={datas.filter(datum => datum.team === 'nile').length}
          />
          <Testimonial />
          <Footer />
      </section>
    </React.Fragment>
  )
}

export default LandingPage