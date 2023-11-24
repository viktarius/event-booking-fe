import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setEvents } from "../../../state/events.state";
import EventCard from "../EventCard/EventCard";

import "./EventList.css"

function EventList() {
    const events = useSelector(state => state.data.events);
    const dispatch = useDispatch();

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
            const res = await fetch('http://localhost:3000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed')
            }
            const { data: { events } } = await res.json();
            dispatch(setEvents(events));
            // setEventsTemplate(events.map(({ _id, title }) => (<EventCard key={_id} title={title}/>)))
        }
        loadEvents().catch(console.error);
    }, [])

    return (
        <div className="event-list">
            {events.map(({ _id, title }) => (<EventCard key={_id} title={title}/>))}
        </div>
    )
}

export default EventList;
