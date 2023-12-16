import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: '[AUTH]',
    initialState: {
        isAuthorized: false,
        userId: null,
    },
    reducers: {
        login: (state, { payload }) => ({
            ...state,
            ...payload,
        }),
        logout: (state) => ({
            ...state,
            userId: null,
            isAuthorized: false,
        }),
    },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer
