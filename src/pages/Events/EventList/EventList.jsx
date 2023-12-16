import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getEventListQuery, bookEventQuery } from "../../../core/queries";
import { setEvents } from "../../../state/events.state";
import Spinner from "../../../components/Spinner/Spinner";
import EmptyList from "../../../components/EmptyList/EmptyList";
import EventCard from "../EventCard/EventCard";
import EventDetailsModal from "../EventDetailsModal/EventDetailsModal";

import "./EventList.css"

function EventList() {
    const events = useSelector(state => state.events.data);
    const authUserId = useSelector(state => state.auth.userId);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentEventDetails, setCurrentEventDetails] = useState(null);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                setLoading(true);
                const res = await fetch('http://localhost:3000/graphql', {
                    method: 'POST',
                    body: JSON.stringify(getEventListQuery()),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                })
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed')
                }
                const { data: { events } } = await res.json();
                dispatch(setEvents(events));
            } finally {
                setLoading(false);
            }
        }
        loadEvents().catch(console.error);
    }, [dispatch])

    function onShowDetailHandler(eventInfo) {
        setModalOpen(true);
        setCurrentEventDetails(eventInfo);
    }

    function onCloseDetailsHandler() {
        setModalOpen(false);
        setCurrentEventDetails(null);
    }

    async function onBookEventHandler(eventId) {
        if (!authUserId) {
            navigate('/auth');
        }
        try {
            await fetch('http://localhost:3000/graphql', {
                method: 'POST',
                body: JSON.stringify(bookEventQuery({ eventId })),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
        } catch (err) {
            console.error(err)
        }
        onCloseDetailsHandler();
    }

    return (
        <>
            {isLoading ? <Spinner/> :
                events.length === 0 ?
                    <EmptyList message="Unfortunately, we were unable to load the list of events"/> :
                    <div className="event-list">
                        {events.map((eventInfo) => (
                            <EventCard key={eventInfo._id}
                                       eventInfo={eventInfo}
                                       authUserId={authUserId}
                                       onShowDetailHandler={onShowDetailHandler}
                                       onBookEventHandler={onBookEventHandler}/>))}
                    </div>}
            {isModalOpen && currentEventDetails &&
                <EventDetailsModal event={currentEventDetails}
                                   authUserId={authUserId}
                                   onCloseDetailsHandler={onCloseDetailsHandler}
                                   onBookEventHandler={onBookEventHandler}/>}
        </>

    )
}

export default EventList;
