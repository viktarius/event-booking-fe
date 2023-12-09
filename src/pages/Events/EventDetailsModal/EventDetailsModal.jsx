import React from "react";

import Modal from "../../../components/Modal/Modal";

const EventDetailsModal = ({ event, onBookEventHandler, onCloseDetailsHandler, authUserId }) => {
    const { _id, title, description, creator } = event;
    const isCreator = authUserId === creator._id;
    return <Modal
        title={title}
        closeOnClickOutside
        onCancel={onCloseDetailsHandler}
        onConfirm={isCreator ? onCloseDetailsHandler : onBookEventHandler.bind(this, _id)}
        confirmText={isCreator ? 'Confirm' : 'Book'}
        cancelText='Close'>
        <div>{description}</div>
    </Modal>
}

export default EventDetailsModal;
