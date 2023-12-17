import { IGraphQlQuery } from './query.model';

interface IBookEventRequestData {
    eventId: string;
}

export const bookEventQuery = ({ eventId }: IBookEventRequestData): IGraphQlQuery<IBookEventRequestData> => ({
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
