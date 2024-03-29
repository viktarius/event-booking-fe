import React from "react";

import Modal from "@eb-components/Modal/Modal";
import { IEvent } from '../models/event.model';

interface EventDetailsModalProps {
    event: IEvent;
    authUserId: string | null;
    onBookEventHandler: (eventId: string) => void;
    onCloseDetailsHandler: () => void;
}

const EventDetailsModal = ({
                               event,
                               authUserId,
                               onBookEventHandler,
                               onCloseDetailsHandler
                           }: EventDetailsModalProps) => {
    const { _id, title, description, creator } = event;
    const isCreator = authUserId === creator._id;
    return <Modal
        title={ title }
        closeOnClickOutside
        onCancel={ onCloseDetailsHandler }
        onConfirm={ () => isCreator ? onCloseDetailsHandler() : onBookEventHandler(_id) }
        confirmText={ isCreator ? 'Confirm' : 'Book' }
        cancelText='Close'>
        <div>{ description }</div>
    </Modal>
}

export default EventDetailsModal;
