import React, { useState } from 'react';

import "./Event.css";
import Modal from "../components/Modal/Modal";

function EventsPage() {

    const [isModalOpen, setIsModalOpen] = useState(false)
    function openModelHandler() {
        setIsModalOpen(true);
    }

    function onModalConfirmHandler() {
        setIsModalOpen(false);
    }

    function onModalCancelHandler() {
        setIsModalOpen(false);
    }

    return (<div className="event-control">
        <h3 className="headline-3">Share your own Events!</h3>
        <button className="btn primary-btn" onClick={openModelHandler}>Create Event!</button>
        {isModalOpen &&
            <Modal title='Create event' onCancel={onModalCancelHandler} onConfirm={onModalConfirmHandler}>
                <p>Modal content</p>
            </Modal>}
    </div>)
}

export default EventsPage;
