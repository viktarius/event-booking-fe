import React, { useState } from "react";
import { useDispatch } from "react-redux";

import EventCreatorModal from "../EventCreatorModal/EventCreatorModal";

import { addEvent } from "../../../state/events.state";

import "./EventCreator.css";

function EventCreator() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const dispatch = useDispatch();

    function openModelHandler() {
        setIsModalOpen(true);
    }

    async function onModalConfirmHandler(data) {
        const requestBody = getCreateEventQuery(data);
        console.log(requestBody);
        try {
            const res = await fetch('http://localhost:3000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
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
            console.log(result)
        } catch (err) {
            console.error(err)
        }
        setIsModalOpen(false);
    }

    function onModalCancelHandler() {
        setIsModalOpen(false);
    }

    function getCreateEventQuery({ title, price, date, description }) {
        return {
            query: `
                mutation {
                    createEvent(body: { 
                        title: "${title}", 
                        price: ${+price},
                        date: "${new Date(date).toISOString()}"
                        description: "${description}"
                    }) {
                        _id
                        title
                        price
                        date
                        description
                        creator {
                            _id
                            email
                        }
                    }   
                }
            `
        }
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
