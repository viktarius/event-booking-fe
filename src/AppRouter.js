import { createBrowserRouter, Navigate, redirect, RouterProvider } from 'react-router-dom';
import React from 'react';

import App from "./App";
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events/EventsPage';
import AuthPage from './pages/Auth';
import { useSelector } from "react-redux";

const AppRouter = () => {
    const isUserAuthorized = useSelector(state => state.auth.isUserAuthorized)

    const router = createBrowserRouter([{
        id: 'root',
        path: '/',
        Component: App,
        children: [
            {
                index: true,
                element: <>
                    {isUserAuthorized && <Navigate from="/auth" to="/events"> </Navigate>}
                    {!isUserAuthorized && <Navigate from="/" to="/auth"></Navigate>}
                </>
            },
            {
                path: 'auth',
                Component: AuthPage,
                loader: () => {
                    if (isUserAuthorized) {
                        return redirect('/events');
                    }
                    return null;
                }
            },
            {
                path: 'bookings',
                Component: BookingsPage,
                loader: () => {
                    if (!isUserAuthorized) {
                        return redirect('/auth');
                    }
                    return null;
                }
            },
            {
                path: 'events',
                Component: EventsPage,
            }
        ]
    }])

    return <RouterProvider router={router}/>;
}


export default AppRouter;
