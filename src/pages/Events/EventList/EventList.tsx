import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setEvents } from "@eb-state/events.state";
import Spinner from "@eb-components/Spinner/Spinner";
import EmptyList from "@eb-components/EmptyList/EmptyList";
import { container, TYPES } from '@eb-core/services/inversify.config';
import { IEventRequestService } from '@eb-core/services/event-request.service';
import { IBookingRequestService } from '@eb-core/services/booking-request.service';
import EventCard from "../EventCard/EventCard";
import EventDetailsModal from "../EventDetailsModal/EventDetailsModal";
import { RootState } from '../../../store';
import { IEvent } from '../models/event.model';

import "./EventList.css"

const EventList = () => {
    const bookingRequestService = container.get<IBookingRequestService>(TYPES.BookingRequestService);
    const eventRequestService = container.get<IEventRequestService>(TYPES.EventRequestService);
    const events = useSelector(({ events: { data } }: RootState) => data);
    const authUserId = useSelector(({ auth: { userId } }: RootState) => userId);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [currentEventDetails, setCurrentEventDetails] = useState<IEvent | null>(null);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                setLoading(true);
                const { data: { events } } = await eventRequestService.getEvents();
                // TODO: add typing for action setEvents
                dispatch(setEvents(events));
            } finally {
                setLoading(false);
            }
        }
        loadEvents().catch(console.error);
    }, [dispatch])

    const onShowDetailHandler = (eventInfo: IEvent) => {
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
            const result = await bookingRequestService.bookEvent(eventId);
            // TODO: use notification service here to notify user about booking
            console.log(result)
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
