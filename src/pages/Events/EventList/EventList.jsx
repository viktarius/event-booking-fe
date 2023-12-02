import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setEvents } from "../../../state/events.state";
import EventCard from "../EventCard/EventCard";
import Spinner from "../../../components/Spinner/Spinner";

import "./EventList.css"

function EventList() {
    const events = useSelector(state => state.data.events);
    const authUserId = useSelector(state => state.auth.userId);
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);

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
                    }
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

    return (
        <>
            {isLoading ? <Spinner/> : <div className="event-list">
                {events.map(({ _id, title, price, description, creator }) => (
                    <EventCard key={_id}
                               title={title}
                               price={price}
                               description={description}
                               creator={creator}
                               authUserId={authUserId}/>))}
            </div>
            }
        </>

    )
}

export default EventList;
