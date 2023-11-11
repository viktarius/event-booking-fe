import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import './MainNavigation.css';
import { logout } from "../../state/auth.state";

const Routes = props => {
    const isUserAuthorized = useSelector(state => state.auth.isUserAuthorized);
    const dispatch = useDispatch();

    return (
        <ul>
            <li><NavLink to="/events">Events</NavLink></li>
            {isUserAuthorized && <li><NavLink to="/bookings">Bookings</NavLink></li>}
            {!isUserAuthorized && <li className="auth-navigation"><NavLink to="/auth">Authenticate</NavLink></li>}
            {isUserAuthorized && <li className="auth-navigation">
                <button onClick={() => dispatch(logout())}>Logout</button>
            </li>}
        </ul>
    )
}

const MainNavigation = props => {
    return (
        <header className="main-navigation">
            <div className="main-navigation__logo">
                <h1>EasyEvent</h1>
            </div>
            <nav className="main-navigation__nav">
                <Routes/>
            </nav>
        </header>
    )
}

export default MainNavigation;
