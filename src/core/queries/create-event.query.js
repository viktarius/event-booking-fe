export const getCreateEventQuery = ({ title, price, date, description }) => ({
    query: `
        mutation CreateEvent ($title: String!, $description: String!, $price: Float!, $date: String! ) {
            createEvent(body: { title: $title, price: $price, date: $date, description: $description }) {
                _id
                title
                price
                date
                description
                creator {
                    _id
                    email
                }
            }   
        }
    `,
    variables: {
        title,
        description,
        date: new Date(date).toISOString(),
        price: +price,
    }
})
