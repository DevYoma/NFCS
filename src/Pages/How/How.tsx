import ComingSoon from '../../Components/ComingSoon/ComingSoon'
import Navbar from '../../Components/Navbar/Navbar'
import './How.scss'

const How = () => {
  return (
    <div className="how">
        <Navbar hideBoxShadow={true} />
        <ComingSoon />
    </div>
  )
}

export default How