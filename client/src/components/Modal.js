import React from 'react';
import './Modal.css';

const Modal = ({ show, message, onClose }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{message}</h3>
            </div>
        </div>
    );
};

export default Modal;
