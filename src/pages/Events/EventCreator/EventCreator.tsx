import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { getCreateEventQuery } from "../../../core/queries";
import { addEvent } from "../../../state/events.state";
import EventCreatorModal from "../EventCreatorModal/EventCreatorModal";
import { IEventRequest } from '../models/event.model';

import "./EventCreator.css";

const EventCreator = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const dispatch = useDispatch();

    const onModalConfirmHandler = async (data: IEventRequest) => {
        try {
            const res = await fetch('http://localhost:3000/graphql', {
                method: 'POST',
                body: JSON.stringify(getCreateEventQuery(data)),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed')
            }
            const result = await res.json();
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
