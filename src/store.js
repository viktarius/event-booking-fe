import { configureStore } from '@reduxjs/toolkit'

import authReducer from './state/auth.state';

export default configureStore({
    reducer: {
        auth: authReducer
    },
})
