import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'Auth',
    initialState: {
        isUserAuthorized: false,
    },
    reducers: {
        login: (state) => ({
            ...state,
            isUserAuthorized: true,
        }),
        logout: (state) => ({
            ...state,
            isUserAuthorized: false,
        }),
    },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer
