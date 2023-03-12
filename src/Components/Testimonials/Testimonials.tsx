import './Testimonials.scss'
import Testimonial1 from '../../assets/testimonial1.png'
import Testimonial2 from '../../assets/testimonial2.png'

const Testimonials = () => {
  return (
    <div className="testimonials">
      <h1 className="testimonials__header">NFCS Testimonials</h1>

      <div className="testimonials__container">
        {[1,2,3,4,5,5].map((person: any) => (
          <div className="testimonial">
            <div className="testimonial__header">
              <img src={Testimonial1} alt="dey play 😆" />
              <div className="testimonial__details">
                <p>Lisa</p>
                <small>@lisa_wade</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonials;