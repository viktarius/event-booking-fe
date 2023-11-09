import { createBrowserRouter, Navigate } from 'react-router-dom';
import React from 'react';

import App from "./App";
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
import AuthPage from './pages/Auth';

export const router = createBrowserRouter([{
    id: 'root',
    path: '/',
    Component: App,
    children: [
        {
            index: true,
            element: <Navigate to="/auth"/>
        },
        {
            path: 'auth',
            Component: AuthPage,
        },
        {
            path: 'bookings',
            Component: BookingsPage,
        },
        {
            path: 'events',
            Component: EventsPage,
        }
    ]
}])
