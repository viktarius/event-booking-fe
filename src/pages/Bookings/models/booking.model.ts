import { IEvent } from '../../Events/models/event.model';

export interface IBooking {
    _id: string;
    event: Pick<IEvent, 'title' | 'date'>;
    createdAt: string;
}
