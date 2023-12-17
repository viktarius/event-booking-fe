import React from 'react';
import { useSelector } from "react-redux";

import { RootState } from '../../store';
import EventCreator from "./EventCreator/EventCreator";
import EventList from "./EventList/EventList";

import "./EventsPage.css";

const EventsPage = () => {
    const isAuthorized = useSelector(({ auth: { isAuthorized } }: RootState) => isAuthorized);

    return (
        <div className="events">
            { isAuthorized && <EventCreator/> }
            <EventList/>
        </div>
    )
}

export default EventsPage;
