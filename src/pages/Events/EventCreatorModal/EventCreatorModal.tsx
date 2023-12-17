import React, { useRef } from "react";

import Modal from "../../../components/Modal/Modal";
import { IEventRequest } from '../models/event.model';

interface EventCreatorModalProps {
    onModalConfirmHandler: (data: IEventRequest) => void
    onModalCancelHandler: () => void
}

const EventCreatorModal = ({ onModalConfirmHandler, onModalCancelHandler }: EventCreatorModalProps) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    const onConfirmHandler = () => {
        const title = titleRef.current?.value || "";
        const price = Number(priceRef.current?.value) || 0;
        const date = dateRef.current?.value || "";
        const description = descriptionRef.current?.value || "";

        onModalConfirmHandler({ title, price, date, description })
    }

    return (
        <Modal
            title='Create event'
            onCancel={ onModalCancelHandler }
            onConfirm={ onConfirmHandler }
            closeOnClickOutside>
            <form>
                <div className="form-control">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" ref={ titleRef }/>
                </div>
                <div className="form-control">
                    <label htmlFor="price">Price</label>
                    <input type="number" id="price" ref={ priceRef }/>
                </div>
                <div className="form-control">
                    <label htmlFor="date">Date</label>
                    <input type="datetime-local" id="date" ref={ dateRef }/>
                </div>
                <div className="form-control">
                    <label htmlFor="description">Description</label>
                    <textarea rows={ 4 } id="description" ref={ descriptionRef }/>
                </div>
            </form>
        </Modal>
    )
}

export default EventCreatorModal;
