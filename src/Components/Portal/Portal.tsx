import { useState } from 'react';
import Modal from '../Modal/Modal';
import './Portal.scss';
import { createPortal } from 'react-dom';

const Portal = () => {
 const [showModal, setShowModal] = useState(true);
 return (
   <>
     {/* <button onClick={() => setShowModal(true)}>
       Show modal using a portal
     </button> */}
     {showModal &&
       createPortal(
         <Modal onClose={() => setShowModal(false)} />,
         document.body
       )}
   </>
 );
}

export default Portal