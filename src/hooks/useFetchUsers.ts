import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./../Firebase/Firebase"; // Assuming you have your Firebase configuration set up in a separate file

const useFetchUsers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list: any = [];
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return data;
};

export default useFetchUsers;
