import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'Auth',
    initialState: {
        isUserAuthorized: false,
        token: null,
    },
    reducers: {
        login: (state, { payload }) => ({
            ...state,
            ...payload,
            isUserAuthorized: true,
        }),
        logout: (state) => ({
            ...state,
            isUserAuthorized: false,
            token: null,
        }),
    },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer
