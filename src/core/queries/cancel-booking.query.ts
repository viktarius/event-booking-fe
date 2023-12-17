import { IGraphQlQuery } from './query.model';

interface ICancelBookingRequestData {
    bookingId: string;
}

export const cancelBookingQuery = ({ bookingId }: ICancelBookingRequestData): IGraphQlQuery<ICancelBookingRequestData> => ({
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
