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
      reason: "BIRTHDAY REMINDERS", 
      text: "Team Leaders and Members can use this product to keep track of the birthdays of their team members, making it easier for them to acknowledge and celebrate each person on their special day"
    },
    {
      id: 2,
      reason: "MEMBER PROFILES", 
      text: "Team leaders will have a consistent pool of data on their team members, including contact information and other important details. "
    },
    {
      id: 3,
      reason: "TIME-SAVING", 
      text: "Our product can save student (team leaders especially) from the hassle of having to collate and gather data manually on whatsApp. Everything the need is conveniently located in one place"
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