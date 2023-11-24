import { configureStore } from '@reduxjs/toolkit'

import authReducer from './state/auth.state';
import eventsReducer from './state/events.state';

export default configureStore({
    reducer: {
        auth: authReducer,
        data: eventsReducer,
    },
})
