import React from 'react';
import { IBooking } from '../models/booking.model';
import { formatDateTime } from "../../../core/utils/format-date-time";

import './BookingCard.css';

interface BookingCardProps {
    booking: IBooking;
    onCancel: (bookingId: string) => void
}

const BookingCard = ({ booking, onCancel }: BookingCardProps) => {
    const { event: { title, date } } = booking;
    const formattedDate = formatDateTime(date);
    return (<div className="booking-card">
        <div className="booking-card__info">
            <h3 className="booking-title">{ title }</h3>
            <span className="booking-date">{ formattedDate }</span>
        </div>
        <button className="btn btn-primary-outline" onClick={ () => onCancel(booking._id) }>Cancel</button>
    </div>)
}

export default BookingCard;
