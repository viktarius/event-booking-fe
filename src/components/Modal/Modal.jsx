import React from 'react';
import { createPortal } from "react-dom";

import './Modal.css';

function Modal(props) {
    return (
        createPortal(
            <>
                <div className="backdrop" onClick={props.closeOnClickOutside && props.onCancel}></div>
                <div className="modal">
                    <header className="modal__header">
                        <h2>{props.title}</h2>
                    </header>
                    <section className="modal__content">{props.children}</section>
                    <footer className="modal__actions">
                        <button className="btn" onClick={props.onCancel}>Cancel</button>
                        <button className="btn primary-btn" onClick={props.onConfirm}>Confirm</button>
                    </footer>
                </div>
            </>,
            document.body
        ))
}

export default Modal;
