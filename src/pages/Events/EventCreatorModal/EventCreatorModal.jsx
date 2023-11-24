import React, { useRef } from "react";

import Modal from "../../../components/Modal/Modal";

function EventCreatorModal(props) {
    const titleRef = useRef(null);
    const dateRef = useRef(null);
    const priceRef = useRef(null);
    const descriptionRef = useRef(null);

    function onModalConfirmHandler() {
        const title = titleRef.current.value;
        const price = priceRef.current.value;
        const date = dateRef.current.value;
        const description = descriptionRef.current.value;

        props.onModalConfirmHandler({ title, price, date, description })
    }

    return (
        <Modal title='Create event' onCancel={props.onModalCancelHandler} onConfirm={onModalConfirmHandler} closeOnClickOutside>
            <form>
                <div className="form-control">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" ref={titleRef}/>
                </div>
                <div className="form-control">
                    <label htmlFor="price">Price</label>
                    <input type="number" id="price" ref={priceRef}/>
                </div>
                <div className="form-control">
                    <label htmlFor="date">Date</label>
                    <input type="datetime-local" id="date" ref={dateRef}/>
                </div>
                <div className="form-control">
                    <label htmlFor="description">Description</label>
                    <textarea rows="4" id="description" ref={descriptionRef}/>
                </div>
            </form>
        </Modal>
    )
}

export default EventCreatorModal;
