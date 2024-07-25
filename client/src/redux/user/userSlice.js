import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    error : null,
    loading : false
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        signInStart : (state) => {
            state.loading = true
        },
        signInSuccess : (state,action) => {
            state.currentUser = action.payload,
            state.loading = false,
            state.error = null
        },
        signInFaliure : (state,action) => {
            state.error = action.payload,
            state.loading = false
        },
        setNull : (state) => {
            state.error = null
        },

        updateUserStart : (state) => {
            state.loading = true
        },

        updateUserSuccess : (state,action) => {
            state.loading = false,
            state.currentUser = action.payload,
            state.error = null;
        },

        updateUserFailure : (state,action) => {
            state.loading = false,
            state.error = action.payload
        }

    }
})

// console.log(userSlice.actions)

export const { signInStart,signInFaliure,signInSuccess,setNull,updateUserStart,updateUserFailure,updateUserSuccess } = userSlice.actions

export default userSlice.reducer