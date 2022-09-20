import React ,{  useState } from 'react'
import './BirthdayCelebrants.scss';
import Celeb1 from '../../assets/celeb1.png';
import Celeb2 from '../../assets/celeb2.png';
import Celeb3 from '../../assets/celeb3.png';
import Celeb4 from '../../assets/celeb4.png';

type BirthdayProps = {
    header: string;
}

const BirthdayCelebrants = ({ header }: BirthdayProps) => {
    const [people] = useState([
        {
            id: 1, 
            pic: Celeb1
        }, 
        {
            id: 2, 
            pic: Celeb2
        },
        {
            id: 3, 
            pic: Celeb3,
        },
        {
            id: 4, 
            pic: Celeb4
        },
        {
            id: 5, 
            pic: Celeb1
        }, 
        {
            id: 6, 
            pic: Celeb2
        },
    ])
  return (
    <section id='birthdayCelebrants'>
        <h3>{header}</h3>

        <div className="birthdayCelebrants__container">
            {people.map(person => (
                <img key={person.id} src={person.pic} alt={`pic-${person.id}`} />
            ))}
        </div>
    </section>
  )
}

export default BirthdayCelebrants