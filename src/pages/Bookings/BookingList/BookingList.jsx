import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import Spinner from "../../../components/Spinner/Spinner";
import BookingCard from "../BookingCard/BookingCard";

import './BookingList.css'

const BookingList = () => {
    const [isLoading, setLoading] = useState(false);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const loadBookings = async () => {
            const requestBody = {
                query: `
                    query {
                        bookings {
                            _id
                            event {
                                _id
                                title
                                date
                            }
                        }
                    }
                `
            }
            try {
                setLoading(true);
                const res = await fetch('http://localhost:3000/graphql', {
                    method: 'POST',
                    body: JSON.stringify(requestBody),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                })
                // TODO: use this approach in other places
                const result = await res.json();
                if (res.status !== 200) {
                    throw new Error(result.errors[0].message);
                }
                const { data: { bookings } } = result;
                setBookings(bookings);
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false);
            }
        }
        loadBookings();
    }, [])

    const onCancelHandler = async (bookingId) => {
        const requestBody = {
            query: `
                mutation {
                    cancelBooking (bookingId: "${bookingId}") {
                        _id
                        title
                        date
                    }
                }
            `
        }
        try {
            const res = await fetch('http://localhost:3000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
            const result = await res.json();
            if (res.status !== 200) {
                throw new Error(result.errors[0].message);
            }
            setBookings(bookings.filter((booking) => booking._id !== bookingId));
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="bookings">
            {isLoading ? <Spinner/> :
                bookings.length === 0 ?
                    <div className="empty-list">
                        <h3 className="headline-3">You don't have any bookings yet</h3>
                        <span>go to: <NavLink to="/events">Events</NavLink></span>
                    </div> :
                    <div className="booking-list">
                        {bookings.map(booking => <BookingCard
                            key={booking._id}
                            booking={booking}
                            onCancel={onCancelHandler}/>)}
                    </div>
            }
        </div>
    )
}

export default BookingList;