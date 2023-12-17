import { configureStore } from '@reduxjs/toolkit'

import authReducer from './state/auth.state';
import eventsReducer from './state/events.state';

export const store =  configureStore({
    reducer: {
        auth: authReducer,
        events: eventsReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
