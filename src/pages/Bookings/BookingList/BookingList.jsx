import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Spinner from "../../../components/Spinner/Spinner";
import BookingCard from "../BookingCard/BookingCard";

const BookingList = () => {
    const [isLoading, setLoading] = useState(false);
    const [bookings, setBookings] = useState([]);
    const token = useSelector(state => state.auth.token);

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
                        'Authorization': 'Barer ' + token
                    }
                })
                const { data: { bookings } } = await res.json();
                setBookings(bookings);
            } finally {
                setLoading(false);
            }
        }
        loadBookings();
    }, [])

    return (<>
        {isLoading ? <Spinner/> : <div className="booking-list">
            {bookings.map(booking => <BookingCard key={booking._id} booking={booking}/>)}
        </div>}
    </>)
}

export default BookingList;
