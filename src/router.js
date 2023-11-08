import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import React from 'react';

import BookingsPage from './Pages/Bookings';
import EventsPage from './Pages/Events';
import AuthPage from './Pages/Auth';

export const router = createBrowserRouter([{
    id: 'root',
    path: '/',
    element: <div><h1>Hello </h1><Outlet/></div>,
    children: [
        {
            index: true,
            element: <Navigate to="/auth" />
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
