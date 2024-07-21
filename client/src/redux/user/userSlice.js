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
        }
    }
})

// console.log(userSlice.actions)

export const { signInStart,signInFaliure,signInSuccess,setNull } = userSlice.actions

export default userSlice.reducer