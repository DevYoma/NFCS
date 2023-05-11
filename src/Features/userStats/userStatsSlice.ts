import { createSlice } from "@reduxjs/toolkit";

export interface userStatsState{
    totalRegisteredUsers: number;
}

const initialState: userStatsState = {
    totalRegisteredUsers: 0
}

export const userStatsSlice = createSlice({
    name: 'stats',
    initialState, 
    reducers: {
        getTotalUsers: (state) => {
            state.totalRegisteredUsers = 0;
        }
    }
})

// Actions creators are generated for eact case reducer function
export const { getTotalUsers } = userStatsSlice.actions;

export default userStatsSlice.reducer;