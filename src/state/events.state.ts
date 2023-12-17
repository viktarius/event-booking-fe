import { createSlice } from '@reduxjs/toolkit'
import { IEventResponse } from '../pages/Events/models/event.model';

interface EventState {
    data: IEventResponse[];
}

const initialState: EventState = {
    data: [],
}

export const eventsSlice = createSlice({
    name: '[EVENTS]',
    initialState,
    reducers: {
        setEvents: (state, { payload }) => ({
            ...state,
            data: payload,
        }),
        addEvent: (state, { payload }) => ({
            ...state,
            data: [...state.data, payload]
        }),
    },
})

// Action creators are generated for each case reducer function
export const { setEvents, addEvent } = eventsSlice.actions

export default eventsSlice.reducer
