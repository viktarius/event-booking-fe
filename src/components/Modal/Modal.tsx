import React from 'react';
import { createPortal } from "react-dom";

import './Modal.css';

interface ModalProps {
    title: string;
    onCancel: () => void;
    onConfirm: () => void;
    closeOnClickOutside?: boolean;
    confirmText?: string;
    cancelText?: string;
    children: any;
}

const Modal = ({
                   title,
                   onCancel,
                   onConfirm,
                   closeOnClickOutside,
                   confirmText = 'Confirm',
                   cancelText = 'Cancel',
                   children
               }: ModalProps) =>
    createPortal(
        <>
            <div className="backdrop" onClick={ () => closeOnClickOutside && onCancel() }></div>
            <div className="modal">
                <header className="modal__header">
                    <h2>{ title }</h2>
                </header>
                <section className="modal__content">{ children }</section>
                <footer className="modal__actions">
                    <button className="btn" onClick={ onCancel }>{ cancelText }</button>
                    <button className="btn btn-primary" onClick={ onConfirm }>{ confirmText }</button>
                </footer>
            </div>
        </>,
        document.body
    )

export default Modal;
