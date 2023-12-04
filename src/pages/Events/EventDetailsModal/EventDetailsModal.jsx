import React from "react";

import Modal from "../../../components/Modal/Modal";

const EventDetailsModal = ({ _id, title, description, onBookEventHandler, onCloseDetailsHandler }) => <Modal
    title={title}
    closeOnClickOutside
    onCancel={onCloseDetailsHandler}
    onConfirm={onBookEventHandler.bind(this, _id)}
    confirmText='Book'
    cancelText='Close'>
    <div>{description}</div>
</Modal>

export default EventDetailsModal;
