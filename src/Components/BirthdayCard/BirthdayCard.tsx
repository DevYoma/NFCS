import './BirthdayCard.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BirthdayLogo from '../../assets/birthday.png'
import { ordinal } from '../../utils/helper';

type BirthdayCardProp = {
    data: any;
}

const BirthdayCard = ({ data }: BirthdayCardProp) => {
    const today = new Date();

  return (
    <div className="birthdayCard" key={data.id}>
        <div className="birthdayCard__header">
        <img src={data.img} alt="userImg" className='birthdaycard__userImage' />
        <p className='birthday__paragraph'>
            Happy Birthday  
            <img src={BirthdayLogo} alt="birthdayIcon" className='birthday__icon' /> 
        </p>
        </div>

        <div className="birthdayCard__body">
        <p className='birthdayCard__bodyName'>{data.name}</p>
        <p className='birthdayCard__bodyDate'>{ordinal(Number(data.birthday.slice(8, 10)))} of {today.toLocaleString('default', {month: 'long'})}</p>
        <KeyboardArrowDownIcon fontWeight="400" className='birthdayCard__bodyIcon'/>
        </div>
    </div>
  )
}

export default BirthdayCard