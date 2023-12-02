import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'Auth',
    initialState: {
        isUserAuthorized: false,
        token: null,
        userId: null,
    },
    reducers: {
        login: (state, { payload }) => ({
            ...state,
            ...payload,
            isUserAuthorized: true,
        }),
        logout: (state) => ({
            ...state,
            token: null,
            userId: null,
            isUserAuthorized: false,
        }),
    },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer
