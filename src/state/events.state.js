import { createSlice } from '@reduxjs/toolkit'

export const eventsSlice = createSlice({
    name: 'Events',
    initialState: {
        events: [],
    },
    reducers: {
        setEvents: (state, { payload }) => ({
            ...state,
            events: payload,
        }),
        addEvent: (state, { payload }) => ({
            ...state,
            events: [...state.events, payload]
        }),
    },
})

// Action creators are generated for each case reducer function
export const { setEvents, addEvent } = eventsSlice.actions

export default eventsSlice.reducer
