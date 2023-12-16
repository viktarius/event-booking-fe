export const bookEventQuery = ({ eventId }) => ({
    query: `
        mutation BookEvent($eventId: ID!) {
            bookEvent (eventId: $eventId) {
                _id
                createdAt
                event {
                    _id
                    title
                }
            }
        }
    `,
    variables: {
        eventId
    }
})
