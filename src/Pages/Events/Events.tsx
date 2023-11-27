import React from 'react'
import './Events.scss';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const Events = () => {
  const events = [
    {
      id: 1, 
      title: "Doctrinal Tuesday (THE CHURCH TEACHES)", 
      text: "To know and understand the Catholic faith", 
      date: "28th November, 2023"
    }, 
    {
      id: 2, 
      title: "relationship tuesday: foundation for building good relationships",
      text: "Building a healthy and God's standard relationship", 
      date: "5th of December, 2023"
    }, 
    {
      id: 3, 
      title: "Empowerment Tuesday: Taking charge of your finance: Concept of savings and investment", 
      text: "To learn how to be financially stable as students", 
      date: "12th of December, 2023"
    }, 
    {
      id: 4, 
      title: "group discussion", 
      text: "Coming together as NFCS family to share opinions for the common good", 
      date: "19th of December, 2023"
    }, 
    {
      id: 5, 
      title: "doctrinal tuesday (the church teaches)", 
      text: "To know and understand the Catholic doctrine", 
      date: "26th of December, 2023"
    },
    {
      id: 6, 
      title: "Academic tuesday: Artificial Intelligence as an aid or takeover", 
      text: "To know the pros and cons of AI in our society", 
      date: "2nd of January, 2024"
    }, 
    {
      id: 7, 
      title: "relationship tuesday: gen z courtships vs my faith", 
      text: "To gain the right knowledge for godly courtship in the 21st century", 
      presentation: "Special Intervention: Team Capernaum",
      date: "9th of January, 2024"
    },
    {
      id: 8, 
      title: "group discussion", 
      text: "Coming together as NFCS family to share opinions for the common good", 
      date: "16th of January, 2024"
    },
    {
      id: 9, 
      title: "Success mass", 
      text: "To Pray as a family for divine assistance in our examinations", 
      date: "23rd of January, 2024"
    },
    {
      id: 10, 
      title: "an hour with the lord", 
      text: "To commune with God within the context of Eucharistic exposition", 
      date: "30th of January, 2024"
    },
    {
      id: 11, 
      title: "an hour with the lord", 
      text: "To commune with God within the context of Eucharistic exposition", 
      date: "6th of February, 2024"
    },
    {
      id: 12, 
      title: "an hour with the lord", 
      text: "To commune with God within the context of Eucharistic exposition", 
      date: "13th of February, 2024"
    },
    {
      id: 13, 
      title: "Closing mass", 
      text: "Coming together to pray as a family for success in our just concluded examination", 
      date: "20th of February, 2024"
    }
  ]
  return (
    <div className="eventsPage">
      <Navbar />

      <div className="eventsPage__main">
        <h1>Check out our upcoming Fellowship events</h1>

        <div className="eventsPage__mainFellowships">

          {events.map(event => (
            <div key={event.id} className="eventsPage__mainFellowshipsEvent">
              <h3>{event.title}</h3>
              <p>{event.text}</p>

              <p>{event.date}</p>
            </div>
          ))}

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Events