import React from 'react'
import './Picture.scss';

type PictureProps = {
  dotOne?: boolean;
  dotTwo?: boolean;
  addressDotOne?: boolean;
  addressDotTwo?: boolean;

  picture1: string;
  main: string;
  picture2: string;
}

const Picture = ({ picture1, main, picture2, dotOne, dotTwo, addressDotOne, addressDotTwo }: PictureProps) => {
  return (
    <div className='MPicture'>
        <img 
          src={picture1} 
          alt="dots"  
          // style={{ width: "265px", height: "127px" }} 
          className={`
            ${dotOne ? 'MPicture__dots1' : ''}
            ${addressDotOne ? 'MPicture__addressDots1' : ''}
          `}
        />

        {/* MAIN PIC */}
        <img
          // style={{ width: "400px", height: "486px", zIndex: "1", objectFit: 'cover' }} 
          className='MPicture__main'
          src={main} 
          alt="main" 
        />

        <img 
          src={picture2}
          alt="dots" 
          // style={{ width: "265px", height: "127px" }} 
          className={`
            ${dotTwo ? 'MPicture__dots2' : ''}
            ${addressDotTwo ? 'MPicture__addressDots2' : ''}
          `}
        />
    </div>
  )
}

export default Picture