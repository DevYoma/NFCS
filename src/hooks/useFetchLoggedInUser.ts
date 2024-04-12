import { useState, useEffect } from "react";
import { getDoc, doc } from "@firebase/firestore"; 
import { db } from "../Firebase/Firebase";

const useFetchedLoggedInUser = (id: number | string | any) => {
  const [userData, setUserData] = useState<any>(null);
  const [userIdLoading, setIsUserIdLoading] = useState(true);
  const [userIdError, setUserIdError] = useState<any>(null); // Any for now

  useEffect(() => {
    const getData = async () => {
      try {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        const userDataResult = await docSnap.data();
        setUserData(userDataResult);
      } catch (err) {
        setUserIdError(err);
      } finally {
        setIsUserIdLoading(false);
      }
    };

    getData();
  }, [id, db]); // Dependency array includes id and firestore db instance

  return { userData, userIdLoading, userIdError };
};

export default useFetchedLoggedInUser;