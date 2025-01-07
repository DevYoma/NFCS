import "./Anthem.scss";
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'

const Anthem = () => {
  return (
    <div className="anthem">
      <Navbar hideBoxShadow={true} />

      <div className="anthem__header">
        <h1>NFCS Anthem</h1>
      </div>

      <div className="anthem__body">
        <p>
          <strong>1.</strong> NFCS Nigeria Federation of Catholic Students
          <br />
          is living the Faith. <br />
          We are the hope of our Faith to blossom, <br />
          The dreams of the Church, hail NFCS. <br />
          With the strength of our Youth, <br />
          We will move our faith forward <br />
          And defend it whatever be the case. <br />
        </p>

        <p>
          <em>Chorus:</em> When the roll is called <br />
          On the last day, <br />
          A joyful song we’ll raise, <br />
          Hail NFCS!
        </p>

        <p>
          <strong>2.</strong> Let’s spread the good news of the Kingdom <br />
          To all people on earth, through NFCS. <br />
          And join hands with groups of like minds, <br />
          To evangelize the world, through NFCS. <br />
          Let the message be brought to every living soul <br />
          By the life we live as students.
        </p>

        <p>
          <em>Chorus:</em> When the roll is called <br />
          On the last day, <br />
          A joyful song we’ll raise, <br />
          Hail NFCS!
        </p>

        <p>
          <strong>3.</strong> We say no to corruption and greed, <br />
          Sectionalism and violence in NFCS. <br />
          And chant down the agent of bribery, <br />
          Ethnicism and war in NFCS. <br />
          With Jesus, Prince of Love and Peace, <br />
          We pitch our tent. <br />
          Yes, the enemies will forever be shamed.
        </p>

        <p>
          <em>Chorus:</em> When the roll is called <br />
          On the last day, <br />
          A joyful song we’ll raise, <br />
          Hail NFCS!
        </p>

        <p className="anthem__footer">...NFCS cares!</p>
      </div>

      <Footer />
    </div>
  );
}

export default Anthem