import React from 'react';
import { useSelector } from "react-redux";

import EventCreator from "./EventCreator/EventCreator";
import EventList from "./EventList/EventList";

import "./EventsPage.css";

function EventsPage() {
    const isAuthorized = useSelector(state => state.auth.isAuthorized);

    return (
        <div className="events">
            {isAuthorized && <EventCreator/>}
            <EventList/>
        </div>
    )
}

export default EventsPage;
