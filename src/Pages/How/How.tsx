import { useNavigate } from 'react-router-dom'
import Button from '../../Atoms/Button/Button'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import './How.scss'
import Steps, { objProperties } from '../../Components/Steps/Steps'
import TopOfPage from '../../utils/topOfPage'
import HomePic from '../../assets/homePageScreen.png'
import RegisterPic from '../../assets/registerScreen.png'

const How = () => {
  
  TopOfPage();

  const steps = [
    {
      id: 1, 
      title: "Explore", 
      text1: "Check out our landing page and find out the vision behind the NFCS community app. Meet team leaders and community executives and view the team scoreboard to know where your team stands.",
      text2: " Explore heartfelt testimonials and stay connected as we empower and make our community management better.",
      pic: HomePic
    },
    {
      id: 2, 
      title: "Register",
      text1: "Join the NFCS community by registering on the app. Celebrate together with fellow community members on the birthday page.",
      text2: "Customize your profile to reflect your uniqueness and help us acheive communitiy management faster and better",
      rtl: true,
      pic: RegisterPic
    },
    {
      id: 3, 
      title: "Manage(Team Leaders and Excos)", 
      text1: "Team leads get access to a personalized dashboard, providing invaluable data and tools for effective team management.",
      text2: "Utilize data-driven insights for better celebration planning and seamless event coordination, fostering deeper connections within your team and the federation at large", 
      pic: ''
    }
  ]

  const navigate = useNavigate();
  return (
    <div className="how">
      <Navbar hideBoxShadow={true} />

      <div className="how__header">
        <h1>Be the catalyst for better team</h1>
        <h1>management in our NFCS community!</h1>
      </div>      

      {/* STEPS */}
      <div className="how__steps">
        {
          steps.map((step: objProperties) => (
            <Steps 
              key={step.id}
              stepProp={step}
            />
          ))
        }
      </div>
      
      <div className="how__ready">
        <h2>Ready to start your journey?</h2>
        <Button
          onClick={() => navigate('/')}
        >
          Explore Landing Page
        </Button>
      </div>

      <Footer />
    </div>
  )
}

export default How