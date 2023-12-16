export const cancelBookingQuery = ({ bookingId }) => ({
    query: `
        mutation CancelBooking($bookingId: ID!){
            cancelBooking (bookingId: $bookingId) {
                _id
                title
                date
            }
        }
    `,
    variables: {
        bookingId
    }
})
