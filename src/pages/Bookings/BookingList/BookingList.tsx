import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import Spinner from "../../../components/Spinner/Spinner";
import EmptyList from "../../../components/EmptyList/EmptyList";
import BookingCard from "../BookingCard/BookingCard";
import { IBooking } from '../models/booking.model';

import './BookingList.css'
import { container, TYPES } from '../../../core/services/inversify.config';
import { IBookingRequestService } from '../../../core/services/booking-request.service';

const BookingList = () => {
    const bookingRequestService = container.get<IBookingRequestService>(TYPES.BookingRequestService);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [bookings, setBookings] = useState<IBooking[]>([]);

    useEffect(() => {
        const loadBookings = async () => {
            try {
                setLoading(true);
                const { data: { bookings } } = await bookingRequestService.getBookings();
                setBookings(bookings);
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false);
            }
        }
        loadBookings();
    }, [])

    const onCancelHandler = async (bookingId: string) => {
        try {
            const result = await bookingRequestService.cancelBooking(bookingId);
            //  TODO: use notification service here to notify user about cancel booking
            console.log(result);
            setBookings(bookings.filter((booking) => booking._id !== bookingId));
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            { isLoading ? <Spinner/> :
                bookings.length === 0 ?
                    <EmptyList message="You don't have any bookings yet">
                        <span className="empty-bookings-handler">go to: <NavLink to="/events">Events</NavLink></span>
                    </EmptyList> :
                    <div className="booking-list">
                        { bookings.map(booking => <BookingCard key={ booking._id }
                                                               booking={ booking }
                                                               onCancel={ onCancelHandler }/>) }
                    </div>
            }
        </>
    )
}

export default BookingList;
