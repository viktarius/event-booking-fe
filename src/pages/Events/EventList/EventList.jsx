import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setEvents } from "../../../state/events.state";
import Spinner from "../../../components/Spinner/Spinner";
import EventCard from "../EventCard/EventCard";
import EventDetailsModal from "../EventDetailsModal/EventDetailsModal";

import "./EventList.css"
import { useNavigate } from "react-router-dom";

function EventList() {
    const events = useSelector(state => state.data.events);
    const authUserId = useSelector(state => state.auth.userId);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentEventDetails, setCurrentEventDetails] = useState(null);

    useEffect(() => {
        const loadEvents = async () => {
            const requestBody = {
                query: `
                    query {
                        events {
                            _id
                            title
                            description
                            price
                            date
                            creator {
                                _id
                                email
                            }
                        }
                    }
                `
            };
            try {
                setLoading(true);
                const res = await fetch('http://localhost:3000/graphql', {
                    method: 'POST',
                    body: JSON.stringify(requestBody),
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
    }, [])

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
        const requestBody = {
            query: `
                mutation {
                    bookEvent (eventId: "${eventId}") {
                        _id
                        createdAt
                        event {
                            _id
                            title
                        }
                    }
                }
            `
        };
        try {
            await fetch('http://localhost:3000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
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
            {isLoading ? <Spinner/> : <div className="event-list">
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
