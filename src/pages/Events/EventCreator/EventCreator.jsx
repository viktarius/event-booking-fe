import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { getCreateEventQuery } from "../../../core/queries";
import { addEvent } from "../../../state/events.state";
import EventCreatorModal from "../EventCreatorModal/EventCreatorModal";

import "./EventCreator.css";

function EventCreator() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const dispatch = useDispatch();

    function openModelHandler() {
        setIsModalOpen(true);
    }

    async function onModalConfirmHandler(data) {
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

    function onModalCancelHandler() {
        setIsModalOpen(false);
    }

    return (
        <div className="event-control">
            <h3 className="headline-3">Share your own Events!</h3>
            <button className="btn btn-primary" onClick={openModelHandler}>Create Event!</button>
            {isModalOpen &&
                <EventCreatorModal onModalCancelHandler={onModalCancelHandler}
                                   onModalConfirmHandler={onModalConfirmHandler}
                                   closeOnClickOutside/>}
        </div>
    )
}

export default EventCreator;
