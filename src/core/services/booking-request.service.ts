import { injectable } from 'inversify';
import { RequestService } from './request.service';
import { IResponseResult } from '../models/response';
import { IBooking } from '../../pages/Bookings/models/booking.model';
import { IEvent } from '../../pages/Events/models/event.model';
import { IGraphQlQuery } from './query.model';

export interface IBookingRequestService {
    getBookings: () => Promise<IResponseResult<{ bookings: IBooking[] }>>;
    bookEvent: (eventId: string) => Promise<IResponseResult<{ bookEvent: IBooking }>>;
    cancelBooking: (bookingId: string) => Promise<IResponseResult<{ cancelBooking: IEvent }>>;
}

@injectable()
export class BookingRequestService extends RequestService implements IBookingRequestService {
    public async getBookings(): Promise<IResponseResult<{ bookings: IBooking[] }>> {
        const requestBody: IGraphQlQuery<null> = {
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
        };
        return this.graphql(requestBody);
    }

    public bookEvent(eventId: string): Promise<IResponseResult<{ bookEvent: IBooking }>> {
        const requestBody = {
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
        }

        return this.graphql<IResponseResult<{ bookEvent: IBooking }>, IGraphQlQuery<{ eventId: string; }>>(requestBody)
    }

    public cancelBooking(bookingId: string): Promise<IResponseResult<{ cancelBooking: IEvent }>> {
        const requestBody = {
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
        }

        return this.graphql(requestBody);
    }
}
