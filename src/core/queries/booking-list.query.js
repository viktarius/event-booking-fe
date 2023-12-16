export const getBookingListQuery = () => ({
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
})
