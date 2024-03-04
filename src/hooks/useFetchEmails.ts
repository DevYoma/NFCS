import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/Firebase'; // Assuming you have your Firebase configuration set up in a separate file

const useFetchUsersEmails = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchEmails = async () => {
      let emailList: any = [];
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          const { email } = doc.data(); // Extract only the email from the user data
          emailList.push(email);
        });
        setEmails(emailList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmails();
  }, []);

  return emails;
};

export default useFetchUsersEmails;
