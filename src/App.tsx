import React from "react";
import { Outlet } from "react-router-dom";

import MainNavigation from "@eb-components/Navigation/MainNavigation";

import './App.css';

const App = () => (<>
    <MainNavigation/>
    <main><Outlet/></main>
</>)

export default App;
