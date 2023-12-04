import React from 'react';
import { createPortal } from "react-dom";

import './Modal.css';

function Modal({ title, children, closeOnClickOutside, onCancel, onConfirm, confirmText, cancelText }) {
    return (
        createPortal(
            <>
                <div className="backdrop" onClick={closeOnClickOutside && onCancel}></div>
                <div className="modal">
                    <header className="modal__header">
                        <h2>{title}</h2>
                    </header>
                    <section className="modal__content">{children}</section>
                    <footer className="modal__actions">
                        <button className="btn" onClick={onCancel}>{cancelText || 'Cancel'}</button>
                        <button className="btn btn-primary" onClick={onConfirm}>{confirmText || 'Confirm'}</button>
                    </footer>
                </div>
            </>,
            document.body
        ))
}

export default Modal;
