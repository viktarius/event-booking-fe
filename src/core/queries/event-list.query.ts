import { IGraphQlQuery } from './query.model';

export const getEventListQuery = (): IGraphQlQuery<null> => ({
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
