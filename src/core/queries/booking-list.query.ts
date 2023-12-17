import { IGraphQlQuery } from './query.model';

export const getBookingListQuery = (): IGraphQlQuery<null> => ({
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
