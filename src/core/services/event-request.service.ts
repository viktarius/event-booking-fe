import { injectable } from 'inversify';
import { RequestService } from './request.service';
import { IEvent, IEventRequest } from '../../pages/Events/models/event.model';
import { IResponseResult } from '../models/response';
import { IGraphQlQuery } from './query.model';

export interface IEventRequestService {
    getEvents: () => Promise<IResponseResult<{ events: IEvent[] }>>;
    createEvent: (data: IEventRequest) => Promise<IResponseResult<{ createEvent: IEvent }>>
}

@injectable()
export class EventRequestService extends RequestService implements IEventRequestService {
    public getEvents(): Promise<IResponseResult<{ events: IEvent[] }>> {
        const requestBody: IGraphQlQuery<null> = {
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
        };
        return this.graphql(requestBody);
    }

    public createEvent({
                           title,
                           price,
                           date,
                           description
                       }: IEventRequest): Promise<IResponseResult<{ createEvent: IEvent }>> {
        const requestBody = {
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
        }
        return this.graphql(requestBody);
    }
}
