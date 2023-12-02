import React from 'react';
import { useSelector } from "react-redux";

import EventCreator from "./EventCreator/EventCreator";
import EventList from "./EventList/EventList";

import "./EventsPage.css";

function EventsPage() {
    const isUserAuthorized = useSelector(state => state.auth.isUserAuthorized);

    return (
        <div className="events">
            {isUserAuthorized && <EventCreator/>}
            <EventList/>
        </div>
    )
}

export default EventsPage;
