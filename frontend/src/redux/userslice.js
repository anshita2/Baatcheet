import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        authUser:null,
        otherUsers:null,
        selectedUser:null,
        onlineUsers:null,
        allUsers: [],
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.authUser = action.payload;
        },
        setOtherUsers:(state, action)=>{
            state.otherUsers = action.payload;
        },
        setSelectedUser:(state,action)=>{
            state.selectedUser = action.payload;
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers = action.payload;
        },
        setAllUsers: (state, action) => {
        state.allUsers = action.payload; // ✅ NEW reducer
        },
    }
});
export const {setAuthUser,setOtherUsers,setSelectedUser,setOnlineUsers,setAllUsers} = userSlice.actions;
export default userSlice.reducer;