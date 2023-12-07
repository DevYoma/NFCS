import { useRef, useState, useEffect } from 'react'
import './Excos.scss';
import { IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import President from '../../assets/excos/joel.jpg';
import VicePresident from '../../assets/excos/catherine.jpg';
import Secretary from '../../assets/excos/stephen.jpg';
import ViceSecretary from '../../assets/excos/elizabeth.jpg';
import FinancialSecretary from '../../assets/excos/helen.jpg';
import Treasurer from '../../assets/excos/ope.jpg';
import BroCoordinator from '../../assets/excos/chigozie.jpg';
import FemaleCoordinator from '../../assets/excos/rosemary.jpg';
import ProtocolMale from '../../assets/excos/john.jpg';
import ProtocolFemale from '../../assets/excos/faith.jpg';
import PublicityMale from '../../assets/excos/pelumi.jpg';
import PublicityFemale from '../../assets/excos/tolu.jpg';
import WelfareMale from '../../assets/excos/seun.jpg';
import WelfareFemale from '../../assets/excos/florence.jpg';
import AcademicFemale from '../../assets/excos/chisom.jpg';
import AcademicMale from '../../assets/excos/julius.jpg';
import SportMale from '../../assets/excos/benedict.jpg';
import SportFemale from '../../assets/excos/emily.jpg';
import PD from '../../assets/excos/uche.jpg';
import Fedcamps from '../../assets/excos/cynthia.jpg';
import Calsan from '../../assets/excos/vivian.jpg';
import RockTheatre from '../../assets/excos/ben.jpg';
import Crusaders from '../../assets/excos/doreen.jpg';
import ExOfficio from '../../assets/excos/matuluko.jpg'


export const nfcsExcos = [
    {
        id: 1, 
        name: "Nnamani Joel Ifeanyichukwu", 
        picture: President,
        role: 'President'
    },
    {
        id: 2, 
        name: "Popoola Catherine", 
        picture: VicePresident,
        role: 'Vice President '
    },
    {
        id: 3, 
        name: "Omosebi Stephen", 
        picture: Secretary,
        role: 'General Secretary. '
    },
    {
        id: 4, 
        name: "Isichei Elizabeth Chukwuamaka.", 
        picture: ViceSecretary,
        role: 'ExcoAssistant General Secretary'
    },
    {
        id: 5, 
        name: "Amodu Helen", 
        picture: FinancialSecretary,
        role: 'Financial Secretary'
    },
    {
        id: 6, 
        name: "Oyafemi Opeyemi", 
        picture: Treasurer,
        role: 'Office-Treasurer '
    },
    {
        id: 7, 
        name: "Ndife Chigozie Charles", 
        picture: BroCoordinator,
        role: "Brother's coordinator"
    },
    {
        id: 8, 
        name: "Fagunwa Rosemary", 
        picture: FemaleCoordinator,
        role: "Sister's Coordinator"
    },
    {
        id: 9,
        name: "Aderinto John",
        picture: ProtocolMale,
        role: "Protocol Committee Head(Male)"
    },
    {
        id: 10, 
        name: "Daniel Faith",
        picture: ProtocolFemale,
        role: "Protocol Committee Head(Female)"
    },
    {
        id: 11, 
        name: "Omotunde Sylvester",
        picture: PublicityMale, 
        role: "Publicity Committee Head(Male)"
    }, 
    {
        id: 12, 
        name: "Agbemuko Tolulope",
        picture: PublicityFemale, 
        role: "Publicity Committee Head(Female)"
    },
    {
        id: 13, 
        name: "Adebayo Alexander", 
        picture: WelfareMale ,
        role: "Welfare Head(Male)"
    },
    {
        id: 14, 
        name: "Oha Florence", 
        picture: WelfareFemale ,
        role: "Welfare Head(Female)"
    },
    {
        id: 15, 
        name: "Okeke Chisom", 
        picture: AcademicFemale ,
        role: "Academic Head (Female)"
    },
    {
        id: 16, 
        name: "Ojuawo Julius", 
        picture: AcademicMale ,
        role: "Academic Head(Male)"
    },
    {
        id: 17, 
        name: "Adovonne Emily", 
        picture: SportFemale ,
        role: "Sport Director(Female)"
    },
    {
        id: 18, 
        name: "Disi Benedict", 
        picture: SportMale ,
        role: "Sport Director(Male)"
    },
    {
        id: 19, 
        name: "Uchenna Obi", 
        picture: PD ,
        role: "Predegree Coordinator(Male)"
    },
    {
        id: 20, 
        name: "Cynthia Ukor", 
        picture: Fedcamps ,
        role: " FECAMDS President"
    },
    {
        id: 21, 
        name: "Okechukwu Vivian", 
        picture: Calsan ,
        role: "CALSAN President"
    },
    {
        id: 22, 
        name: "Omotola Benedict", 
        picture: RockTheatre ,
        role: "Rock Theatre Head"
    },
    {
        id: 23, 
        name: "Adaiwo Doreen", 
        picture: Crusaders ,
        role: "Crusaders Head"
    },
    {
        id: 24, 
        name: "Matuluko Mary",
        picture: ExOfficio,
        role: "Ex Officio"
    }
]

const Excos = () => {
    const elementRef = useRef(null);
    const [arrowDisable, setArrowDisable] = useState<boolean>(true);

    // getting screenWidth
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        }

        // Attach the event listener for window resize
        window.addEventListener('resize', handleResize);

        // clean up the event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    // console.log(screenWidth);

    const scrollSpeedByScreenWidth = () => {
        if (screenWidth <= 500){
            return 150
        }else{
            return 500
        }
    }

    const handleHorizantalScroll = (element: any, speed: any, distance: any, step: any) => {
        let scrollAmount: number = 0;
        const slideTimer = setInterval(() => {
          element.scrollLeft += step;
          scrollAmount += Math.abs(step);
          if (scrollAmount >= distance) {
            clearInterval(slideTimer);
          }
          if (element.scrollLeft === 0) {
            setArrowDisable(true);
          } else {
            setArrowDisable(false);
          }
        }, speed);
      };

    //   console.log(arrowDisable);

  return (
    <div className="excos">
        <h2 className="excos__header">NFCS EXCOS</h2>

            <div className="excos__container" ref={elementRef}>
                {nfcsExcos.map((nfcsExco: any) => (
                    <div className="exco" key={nfcsExco.id} >
                        <img src={nfcsExco.picture} alt={nfcsExco.name} />
                        <h3>{nfcsExco.name}</h3>
                        <p>{nfcsExco.role}</p>
                    </div>
                ))}
            </div>
                
        <div className="arrow">
            <div className="arrowLeft">
                <IconButton onClick={() => handleHorizantalScroll(elementRef.current, 10, scrollSpeedByScreenWidth(), -10)}>
                    <ArrowBackIcon sx={{
                        color: "white"
                    }}/>
                </IconButton>
            </div>

            <div className="arrowRight">
                <IconButton onClick={() => handleHorizantalScroll(elementRef.current, 10, scrollSpeedByScreenWidth(), 10)}>
                    <ArrowForwardIcon sx={{
                        color: "white"
                    }}/>
                </IconButton>
            </div>
        </div>
    </div>
  )
}

export default Excos;