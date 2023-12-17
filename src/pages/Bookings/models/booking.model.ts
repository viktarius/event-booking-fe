import { IEventResponse } from '../../Events/models/event.model';

export interface IBooking {
    _id: string;
    event: Pick<IEventResponse, 'title' | 'date'>
}
