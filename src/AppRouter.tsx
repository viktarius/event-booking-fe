import React, { useEffect, useState } from 'react';
import { createBrowserRouter, Navigate, redirect, RouterProvider } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import AuthPage from '@eb-pages/Auth/AuthPage';
import EventsPage from '@eb-pages/Events/EventsPage';
import BookingsPage from '@eb-pages/Bookings/BookingsPage';
import Spinner from "@eb-components/Spinner/Spinner";
import { container, TYPES } from '@eb-core/services/inversify.config';
import { IAuthRequestService } from '@eb-core/services/auth-request.service';
import { login } from "@eb-state/auth.state";
import App from "./App";
import { RootState } from './store';

const AppRouter = () => {
    const authRequestService = container.get<IAuthRequestService>(TYPES.AuthRequestService);
    const dispatch = useDispatch();
    const isAuthorized = useSelector<RootState>(({ auth }) => auth.isAuthorized);
    const [isAppLoaded, setAppLoaded] = useState(false);

    const getRouter = () => createBrowserRouter([{
        id: 'root',
        path: '/',
        Component: App,
        children: [
            {
                index: true,
                element: <>
                    { isAuthorized && <Navigate to="/events"/> }
                    { !isAuthorized && <Navigate to="/auth"/> }
                </>
            },
            {
                path: 'auth',
                Component: AuthPage,
                loader: () => {
                    if (isAuthorized) {
                        return redirect('/events');
                    }
                    return null;
                }
            },
            {
                path: 'bookings',
                Component: BookingsPage,
                loader: () => {
                    if (!isAuthorized) {
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

    useEffect(() => {
        const authCheck = async () => {
            try {
                const result = await authRequestService.auth();
                const { isAuthorized, userId } = result;
                dispatch(login({ isAuthorized, userId }))
            } catch (err) {
                console.error(err)
            } finally {
                setAppLoaded(true);
            }
        }

        authCheck();
    }, [dispatch])


    return (<>
        { !isAppLoaded && <Spinner/> }
        { isAppLoaded && <RouterProvider router={ getRouter() }/> }
    </>)
}


export default AppRouter;
