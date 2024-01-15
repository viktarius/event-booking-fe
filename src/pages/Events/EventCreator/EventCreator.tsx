import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addEvent } from "@eb-state/events.state";
import { container, TYPES } from '@eb-core/services/inversify.config';
import { IEventRequestService } from '@eb-core/services/event-request.service';
import EventCreatorModal from "../EventCreatorModal/EventCreatorModal";
import { IEventRequest } from '../models/event.model';

import "./EventCreator.css";

const EventCreator = () => {
    const eventRequestService = container.get<IEventRequestService>(TYPES.EventRequestService)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const dispatch = useDispatch();

    const onModalConfirmHandler = async (data: IEventRequest) => {
        try {
            const result = await eventRequestService.createEvent(data);
            dispatch(addEvent(result.data.createEvent))
        } catch (err) {
            console.error(err)
        }
        setIsModalOpen(false);
    }

    return (
        <div className="event-control">
            <h3 className="headline-3">Share your own Events!</h3>
            <button className="btn btn-primary" onClick={ () => setIsModalOpen(true) }>Create Event!</button>
            { isModalOpen &&
                <EventCreatorModal onModalCancelHandler={ () => setIsModalOpen(false) }
                                   onModalConfirmHandler={ onModalConfirmHandler }/> }
        </div>
    )
}

export default EventCreator;
