import React from 'react'
import './TeamLeaders.scss';
import BethanyTL from '../../assets/bethanyTL.png';
import CarpernaumTL from '../../assets/capernaumLead.png';
import GalileeTL from '../../assets/galileeLead.png';
import JerichoTL from '../../assets/jerichoLead.png';
import JordanTL from '../../assets/jordanLead.png';
import NileTL from '../../assets/nileLead.png';

export const teamLeaders = [
    {
        id: 1, 
        name: "Adekoya Toluwani", 
        team: "Bethany",
        picture: BethanyTL
    },
    {
        id: 2, 
        name: "Adekoya Toluwani", 
        team: "Carpernaum", 
        picture: CarpernaumTL
    },
    {
        id: 3, 
        name: "Adekoya Toluwani", 
        team: "Galilee",
        picture: GalileeTL
    },
    {
        id: 4, 
        name: "Adekoya Toluwani", 
        team: "Jericho",
        picture: JerichoTL
    },
    {
        id: 5, 
        name: "Adekoya Toluwani", 
        team: "Jordan",
        picture: JordanTL
    },
    {
        id: 6, 
        name: "Adekoya Toluwani", 
        team: "Nile", 
        picture: NileTL
    }
]

const TeamLeaders = () => {
  return (
    <div className="teamLeaders">
        <h2 className="teamLeaders__header">Meet your Team Leaders</h2>
        <div className="teamLeaders__cover">
            {teamLeaders.map((teamLead: any, index) => (
                <div className="teamLeader" key={teamLead.id}>
                    <img src={teamLead.picture} alt="bethany" />
                    <h4>{teamLead.name}</h4>
                    <p>{teamLead.team} Team Lead</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default TeamLeaders