import React, { useRef, useState } from 'react'
import './Excos.scss';
import Exco1 from '../../assets/exco1.png';
import Exco2 from '../../assets/exco2.png';
import Exco3 from '../../assets/exco3.png';
import Exco4 from '../../assets/exco4.png';
import { IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


export const nfcsExcos = [
    {
        id: 1, 
        name: "Adekoya Toluwani", 
        picture: Exco1,
        role: 'Exco 🚀'
    },
    {
        id: 2, 
        name: "Adekoya Toluwani", 
        picture: Exco2,
        role: 'Exco '
    },
    {
        id: 3, 
        name: "Adekoya Toluwani", 
        picture: Exco3,
        role: 'Exco '
    },
    {
        id: 4, 
        name: "Adekoya Toluwani", 
        picture: Exco4,
        role: 'Exco '
    },
    {
        id: 5, 
        name: "Adekoya Toluwani", 
        picture: Exco1,
        role: 'Exco '
    },
    {
        id: 6, 
        name: "Adekoya Toluwani", 
        picture: Exco2,
        role: 'Exco '
    },
    {
        id: 7, 
        name: "Adekoya Toluwani", 
        picture: Exco4,
        role: 'Exco '
    },
    {
        id: 8, 
        name: "Adekoya Toluwani", 
        picture: Exco1,
        role: 'Exco '
    }
]

const Excos = () => {
    const elementRef = useRef(null);
    const [arrowDisable, setArrowDisable] = useState<boolean>(true);

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

        <div className="arrowRight">
            <IconButton onClick={() => handleHorizantalScroll(elementRef.current, 25, 100, 10)}>
                <ArrowForwardIcon sx={{
                    color: "white"
                }}/>
            </IconButton>
        </div>
    </div>
  )
}

export default Excos