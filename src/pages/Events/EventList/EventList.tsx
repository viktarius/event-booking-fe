import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getEventListQuery, bookEventQuery } from "../../../core/queries";
import { setEvents } from "../../../state/events.state";
import Spinner from "../../../components/Spinner/Spinner";
import EmptyList from "../../../components/EmptyList/EmptyList";
import EventCard from "../EventCard/EventCard";
import EventDetailsModal from "../EventDetailsModal/EventDetailsModal";
import { RootState } from '../../../store';
import { IEventResponse } from '../models/event.model';

import "./EventList.css"

const EventList = () => {
    const events = useSelector(({ events: { data } }: RootState) => data);
    const authUserId = useSelector(({ auth: { userId } }: RootState) => userId);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [currentEventDetails, setCurrentEventDetails] = useState<IEventResponse | null>(null);

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

    const onShowDetailHandler = (eventInfo: IEventResponse) => {
        setModalOpen(true);
        setCurrentEventDetails(eventInfo);
    }

    const onCloseDetailsHandler = () => {
        setModalOpen(false);
        setCurrentEventDetails(null);
    }

    const onBookEventHandler = async (eventId: string) => {
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
            { isLoading ? <Spinner/> :
                events.length === 0 ?
                    <EmptyList message="Unfortunately, we were unable to load the list of events"/> :
                    <div className="event-list">
                        { events.map((eventInfo) => (
                            <EventCard key={ eventInfo._id }
                                       eventInfo={ eventInfo }
                                       authUserId={ authUserId }
                                       onShowDetailHandler={ onShowDetailHandler }
                                       onBookEventHandler={ onBookEventHandler }/>)) }
                    </div> }
            { isModalOpen && currentEventDetails &&
                <EventDetailsModal event={ currentEventDetails }
                                   authUserId={ authUserId }
                                   onCloseDetailsHandler={ onCloseDetailsHandler }
                                   onBookEventHandler={ onBookEventHandler }/> }
        </>

    )
}

export default EventList;
