import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./../Firebase/Firebase"; // Assuming you have your Firebase configuration set up in a separate file

type User = {
  id: string;
  [key: string]: any; // You can define other properties here based on your user schema
}

type FetchUserReturnType = {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const useFetchUserDetail = (userId: string | any): FetchUserReturnType => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          setUser({ id: userDoc.id, ...userDoc.data() });
        } else {
          setError("User not found");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return { user, loading, error };
};

export default useFetchUserDetail;