import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "@eb-state/auth.state";
import { RootState } from '../../store';

import './MainNavigation.css';

const Routes = () => {
    const isAuthorized = useSelector(({ auth: { isAuthorized } }: RootState) => isAuthorized);
    const dispatch = useDispatch();

    const onLogoutHandler = async () => {
        try {
            await fetch('http://localhost:3000/logout', {
                method: 'GET',
                credentials: 'include'
            });
            dispatch(logout());
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <ul>
            <li><NavLink to="/events">Events</NavLink></li>
            { isAuthorized && <li><NavLink to="/bookings">Bookings</NavLink></li> }
            { !isAuthorized && <li className="login"><NavLink to="/auth">Login</NavLink></li> }
            { isAuthorized && <li className="logout">
                <button onClick={ onLogoutHandler }>Logout</button>
            </li> }
        </ul>
    )
}

const MainNavigation = () => (
    <header className="main-navigation">
        <div className="main-navigation__logo">
            <h1>EasyEvent</h1>
        </div>
        <nav className="main-navigation__nav">
            <Routes/>
        </nav>
    </header>
)


export default MainNavigation;
