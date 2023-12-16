import React from 'react';
import formatDateTime from "../../../core/utils/format-date-time";

import './BookingCard.css';

const BookingCard = ({ booking, onCancel }) => {
    const { event: { title, date } } = booking;
    const formattedDate = formatDateTime(date);
    return (<div className="booking-card">
        <div className="booking-card__info">
            <h3 className="booking-title">{title}</h3>
            <span className="booking-date">{formattedDate}</span>
        </div>
        <button className="btn btn-primary-outline" onClick={() => onCancel(booking._id)}>Cancel</button>
    </div>)
}

export default BookingCard;
