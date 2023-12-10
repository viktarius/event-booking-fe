import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import MainNavigation from "./components/Navigation/MainNavigation";
import { login } from "./state/auth.state";

import './App.css';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await fetch('http://localhost:3000/auth', {
                    method: 'GET',
                    credentials: 'include',
                })

                const result = await res.json();
                const { isAuthorized, userId } = result;
                console.log(result);
                dispatch(login({ isAuthorized, userId }))
            } catch (err) {
                console.error(err)
            }
        }

        authCheck();
    }, [])
    return (
        <>
            <MainNavigation> </MainNavigation>
            <main><Outlet/></main>
        </>
    )
}

export default App;
