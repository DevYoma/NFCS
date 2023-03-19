import React, { useState } from 'react'
import './LPWhy.scss';

type WhyProp = {
  id: number;
  reason: string;
  text: string;
}

const LPWhy = () => {
  const [lists] = useState<WhyProp[]>([
    {
      id: 1,
      reason: "Convinience", 
      text: "It's time to stop jumping buses and sweating tirelessly to get to work."
    },
    {
      id: 2,
      reason: "Convinience", 
      text: "It's time to stop jumping buses and sweating tirelessly to get to work."
    },
    {
      id: 3,
      reason: "Convinience", 
      text: "It's time to stop jumping buses and sweating tirelessly to get to work."
    },
    {
      id: 4,
      reason: "Convinience", 
      text: "It's time to stop jumping buses and sweating tirelessly to get to work."
    },
    {
      id: 5,
      reason: "Convinience", 
      text: "It's time to stop jumping buses and sweating tirelessly to get to work."
    },
    {
      id: 6,
      reason: "Convinience", 
      text: "It's time to stop jumping buses and sweating tirelessly to get to work."
    }
  ])
  return (
    <div className="lpWhy">
        <h1 className="lpWhy__header">Why is <span>NFCS reminder</span>  what you need?</h1>

        <div className="lpWhy__reasons">
          {lists.map((list: WhyProp) => (
            <div className="lpWhy__reason" key={list.id}>
              <div className="lpWhy__reasonDot"></div>
              <div className="lpWhy__reasonDetails">
                <h3>{list.reason}</h3>              
                <p>{list.text}</p>
              </div>
          </div>
          ))}
        </div>
    </div>
  )
}

export default LPWhy