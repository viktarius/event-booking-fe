import { IEventRequest } from '../../pages/Events/models/event.model';
import { IGraphQlQuery } from './query.model';

export const getCreateEventQuery = ({
                                        title,
                                        price,
                                        date,
                                        description
                                    }: IEventRequest): IGraphQlQuery<IEventRequest> => ({
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
        price,
        date: new Date(date).toISOString(),
    }
})
