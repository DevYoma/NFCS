import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/Firebase";

export const fetchFirebaseUsers = async () => {
    let list: any = [];
    try{
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
        list.push({id: doc.id, ...doc.data()}) // spreading the data object in the list object.
        });
        // console.log(list);
        return list;
    }catch(error) {
        console.log(error);
        return []
    }
}