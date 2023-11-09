import React from "react";
import { Outlet } from "react-router-dom";

import MainNavigation from "./components/Navigation/MainNavigation";

import './App.css';

const app = props => (
    <>
        <MainNavigation> </MainNavigation>
        <main><Outlet/></main>
    </>
)

export default app;
