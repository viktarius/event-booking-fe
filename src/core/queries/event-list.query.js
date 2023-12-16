export const getEventListQuery = () => ({
    query: `
        query {
            events {
                _id
                title
                description
                price
                date
                creator {
                    _id
                    email
                }
            }
        }
    `
})
