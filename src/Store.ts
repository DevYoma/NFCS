import { createContext } from 'react';

const initialState = {
    firstName: "Ogheneyoma",
    lastName: "Emore"
}

export type UserState = typeof initialState; // this is the userState

const UserContext = createContext(<typeof initialState>initialState);

export default UserContext;