import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
    isAuthorized: boolean;
    userId: null | string;
}

const initialState: AuthState = {
    isAuthorized: false,
    userId: null,
};

export const authSlice = createSlice({
    name: '[AUTH]',
    initialState,
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
